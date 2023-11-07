import { NEXT_PUBLIC_SITE_URL } from "./constants"


export const siteURL = NEXT_PUBLIC_SITE_URL || '';

const routes: { [key: string]: string } = {
  // Public
  'home': siteURL + "/",
  'signin': `${siteURL}/api/auth/signin`,
  'signout': `${siteURL}/api/auth/signout`,
  'signup': `${siteURL}/signup`,
  'api.signup': `${siteURL}/api/signup`,
  'api.verifyEmail': `${siteURL}/api/verifyEmail?token=:token`,

  // Admin
  'admin': `${siteURL}/admin`,
  'admin.videos.new': `${siteURL}/admin/videos/new`,
  'admin.videos.edit': `${siteURL}/admin/videos/:videoId/edit`,
  'admin.videos': `${siteURL}/admin/videos`,
  'admin.categories': `${siteURL}/admin/categories`,
  'admin.categories.new': `${siteURL}/admin/categories/new`,
  'admin.categories.edit': `${siteURL}/admin/categories/:categoryId/edit`,
  'admin.users': `${siteURL}/admin/users`,
  'admin.users.new': `${siteURL}/admin/users/new`,
  'admin.users.edit': `${siteURL}/admin/users/:userId/edit`,
  'api.admin': `${siteURL}/api/admin`,
  'api.admin.videos': `${siteURL}/api/admin/videos?page=:currentPage`,
  'api.admin.video': `${siteURL}/api/admin/video`,
  'api.admin.categories': `${siteURL}/api/admin/categories?page=:currentPage`,
  'api.admin.category': `${siteURL}/api/admin/category`,
  'api.admin.users': `${siteURL}/api/admin/users?page=:currentPage`,
  'api.admin.user': `${siteURL}/api/admin/user`,
  'api.member': `${siteURL}/api/member`,
  'api.member.videos': `${siteURL}/api/member/videos`,
  'api.member.video': `${siteURL}/api/member/video/:videoId`,
  'api.public': `${siteURL}/api/public`,
  'api.public.categories': `${siteURL}/api/public/categories`,
  // Member
  'member': `${siteURL}/member`,
  'member.videos': `${siteURL}/member/videos`,
  'member.video.new': `${siteURL}/member/video/new`,
  'member.video.edit': `${siteURL}/member/video/:videoId/edit`,
  'member.settings': `${siteURL}/member/settings`,
  'member.account': `${siteURL}/member/account`,
  'member.channel': `${siteURL}/member/channel`,
  'public.category': `${siteURL}/category/:slug`,
  'public.channel': `${siteURL}/channel/:userId`,
  'public.watch': `${siteURL}/watch/:videoId`,
};


export default function route(name: string, params: { [key: string]: string } = {}): string {

  let url = siteURL && `${name}`;

  if (routes[name]) {
    url = routes[name];
    const urlObject = new URL(url)
    Object.keys(params).forEach((key) => {
      urlObject.href = urlObject.href.replace(`:${key}`, params[key])
      return urlObject;
    })
    return urlObject.toString()
  }

  return url


}