// app/api/awl/route.ts
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const pt = searchParams.get("pt");
    const kebun = searchParams.get("kebun");
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    // Build where clause for filtering
    const whereClause: {
      pt?: { name: string };
      kebun?: { name: string };
      status?: string;
      type?: string;
    } = {};

    if (pt) {
      whereClause.pt = {
        name: pt,
      };
    }

    if (kebun) {
      whereClause.kebun = {
        name: kebun,
      };
    }

    if (status) {
      whereClause.status = status;
    }

    if (type) {
      whereClause.type = type;
    }

    const data = await prisma.alatAWL.findMany({
      where: whereClause,
      include: {
        pt: true,
        kebun: true,
      },
    });

    // Format data to match expected structure
    const formattedData = data.map((device) => ({
      id: device.id,
      name: device.name,
      detailName: device.detailName,
      startDate: device.startDate,
      battery: device.battery,
      signal: device.signal,
      data: device.data,
      status: device.status,
      type: device.type,
      note: device.note,
      ptId: device.ptId,
      ptName: device.pt.name,
      kebunId: device.kebunId,
      kebunName: device.kebun.name,
      pt: device.pt,
      kebun: device.kebun,
      latitude: device.latitude,
      longitude: device.longitude,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      message: `Found ${formattedData.length} AWL devices`,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
