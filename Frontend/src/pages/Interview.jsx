// import { useState, useEffect } from "react";
// import { Mic, PhoneOff, Volume2, Brain } from "lucide-react";

// export default function VoiceInterview() {
// const [timeLeft, setTimeLeft] = useState(900);
// const [status, setStatus] = useState("Listening");
// const [transcript, setTranscript] = useState(
// "Your answer will appear here..."
// );

// const [question] = useState(
// "Tell me about yourself and explain your experience with React."
// );

// useEffect(() => {
// const timer = setInterval(() => {
// setTimeLeft((prev) => {
// if (prev <= 1) {
// clearInterval(timer);
// return 0;
// }

//     return prev - 1;
//   });
// }, 1000);

// return () => clearInterval(timer);

// }, []);

// const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
// const seconds = String(timeLeft % 60).padStart(2, "0");

// return (
// <div className="min-h-screen bg-[#070B1A] text-white">
// {/* Header */}

//   <div className="border-b border-white/10 px-8 py-5 flex justify-between items-center">
//     <div>
//       <h1 className="text-2xl font-bold">
//         AI Voice Interview
//       </h1>

//       <p className="text-slate-400">
//         Frontend Developer • Question 1 of 10
//       </p>
//     </div>

//     <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
//       {minutes}:{seconds}
//     </div>
//   </div>

//   <div className="max-w-5xl mx-auto px-6 py-10">
//     {/* AI Orb */}

//     <div className="flex justify-center">
//       <div className="relative">
//         <div className="h-44 w-44 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse blur-sm" />

//         <div className="absolute inset-0 flex items-center justify-center">
//           <Brain size={52} />
//         </div>
//       </div>
//     </div>

//     <div className="text-center mt-6">
//       <h2 className="text-xl font-semibold">
//         AI Interview Assistant
//       </h2>

//       <p className="text-purple-400 mt-2">
//         ● {status}
//       </p>
//     </div>

//     {/* Question */}

//     <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
//       <p className="text-purple-300 mb-3">
//         Current Question
//       </p>

//       <h2 className="text-3xl font-bold leading-relaxed">
//         {question}
//       </h2>
//     </div>

//     {/* Transcript */}

//     <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">
//       <h3 className="text-lg font-semibold mb-4">
//         Live Transcript
//       </h3>

//       <p className="text-slate-300 leading-8">
//         {transcript}
//       </p>
//     </div>

//     {/* Controls */}

//     <div className="flex justify-center gap-6 mt-12">
//       <button
//         className="
//           h-16
//           w-16
//           rounded-full
//           bg-white/10
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <Volume2 />
//       </button>

//       <button
//         className="
//           h-24
//           w-24
//           rounded-full
//           bg-gradient-to-r
//           from-purple-600
//           to-pink-600
//           shadow-[0_0_60px_rgba(168,85,247,.5)]
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <Mic size={34} />
//       </button>

//       <button
//         className="
//           h-16
//           w-16
//           rounded-full
//           bg-red-500/20
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <PhoneOff />
//       </button>
//     </div>
//   </div>
// </div>

// );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, PhoneOff, Volume2, Brain, ArrowRight, Loader2 } from "lucide-react";
import api from "../lib/api";

export default function VoiceInterview() {
  const navigate = useNavigate();
  
  // State for Interview Data
  const [attemptId, setAttemptId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for UI & Recording
  const [timeLeft, setTimeLeft] = useState(900);
  const [status, setStatus] = useState("Initializing...");
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs for Web Speech API
  const recognitionRef = useRef(null);

  // 1. Load Data on Mount
  useEffect(() => {
    const storedAttemptId = localStorage.getItem("attemptId");
    const storedQuestions = JSON.parse(localStorage.getItem("questions") || "[]");

    if (!storedAttemptId || storedQuestions.length === 0) {
      navigate("/"); // Redirect if no data is found
      return;
    }

    setAttemptId(storedAttemptId);
    setQuestions(storedQuestions);
    setStatus("Ready");
  }, [navigate]);

  // 2. Setup Speech Recognition
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onstart = () => {
        setStatus("Listening...");
        setIsRecording(true);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        if (status === "Listening...") setStatus("Paused");
      };
    } else {
      setStatus("Microphone not supported in this browser.");
    }
  }, [status]);

  // 3. Timer Setup
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 4. Read Question Out Loud (Text-to-Speech)
  const speakQuestion = () => {
    if (!questions[currentIndex]) return;
    
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(questions[currentIndex].question);
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak when question changes
  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion();
    }
  }, [currentIndex, questions]);

  // 5. Toggle Microphone
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript(""); // Clear previous transcript for the new question
      recognitionRef.current?.start();
    }
  };

  // 6. Handle Submit Answer & Next
  const handleNextQuestion = async () => {
    if (!transcript.trim()) {
      alert("Please provide an answer before moving on.");
      return;
    }

    try {
      setIsProcessing(true);
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();

      const currentQuestion = questions[currentIndex];

      // Save the chat to your conversation.controller
      await api.post("/conversation/respond", {
        attemptId,
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: transcript,
      });

      const isLastQuestion = currentIndex === questions.length - 1;

      if (isLastQuestion) {
        setStatus("Evaluating Interview...");
        // Hit the finish endpoint you created
        const finishRes = await api.post("/interview/finish", { attemptId });
        
        // Pass the final results to a results page
        navigate("/results", { state: { result: finishRes.data.result } });
      } else {
        // Move to next question
        setTranscript("");
        setCurrentIndex((prev) => prev + 1);
        setStatus("Ready");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setStatus("Error saving answer. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 7. Force End Interview Early
  const handleEndInterview = async () => {
    if (window.confirm("Are you sure you want to end the interview early?")) {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      try {
        setIsProcessing(true);
        setStatus("Evaluating Interview...");
        const finishRes = await api.post("/interview/finish", { attemptId });
        navigate("/results", { state: { result: finishRes.data.result } });
      } catch (error) {
        console.error("Failed to end interview:", error);
        navigate("/");
      }
    }
  };

  if (questions.length === 0) return <div className="min-h-screen bg-[#070B1A] text-white flex items-center justify-center">Loading...</div>;

  const currentQ = questions[currentIndex];
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#070B1A] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AI Voice Interview</h1>
          <p className="text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xl font-mono">
          {minutes}:{seconds}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* AI Orb */}
        <div className="flex justify-center">
          <div className="relative">
            <div className={`h-44 w-44 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 blur-sm ${isRecording ? 'animate-ping' : 'animate-pulse'}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain size={52} />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold">AI Interview Assistant</h2>
          <p className={`mt-2 ${isRecording ? 'text-green-400' : 'text-purple-400'}`}>
            ● {status}
          </p>
        </div>

        {/* Question */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <p className="text-purple-300 mb-3">Current Question</p>
          <h2 className="text-3xl font-bold leading-relaxed">
            {currentQ?.question}
          </h2>
        </div>

        {/* Transcript */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[150px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Your Answer:</h3>
          <p className="text-white leading-8 text-lg">
            {transcript || "Click the microphone and start speaking..."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          {/* Re-read Question Button */}
          <button
            onClick={speakQuestion}
            className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            title="Read Question Again"
          >
            <Volume2 />
          </button>

          {/* Microphone Toggle Button */}
          <button
            onClick={toggleRecording}
            className={`h-24 w-24 rounded-full shadow-[0_0_60px_rgba(168,85,247,.5)] flex items-center justify-center transition hover:scale-105 ${
              isRecording 
                ? "bg-red-500 shadow-red-500/50 animate-pulse" 
                : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
          >
            <Mic size={34} />
          </button>

          {/* End Interview Button */}
          <button
            onClick={handleEndInterview}
            className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/40 transition"
            title="End Interview Early"
          >
            <PhoneOff />
          </button>
        </div>

        {/* Next/Submit Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleNextQuestion}
            disabled={isProcessing}
            className="px-10 py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={20} /> Processing...</>
            ) : currentIndex === questions.length - 1 ? (
              "Submit & Finish Interview"
            ) : (
              <>Submit Answer & Next <ArrowRight size={20} /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}