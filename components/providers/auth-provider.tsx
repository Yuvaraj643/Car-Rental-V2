"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/lib/services/auth-service"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, otp: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, contact: string, otp: string) => Promise<void>
  sendOTP: (email: string, type: "login" | "register", name?: string, contact?: string) => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const userData = await authService.getRole()
        setUser(userData)
      } catch (error) {
        // User not authenticated
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, otp: string) => {
    try {
      const response = await authService.login(email, otp)
      const userData = await authService.getRole()
      setUser(userData)

      // Navigate based on user role
      if (userData.role === "admin") {
        router.push("/admin")
        toast({
          title: "Welcome Admin",
          description: "You have been logged in as an administrator",
        })
      } else if (userData.role === "owner") {
        router.push("/owner")
        toast({
          title: "Welcome Owner",
          description: "You have been logged in as a car owner",
        })
      } else {
        router.push("/dashboard")
        toast({
          title: "Welcome",
          description: "You have been successfully logged in",
        })
      }

      return response
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login Failed",
        description: "Invalid OTP or email. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      router.push("/")
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      })
    } catch (error) {
      console.error("Logout failed:", error)
      toast({
        title: "Logout Failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const register = async (name: string, email: string, contact: string, otp: string) => {
    try {
      await authService.register(name, email, contact, otp)
      const userData = await authService.getRole()
      setUser(userData)

      router.push("/dashboard")
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully",
      })
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        title: "Registration Failed",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const sendOTP = async (email: string, type: "login" | "register", name?: string, contact?: string) => {
    try {
      if (type === "login") {
        await authService.sendLoginOTP(email)
        toast({
          title: "OTP Sent",
          description: "Please check your email for the verification code",
        })
      } else {
        await authService.sendRegisterOTP(name!, email, contact!)
        toast({
          title: "OTP Sent",
          description: "Please check your email for the verification code",
        })
      }
    } catch (error) {
      console.error("Failed to send OTP:", error)
      toast({
        title: "OTP Failed",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    sendOTP,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
