import { PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import route from "@/lib/routes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const pageRaw = url.searchParams.get("page")
  const currentPage = (pageRaw == null || pageRaw == '0') ? 1 : parseInt(pageRaw)
  const skip = (currentPage - 1) * PER_PAGE!;
  try {
    const users = await prisma.user.findMany({
      orderBy: [
        {
          firstName: 'asc'
        }
      ],
      skip,
      take: PER_PAGE,
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.log(route('api.admin.users'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}