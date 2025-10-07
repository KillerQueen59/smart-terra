import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type definitions
type DeviceStatus = "active" | "alert" | "rusak" | "idle";
type AWLType = "TMAS" | "TMAT";

interface DeviceConfig {
  kebunId: string;
  ptId: string;
  deviceNum: number;
  isAWS: boolean;
  awlType?: AWLType;
  status: DeviceStatus;
  battery: number;
  signal: number;
  sensorOrData: number;
  startDate: string;
}

interface PTData {
  id: string;
  name: string;
}

interface KebunData {
  id: string;
  name: string;
  ptId: string;
}

// Helper function to generate random data within ranges
const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);
const randomInt = (min: number, max: number): number =>
  Math.floor(randomBetween(min, max + 1));

// Helper function to generate DateTime for September 26, 2025 with specific hour
const getTargetDateTime = (hour: number): Date => {
  return new Date(2025, 8, 26, hour, 0, 0); // September 26, 2025 at specified hour
};

// Interface for CSV data
interface CSVWeatherData {
  timestamp: string;
  suhuRataRata: number;
  ch: number;
  kelembabanRelatif: number;
  tekananUdara: number;
  windSpeed: number;
  windDirec: number;
  suhuMinimal: number;
  suhuMaksimal: number;
  evapotranspirasi: number;
  radiasiSolarPanel: number;
  awlTmasPasut: number;
  awlTmat: number;
}

// Interface for weather data records
interface WeatherDataRecord {
  tanggal: Date;
  year: number;
  suhuRataRata: number;
  ch: number;
  kelembabanRelatif: number;
  tekananUdara: number;
  windSpeed: number;
  windDirec: number;
  suhuMinimal: number;
  suhuMaksimal: number;
  evapotranspirasi: number;
  radiasiSolarPanel: number;
  kebunId: string;
  awsId: string;
}

// Interface for TMAS data records
interface TMASDataRecord {
  tanggal: Date;
  ketinggian: number;
  kebunId: string;
  awlId: string;
}

// Interface for TMAT data records
interface TMATDataRecord {
  tanggal: Date;
  ketinggian: number;
  kebunId: string;
  awlId: string;
}

// Hardcoded weather data for September 26, 2025 (24 hours) - From actual CSV data
const getHardcodedWeatherData = (): CSVWeatherData[] => {
  return [
    {
      timestamp: "2025-09-26 00:00:00",
      suhuRataRata: 26.12,
      ch: 14.06,
      kelembabanRelatif: 19.04,
      tekananUdara: 100.94,
      windSpeed: 1.37,
      windDirec: 117.56,
      suhuMinimal: 24.91,
      suhuMaksimal: 27.76,
      evapotranspirasi: 0.07,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.5,
      awlTmat: 14,
    },
    {
      timestamp: "2025-09-26 01:00:00",
      suhuRataRata: 26.91,
      ch: 3.82,
      kelembabanRelatif: 17.7,
      tekananUdara: 100.95,
      windSpeed: 1.06,
      windDirec: 166.69,
      suhuMinimal: 23.34,
      suhuMaksimal: 30.93,
      evapotranspirasi: 0.06,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.55,
      awlTmat: 56,
    },
    {
      timestamp: "2025-09-26 02:00:00",
      suhuRataRata: 27.18,
      ch: 0.65,
      kelembabanRelatif: 18.74,
      tekananUdara: 100.98,
      windSpeed: 1.46,
      windDirec: 125.31,
      suhuMinimal: 24.18,
      suhuMaksimal: 31,
      evapotranspirasi: 0.05,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.6,
      awlTmat: 55,
    },
    {
      timestamp: "2025-09-26 03:00:00",
      suhuRataRata: 27.22,
      ch: 0.07,
      kelembabanRelatif: 18.92,
      tekananUdara: 100.84,
      windSpeed: 1.41,
      windDirec: 135.44,
      suhuMinimal: 24.4,
      suhuMaksimal: 30.05,
      evapotranspirasi: 0.04,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.65,
      awlTmat: 37,
    },
    {
      timestamp: "2025-09-26 04:00:00",
      suhuRataRata: 27.1,
      ch: 1.15,
      kelembabanRelatif: 19.04,
      tekananUdara: 100.79,
      windSpeed: 1.48,
      windDirec: 139.81,
      suhuMinimal: 24.61,
      suhuMaksimal: 30.01,
      evapotranspirasi: 0.05,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.7,
      awlTmat: 19,
    },
    {
      timestamp: "2025-09-26 05:00:00",
      suhuRataRata: 27.2,
      ch: 0.47,
      kelembabanRelatif: 18.92,
      tekananUdara: 100.8,
      windSpeed: 1.27,
      windDirec: 144.5,
      suhuMinimal: 24.53,
      suhuMaksimal: 30.27,
      evapotranspirasi: 0.1,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.75,
      awlTmat: 16,
    },
    {
      timestamp: "2025-09-26 06:00:00",
      suhuRataRata: 27.23,
      ch: 2.27,
      kelembabanRelatif: 18.92,
      tekananUdara: 100.77,
      windSpeed: 1.53,
      windDirec: 129.69,
      suhuMinimal: 24.7,
      suhuMaksimal: 30.44,
      evapotranspirasi: 0.18,
      radiasiSolarPanel: 12.5,
      awlTmasPasut: 50.8,
      awlTmat: 36,
    },
    {
      timestamp: "2025-09-26 07:00:00",
      suhuRataRata: 27.44,
      ch: 1.24,
      kelembabanRelatif: 18.8,
      tekananUdara: 100.77,
      windSpeed: 1.72,
      windDirec: 131.06,
      suhuMinimal: 24.2,
      suhuMaksimal: 31.3,
      evapotranspirasi: 0.3,
      radiasiSolarPanel: 115.6,
      awlTmasPasut: 50.85,
      awlTmat: 16,
    },
    {
      timestamp: "2025-09-26 08:00:00",
      suhuRataRata: 27.49,
      ch: 6.06,
      kelembabanRelatif: 18.92,
      tekananUdara: 100.69,
      windSpeed: 1.62,
      windDirec: 123.12,
      suhuMinimal: 24.2,
      suhuMaksimal: 31.21,
      evapotranspirasi: 0.45,
      radiasiSolarPanel: 218.7,
      awlTmasPasut: 50.9,
      awlTmat: 52,
    },
    {
      timestamp: "2025-09-26 09:00:00",
      suhuRataRata: 27.37,
      ch: 4.73,
      kelembabanRelatif: 19.04,
      tekananUdara: 100.77,
      windSpeed: 1.21,
      windDirec: 170.56,
      suhuMinimal: 25,
      suhuMaksimal: 30.15,
      evapotranspirasi: 0.6,
      radiasiSolarPanel: 321.8,
      awlTmasPasut: 51,
      awlTmat: 46,
    },
    {
      timestamp: "2025-09-26 10:00:00",
      suhuRataRata: 26.51,
      ch: 4.27,
      kelembabanRelatif: 18.19,
      tekananUdara: 100.88,
      windSpeed: 1.25,
      windDirec: 241.94,
      suhuMinimal: 24.3,
      suhuMaksimal: 30.08,
      evapotranspirasi: 0.75,
      radiasiSolarPanel: 424.9,
      awlTmasPasut: 51.1,
      awlTmat: 3,
    },
    {
      timestamp: "2025-09-26 11:00:00",
      suhuRataRata: 26.91,
      ch: 0.15,
      kelembabanRelatif: 16.97,
      tekananUdara: 100.87,
      windSpeed: 1.24,
      windDirec: 173.38,
      suhuMinimal: 23.17,
      suhuMaksimal: 31.29,
      evapotranspirasi: 0.85,
      radiasiSolarPanel: 528,
      awlTmasPasut: 51.2,
      awlTmat: 32,
    },
    {
      timestamp: "2025-09-26 12:00:00",
      suhuRataRata: 27.12,
      ch: 0.23,
      kelembabanRelatif: 18.31,
      tekananUdara: 100.8,
      windSpeed: 1.58,
      windDirec: 151.56,
      suhuMinimal: 24.22,
      suhuMaksimal: 30.3,
      evapotranspirasi: 0.9,
      radiasiSolarPanel: 631.1,
      awlTmasPasut: 51.3,
      awlTmat: 27,
    },
    {
      timestamp: "2025-09-26 13:00:00",
      suhuRataRata: 27.21,
      ch: 0.04,
      kelembabanRelatif: 18.86,
      tekananUdara: 100.77,
      windSpeed: 1.14,
      windDirec: 157,
      suhuMinimal: 24.4,
      suhuMaksimal: 30.16,
      evapotranspirasi: 0.95,
      radiasiSolarPanel: 721.87,
      awlTmasPasut: 51.35,
      awlTmat: 12,
    },
    {
      timestamp: "2025-09-26 14:00:00",
      suhuRataRata: 27.12,
      ch: 0.03,
      kelembabanRelatif: 18.55,
      tekananUdara: 100.82,
      windSpeed: 1.4,
      windDirec: 143.62,
      suhuMinimal: 24.93,
      suhuMaksimal: 30.21,
      evapotranspirasi: 0.9,
      radiasiSolarPanel: 218.7,
      awlTmasPasut: 51.3,
      awlTmat: 20,
    },
    {
      timestamp: "2025-09-26 15:00:00",
      suhuRataRata: 27.3,
      ch: 0.01,
      kelembabanRelatif: 18.49,
      tekananUdara: 100.79,
      windSpeed: 1.56,
      windDirec: 126.19,
      suhuMinimal: 24.51,
      suhuMaksimal: 31.03,
      evapotranspirasi: 0.8,
      radiasiSolarPanel: 115.6,
      awlTmasPasut: 51.2,
      awlTmat: 8,
    },
    {
      timestamp: "2025-09-26 16:00:00",
      suhuRataRata: 27.02,
      ch: 0.69,
      kelembabanRelatif: 19.41,
      tekananUdara: 100.75,
      windSpeed: 1.3,
      windDirec: 127.62,
      suhuMinimal: 24.65,
      suhuMaksimal: 29.64,
      evapotranspirasi: 0.7,
      radiasiSolarPanel: 12.5,
      awlTmasPasut: 51.1,
      awlTmat: 27,
    },
    {
      timestamp: "2025-09-26 17:00:00",
      suhuRataRata: 27.04,
      ch: 0.21,
      kelembabanRelatif: 18.86,
      tekananUdara: 100.85,
      windSpeed: 1.03,
      windDirec: 111,
      suhuMinimal: 24.89,
      suhuMaksimal: 29.09,
      evapotranspirasi: 0.55,
      radiasiSolarPanel: 7.34,
      awlTmasPasut: 51,
      awlTmat: 33,
    },
    {
      timestamp: "2025-09-26 18:00:00",
      suhuRataRata: 27.51,
      ch: 3.63,
      kelembabanRelatif: 18.37,
      tekananUdara: 100.88,
      windSpeed: 1,
      windDirec: 178.5,
      suhuMinimal: 24.4,
      suhuMaksimal: 30.82,
      evapotranspirasi: 0.4,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.9,
      awlTmat: 7,
    },
    {
      timestamp: "2025-09-26 19:00:00",
      suhuRataRata: 27.06,
      ch: 14.47,
      kelembabanRelatif: 19.04,
      tekananUdara: 100.84,
      windSpeed: 0.94,
      windDirec: 96.62,
      suhuMinimal: 25.14,
      suhuMaksimal: 29.46,
      evapotranspirasi: 0.3,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.85,
      awlTmat: 17,
    },
    {
      timestamp: "2025-09-26 20:00:00",
      suhuRataRata: 27.53,
      ch: 6.1,
      kelembabanRelatif: 18.55,
      tekananUdara: 100.83,
      windSpeed: 1.27,
      windDirec: 101.69,
      suhuMinimal: 24.9,
      suhuMaksimal: 31.37,
      evapotranspirasi: 0.2,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.8,
      awlTmat: 51,
    },
    {
      timestamp: "2025-09-26 21:00:00",
      suhuRataRata: 27.56,
      ch: 4.58,
      kelembabanRelatif: 18.8,
      tekananUdara: 100.78,
      windSpeed: 1.54,
      windDirec: 86.62,
      suhuMinimal: 24.7,
      suhuMaksimal: 31.03,
      evapotranspirasi: 0.15,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.75,
      awlTmat: 34,
    },
    {
      timestamp: "2025-09-26 22:00:00",
      suhuRataRata: 27.55,
      ch: 6.74,
      kelembabanRelatif: 19.04,
      tekananUdara: 100.75,
      windSpeed: 1.18,
      windDirec: 103.62,
      suhuMinimal: 24.83,
      suhuMaksimal: 30.66,
      evapotranspirasi: 0.1,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.7,
      awlTmat: 49,
    },
    {
      timestamp: "2025-09-26 23:00:00",
      suhuRataRata: 27.49,
      ch: 2.91,
      kelembabanRelatif: 18.68,
      tekananUdara: 100.75,
      windSpeed: 1.04,
      windDirec: 126.81,
      suhuMinimal: 25.3,
      suhuMaksimal: 30.51,
      evapotranspirasi: 0.1,
      radiasiSolarPanel: 0,
      awlTmasPasut: 50.6,
      awlTmat: 36,
    },
  ];
};

// Helper function to generate random coordinates within the polygon boundary
const generateRandomCoordinatesInPolygon = (): {
  latitude: number;
  longitude: number;
} => {
  // Updated bounding box of the polygon based on full DefaultBoundary.ts analysis
  // Latitude ranges from approximately -1.45 (north) to -1.52 (south)
  // Longitude ranges from approximately 132.23 (west) to 132.33 (east)
  const minLat = -1.52;
  const maxLat = -1.45;
  const minLng = 132.23;
  const maxLng = 132.33;

  // Generate random coordinates within the expanded bounding box
  // This will better distribute markers across the entire polygon area
  const latitude = randomBetween(minLat, maxLat);
  const longitude = randomBetween(minLng, maxLng);

  return { latitude, longitude };
};

async function main() {
  console.log("Starting comprehensive seed...");

  // Clear existing data
  await prisma.tMATData.deleteMany();
  await prisma.tMASData.deleteMany();
  await prisma.weatherData.deleteMany();
  await prisma.alatDashboard.deleteMany();
  await prisma.alatAWL.deleteMany();
  await prisma.alatAWS.deleteMany();
  await prisma.kebun.deleteMany();
  await prisma.pT.deleteMany();

  console.log("Cleared existing data...");

  // Create 2 PT (Perusahaan/Company) records
  const ptData: PTData[] = [
    { id: "1", name: "PT Agro Nusantara Sejahtera" },
    { id: "2", name: "PT Plantation Indonesia Makmur" },
  ];

  console.log("Seeding PT data...");
  for (const pt of ptData) {
    await prisma.pT.upsert({
      where: { id: pt.id },
      update: {},
      create: pt,
    });
  }

  // Create 4 Kebun (Garden/Estate) records - 2 per PT
  const kebunData: KebunData[] = [
    { id: "1", name: "Kebun Sawit Utama", ptId: "1" },
    { id: "2", name: "Kebun Kelapa Hijau", ptId: "1" },
    { id: "3", name: "Kebun Makmur Timur", ptId: "2" },
    { id: "4", name: "Kebun Makmur Barat", ptId: "2" },
  ];

  console.log("Seeding Kebun data...");
  for (const kebun of kebunData) {
    await prisma.kebun.upsert({
      where: { id: kebun.id },
      update: {},
      create: kebun,
    });
  }

  // Generate specific device configurations - 3 AWS and 10 AWL devices distributed across kebuns/PTs
  const deviceConfigs: DeviceConfig[] = [];

  // Create 3 AWS devices (1 in kebun 1, 1 in kebun 2, 1 in kebun 3)
  for (let i = 1; i <= 3; i++) {
    const kebunId = i.toString();
    const ptId = i <= 2 ? "1" : "2";
    const status: DeviceStatus = "active"; // Make all AWS devices active for data generation

    deviceConfigs.push({
      kebunId,
      ptId,
      deviceNum: 1,
      isAWS: true,
      awlType: undefined,
      status,
      battery: randomInt(70, 100),
      signal: randomInt(80, 100),
      sensorOrData: randomInt(7, 8),
      startDate: getTargetDateTime(0).toISOString().split("T")[0],
    });
  }

  // Create 10 AWL devices (distributed across all kebuns)
  const awlConfigurations = [
    { kebunId: "1", ptId: "1", awlType: "TMAS" as AWLType },
    { kebunId: "1", ptId: "1", awlType: "TMAT" as AWLType },
    { kebunId: "1", ptId: "1", awlType: "TMAS" as AWLType },
    { kebunId: "2", ptId: "1", awlType: "TMAT" as AWLType },
    { kebunId: "2", ptId: "1", awlType: "TMAS" as AWLType },
    { kebunId: "3", ptId: "2", awlType: "TMAT" as AWLType },
    { kebunId: "3", ptId: "2", awlType: "TMAS" as AWLType },
    { kebunId: "4", ptId: "2", awlType: "TMAT" as AWLType },
    { kebunId: "4", ptId: "2", awlType: "TMAS" as AWLType },
    { kebunId: "4", ptId: "2", awlType: "TMAT" as AWLType },
  ];

  awlConfigurations.forEach((config, index) => {
    const status: DeviceStatus = "active"; // Make all AWL devices active for data generation

    deviceConfigs.push({
      kebunId: config.kebunId,
      ptId: config.ptId,
      deviceNum: index + 1,
      isAWS: false,
      awlType: config.awlType,
      status,
      battery: randomInt(70, 100),
      signal: randomInt(80, 100),
      sensorOrData: randomInt(150, 300),
      startDate: getTargetDateTime(0).toISOString().split("T")[0],
    });
  });

  // Create AlatAWS devices
  console.log("Seeding AlatAWS data...");
  let awsCounter = 1;
  const awsDevices = deviceConfigs.filter((config) => config.isAWS);

  const createdAWSDevices = []; // Store created devices with their IDs and types

  for (const config of awsDevices) {
    const coordinates = generateRandomCoordinatesInPolygon();
    const awsData = {
      id: awsCounter.toString(),
      name: `AWS-${awsCounter.toString().padStart(3, "0")}`,
      detailName: `Weather Station ${config.kebunId}-${config.deviceNum}`,
      startDate: config.startDate,
      battery: config.battery,
      signal: config.signal,
      sensor: config.sensorOrData,
      status: config.status,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      ptId: config.ptId,
      kebunId: config.kebunId,
    };

    await prisma.alatAWS.create({ data: awsData });

    // Store the created device info for later use
    createdAWSDevices.push({
      id: awsData.id,
      kebunId: awsData.kebunId,
      ptId: awsData.ptId,
      status: awsData.status,
    });

    awsCounter++;
  }

  // Create AlatAWL devices
  console.log("Seeding AlatAWL data...");
  let awlCounter = 1;
  const awlDevices = deviceConfigs.filter((config) => !config.isAWS);

  const createdAWLDevices = []; // Store created devices with their IDs

  const notesByStatus: Record<DeviceStatus, string[]> = {
    active: [
      "Normal operation",
      "Optimal performance",
      "Good readings",
      "Stable monitoring",
    ],
    alert: [
      "Low battery warning",
      "Signal interference",
      "Requires attention",
      "Maintenance soon",
    ],
    rusak: [
      "Requires maintenance",
      "Hardware failure",
      "Sensor malfunction",
      "Replace needed",
    ],
    idle: [
      "Temporarily offline",
      "Scheduled maintenance",
      "Standby mode",
      "Inactive",
    ],
  };

  for (const config of awlDevices) {
    const notes = notesByStatus[config.status];
    const coordinates = generateRandomCoordinatesInPolygon();
    const awlData = {
      id: awlCounter.toString(),
      name: `${config.awlType}-${awlCounter.toString().padStart(3, "0")}`,
      detailName: `${
        config.awlType === "TMAS"
          ? "Water Surface Monitor"
          : "Water Table Monitor"
      } ${config.kebunId}-${config.deviceNum}`,
      startDate: config.startDate,
      battery: config.battery,
      signal: config.signal,
      data: config.sensorOrData,
      status: config.status,
      type: config.awlType!,
      note: notes[randomInt(0, notes.length - 1)],
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      ptId: config.ptId,
      kebunId: config.kebunId,
    };

    await prisma.alatAWL.create({ data: awlData });

    // Store the created device info for later use
    createdAWLDevices.push({
      id: awlData.id,
      kebunId: awlData.kebunId,
      ptId: awlData.ptId,
      status: awlData.status,
      type: awlData.type, // Store the AWL type (TMAS or TMAT)
    });

    awlCounter++;
  }

  // Create AlatDashboard aggregations for each PT-Kebun-DeviceType combination
  console.log("Seeding AlatDashboard data with deviceType...");

  // Get unique PT-Kebun combinations from actual created devices
  const uniqueCombinations = new Set<string>();
  [...createdAWSDevices, ...createdAWLDevices].forEach((device) => {
    uniqueCombinations.add(`${device.ptId}-${device.kebunId}`);
  });

  for (const combination of uniqueCombinations) {
    const [ptId, kebunId] = combination.split("-");

    // Get AWS devices for this PT-Kebun combination (only for weather data)
    const awsDevicesInKebun = createdAWSDevices.filter(
      (device) => device.ptId === ptId && device.kebunId === kebunId
    );

    // Get TMAS devices (AWL devices with type TMAS) for this PT-Kebun combination
    const tmasDevicesInKebun = createdAWLDevices.filter(
      (device) =>
        device.ptId === ptId &&
        device.kebunId === kebunId &&
        device.type === "TMAS"
    );

    // Get TMAT devices (AWL devices with type TMAT) for this PT-Kebun combination
    const tmatDevicesInKebun = createdAWLDevices.filter(
      (device) =>
        device.ptId === ptId &&
        device.kebunId === kebunId &&
        device.type === "TMAT"
    );

    // Calculate AWS status counts (for weather data)
    const awsStatusCounts = {
      rusak: awsDevicesInKebun.filter((d) => d.status === "rusak").length,
      idle: awsDevicesInKebun.filter((d) => d.status === "idle").length,
      active: awsDevicesInKebun.filter((d) => d.status === "active").length,
      alert: awsDevicesInKebun.filter((d) => d.status === "alert").length,
    };

    // Calculate TMAS status counts (AWL devices for water surface data)
    const tmasStatusCounts = {
      rusak: tmasDevicesInKebun.filter((d) => d.status === "rusak").length,
      idle: tmasDevicesInKebun.filter((d) => d.status === "idle").length,
      active: tmasDevicesInKebun.filter((d) => d.status === "active").length,
      alert: tmasDevicesInKebun.filter((d) => d.status === "alert").length,
    };

    // Calculate TMAT status counts (AWL devices for water table data)
    const tmatStatusCounts = {
      rusak: tmatDevicesInKebun.filter((d) => d.status === "rusak").length,
      idle: tmatDevicesInKebun.filter((d) => d.status === "idle").length,
      active: tmatDevicesInKebun.filter((d) => d.status === "active").length,
      alert: tmatDevicesInKebun.filter((d) => d.status === "alert").length,
    };

    // Create AWS dashboard record (for weather data)
    await prisma.alatDashboard.create({
      data: {
        ptId,
        kebunId,
        deviceType: "AWS",
        rusak: awsStatusCounts.rusak,
        idle: awsStatusCounts.idle,
        active: awsStatusCounts.active,
        alert: awsStatusCounts.alert,
      },
    });

    // Create TMAS dashboard record (AWL devices for water surface data)
    await prisma.alatDashboard.create({
      data: {
        ptId,
        kebunId,
        deviceType: "TMAS",
        rusak: tmasStatusCounts.rusak,
        idle: tmasStatusCounts.idle,
        active: tmasStatusCounts.active,
        alert: tmasStatusCounts.alert,
      },
    });

    // Create TMAT dashboard record (AWL devices for water table data)
    await prisma.alatDashboard.create({
      data: {
        ptId,
        kebunId,
        deviceType: "TMAT",
        rusak: tmatStatusCounts.rusak,
        idle: tmatStatusCounts.idle,
        active: tmatStatusCounts.active,
        alert: tmatStatusCounts.alert,
      },
    });

    console.log(`Created dashboard records for PT ${ptId}, Kebun ${kebunId}:`);
    console.log(
      `  AWS - Active: ${awsStatusCounts.active}, Alert: ${awsStatusCounts.alert}, Rusak: ${awsStatusCounts.rusak}, Idle: ${awsStatusCounts.idle}`
    );
    console.log(
      `  TMAS - Active: ${tmasStatusCounts.active}, Alert: ${tmasStatusCounts.alert}, Rusak: ${tmasStatusCounts.rusak}, Idle: ${tmasStatusCounts.idle}`
    );
    console.log(
      `  TMAT - Active: ${tmatStatusCounts.active}, Alert: ${tmatStatusCounts.alert}, Rusak: ${tmatStatusCounts.rusak}, Idle: ${tmatStatusCounts.idle}`
    );
  }

  // Create WeatherData records for September 26, 2025 using hardcoded real data
  console.log("Seeding WeatherData with hardcoded real data...");

  const csvData = getHardcodedWeatherData();
  const weatherDataRecords: WeatherDataRecord[] = [];

  // Generate data for each AWS device that is active (only AWS handles weather data)
  const activeAWSDevices = createdAWSDevices.filter(
    (device) => device.status === "active"
  );
  console.log(
    `Found ${activeAWSDevices.length} active AWS devices for WeatherData generation`
  );

  // Use real CSV data for weather generation
  for (const awsDevice of activeAWSDevices) {
    csvData.forEach((dataPoint: CSVWeatherData, index: number) => {
      const hour = index; // CSV data is hourly from 0-23
      if (hour < 24) {
        // Ensure we only use 24 hours of data
        weatherDataRecords.push({
          tanggal: getTargetDateTime(hour), // Use full DateTime
          year: 2025,
          suhuRataRata: dataPoint.suhuRataRata,
          ch: dataPoint.ch,
          kelembabanRelatif: dataPoint.kelembabanRelatif,
          tekananUdara: dataPoint.tekananUdara,
          windSpeed: dataPoint.windSpeed,
          windDirec: dataPoint.windDirec,
          suhuMinimal: dataPoint.suhuMinimal,
          suhuMaksimal: dataPoint.suhuMaksimal,
          evapotranspirasi: dataPoint.evapotranspirasi,
          radiasiSolarPanel: dataPoint.radiasiSolarPanel,
          kebunId: awsDevice.kebunId,
          awsId: awsDevice.id, // Link to specific AWS device
        });
      }
    });
  }

  console.log(`Generated ${weatherDataRecords.length} WeatherData records`);

  // Batch insert weather data for performance
  for (const weather of weatherDataRecords) {
    await prisma.weatherData.create({ data: weather });
  }

  // Create TMASData records for September 26, 2025 using real AWL TMAS Pasut data
  console.log("Seeding TMASData with real AWL TMAS Pasut data...");

  const tmasDataRecords: TMASDataRecord[] = [];

  // Generate data for each TMAS device that is active (AWL devices with type TMAS)
  const activeTMASDevices = createdAWLDevices.filter(
    (device) => device.status === "active" && device.type === "TMAS"
  );
  console.log(
    `Found ${activeTMASDevices.length} active TMAS devices for TMASData generation`
  );

  // Use real CSV AWL TMAS Pasut data for TMAS generation
  for (const tmasDevice of activeTMASDevices) {
    csvData.forEach((dataPoint: CSVWeatherData, index: number) => {
      const hour = index; // CSV data is hourly from 0-23
      if (hour < 24) {
        // Ensure we only use 24 hours of data
        // Use the awlTmasPasut value directly from CSV (already in meters)
        const ketinggian = dataPoint.awlTmasPasut;

        tmasDataRecords.push({
          tanggal: getTargetDateTime(hour), // Use full DateTime
          ketinggian: ketinggian, // Use real AWL TMAS Pasut data
          kebunId: tmasDevice.kebunId,
          awlId: tmasDevice.id, // Link to specific AWL device
        });
      }
    });
  }

  console.log(`Generated ${tmasDataRecords.length} TMASData records`);

  // Batch insert TMAS data for performance
  for (const tmas of tmasDataRecords) {
    await prisma.tMASData.create({ data: tmas });
  }

  // Create TMATData records for September 26, 2025 using real AWL TMAT data
  console.log("Seeding TMATData with real AWL TMAT data...");

  const tmatDataRecords: TMATDataRecord[] = [];

  // Generate TMAT data for each TMAT device that is active (AWL devices with type TMAT)
  const activeTMATDevices = createdAWLDevices.filter(
    (device) => device.status === "active" && device.type === "TMAT"
  );
  console.log(
    `Found ${activeTMATDevices.length} active TMAT devices for TMATData generation`
  );

  // Use real CSV AWL TMAT data for TMAT generation
  for (const tmatDevice of activeTMATDevices) {
    csvData.forEach((dataPoint: CSVWeatherData, index: number) => {
      const hour = index; // CSV data is hourly from 0-23
      if (hour < 24) {
        // Ensure we only use 24 hours of data
        // Use the awlTmat value directly from CSV (already in percentage)
        const ketinggian = dataPoint.awlTmat;

        tmatDataRecords.push({
          tanggal: getTargetDateTime(hour), // Use full DateTime
          ketinggian: ketinggian, // Use real AWL TMAT data
          kebunId: tmatDevice.kebunId,
          awlId: tmatDevice.id, // Use awlId since TMAT is handled by AWL devices
        });
      }
    });
  }

  console.log(`Generated ${tmatDataRecords.length} TMATData records`);

  // Batch insert TMAT data for performance
  for (const tmat of tmatDataRecords) {
    await prisma.tMATData.create({ data: tmat });
  }

  // Calculate total dashboard records created
  const totalDashboardRecords = uniqueCombinations.size * 3; // 3 device types per combination (AWL, TMAT, AWS)

  // Print summary
  console.log("\n=== SEED SUMMARY ===");
  console.log(`✅ Created 2 PT companies`);
  console.log(`✅ Created 4 Kebuns (2 per PT)`);
  console.log(`✅ Created ${createdAWSDevices.length} AWS devices`);
  console.log(`✅ Created ${createdAWLDevices.length} AWL devices`);
  console.log(
    `✅ Created ${totalDashboardRecords} AlatDashboard records (${uniqueCombinations.size} PT-Kebun combinations × 3 device types)`
  );

  const activeAWSCount = createdAWSDevices.filter(
    (d) => d.status === "active"
  ).length;
  const activeTMASCount = createdAWLDevices.filter(
    (d) => d.status === "active" && d.type === "TMAS"
  ).length;
  const activeTMATCount = createdAWLDevices.filter(
    (d) => d.status === "active" && d.type === "TMAT"
  ).length;

  console.log(
    `✅ Created ${weatherDataRecords.length} WeatherData records (${activeAWSCount} active AWS devices × 24 hours)`
  );
  console.log(
    `✅ Created ${tmasDataRecords.length} TMASData records (${activeTMASCount} active TMAS devices × 24 hours)`
  );
  console.log(
    `✅ Created ${tmatDataRecords.length} TMATData records (${activeTMATCount} active TMAT devices × 24 hours)`
  );

  // Status distribution
  const allDevices = [...createdAWSDevices, ...createdAWLDevices];
  const statusDist = allDevices.reduce(
    (acc: Record<string, number>, device: { status: string }) => {
      acc[device.status] = (acc[device.status] || 0) + 1;
      return acc;
    },
    {}
  );

  console.log("\nDevice Status Distribution:");
  Object.entries(statusDist).forEach(([status, count]) => {
    console.log(`  ${status}: ${count} devices`);
  });

  // Device type distribution
  const totalTMASDevices = createdAWLDevices.filter(
    (d) => d.type === "TMAS"
  ).length;
  const totalTMATDevices = createdAWLDevices.filter(
    (d) => d.type === "TMAT"
  ).length;

  console.log("\nDevice Type Distribution:");
  console.log(`  AWS: ${createdAWSDevices.length} devices (weather data only)`);
  console.log(`  TMAS (AWL): ${totalTMASDevices} devices (water surface data)`);
  console.log(`  TMAT (AWL): ${totalTMATDevices} devices (water table data)`);
  console.log(
    `  Total AWL: ${createdAWLDevices.length} devices (${totalTMASDevices} TMAS + ${totalTMATDevices} TMAT)`
  );

  console.log("\nDashboard Records Created:");
  console.log(`  Total records: ${totalDashboardRecords}`);
  console.log(`  PT-Kebun combinations: ${uniqueCombinations.size}`);
  console.log(
    `  Each combination has separate AWS, TMAS, and TMAT dashboard aggregations`
  );

  console.log("\nData Generation Details:");
  console.log(`  Target Date: September 26, 2025 (using real CSV data)`);
  console.log(
    `  Total Device-Hours: ${
      (activeAWSCount + activeTMASCount + activeTMATCount) * 24
    }`
  );
  console.log(
    `  Expected Total Records: ${
      weatherDataRecords.length +
      tmasDataRecords.length +
      tmatDataRecords.length
    }`
  );
  console.log(
    `  Data Source: Real CSV data from data/real_data_26_sept_2025.csv`
  );
  console.log(`  AWS Data: Using real weather monitoring data`);
  console.log(`  TMAS Data: Using real AWL TMAS Pasut water surface data`);
  console.log(`  TMAT Data: Using real AWL TMAT water table data`);

  console.log("\nSeed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
