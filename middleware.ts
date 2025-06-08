import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define protected routes and their required roles
  const adminRoutes = ["/admin"]
  const ownerRoutes = ["/owner"]
  const userRoutes = ["/dashboard", "/booking"]
  const authRoutes = ["/auth/login", "/auth/register"]

  // Check if the current path is protected
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))
  const isOwnerRoute = ownerRoutes.some((route) => path.startsWith(route))
  const isUserRoute = userRoutes.some((route) => path.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

  // Add security headers
  const response = NextResponse.next()

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.razorpay.com http://127.0.0.1:5000;",
  )

  // Get the user's role from the API
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PRIVATE_API_URL || "http://127.0.0.1:5000"}/api/role`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
    })

    if (!apiResponse.ok) {
      // User is not authenticated
      if (isAdminRoute || isOwnerRoute || isUserRoute) {
        // Redirect to login if trying to access protected routes
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
      return response
    }

    const userData = await apiResponse.json()
    const userRole = userData.role

    // Check if user has permission to access the route
    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (isOwnerRoute && userRole !== "owner") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthRoute) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      } else if (userRole === "owner") {
        return NextResponse.redirect(new URL("/owner", request.url))
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  } catch (error) {
    console.error("Error in middleware:", error)

    // If there's an error checking authentication and the route is protected, redirect to login
    if (isAdminRoute || isOwnerRoute || isUserRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
