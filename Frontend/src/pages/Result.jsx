import { useLocation, Link, Navigate } from "react-router-dom";
import {
  Trophy,
  Target,
  MessageSquare,
  Zap,
  Brain,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Home,
  Star,
  Sparkles
} from "lucide-react";

export default function Result() {
  const location = useLocation();
  const result = location.state?.result;

  // Fallback if someone navigates here directly without taking an interview
  if (!result) {
    return (
      <div className="min-h-screen bg-[#070B1A] text-white flex flex-col items-center justify-center p-6">
        <AlertTriangle size={64} className="text-yellow-500 mb-6" />
        <h2 className="text-3xl font-bold mb-4">No Results Found</h2>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          It looks like you haven't completed an interview yet, or the session expired.
        </p>
        <Link
          to="/"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center gap-2 hover:scale-105 transition"
        >
          <Home size={20} /> Return Home
        </Link>
      </div>
    );
  }

  // Calculate an overall score if the backend didn't provide a single combined one
  const overallScore =
    result.overallScore ||
    Math.round(
      (result.technicalScore +
        result.communicationScore +
        result.confidenceScore +
        result.problemSolvingScore) /
        4
    );

  // Helper function to safely render lists whether the AI returned an array or a formatted string
  const renderList = (items) => {
    if (Array.isArray(items)) {
      return (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-1 text-current shrink-0">❖</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{items}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C033E] via-[#14045C] to-[#1A0B70] text-white relative overflow-hidden pb-20">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 bg-purple-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 bg-blue-500/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="font-medium">Interview Completed</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">Your AI Evaluation</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Our AI has analyzed your responses. Here is a detailed breakdown of your performance, strengths, and areas for growth.
          </p>
        </div>

        {/* Main Score Hero Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 mb-10 shadow-2xl">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
              <Trophy className="text-yellow-400" size={32} />
              Overall Performance
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {result.overallFeedback || result.feedback || "You did a great job! Review the specific metrics below to see exactly where you shined and what you can improve for your next real-world interview."}
            </p>
            <div className="inline-block px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-purple-300 font-semibold text-lg">
              AI Rating: <span className="text-white ml-2">{result.rating || "Strong Candidate"}</span>
            </div>
          </div>

          <div className="shrink-0 relative flex items-center justify-center">
            {/* Pulsing ring behind score */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-xl opacity-40 animate-pulse" />
            <div className="relative h-48 w-48 rounded-full bg-[#0C033E] border-4 border-purple-500/50 flex flex-col items-center justify-center shadow-inner">
              <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                {overallScore}%
              </span>
              <span className="text-slate-400 text-sm mt-2 font-medium tracking-wider uppercase">
                Total Score
              </span>
            </div>
          </div>
        </div>

        {/* Individual Metrics Grid */}
        <h3 className="text-2xl font-bold mb-6 px-2">Detailed Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <MetricCard
            title="Technical"
            score={result.technicalScore}
            icon={<Brain size={24} className="text-cyan-400" />}
            color="cyan"
          />
          <MetricCard
            title="Communication"
            score={result.communicationScore}
            icon={<MessageSquare size={24} className="text-pink-400" />}
            color="pink"
          />
          <MetricCard
            title="Problem Solving"
            score={result.problemSolvingScore}
            icon={<Target size={24} className="text-purple-400" />}
            color="purple"
          />
          <MetricCard
            title="Confidence"
            score={result.confidenceScore}
            icon={<Zap size={24} className="text-yellow-400" />}
            color="yellow"
          />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-green-500/30 transition duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="text-green-400" size={28} />
              Top Strengths
            </h3>
            <div className="text-green-100/80">
              {renderList(result.strengths)}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-orange-500/30 transition duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-orange-400" size={28} />
              Areas to Improve
            </h3>
            <div className="text-orange-100/80">
              {renderList(result.weaknesses || result.improvementTips)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
          <Link
            to="/interview/history"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 font-semibold transition flex items-center justify-center gap-2"
          >
            <Star size={20} /> View History
          </Link>
          
          <Link
            to="/"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold shadow-[0_0_40px_rgba(168,85,247,.4)] hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Back to Dashboard <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Sub-component for the small metric cards
function MetricCard({ title, score, icon }) {
  // Determine color ring based on score
  let ringColor = "border-red-500/50 text-red-400";
  if (score >= 80) ringColor = "border-green-500/50 text-green-400";
  else if (score >= 60) ringColor = "border-yellow-500/50 text-yellow-400";

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-white/10 transition group">
      <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2 text-center">
        {title}
      </p>
      <div className={`text-4xl font-black ${ringColor.split(" ")[1]}`}>
        {score || 0}<span className="text-2xl text-slate-500">%</span>
      </div>
    </div>
  );
}