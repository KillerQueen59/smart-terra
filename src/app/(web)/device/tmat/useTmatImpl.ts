/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { getTmat, getDevice, getKebun, getPt } from "./TmatData";
import dayjs from "dayjs";

interface Options {
  label: string;
  value: string;
  ptId?: string;
  disabled?: boolean;
}

export const useTmatImpl = () => {
  // Set default date to September 25th, 2025 which has data in our seed
  const [selectedDate, setSelectedDate] = useState(new Date("2025-09-25"));

  const [showFilter, setShowFilter] = useState(true);
  const [pt, setPt] = useState("");
  const [pts, setPts] = useState<Options[]>([]);
  const [kebun, setKebun] = useState("");
  const [kebuns, setKebuns] = useState<Options[]>([]);
  const [device, setDevice] = useState("");
  const [devices, setDevices] = useState<Options[]>([]);
  const [tmat, setTMAT] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPTData = useCallback(() => {
    setIsLoading(true);
    getPt()
      .then((res) => {
        if (res?.data) {
          setPts([
            { label: "All", value: "" },
            ...res.data.map((item: any) => ({
              label: item.name,
              value: item.name,
            })),
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getKebunData = useCallback(() => {
    setIsLoading(true);
    getKebun()
      .then((res) => {
        if (res?.data) {
          setKebuns([
            { label: "All", value: "" }, // Add "All" option
            ...res.data.map((item: any) => ({
              label: item.name,
              value: item.name,
              ptName: item.pt?.name || "",
            })),
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getDeviceData = useCallback(() => {
    setIsLoading(true);
    getDevice()
      .then((res) => {
        if (res?.data) {
          setDevices([
            { label: "All", value: "" }, // Add "All" option
            ...res.data
              .filter((item: any) => item.type === "TMAT") // Only TMAT devices
              .map((item: any) => ({
                label: `${item.name} - ${item.kebunName}`, // Show device name with kebun
                value: item.name,
                kebunName: item.kebunName,
              })),
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getTmatData = useCallback(() => {
    setIsLoading(true);
    const filters = {
      pt: pt || undefined,
      kebun: kebun || undefined,
      device: device || undefined,
      date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined,
    };

    getTmat(filters)
      .then((res) => {
        console.log("Raw TMAT response:", res);
        if (res?.data) {
          setTMAT(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pt, kebun, device, selectedDate]);

  useEffect(() => {
    getPTData();
    getKebunData();
    getDeviceData();
  }, [getPTData, getKebunData, getDeviceData]);

  useEffect(() => {
    getTmatData();
  }, [getTmatData]);

  // Generate labels for the chart based on data timestamps
  const labels = tmat.map((item: any) => dayjs(item.tanggal).format("HH:mm"));

  return {
    pt,
    setPt,
    pts,
    kebun,
    setKebun,
    kebuns,
    device,
    setDevice,
    devices,
    tmat,
    labels,
    loading: isLoading,
    selectedDate,
    setSelectedDate,
    showFilter,
    setShowFilter,
  };
};
