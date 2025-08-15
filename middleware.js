import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  console.log("🔥 Middleware triggered");

  let token = request.cookies.get("token")?.value || "";
  let path = request.nextUrl.pathname;
  let publicPaths = path === "/" || path === "/my-account";

  let verifyToken = null;

  try {
    if (token) {
      verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    }
  } catch {
    verifyToken = null;
  }

  if (verifyToken?.admin && publicPaths) {
    return NextResponse.redirect(new URL("/admin/add-blog", request.url));
  } else if (!verifyToken?.admin && !publicPaths) {
    return NextResponse.redirect(new URL("/my-account", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/my-account", "/admin", "/admin/:path*"],
};
