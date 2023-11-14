import route from '@/lib/routes';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '@/lib/common';
export async function POST(req: Request) {
  try {
    const params = await req.json();
    if (params && params.email != '') {
      const verifyToken = uuidv4();
      await prisma.user.updateMany({
        where: {
          email: params.email,
        },
        data: {
          verifyToken: verifyToken,
        },
      });
      sendVerificationEmail(params.email, verifyToken);
    }
    return NextResponse.json({
      message: 'You successfully registered!',
    });
  } catch (error) {
    console.log(route('api.admin.videos'), error);
    return NextResponse.json({
      message: 'Internal Server Error',
    }, { status: 500 });
  }
}