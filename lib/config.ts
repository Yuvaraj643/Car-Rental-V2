export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000",
    timeout: 30000,
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Hanuman-Cars",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  upload: {
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ],
  },
  features: {
    enableAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
    enableNotifications: true,
    enableRealTimeUpdates: true,
  },
}
