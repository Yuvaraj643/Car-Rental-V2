const API_BASE = process.env.NEXT_PUBLIC_API_URL

export const ownerService = {
  async getDashboard() {
    const response = await fetch(`${API_BASE}/owner/dashboard`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch owner dashboard")
    }

    return response.json()
  },

  async getEarnings(year?: number, month?: number) {
    let url = `${API_BASE}/owner/earnings`
    if (year && month) {
      url += `?year=${year}&month=${month}`
    }

    const response = await fetch(url, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch earnings")
    }

    return response.json()
  },

  async getCarBlocks(carId: number) {
    const response = await fetch(`${API_BASE}/owner/block/${carId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch car blocks")
    }

    return response.json()
  },

  async addCarBlock(carId: number, startBlock: string, endBlock: string) {
    const response = await fetch(`${API_BASE}/owner/block/${carId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        start_block: startBlock,
        end_block: endBlock,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to add car block")
    }

    return response.json()
  },

  async removeCarBlock(carId: number, blockIndex: number) {
    const response = await fetch(`${API_BASE}/owner/unblock/${carId}/${blockIndex}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to remove car block")
    }

    return response.json()
  },

  async getRideAction(bookingId: number) {
    const response = await fetch(`${API_BASE}/owner/ride_action/${bookingId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get ride action")
    }

    return response.json()
  },

  async startRide(bookingId: number, otp: string) {
    const response = await fetch(`${API_BASE}/owner/start_ride/${bookingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        otp,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to start ride")
    }

    return response.json()
  },

  async endRide(bookingId: number, otp: string) {
    const response = await fetch(`${API_BASE}/owner/end_ride/${bookingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        otp,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to end ride")
    }

    return response.json()
  },
}
