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

// Helper function to generate DateTime for September 25, 2025 with specific hour
const getTargetDateTime = (hour: number): Date => {
  return new Date(2025, 8, 25, hour, 0, 0); // September 25, 2025 at specified hour
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

  // Generate device configurations for each kebun (8 devices per kebun)
  const deviceConfigs: DeviceConfig[] = [];
  const statusOptions: DeviceStatus[] = ["active", "alert", "rusak", "idle"];

  for (let kebunId = 1; kebunId <= 4; kebunId++) {
    const ptId = kebunId <= 2 ? "1" : "2";

    for (let deviceNum = 1; deviceNum <= 8; deviceNum++) {
      const isAWS = Math.random() > 0.5; // 50% chance for AWS vs AWL
      const awlType: AWLType | undefined = !isAWS
        ? Math.random() > 0.5
          ? "TMAS"
          : "TMAT" // 50% chance for TMAS vs TMAT for AWL devices
        : undefined;
      const status: DeviceStatus = statusOptions[randomInt(0, 3)];

      // Adjust device stats based on status
      let battery: number, signal: number, sensorOrData: number;

      switch (status) {
        case "active":
          battery = randomInt(70, 100);
          signal = randomInt(80, 100);
          sensorOrData = isAWS ? randomInt(7, 8) : randomInt(150, 300);
          break;
        case "alert":
          battery = randomInt(20, 69);
          signal = randomInt(50, 79);
          sensorOrData = isAWS ? randomInt(5, 7) : randomInt(50, 149);
          break;
        case "rusak":
          battery = randomInt(0, 19);
          signal = randomInt(0, 49);
          sensorOrData = isAWS ? randomInt(0, 4) : randomInt(0, 49);
          break;
        case "idle":
          battery = 0;
          signal = 0;
          sensorOrData = 0;
          break;
      }

      deviceConfigs.push({
        kebunId: kebunId.toString(),
        ptId,
        deviceNum,
        isAWS,
        awlType,
        status,
        battery,
        signal,
        sensorOrData,
        startDate: getTargetDateTime(0).toISOString().split("T")[0], // Still keep date string for device start date
      });
    }
  }

  // Create AlatAWS devices
  console.log("Seeding AlatAWS data...");
  let awsCounter = 1;
  const awsDevices = deviceConfigs.filter((config) => config.isAWS);

  const createdAWSDevices = []; // Store created devices with their IDs and types

  for (const config of awsDevices) {
    const awsData = {
      id: awsCounter.toString(),
      name: `AWS-${awsCounter.toString().padStart(3, "0")}`,
      detailName: `Weather Station ${config.kebunId}-${config.deviceNum}`,
      startDate: config.startDate,
      battery: config.battery,
      signal: config.signal,
      sensor: config.sensorOrData,
      status: config.status,
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

  // Create WeatherData records for September 25, 2025 (hourly data for each AWS device)
  console.log("Seeding WeatherData...");

  const weatherDataRecords: any[] = [];

  // Generate data for each AWS device that is active (only AWS handles weather data)
  const activeAWSDevices = createdAWSDevices.filter(
    (device) => device.status === "active"
  );
  console.log(
    `Found ${activeAWSDevices.length} active AWS devices for WeatherData generation`
  );

  for (const awsDevice of activeAWSDevices) {
    for (let hour = 0; hour < 24; hour++) {
      // Create more realistic weather patterns
      const baseTemp = 28 + Math.sin(((hour - 6) / 24) * 2 * Math.PI) * 4; // Temperature varies with time of day
      const humidity = 80 + Math.sin((hour / 24) * 2 * Math.PI) * 15; // Humidity varies inversely with temperature

      weatherDataRecords.push({
        tanggal: getTargetDateTime(hour), // Use full DateTime
        year: 2025,
        suhuRataRata: baseTemp + randomBetween(-2, 2),
        ch: randomBetween(120, 250),
        kelembabanRelatif: Math.max(
          60,
          Math.min(95, humidity + randomBetween(-5, 5))
        ),
        tekananUdara: randomBetween(1010, 1020),
        windSpeed: randomBetween(1, 8),
        windDirec: randomBetween(0, 360),
        suhuMinimal: baseTemp - randomBetween(2, 5),
        suhuMaksimal: baseTemp + randomBetween(2, 5),
        evapotranspirasi: randomBetween(3, 7),
        radiasiSolarPanel:
          hour >= 6 && hour <= 18
            ? randomBetween(200, 1000) * Math.sin(((hour - 6) / 12) * Math.PI)
            : randomBetween(0, 50),
        kebunId: awsDevice.kebunId,
        awsId: awsDevice.id, // Link to specific AWS device
      });
    }
  }

  console.log(`Generated ${weatherDataRecords.length} WeatherData records`);

  // Batch insert weather data for performance
  for (const weather of weatherDataRecords) {
    await prisma.weatherData.create({ data: weather });
  }

  // Create TMASData records for September 25, 2025 (hourly data for each AWL device)
  console.log("Seeding TMASData...");

  const tmasDataRecords: any[] = [];

  // Generate data for each TMAS device that is active (AWL devices with type TMAS)
  const activeTMASDevices = createdAWLDevices.filter(
    (device) => device.status === "active" && device.type === "TMAS"
  );
  console.log(
    `Found ${activeTMASDevices.length} active TMAS devices for TMASData generation`
  );

  for (const tmasDevice of activeTMASDevices) {
    // Base water level for this specific device (0-120 cm range, convert to meters)
    let baseLevel = randomBetween(0.3, 0.9); // 30-90 cm base level

    for (let hour = 0; hour < 24; hour++) {
      // Water level varies throughout the day with realistic patterns
      const timeOfDayVariation =
        Math.sin(((hour - 6) / 24) * 2 * Math.PI) * 0.15; // 15cm variation
      const randomVariation = randomBetween(-0.05, 0.05); // 5cm random variation
      const currentLevel = baseLevel + timeOfDayVariation + randomVariation;

      // Ensure level stays within 0-120 cm (0-1.2 m) range
      const finalLevel = Math.max(0, Math.min(1.2, currentLevel));

      tmasDataRecords.push({
        tanggal: getTargetDateTime(hour), // Use full DateTime
        ketinggian: finalLevel,
        kebunId: tmasDevice.kebunId,
        awlId: tmasDevice.id, // Link to specific AWL device
      });
    }
  }

  console.log(`Generated ${tmasDataRecords.length} TMASData records`);

  // Batch insert TMAS data for performance
  for (const tmas of tmasDataRecords) {
    await prisma.tMASData.create({ data: tmas });
  }

  // Create TMATData records for September 25, 2025 (hourly data for each TMAT device)
  console.log("Seeding TMATData...");

  const tmatDataRecords: any[] = [];

  // Generate TMAT data for each TMAT device that is active (AWL devices with type TMAT)
  const activeTMATDevices = createdAWLDevices.filter(
    (device) => device.status === "active" && device.type === "TMAT"
  );
  console.log(
    `Found ${activeTMATDevices.length} active TMAT devices for TMATData generation`
  );

  for (const tmatDevice of activeTMATDevices) {
    // Base water table level for this specific device (0-100% range)
    const baseLevel = randomBetween(40, 80); // 40-80% base level

    for (let hour = 0; hour < 24; hour++) {
      // Water table level varies throughout the day with realistic patterns
      const timeOfDayVariation =
        Math.sin(((hour - 12) / 24) * 2 * Math.PI) * 10; // 10% variation
      const randomVariation = randomBetween(-5, 5); // 5% random variation
      const currentLevel = baseLevel + timeOfDayVariation + randomVariation;

      // Ensure level stays within 0-100% range
      const finalLevel = Math.max(0, Math.min(100, currentLevel));

      tmatDataRecords.push({
        tanggal: getTargetDateTime(hour), // Use full DateTime
        ketinggian: finalLevel,
        kebunId: tmatDevice.kebunId,
        awlId: tmatDevice.id, // Use awlId since TMAT is handled by AWL devices
      });
    }
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
    (acc: Record<string, number>, device: any) => {
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
  console.log(`  Target Date: September 25, 2025`);
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
