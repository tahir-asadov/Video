import route from "@/lib/routes";

export const adminLinks = [
  {
    title: "Videos",
    url: route('admin.videos')
  },
  {
    title: "Categories",
    url: route('admin.categories')
  },
  {
    title: "Users",
    url: route('admin.users')
  },
]