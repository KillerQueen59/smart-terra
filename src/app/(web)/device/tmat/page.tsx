/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LineChart from "@/components/Chart/LineChart/LineChart";
import CustomSelect from "@/components/CustomSelect";
import Image from "next/image";
import dayjs from "dayjs";
import InputDate from "@/components/InputDate/InputDate";
import { useTmatImpl } from "./useTmatImpl";

export default function TMAT() {
  const {
    pt,
    tmat,
    labels,
    kebun,
    device,
    selectedDate,
    kebuns,
    devices,
    pts,
    loading: isLoading,
    showFilter,
    setShowFilter,
    setPt,
    setKebun,
    setDevice,
    setSelectedDate,
  } = useTmatImpl();

  // Define TMAT-specific reference zones and lines
  const tmatReferenceZones = [
    { min: 0, max: 30, color: "rgba(244, 67, 54, 0.1)" }, // Red - Very dry
    { min: 30, max: 50, color: "rgba(255, 152, 0, 0.1)" }, // Orange - Dry
    { min: 50, max: 70, color: "rgba(255, 235, 59, 0.1)" }, // Yellow - Optimal
    { min: 70, max: 100, color: "rgba(76, 175, 80, 0.1)" }, // Green - Wet
  ];

  const tmatReferenceLines = [
    { value: 30, color: "#F44336", label: "30% (Critical)" },
    { value: 50, color: "#FF9800", label: "50% (Low)" },
    { value: 70, color: "#4CAF50", label: "70% (Optimal)" },
  ];

  const tmatLegend = [
    { color: "#F44336", label: "Critical (<30%)" },
    { color: "#FF9800", label: "Dry (30-50%)" },
    { color: "#FFC107", label: "Optimal (50-70%)" },
    { color: "#4CAF50", label: "Wet (>70%)" },
  ];

  return (
    <div>
      <div className="w-full p-8">
        <div className="rounded-2xl	w-full border border-gray-30 bg-white">
          <div className="flex w-full p-6">
            <div className="flex-grow">
              <div className="text-gray-80 font-semibold text-base">
                Laporan TMAT
              </div>
              <div className="font-medium text-gray-50">
                {tmat.length > 0 && (
                  <span className="text-sm text-gray-60">
                    Showing {tmat.length} records for{" "}
                    {dayjs(selectedDate).format("DD/MM/YYYY")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-4"></div>
          </div>
          <div className="border-t">
            <div className="px-6 my-4 flex">
              <div className="flex-grow">Filter</div>
              <Image
                alt=""
                src={showFilter ? "/chevron-down.svg" : "/chevron-up.svg"}
                width={20}
                height={20}
                onClick={() => setShowFilter(!showFilter)}
                className="cursor-pointer"
              />
            </div>
            {showFilter && (
              <div className="text-black min-h-[200px]">
                <div className="flex px-6 py-5 space-x-6 flex-wrap gap-y-4">
                  <div className="flex my-auto whitespace-nowrap">
                    Data Filter
                  </div>
                  <CustomSelect
                    options={pts}
                    value={pt === "All" ? "" : pt}
                    onChange={(e: string) => setPt(e)}
                    placeholder="Select PT"
                  />
                  <CustomSelect
                    options={kebuns}
                    value={kebun === "All" ? "" : kebun}
                    onChange={(e: string) => setKebun(e)}
                    placeholder={!pt ? "Select PT first" : "Select Kebun"}
                  />
                  <CustomSelect
                    options={devices}
                    value={device === "All" ? "" : device}
                    onChange={(e: string) => setDevice(e)}
                    placeholder={
                      !kebun ? "Select Kebun first" : "Select TMAT Device"
                    }
                  />
                  <div className="flex-grow" />
                </div>
                <div className="flex px-6 pb-5 space-x-6">
                  <InputDate
                    value={selectedDate}
                    onChange={(date: Date) => setSelectedDate(date)}
                    name={"Tanggal"}
                    label={"Tanggal"}
                    placeholder={"Select Date"}
                  />
                </div>

                {/* Display current filter status */}
                <div className="px-6 pb-4">
                  <div className="text-sm text-gray-60 bg-gray-10 p-3 rounded-lg">
                    <div className="font-medium mb-1">Active Filters:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Date: {dayjs(selectedDate).format("DD/MM/YYYY")}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        PT: {pt}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Kebun: {kebun}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Device: {device}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="text-gray-60">Loading TMAT data...</div>
              </div>
            ) : tmat.length > 0 ? (
              <div className="border-t">
                <LineChart
                  label={labels}
                  upperTitle="Laporan TMAT"
                  title="Tinggi Muka Air Tanah"
                  data={[
                    tmat.map((data: any) => {
                      return data.ketinggian;
                    }),
                  ]}
                  xAxisTitle="Jam"
                  yAxisTitle="TMAT (%)"
                  dataSatuan="%"
                  dataType="TMAT"
                  selectedDate={dayjs(selectedDate).format("DD/MM/YYYY")}
                  id="tmat"
                  pt={pt}
                  kebun={kebun}
                  device={device}
                  // TMAT-specific props
                  showBackgroundZones={true}
                  referenceZones={tmatReferenceZones}
                  referenceLines={tmatReferenceLines}
                  customLegend={tmatLegend}
                />
              </div>
            ) : (
              <div className="m-8 text-center">
                <div className="text-gray-80 font-medium mb-2">
                  No Data Found
                </div>
                <div className="text-gray-60 text-sm">
                  No TMAT data available for the selected filters.
                </div>
                <div className="text-gray-50 text-xs mt-2">
                  Try adjusting your date selection or filters to find available
                  data.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
