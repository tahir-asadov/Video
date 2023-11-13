import prisma from "@/lib/db";
import route from "@/lib/routes";
import { signupServerSchema } from "@/zod-schemas/signup";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/lib/common";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const params = await req.json();
    const result = signupServerSchema.safeParse(params);
    if (result.success) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: result.data.email,
        },
      });

      if (!userExists) {
        const hashedpass = await bcrypt.hash(params.password, 10);
        const verifyToken = uuidv4();
        await prisma.user.create({
          data: {
            firstName: result.data.firstname,
            lastName: result.data.lastname,
            email: result.data.email,
            verifyToken: verifyToken,
            password: hashedpass,
          }
        })
        sendVerificationEmail(result.data.email, verifyToken)
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Email is already registered',
        });
      }
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': validationErrors });
    }
  } catch (error) {
    console.log(route('api.admin.video'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}