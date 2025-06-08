const API_BASE = "http://127.0.0.1:5000/api"

export const carService = {
  async getCars() {
    const response = await fetch(`${API_BASE}/home`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cars")
    }

    return response.json()
  },

  async bookCar(carId: number, startTime: string, endTime: string) {
    const response = await fetch(`${API_BASE}/booking/${carId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        start_time: startTime,
        end_time: endTime,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get booking details")
    }

    return response.json()
  },

  async reserveCar(carId: number, startTime: string, endTime: string) {
    const response = await fetch(`${API_BASE}/reserve/${carId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        start_time: startTime,
        end_time: endTime,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to reserve car")
    }

    return response.json()
  },

  async payFull(carId: number, startTime: string, endTime: string) {
    const response = await fetch(`${API_BASE}/pay_full/${carId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        start_time: startTime,
        end_time: endTime,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to process full payment")
    }

    return response.json()
  },

  async getPaymentDetails() {
    const response = await fetch(`${API_BASE}/pay`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get payment details")
    }

    return response.json()
  },

  async confirmPayment(paymentId: string, orderId: string, signature: string) {
    const response = await fetch(`${API_BASE}/payment_success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
      }),
    })

    if (!response.ok) {
      throw new Error("Payment verification failed")
    }

    return response.json()
  },

  async getUserDashboard() {
    const response = await fetch(`${API_BASE}/user_dashboard`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user dashboard")
    }

    return response.json()
  },

  async getLiveBookings() {
    const response = await fetch(`${API_BASE}/user/bookings/live`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch live bookings")
    }

    return response.json()
  },

  async getPastBookings() {
    const response = await fetch(`${API_BASE}/user/bookings/past`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch past bookings")
    }

    return response.json()
  },

  async getCancelledBookings() {
    const response = await fetch(`${API_BASE}/user/bookings/cancelled`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cancelled bookings")
    }

    return response.json()
  },

  async getUploadDocuments(bookingId: number) {
    const response = await fetch(`${API_BASE}/upload_documents/${bookingId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch document upload details")
    }

    return response.json()
  },

  async uploadDocuments(bookingId: number, formData: FormData) {
    const response = await fetch(`${API_BASE}/upload_documents/${bookingId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload documents")
    }

    return response.json()
  },

  async getDuePayment(bookingId: number) {
    const response = await fetch(`${API_BASE}/pay_due/${bookingId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get due payment details")
    }

    return response.json()
  },

  async payDue(bookingId: number) {
    const response = await fetch(`${API_BASE}/pay_due/${bookingId}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to initiate due payment")
    }

    return response.json()
  },

  async getDuePaymentDetails() {
    const response = await fetch(`${API_BASE}/pay_due_now`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get due payment details")
    }

    return response.json()
  },

  async getRideStatus(bookingId: number) {
    const response = await fetch(`${API_BASE}/user/ride_status/${bookingId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get ride status")
    }

    return response.json()
  },
}
