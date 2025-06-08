export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

export const validateOTP = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/
  return otpRegex.test(otp)
}

export const validateFileSize = (file: File, maxSize = 5242880): boolean => {
  return file.size <= maxSize
}

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  const now = new Date()
  return startDate >= now && endDate > startDate
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "")
}
