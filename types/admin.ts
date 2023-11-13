// import { Category, User, Video } from "@prisma/client";

// export interface IVideo {
//   id?: string;
//   title: string;
//   description: string | null;
//   video: string;
//   poster: string | null;
//   userId: string,
//   categoryId: string,
// }

// export interface IVideoDB extends Video {
//   id: string;
//   user: User,
//   category: Category
// }

// export interface ICategory {
//   id?: string;
//   name: string;
//   slug: string;
//   description: string | null;
// }

// export interface ICategoryDB extends Category {
// }

// export interface IUser {
//   firstName: string | null;
//   lastName: string | null;
//   email: string;
//   emailVerified: string | null
//   image: string | null;
//   role: "USER" | "ADMIN" | "MEMBER";
// }

// export interface IUserDB extends IUser {
//   id: string;
// }