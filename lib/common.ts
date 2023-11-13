import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "./db";
import { SMTP_FROM_ADDRESS, SMTP_FROM_NAME, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USERNAME } from "./constants";
import nodemailer from "nodemailer"
import route from "./routes";
import { Role } from "@prisma/client";
export const currentUser = async () => {

  const data = await getServerSession(authOptions);

  if (data && data.user && data.user.email) {
    const dbUser = await getUserByEmail(data.user.email);
    if (dbUser) {
      return {
        user: dbUser,
        role: dbUser.role,
        ...{
          isAdmin: dbUser.role === 'ADMIN',
          isMember: dbUser.role === 'USER'
        }
      }
    }
    // return { user: data.user, role: "", image: data.user.image, isAdmin: false, isMember: false }
  }

  return { user: null, role: null, session: null, isAdmin: false, isMember: false }
}

export const getCurrentUser = async () => {

  const data = await getServerSession(authOptions);

  if (data && data.user && data.user.email) {
    const dbUser = await getUserByEmail(data.user.email);
    if (dbUser) {
      return dbUser;
    }
  }
  return null;
}

export const getUserByEmail = async (userEmail: string) => {

  try {

    return await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })

  } catch (error) {
    console.error('Fn: getUserByEmail', error)
  }
  return null
}

export const createNewUser = async ({ email, firstName, lastName }: { email: string, firstName: string, lastName: string }) => {
  try {
    return await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        emailVerified: new Date(),
        active: true,
        password: '',
        verifyToken: ''
      },
    });
  } catch (error) {
    console.error('Fn: createNewUser', error)
  }
  return null
}

export const getUserVideoCount = async (userId: string) => {
  const totalVideoCount = await prisma.video.aggregate({
    where: {
      userId: userId
    },
    _count: {
      title: true,
    },
  });
  return totalVideoCount._count.title;
}

const SMTPConfigs = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_FROM_NAME,
  },
}


const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
export const mail = async ({
  to,
  from,
  subject,
  text,
  html
}: {
  to: string,
  from?: string,
  subject?: string,
  text?: string,
  html?: string
}) => {

  return await transporter.sendMail({
    from: from || SMTP_FROM_ADDRESS,
    to: to,
    subject: subject,
    html: html,
    text: text,
  });
}

export const sendVerificationEmail = (to: string, token: string) => {
  const link = route('api.verifyEmail', { token: token })
  mail({
    to: to,
    subject: 'Verify your email',
    html: `<a href="${link}">Verify your email</a>`,
    text: '',
  })
}