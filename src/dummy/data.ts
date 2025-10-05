import { AlatAWL, AlatAWS } from "./../shared/type";

export const dummyPT = [
  {
    label: "XYZ",
    value: "XYZ",
  },
];

export const dummiesDashboard = [
  {
    pt: "XYZ",
    kebun: "XYZ22",
    rusak: 2,
    idle: 3,
    active: 5,
    alert: 1,
  },
  {
    pt: "XYZ",
    kebun: "XYZ23",
    rusak: 1,
    idle: 2,
    active: 6,
    alert: 1,
  },
  {
    pt: "XYZ",
    kebun: "XYZ24",
    rusak: 3,
    idle: 1,
    active: 4,
    alert: 2,
  },
  {
    pt: "XYZ",
    kebun: "XYZ25",
    rusak: 0,
    idle: 4,
    active: 5,
    alert: 1,
  },
  {
    pt: "XYZ",
    kebun: "XYZ26",
    rusak: 1,
    idle: 3,
    active: 4,
    alert: 2,
  },
];

export const dummyKebun = [
  {
    label: "All",
    value: "",
  },
  {
    label: "XYZ22",
    value: "XYZ22",
    pt: "XYZ",
  },
  {
    label: "XYZ23",
    value: "XYZ23",
    pt: "XYZ",
  },
  {
    label: "XYZ24",
    value: "XYZ24",
    pt: "XYZ",
  },
  {
    label: "XYZ25",
    value: "XYZ25",
    pt: "XYZ",
  },
  {
    label: "XYZ26",
    value: "XYZ26",
    pt: "XYZ",
  },
  {
    label: "XYZ12",
    value: "XYZ12",
    pt: "XYZ",
  },
  {
    label: "XYZ13",
    value: "XYZ13",
    pt: "XYZ",
  },
  {
    label: "XYZ14",
    value: "XYZ14",
    pt: "XYZ",
  },
  {
    label: "XYZ15",
    value: "XYZ15",
    pt: "XYZ",
  },
  {
    label: "XYZ16",
    value: "XYZ16",
    pt: "XYZ",
  },
];

export const dummyDevice = [
  {
    label: "AWS-001-XYZ22-1234",
    value: "AWS-001-XYZ22-1234",
  },
  {
    label: "AWS-002-XYZ23-5678",
    value: "AWS-002-XYZ23-5678",
  },
  {
    label: "AWS-003-XYZ24-9101",
    value: "AWS-003-XYZ24-9101",
  },
  {
    label: "AWS-004-XYZ25-1121",
    value: "AWS-004-XYZ25-1121",
  },
  {
    label: "AWS-005-XYZ26-3141",
    value: "AWS-005-XYZ26-3141",
  },
  {
    label: "AWL-001-XYZ12-3456",
    value: "AWL-001-XYZ12-3456",
  },
  {
    label: "AWL-002-XYZ13-7890",
    value: "AWL-002-XYZ13-7890",
  },
  {
    label: "AWL-003-XYZ14-1234",
    value: "AWL-003-XYZ14-1234",
  },
  {
    label: "AWL-004-XYZ15-5678",
    value: "AWL-004-XYZ15-5678",
  },
  {
    label: "AWL-005-XYZ16-9101",
    value: "AWL-005-XYZ16-9101",
  },
];

export const dummyAws: AlatAWS[] = [
  {
    name: "AWS",
    detailName: "AWS-001-XYZ22-1234",
    id: "C0000000001",
    startDate: "2024-09-14",
    battery: 99,
    signal: 25,
    sensor: 0,
    status: "Normal",
  },
  {
    name: "AWS",
    detailName: "AWS-002-XYZ23-5678",
    id: "C0000000002",
    startDate: "2024-09-15",
    battery: 80,
    signal: 30,
    sensor: 2,
    status: "Normal",
  },
  {
    name: "AWS",
    detailName: "AWS-003-XYZ24-9101",
    id: "C0000000003",
    startDate: "2024-09-16",
    battery: 60,
    signal: 28,
    sensor: 1,
    status: "Normal",
  },
  {
    name: "AWS",
    detailName: "AWS-004-XYZ25-1121",
    id: "C0000000004",
    startDate: "2024-09-17",
    battery: 45,
    signal: 18,
    sensor: 3,
    status: "Normal",
  },
  {
    name: "AWS",
    detailName: "AWS-005-XYZ26-3141",
    id: "C0000000005",
    startDate: "2024-09-18",
    battery: 70,
    signal: 22,
    sensor: 0,
    status: "Normal",
  },
];

export const dummyAwl: AlatAWL[] = [
  {
    name: "AWL",
    detailName: "AWL-001-XYZ12-3456",
    stationName: "Station-A",
    id: "L0000000001",
    startDate: "2024-09-10",
    battery: 85,
    signal: 20,
    data: 150,
    status: "Normal",
    note: "Aktif",
  },
  {
    name: "AWL",
    detailName: "AWL-002-XYZ13-7890",
    stationName: "Station-B",
    id: "L0000000002",
    startDate: "2024-09-11",
    battery: 65,
    signal: 15,
    data: 200,
    status: "Normal",
    note: "Non-Aktif",
  },
  {
    name: "AWL",
    detailName: "AWL-003-XYZ14-1234",
    stationName: "Station-C",
    id: "L0000000003",
    startDate: "2024-09-12",
    battery: 90,
    signal: 18,
    data: 180,
    status: "Normal",
    note: "Aktif",
  },
  {
    name: "AWL",
    detailName: "AWL-004-XYZ15-5678",
    stationName: "Station-D",
    id: "L0000000004",
    startDate: "2024-09-13",
    battery: 75,
    signal: 22,
    data: 220,
    status: "Normal",
    note: "Aktif",
  },
  {
    name: "AWL",
    detailName: "AWL-005-XYZ16-9101",
    stationName: "Station-E",
    id: "L0000000005",
    startDate: "2024-09-14",
    battery: 50,
    signal: 17,
    data: 130,
    status: "Normal",
    note: "Aktif",
  },
];
