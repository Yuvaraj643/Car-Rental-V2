const API_BASE = process.env.NEXT_PUBLIC_API_URL

export const authService = {
  async sendLoginOTP(email: string) {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        action: "send_otp",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send OTP")
    }

    return response.json()
  },

  async login(email: string, otp: string) {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        action: "login",
        otp,
      }),
    })

    if (!response.ok) {
      throw new Error("Invalid OTP")
    }

    return response.json()
  },

  async sendRegisterOTP(name: string, email: string, contact: string) {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        contact,
        action: "send_otp",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send OTP")
    }

    return response.json()
  },

  async register(name: string, email: string, contact: string, otp: string) {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        contact,
        action: "register",
        otp,
      }),
    })

    if (!response.ok) {
      throw new Error("Registration failed")
    }

    return response.json()
  },

  async logout() {
    const response = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Logout failed")
    }

    return response.json()
  },

  async getRole() {
    const response = await fetch(`${API_BASE}/role`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Not authenticated")
    }

    return response.json()
  },
}
