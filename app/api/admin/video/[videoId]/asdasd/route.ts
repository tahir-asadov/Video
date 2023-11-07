import prisma from "@/lib/db";
import route from "@/lib/routes";
import { videoSchema } from "@/zod-schemas/video";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = videoSchema.safeParse(params);
    console.log('result', result);

    if (result.success) {
      // const video = await prisma.video.update({
      //   where: {
      //     id: videoId
      //   },
      //   data: {
      //     title: result.data.title,
      //     description: result.data.description,
      //     poster: result.data.poster,
      //     video: result.data.video,
      //     categoryId: result.data.categoryId,
      //     userId: result.data.userId,
      //   }
      // })
      // return NextResponse.json(video);
      return NextResponse.json({});
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': validationErrors });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}