// import { GoogleGenerativeAI } from "@google/generative-ai";

// console.log("API KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });

// export const analyzeResume =
// async (resumeText) => {

//   const prompt = `
// Analyze this resume.

// Return ONLY valid JSON.

// {
//   "skills": [],
//   "projects": [],
//   "experience": [],
//   "atsScore": 0,
//   "candidateLevel": "",
//   "strengths": [],
//   "weaknesses": [],
//   "recommendedRoles": []
// }

// Resume:

// ${resumeText}
// `;

//   const result =
//     await model.generateContent(
//       prompt
//     );

//   const text =
//     result.response.text();

//   return JSON.parse(
//     text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim()
//   );
// };

import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("API KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const analyzeResume = async (resumeText) => {
  const prompt = `
Analyze this resume.

Return ONLY valid JSON. Do not include markdown blocks like \`\`\`json.

{
  "atsScore": 0,
  "resumeStrength": 0,
  "interviewReadiness": 0,
  "summary": "Write a 2-3 sentence professional summary of the candidate's profile here.",
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ],
  "roles": [
    {
      "title": "Job Title 1",
      "match": "95%"
    },
    {
      "title": "Job Title 2",
      "match": "85%"
    }
  ]
}

Resume:

${resumeText}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim(),
  );
};
