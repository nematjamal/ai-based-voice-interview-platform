import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  KeySquare,
} from "lucide-react";
import api from "../lib/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [manualOtp, setManualOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    const savedOtp = localStorage.getItem("resetOtp");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedOtp) {
      setManualOtp(savedOtp);
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!manualOtp.trim()) {
      return setMessage({
        text: "Please enter the OTP sent to your email.",
        type: "error",
      });
    }

    if (!password.trim() || !confirmPassword.trim()) {
      return setMessage({ text: "Please fill in all fields.", type: "error" });
    }

    if (password !== confirmPassword) {
      return setMessage({ text: "Passwords do not match.", type: "error" });
    }

    if (password.length < 6) {
      return setMessage({
        text: "Password must be at least 6 characters.",
        type: "error",
      });
    }

    const targetEmail = email || localStorage.getItem("resetEmail");

    if (!targetEmail) {
      return setMessage({
        text: "Email context missing. Please start from Forgot Password page again.",
        type: "error",
      });
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      // 🚀 Sabhi common variants ke sath dynamic payload validation target
      const response = await api.post("/auth/reset-password", {
        email: targetEmail,
        password: password,
        otp: manualOtp.trim(),
      });

      setMessage({
        text:
          response.data.message ||
          "Password updated successfully! Redirecting...",
        type: "success",
      });

      setPassword("");
      setConfirmPassword("");
      setManualOtp("");

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to update password. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-175 bg-white rounded-3xl shadow-2xl overflow-hidden flex relative">
        {/* Left Side */}
        <div className="w-1/2 bg-linear-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold">
              Welcome to <br />
              CrackitAI 👋
            </h1>
            <p className="mt-8 text-2xl text-blue-100">
              Create a strong new password for your account.
            </p>
          </div>
          <div className="relative flex justify-center">
            <img src="/public/robot2.webp" className="w-100" alt="programmer" />
          </div>
        </div>

        {/* Right Side */}
        <form
          onSubmit={handleResetPassword}
          className="w-1/2 p-14 flex flex-col justify-center bg-white"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-500 text-lg mt-3">
              Enter your reset details below
            </p>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* New Input Field for OTP */}
          <div className="relative mb-5">
            <KeySquare
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              placeholder="Enter Received OTP"
              value={manualOtp}
              onChange={(e) => setManualOtp(e.target.value)}
              className="w-full h-16 pl-14 pr-5 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 text-gray-900"
            />
          </div>

          {/* New Password */}
          <div className="relative mb-5">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 pl-14 pr-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 text-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-16 pl-14 pr-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 text-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-linear-to-r from-indigo-600 via-violet-600 to-purple-500 hover:opacity-95 transition disabled:opacity-50 shadow-md cursor-pointer"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
