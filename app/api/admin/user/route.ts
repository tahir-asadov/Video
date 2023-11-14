import prisma from "@/lib/db";
import route from "@/lib/routes";
import { userEditSchema, userSchema } from "@/zod-schemas/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const params = await req.json();
    const result = userSchema.safeParse(params);
    if (result.success) {
      const hashedpass = await bcrypt.hash(result.data.password, 10);
      const user = await prisma.user.create({
        data: {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          active: result.data.active,
          role: result.data.role,
          email: result.data.email,
          emailVerified: new Date(),
          password: hashedpass,
          verifyToken: "",
        }
      })
      return NextResponse.json({ message: "User added" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.user'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = userEditSchema.safeParse(params);

    if (result.success) {

      let passwordField = {};

      let data = {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        active: result.data.active,
        role: result.data.role,
        email: result.data.email,
        emailVerified: new Date(),
        verifyToken: "",
      }

      if (result.data.password) {
        passwordField = {
          password: await bcrypt.hash(result.data.password, 10),
        }
      }

      const user = await prisma.user.update({
        where: {
          id: params.id
        },
        data: { ...data, ...passwordField }
      })

      return NextResponse.json({ message: "User updated" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.user'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const params = await req.json();
    const userId = params.id;
    if (userId) {
      await prisma.user.delete({
        where: {
          id: userId
        },
      })
      return NextResponse.json({ message: "User deleted" });
    } else {
      return NextResponse.json({ message: 'Bad Request', 'errors': [{ userId: { message: "User id is required" } }] }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.user'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}