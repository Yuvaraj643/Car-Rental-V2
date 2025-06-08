const API_BASE = "http://127.0.0.1:5000/api"

export const adminService = {
  async getDashboard() {
    const response = await fetch(`${API_BASE}/admin/dashboard`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch admin dashboard")
    }

    return response.json()
  },

  async getApprovals() {
    const response = await fetch(`${API_BASE}/admin/approvals`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch approvals")
    }

    return response.json()
  },

  async approveBooking(bookingId: number) {
    const response = await fetch(`${API_BASE}/admin/approve/${bookingId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to approve booking")
    }

    return response.json()
  },

  async rejectBooking(bookingId: number) {
    const response = await fetch(`${API_BASE}/admin/reject/${bookingId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to reject booking")
    }

    return response.json()
  },

  async getBookings() {
    const response = await fetch(`${API_BASE}/admin/bookings`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch bookings")
    }

    return response.json()
  },

  async cancelBooking(bookingId: number) {
    const response = await fetch(`${API_BASE}/admin/cancel_booking/${bookingId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to cancel booking")
    }

    return response.json()
  },

  async getEarnings(year?: number, month?: number) {
    let url = `${API_BASE}/admin/earnings`
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

  async getBlockManager() {
    const response = await fetch(`${API_BASE}/admin/block_manager`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch block manager")
    }

    return response.json()
  },

  async getCarBlocks(carId: number) {
    const response = await fetch(`${API_BASE}/admin/block/${carId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch car blocks")
    }

    return response.json()
  },

  async addCarBlock(carId: number, startBlock: string, endBlock: string) {
    const response = await fetch(`${API_BASE}/admin/block/${carId}`, {
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
    const response = await fetch(`${API_BASE}/admin/unblock/${carId}/${blockIndex}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to remove car block")
    }

    return response.json()
  },

  async getLiveRides() {
    const response = await fetch(`${API_BASE}/admin/live_rides`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch live rides")
    }

    return response.json()
  },

  async forceEndRide(bookingId: number) {
    const response = await fetch(`${API_BASE}/admin/force_end/${bookingId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to force end ride")
    }

    return response.json()
  },

  async addCar(formData: FormData) {
    const response = await fetch(`${API_BASE}/admin/add`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to add car")
    }

    return response.json()
  },

  async editCar(carId: number, formData: FormData) {
    const response = await fetch(`${API_BASE}/admin/edit/${carId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to edit car")
    }

    return response.json()
  },

  async getCarDetails(carId: number) {
    const response = await fetch(`${API_BASE}/admin/edit/${carId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get car details")
    }

    return response.json()
  },

  async deleteCar(carId: number) {
    const response = await fetch(`${API_BASE}/admin/delete/${carId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to delete car")
    }

    return response.json()
  },
}
