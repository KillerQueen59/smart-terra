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

  // Group data by hour and calculate averages for duplicates
  const groupedByHour = tmat.reduce((acc: any, data: any) => {
    const hour = dayjs(data.tanggal).format("HH:mm");

    if (!acc[hour]) {
      acc[hour] = {
        items: [],
        count: 0,
      };
    }

    acc[hour].items.push(data);
    acc[hour].count++;

    return acc;
  }, {});

  console.log("TMAT Grouped by hour:", groupedByHour);

  // Calculate averages for each hour
  const aggregatedTmat = Object.keys(groupedByHour).map((hour) => {
    const group = groupedByHour[hour];
    const items = group.items;

    // If only one item, return it as is
    if (items.length === 1) {
      return items[0];
    }

    // Log when we're averaging duplicate hours
    console.log(`Averaging ${items.length} TMAT entries for hour ${hour}`);

    // Calculate averages for numeric fields
    const averagedData = {
      ...items[0], // Use the first item as base, keeping non-numeric fields
      ketinggian:
        items.reduce(
          (sum: number, item: any) => sum + (item.ketinggian || 0),
          0
        ) / items.length,
      // Set timestamp to the earliest time for this hour
      tanggal: items[0].tanggal,
    };

    return averagedData;
  });

  // Sort by datetime for better visualization
  const sortedTmat = aggregatedTmat.sort((a: any, b: any) => {
    return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
  });

  console.log("Filtered and sorted TMAT data:", sortedTmat);

  // Generate labels for the chart based on aggregated data timestamps - now unique after aggregation
  const labels = sortedTmat.map((item: any) =>
    dayjs(item.tanggal).format("HH:mm")
  );

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
    tmat: sortedTmat,
    labels,
    loading: isLoading,
    selectedDate,
    setSelectedDate,
    showFilter,
    setShowFilter,
  };
};
