import prisma from "@/lib/db";
import route from "@/lib/routes";
// import { userEditSchema, userSchema } from "@/zod-schemas/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { memberAccountServerSchema } from "@/zod-schemas/member-account";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// export async function POST(req: Request) {
//   try {
//     const params = await req.json();
//     const result = userSchema.safeParse(params);
//     if (result.success) {
//       const hashedpass = await bcrypt.hash(result.data.password, 10);
//       const user = await prisma.user.create({
//         data: {
//           firstName: result.data.firstName,
//           lastName: result.data.lastName,
//           active: result.data.active,
//           role: result.data.role,
//           email: result.data.email,
//           emailVerified: new Date(),
//           password: hashedpass,
//           verifyToken: "",
//         }
//       })
//       return NextResponse.json({ user });
//     } else {
//       let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
//       return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': validationErrors });
//     }
//   } catch (error) {
//     console.log(route('api.admin.user'), error);
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }


export async function PATCH(req: Request) {
  try {
    const params = await req.json();
    const result = memberAccountServerSchema.safeParse(params);

    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
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
      console.log({ ...data, ...passwordField });

      const user = await prisma.user.update({
        where: {
          id: currentSession?.user.id
        },
        data: { ...data, ...passwordField }
      })

      return NextResponse.json({ success: true, message: "Account updated successfully" });
    } else {
      let validationErrors = result.error ? result.error.formErrors.fieldErrors : [];
      return NextResponse.json({ success: false, message: 'Bad Request', status: 400, 'errors': validationErrors });
    }
  } catch (error) {
    console.log(route('api.admin.user'), error);
    return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 });
  }
}


// export async function DELETE(req: Request) {
//   try {
//     const params = await req.json();
//     const userId = params.id;
//     if (userId) {
//       await prisma.user.delete({
//         where: {
//           id: userId
//         },
//       })
//       return NextResponse.json({ message: "User deleted" });
//     } else {
//       return NextResponse.json({ message: 'Bad Request', status: 400, 'errors': [{ userId: { message: "User id is required" } }] });
//     }
//   } catch (error) {
//     console.log(route('api.admin.user'), error);
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }