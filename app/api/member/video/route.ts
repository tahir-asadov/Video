import prisma from "@/lib/db";
import route from "@/lib/routes";
import { memberEditVideoSchema, memberVideoSchema } from "@/zod-schemas/member-video";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {

    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const params = await req.json();
    const result = memberVideoSchema.safeParse(params);
    if (result.success) {
      const videoId = nanoid(11)
      const video = await prisma.video.create({
        data: {
          id: videoId,
          title: result.data.title,
          description: result.data.description,
          poster: result.data.poster,
          video: result.data.video,
          userId: currentSession.user.id,
          categoryId: result.data.categoryId,
        }
      })
      return NextResponse.json({ message: "Video added" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {

    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const params = await req.json();
    const result = memberEditVideoSchema.safeParse(params);
    const videoId = params.id;
    if (result.success) {
      const video = await prisma.video.update({
        where: {
          id: videoId,
          userId: currentSession.user.id
        },
        data: {
          title: result.data.title,
          description: result.data.description,
          poster: result.data.poster,
          categoryId: result.data.categoryId,
        }
      })
      return NextResponse.json({ message: "Video updated" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const params = await req.json();
    const videoId = params.id;
    if (videoId) {
      await prisma.video.delete({
        where: {
          id: videoId,
          userId: currentSession?.user.id
        },
      })
      return NextResponse.json({ message: "Video deleted" });
    } else {
      return NextResponse.json({ message: 'Bad Request', 'errors': [{ videoId: { message: "Video id is required" } }] }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}