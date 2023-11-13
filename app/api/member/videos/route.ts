import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import route from "@/lib/routes";
import { PER_PAGE } from "@/lib/constants";

export async function GET(req: Request) {
  const currentSession = await getServerSession(authOptions);
  console.log('currentSession', currentSession);

  if (!currentSession?.user.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  const url = new URL(req.url)
  const pageRaw = url.searchParams.get("page")
  const currentPage = (pageRaw == null || pageRaw == '0') ? 1 : parseInt(pageRaw)
  const skip = (currentPage - 1) * PER_PAGE!;

  try {
    const videos = await prisma.video.findMany({
      where: {
        userId: currentSession.user.id,
      },
      orderBy: [
        {
          uploadDate: 'desc'
        }
      ],
      skip,
      take: PER_PAGE,
      include: {
        category: true,
      }

    })
    return NextResponse.json({ videos })
  } catch (error) {
    console.log(route('api.member.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }

}