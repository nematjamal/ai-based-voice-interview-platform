// import {
//   Code2,
//   Monitor,
//   Server,
//   Coffee,
//   FileCode,
//   BarChart3,
//   Cloud,
//   Brain,
//   ArrowRight,
// } from "lucide-react";

// export default function Categories() {
//   const categories = [
//     {
//       title: "Full Stack Developer",
//       icon: Code2,
//     },
//     {
//       title: "Frontend Developer",
//       icon: Monitor,
//     },
//     {
//       title: "Backend Developer",
//       icon: Server,
//     },
//     {
//       title: "Java Developer",
//       icon: Coffee,
//     },
//     {
//       title: "Python Developer",
//       icon: FileCode,
//     },
//     {
//       title: "Data Analyst",
//       icon: BarChart3,
//     },
//     {
//       title: "DevOps Engineer",
//       icon: Cloud,
//     },
//     {
//       title: "AI/ML Engineer",
//       icon: Brain,
//     },
//   ];

//   return (
//     <section className="py-20 px-8 bg-[#050014] text-white">
//       <h2 className="text-5xl font-bold text-center">
//         Choose Your
//         <span className="text-purple-500"> Interview Path</span>
//       </h2>

//       <p className="text-center text-gray-400 mt-4 mb-12">
//         Select your domain and start practicing AI-powered interviews
//       </p>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
//         {categories.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={index}
//               className="
//                 bg-[#0b0625]
//                 border border-purple-900/40
//                 rounded-3xl
//                 p-6
//                 text-center
//                 hover:border-purple-500
//                 hover:shadow-[0_0_30px_#7e22ce]
//                 hover:-translate-y-2
//                 transition-all
//                 duration-300
//                 cursor-pointer
//               "
//             >
//               {/* Icon Circle */}
//               <div
//                 className="
//                   w-16 h-16
//                   mx-auto
//                   rounded-full
//                   bg-linear-to-r
//                   from-purple-600
//                   to-purple-800
//                   flex
//                   items-center
//                   justify-center
//                   shadow-lg
//                 "
//               >
//                 <Icon size={32} />
//               </div>

//               <h3 className="font-bold text-xl mt-5">{item.title}</h3>

//               <p className="text-gray-400 mt-2 text-sm">
//                 Practice real AI mock interviews and improve your skills.
//               </p>

//               <button
//                 className="
//                   mt-6
//                   w-full
//                   bg-linear-to-r
//                   from-purple-600
//                   to-purple-800
//                   py-3
//                   rounded-xl
//                   flex
//                   items-center
//                   justify-center
//                   gap-2
//                   font-semibold
//                   hover:opacity-90
//                 "
//               >
//                 Start Interview
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }



// import { useNavigate } from "react-router-dom"; // Add this import
// import {
//   Code2,
//   Monitor,
//   Server,
//   Coffee,
//   FileCode,
//   BarChart3,
//   Cloud,
//   Brain,
//   ArrowRight,
// } from "lucide-react";

// export default function Categories() {
//   const navigate = useNavigate(); // Initialize the hook

//   const categories = [
//     { title: "Full Stack Developer", icon: Code2 },
//     { title: "Frontend Developer", icon: Monitor },
//     { title: "Backend Developer", icon: Server },
//     { title: "Java Developer", icon: Coffee },
//     { title: "Python Developer", icon: FileCode },
//     { title: "Data Analyst", icon: BarChart3 },
//     { title: "DevOps Engineer", icon: Cloud },
//     { title: "AI/ML Engineer", icon: Brain },
//   ];

//   // Function to handle the navigation
//   const handleCardClick = (categoryTitle) => {
//     // Navigate to your dashboard or interview route.
//     // Replace "/dashboard" with whatever path your App/Dashboard component lives on!
//     // navigate("/dashboard"); 

//     navigate("/interview", { state: { openPage: "start" } });
//   };

//   return (
//     <section className="py-20 px-8 bg-[#050014] text-white">
//       <h2 className="text-5xl font-bold text-center">
//         Choose Your
//         <span className="text-purple-500"> Interview Path</span>
//       </h2>

//       <p className="text-center text-gray-400 mt-4 mb-12">
//         Select your domain and start practicing AI-powered interviews
//       </p>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
//         {categories.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={index}
//               onClick={() => handleCardClick(item.title)} // Added onClick to the whole card
//               className="
//                 bg-[#0b0625]
//                 border border-purple-900/40
//                 rounded-3xl
//                 p-6
//                 text-center
//                 hover:border-purple-500
//                 hover:shadow-[0_0_30px_#7e22ce]
//                 hover:-translate-y-2
//                 transition-all
//                 duration-300
//                 cursor-pointer
//               "
//             >
//               {/* Icon Circle */}
//               <div
//                 className="
//                   w-16 h-16
//                   mx-auto
//                   rounded-full
//                   bg-gradient-to-r
//                   from-purple-600
//                   to-purple-800
//                   flex
//                   items-center
//                   justify-center
//                   shadow-lg
//                 "
//               >
//                 <Icon size={32} />
//               </div>

//               <h3 className="font-bold text-xl mt-5">{item.title}</h3>

//               <p className="text-gray-400 mt-2 text-sm">
//                 Practice real AI mock interviews and improve your skills.
//               </p>

//               <button
//                 // The button will also trigger the parent div's onClick, 
//                 // but we can add e.stopPropagation() if we want it to do something different later
//                 className="
//                   mt-6
//                   w-full
//                   bg-gradient-to-r
//                   from-purple-600
//                   to-purple-800
//                   py-3
//                   rounded-xl
//                   flex
//                   items-center
//                   justify-center
//                   gap-2
//                   font-semibold
//                   hover:opacity-90
//                 "
//               >
//                 Start Interview
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  Code2, Monitor, Server, Coffee, FileCode,
  BarChart3, Cloud, Brain, ArrowRight, Loader2
} from "lucide-react";

export default function Categories() {
  const navigate = useNavigate();
  const [loadingCategory, setLoadingCategory] = useState(null);

  const categories = [
    { title: "Full Stack Developer", dbName: "Full Stack", icon: Code2 },
    { title: "Frontend Developer", dbName: "Frontend", icon: Monitor },
    { title: "Backend Developer", dbName: "Backend", icon: Server },
    { title: "Java Developer", dbName: "Java", icon: Coffee },
    { title: "Python Developer", dbName: "Python", icon: FileCode },
    { title: "Data Analyst", dbName: "Data Analyst", icon: BarChart3 },
    { title: "DevOps Engineer", dbName: "DevOps", icon: Cloud },
    { title: "AI/ML Engineer", dbName: "AI/ML", icon: Brain },
  ];

  const handleStartInterview = async (dbCategoryName) => {
    setLoadingCategory(dbCategoryName);

    try {
      // Send the category directly to the backend! No pre-fetching needed.
      const startRes = await api.post("/interview/start", {
        categoryName: dbCategoryName, 
        type: "standard",
      });

      localStorage.setItem("attemptId", startRes.data.data.attemptId);
      localStorage.setItem("questions", JSON.stringify(startRes.data.data.questions));

      // Teleport to the voice room
      navigate("/interview");

    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Failed to start the interview. Please try again.");
      setLoadingCategory(null);
    }
  };

  return (
    <section className="py-20 px-8 bg-[#050014] text-white min-h-screen">
      <h2 className="text-5xl font-bold text-center">
        Choose Your <span className="text-purple-500">Interview Path</span>
      </h2>
      <p className="text-center text-gray-400 mt-4 mb-12">
        Select your domain and start practicing AI-powered interviews
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {categories.map((item, index) => {
          const Icon = item.icon;
          const isLoading = loadingCategory === item.dbName;

          return (
            <div key={index} className="bg-[#0b0625] border border-purple-900/40 rounded-3xl p-6 text-center hover:border-purple-500 hover:shadow-[0_0_30px_#7e22ce] transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                <Icon size={32} />
              </div>
              <h3 className="font-bold text-xl mt-5">{item.title}</h3>
              <p className="text-gray-400 mt-2 text-sm mb-6 flex-grow">
                Practice real AI mock interviews and improve your skills.
              </p>

              <button
                onClick={() => handleStartInterview(item.dbName)}
                disabled={loadingCategory !== null}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={18} /> Generating AI...</>
                ) : (
                  <>Start Interview <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}