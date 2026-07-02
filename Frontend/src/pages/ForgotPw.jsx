import { useState } from "react";
import { Mail } from "lucide-react";
import api from "../lib/api"; // Aapka custom axios instance
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault(); 

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      // Backend route: router.post("/forgot-password", forgotPassword)
      const res = await api.post("/auth/forgot-password", { email });

      // Email ko temporary memory me store kar rhe hain text verification ke liye
      localStorage.setItem("resetEmail", email);

      toast.success(res.data.message || "OTP sent successfully ✨");

      // OTP send hote hi direct Verify page par redirect
      setTimeout(() => {
        window.location.href = "/verify-otp";
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Check route layout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl min-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to <br />
              CrackitAI 👋
            </h1>
            <p className="mt-8 text-2xl text-blue-100">
              Reset your password and continue your interview journey.
            </p>
          </div>
          <div className="relative flex justify-center">
            <img src="/public/robot2.webp" alt="Programmer" className="w-100" />
          </div>
        </div>

        {/* Right Side */}
        <form
          onSubmit={handleSendOTP}
          className="w-1/2 p-14 flex flex-col justify-center"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-lg mt-3">
              Enter your email address to receive OTP
            </p>
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <Mail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 pl-14 pr-5 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
