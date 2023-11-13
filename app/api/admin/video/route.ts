import prisma from "@/lib/db";
import route from "@/lib/routes";
import { videoSchema } from "@/zod-schemas/video";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const params = await req.json();
    const result = videoSchema.safeParse(params);
    if (result.success) {
      const videoId = nanoid(11)
      const video = await prisma.video.create({
        data: {
          id: videoId,
          title: result.data.title,
          description: result.data.description,
          poster: result.data.poster,
          published: result.data.published,
          video: result.data.video,
          categoryId: result.data.categoryId,
          userId: result.data.userId,
        }
      })
      return NextResponse.json(video);
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': validationErrors });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = videoSchema.safeParse(params);
    const videoId = params.id;
    if (result.success) {
      const video = await prisma.video.update({
        where: {
          id: videoId
        },
        data: {
          title: result.data.title,
          description: result.data.description,
          poster: result.data.poster,
          published: result.data.published,
          video: result.data.video,
          categoryId: result.data.categoryId,
          userId: result.data.userId,
        }
      })
      return NextResponse.json(video);
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': validationErrors });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const params = await req.json();
    const videoId = params.id;
    if (videoId) {
      await prisma.video.delete({
        where: {
          id: videoId
        },
      })
      return NextResponse.json({ message: "Video deleted" });
    } else {
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': [{ videoId: { message: "Video id is required" } }] });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}