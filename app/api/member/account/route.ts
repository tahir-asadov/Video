import prisma from "@/lib/db";
import route from "@/lib/routes";
// import { userEditSchema, userSchema } from "@/zod-schemas/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { memberAccountServerSchema } from "@/zod-schemas/member-account";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = memberAccountServerSchema.safeParse(params);

    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (result.success) {

      let passwordField = {};

      let data = {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
      }

      if (result.data.password) {
        passwordField = {
          password: await bcrypt.hash(result.data.password, 10),
        }
      }
      const user = await prisma.user.update({
        where: {
          id: currentSession?.user.id
        },
        data: { ...data, ...passwordField }
      })

      return NextResponse.json({ message: "Account updated successfully" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ message: 'Bad Request', 'errors': validationErrors }, { status: 400 });
    }
  } catch (error) {
    console.log(route('api.admin.user'), error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
