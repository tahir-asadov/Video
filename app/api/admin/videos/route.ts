import { PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import route from "@/lib/routes";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const pageRaw = url.searchParams.get("page")
  const currentPage = (pageRaw == null || pageRaw == '0') ? 1 : parseInt(pageRaw)
  const skip = (currentPage - 1) * PER_PAGE!;

  try {
    const videos = await prisma.video.findMany({
      orderBy: [
        {
          uploadDate: 'desc'
        }
      ],
      skip,
      take: PER_PAGE,
      include: {
        category: true,
        user: true,
      }
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.log(route('api.admin.videos'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}