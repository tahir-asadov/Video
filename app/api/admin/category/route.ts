import prisma from "@/lib/db";
import route from "@/lib/routes";
import { categorySchema } from "@/zod-schemas/category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const params = await req.json();
    const result = categorySchema.safeParse(params);
    console.log('result', result);

    if (result.success) {
      const category = await prisma.category.create({
        data: {
          name: result.data.name,
          slug: result.data.slug,
          description: result.data.description
        }
      })
      return NextResponse.json(category);
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.category'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = categorySchema.safeParse(params);

    if (result.success) {
      const category = await prisma.category.update({
        where: {
          id: params.id
        },
        data: {
          name: result.data.name,
          slug: result.data.slug,
          description: result.data.description
        }
      })
      return NextResponse.json(category);
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.category'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const params = await req.json();
    const categoryId = params.id;
    if (categoryId) {
      await prisma.category.delete({
        where: {
          id: categoryId
        },
      })
      return NextResponse.json({ message: "Category deleted" });
    } else {
      return NextResponse.json({ message: 'Bad Request', 'errors': [{ categoryId: { message: "Category id is required" } }] }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.category'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}