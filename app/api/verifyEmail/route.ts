import prisma from "@/lib/db";
import route from "@/lib/routes";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token")
  try {
    if (token != '') {
      await prisma.user.updateMany({
        where: {
          verifyToken: token!
        },
        data: {
          emailVerified: new Date()
        }
      })
      return NextResponse.redirect(route('signin'))
    } else {
      return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': { token: { message: 'Token is missing' } } });
    }
  } catch (error) {
    console.log(route('api.admin.category'), error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
