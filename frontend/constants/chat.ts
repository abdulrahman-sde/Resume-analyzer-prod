import type { Message, CandidateContext } from "@/types/chat";

export const INITIAL_MESSAGE: Message = {
  role: "ai",
  content:
    "Hello! I am your recruiting intelligence assistant. I can help quickly match your applicant pool to job requirements, find candidates with specific skills, or navigate your active job postings. How can I assist you today?",
};

export const SUGGESTION_PROMPTS = [
  "Who is the strongest candidate for the Full Stack Developer role?",
  "Show me developers with 5+ years of React experience.",
  "How many jobs have I posted so far?",
];

export const MOCK_CANDIDATE_CONTEXT: CandidateContext = {
  name: "Alex Jensen",
  role: "Senior Full Stack Engineer",
  matchScore: 92,
  experience: "8 years",
  highlights: [
    { text: "System Architecture", status: "success" },
    { text: "Kubernetes Migration Gap", status: "warning" },
    { text: "Mentorship Experience", status: "success" },
  ],
};

export function generateAIResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("react") || lowerMsg.includes("frontend")) {
    return "Based on the recent analyses, **Alex Jensen** and **Sarah Connor** demonstrate exceptional React proficiency. Alex has 5+ years leading frontend teams and architecting component libraries, while Sarah has strong hands-on experience with Next.js 14 App Router.";
  }

  if (lowerMsg.includes("red flags") || lowerMsg.includes("risk")) {
    return "I found a potential risk area in **David Kim's** profile. There is a 14-month employment gap between 2022 and 2023 that is unexplained on the resume. I recommend probing this during the initial screening call.";
  }

  if (lowerMsg.includes("leadership") || lowerMsg.includes("lead")) {
    return "**Alex Jensen** has the strongest leadership indicators. Their resume highlights managing a pod of 6 engineers and driving a quarter-long migration project that resulted in a 40% performance improvement.";
  }

  return "I can certainly look into that for you. Give me a moment to query the candidate database.";
}

export function getHighlightColor(
  status: "success" | "warning" | "error",
): string {
  switch (status) {
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
  }
}
