export const config = {
  matcher: ["/", "/items", "/items/:path*", "/orders", "/orders/:path*"],
};

export { default } from "next-auth/middleware";
