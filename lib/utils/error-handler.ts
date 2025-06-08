import { toast } from "@/hooks/use-toast"

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code?: string,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export const handleApiError = (error: any) => {
  console.error("API Error:", error)

  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    }
  }

  if (error.response) {
    // Server responded with error status
    const statusCode = error.response.status
    const message = error.response.data?.message || error.response.statusText || "An error occurred"

    return {
      message,
      statusCode,
      code: error.response.data?.code,
    }
  }

  if (error.request) {
    // Network error
    return {
      message: "Network error. Please check your connection and try again.",
      statusCode: 0,
      code: "NETWORK_ERROR",
    }
  }

  // Unknown error
  return {
    message: error.message || "An unexpected error occurred",
    statusCode: 500,
    code: "UNKNOWN_ERROR",
  }
}

export const showErrorToast = (error: any) => {
  const errorInfo = handleApiError(error)

  toast({
    title: "Error",
    description: errorInfo.message,
    variant: "destructive",
  })
}
