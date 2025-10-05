// app/api/aws/route.ts
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const pt = searchParams.get("pt");
    const kebun = searchParams.get("kebun");
    const status = searchParams.get("status");

    // Build where clause for filtering
    const whereClause: {
      pt?: { name: string };
      kebun?: { name: string };
      status?: string;
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

    const data = await prisma.alatAWS.findMany({
      where: whereClause,
      include: {
        pt: true,
        kebun: true,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching AWS data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
