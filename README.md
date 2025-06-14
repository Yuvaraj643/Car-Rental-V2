# 🚗 Car Rental Platform

A full-featured, production-ready car rental platform supporting **role-based authentication**, **real-time booking**, and robust **admin/owner/user dashboards**. Built with **Next.js 14**, **React 18**, and **TypeScript** for high performance, security, and scalability.

---

## ✅ Core Features

### 1. Role-Based Authentication & Navigation

- **Automatic Redirection**: Users are redirected to their respective dashboards (Admin, Owner, User) after login.
- **Protected Routes**: Middleware ensures only authorized access.
- **Secure Sessions**: Robust session management for all user types.

### 2. Complete Booking Flow

- **Car Browsing**: Real-time availability for all vehicles.
- **Date Selection**: Blocked dates handled seamlessly.
- **Dynamic Pricing**: Transparent price breakdown.
- **Razorpay Integration**: Secure online payments.
- **Document Upload**: Easy and secure document submission.
- **Booking Confirmation**: Real-time status tracking.

### 3. Admin Dashboard

- **Booking Management**: Approve, reject, or manage bookings.
- **Car Management**: Add, edit, or delete vehicles.
- **Earnings Tracking**: Monitor platform revenue.
- **Block Management**: Manage car availability.
- **Live Ride Monitoring**: Track rides in real-time.

### 4. Owner Dashboard

- **Earnings Overview**: Visualize income and payouts.
- **Car Blocking**: Temporarily make cars unavailable.
- **Ride Management**: Start/end rides, OTP verification for security.

### 5. User Dashboard

- **Booking History**: View and manage past/current bookings.
- **Profile Management**: Update personal details.
- **Real-Time Updates**: Get live booking and ride status.

---

## 🔒 Security & Performance

- **Security Headers**: CSP, XSS, frame options.
- **Input Validation**: Email, phone, OTP, file uploads.
- **Error Handling**: Global error boundaries, API error responses.
- **Rate Limiting**: Prevents abuse.
- **File Upload Security**: Restricts file size and type.

---

## 🚀 Production Features

- **Environment Configuration**: All required environment variables.
- **Error Boundaries**: Graceful error handling.
- **Loading States**: User-friendly loading indicators.
- **Responsive Design**: Mobile-first, works on all devices.
- **SEO Optimization**: Meta tags, structured data.
- **Performance**: Optimized images, lazy loading.
- **Analytics Ready**: Google Analytics integration.

---

## 📱 User Experience

- **Real-Time Updates**: Live booking and ride status.
- **Intuitive Navigation**: Role-based menus and flows.
- **Toast Notifications**: Instant user feedback.
- **Accessibility**: ARIA labels, keyboard navigation.
- **Progressive Enhancement**: Functional without JavaScript.

---

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Context API
- **Payments**: Razorpay
- **Validation**: Custom utilities

---

## 🌐 Deployment

Easily deployable on:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

---

## 📋 Pre-Launch Checklist

- [x] Environment variables configured
- [x] API endpoints tested
- [x] Payment gateway integrated
- [x] Security headers implemented
- [x] Error handling complete
- [x] Mobile responsive
- [x] SEO optimized
- [x] Performance optimized
- [x] User roles and permissions
- [x] Real-time features working

---

## 🚀 Get Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/car-rental-platform.git
   cd car-rental-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Copy `.env.example` to `.env.local` and fill in all required values.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Deploy**
   - Deploy to [Vercel](https://vercel.com/import), [Netlify](https://app.netlify.com/start), or your preferred platform.

---

## 🙌 Contributing

Contributions are welcome! Please open issues or submit pull requests for any improvements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, TypeScript, and the latest web technologies.**
