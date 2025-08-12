import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  console.log("🔥 Middleware triggered");

  let token = request.cookies.get("token")?.value || "";
  let path = request.nextUrl.pathname;
  let verifyToken = null;

  try {
    if (token) {
      verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    }
  } catch {
    verifyToken = null;
  }
  if (path.startsWith("/admin")) {
    if (!verifyToken) {
      return NextResponse.redirect(new URL("/my-account", request.url));
    }
    if (!verifyToken.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (verifyToken?.isAdmin && (path === "/" || path === "/my-account")) {
    console.log("verifyToken?.isAdmin", verifyToken.isAdmin);
    if (verifyToken?.isAdmin && ["/", "/my-account"].includes(path)) {
      return NextResponse.redirect(new URL("/admin/add-blog", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/my-account", "/admin/:path*"],
};
