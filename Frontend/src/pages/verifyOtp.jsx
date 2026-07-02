import { useState, useEffect } from "react";
import { KeyRound, CheckCircle, AlertCircle } from "lucide-react";
import api from "../lib/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Page open hote hi email recover karega memory se
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setMessage({
        text: "Email session not found. Please try forgot password again.",
        type: "error",
      });
    }
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      return setMessage({ text: "Please enter the OTP.", type: "error" });
    }

    if (!email) {
      return setMessage({
        text: "Target email address session is missing.",
        type: "error",
      });
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      // Ab context perfectly mapped hai backend keys ke sath
      const response = await api.post("/auth/verify-otp", {
        otp: otp,
        email: email,
      });

      setMessage({
        text:
          response.data.message || "OTP verified successfully! Redirecting...",
        type: "success",
      });

      localStorage.setItem("resetOtp", otp.trim());
      setOtp("");

      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 2000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Invalid or expired OTP.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email)
      return setMessage({
        text: "Email profile contextual map failed.",
        type: "error",
      });

    try {
      setResending(true);
      setMessage({ text: "", type: "" });

      const response = await api.post("/auth/resend-otp", { email });

      setMessage({
        text: response.data.message || "A new OTP has been sent to your email.",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to resend OTP. Try again later.",
        type: "error",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-175 bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-linear-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to <br />
              CrackitAI 👋
            </h1>
            <p className="mt-8 text-2xl text-blue-100">
              Verify your OTP to reset your password.
            </p>
          </div>
          <div className="relative flex justify-center">
            <img src="/public/robot2.webp" className="w-100" alt="programmer" />
          </div>
        </div>

        {/* Right Side */}
        <form
          onSubmit={handleVerifyOTP}
          className="w-1/2 p-14 flex flex-col justify-center"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold">Verify OTP</h1>
            <p className="text-gray-500 mt-3 text-lg">
              Enter the OTP sent to{" "}
              <span className="text-indigo-600 font-medium">
                {email || "your email"}
              </span>
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

          <div className="relative mb-6">
            <KeyRound
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                if (message.text) setMessage({ text: "", type: "" });
                setOtp(e.target.value);
              }}
              disabled={loading || !email}
              className="w-full h-16 pl-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-linear-to-r from-indigo-600 via-violet-600 to-purple-500 hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-center mt-8 text-gray-600">
            Didn't get OTP?
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resending || loading || !email}
              className="text-violet-600 font-semibold ml-2 hover:underline disabled:opacity-50 disabled:no-underline"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
