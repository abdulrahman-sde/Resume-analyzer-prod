import type { Job, Analysis } from "@/types/dashboard";
import type { AnalysisResult } from "@/types/report";

// ---------------------------------------------------------------------------
// Mock Jobs
// ---------------------------------------------------------------------------
export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior React Developer",
    description:
      "We're looking for an experienced React developer with deep knowledge of modern patterns including Server Components, Suspense, and the Next.js ecosystem. You'll build and maintain our customer-facing SaaS platform serving 10K+ daily active users. Requirements: 5+ years React, TypeScript proficiency, state management, strong CSS/Tailwind skills, CI/CD familiarity.",
    createdAt: "2026-02-10",
    analysisCount: 3,
  },
  {
    id: "job-2",
    title: "Product Manager",
    description:
      "Seeking a Product Manager to own our B2B analytics dashboard. You'll work directly with engineering and design to define product strategy, gather requirements, and drive execution. Must have 3+ years PM experience, data-driven decision making, and excellent stakeholder communication.",
    createdAt: "2026-02-08",
    analysisCount: 2,
  },
  {
    id: "job-3",
    title: "DevOps Engineer",
    description:
      "Join our infrastructure team to build and maintain scalable CI/CD pipelines, container orchestration, and cloud infrastructure. Requirements: strong experience with AWS/GCP, Kubernetes, Docker, Terraform, and monitoring tools.",
    createdAt: "2026-02-05",
    analysisCount: 1,
  },
  {
    id: "job-4",
    title: "UX Designer",
    description:
      "We need a creative UX Designer to reshape our enterprise product's user experience. You'll conduct user research, create wireframes and prototypes, and collaborate closely with engineering. Proficiency in Figma and a strong portfolio required.",
    createdAt: "2026-02-01",
    analysisCount: 0,
  },
];

// ---------------------------------------------------------------------------
// Mock Analysis Result Data
// ---------------------------------------------------------------------------

const MOCK_ANALYSIS_RESULT_1: AnalysisResult = {
  candidateName: "Alex Jensen",
  contact: {
    email: "alex.jensen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjensen",
    github: "github.com/alexjensen",
    portfolio: "alexjensen.dev",
    extractionConfidence: "HIGH",
  },
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University of California, Berkeley",
      graduationYear: 2018,
      gpa: 3.8,
    },
  ],
  totalExperienceYears: 6.5,
  targetRole: "Senior React Developer",
  scores: {
    overall: 87,
    tech: 92,
    experience: 85,
    projects: 90,
    education: 80,
    culture: 88,
  },
  scoreJustification: {
    tech: "Alex demonstrates production-grade command of the React/Next.js stack, TypeScript, and modern tooling. The one notable gap is the absence of explicit AWS or serverless experience — a secondary but growing requirement for full-stack ownership on this platform.",
    experience:
      "6+ years of progressive SaaS frontend experience aligns well with this role, though direct ownership of architectural decisions appears recent (~3 years). No evidence of leading cross-functional engineering efforts, which is expected at senior level.",
    projects:
      "Multiple high-quality projects demonstrating end-to-end ownership including performance tooling and component systems. Projects show strong architectural thinking but lean toward greenfield builds with limited evidence of maintaining large legacy codebases.",
    education:
      "A top-tier CS degree from UC Berkeley provides a solid foundational credential. Academic trajectory and GPA are consistent with the engineering caliber expected for this position.",
    culture:
      "Resume signals strong mentorship instincts and product ownership mindset. Contributions to open source and cross-team projects suggest comfort in collaborative, high-trust environments.",
  },
  recommendation: "CONSIDER",
  hireRecommendation: false,
  summary:
    "Alex is a highly skilled React developer with a strong academic background and solid industry experience. He excels in frontend architecture but lacks deep cloud infrastructure knowledge required for full-stack ownership.",
  shortlistSummary:
    "Strong logical thinker with great React skills. Good culture fit. Consider for frontend-heavy role.",
  keyVectors: [
    "Strength: 6+ years of React/Next.js production experience with measurable performance impact (40% improvement at TechScale).",
    "Strength: Deep TypeScript and GraphQL proficiency across multiple production systems.",
    "Weakness: No explicit AWS/cloud infrastructure experience — a secondary gap for full-stack ownership.",
    "Weakness: Leadership at scale (managing teams, cross-org decisions) not yet evidenced on resume.",
  ],
  skills: [
    { name: "React", years: 6, level: 95 },
    { name: "TypeScript", years: 5, level: 90 },
    { name: "Node.js", years: 4, level: 80 },
    { name: "AWS", years: 2, level: 60 },
    { name: "GraphQL", years: 3, level: 75 },
  ],
  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "TechScale Inc.",
      startYear: 2021,
      endYear: null,
      durationYears: 3,
      matchPercentage: 90,
      description:
        "Led the migration to Next.js and improved site performance by 40%.",
    },
    {
      title: "Software Engineer",
      company: "WebSolutions",
      startYear: 2018,
      endYear: 2021,
      durationYears: 3,
      matchPercentage: 85,
      description:
        "Developed custom React components and managed client deliverables.",
    },
  ],
  redFlags: [],
  suggestedInterviewQuestions: [
    "Describe a complex state management challenge you solved.",
    "How do you handle performance optimization in large React apps?",
    "Tell me about a time you disagreed with a design decision.",
  ],
  salaryEstimate: {
    min: 140000,
    max: 180000,
    currency: "USD",
    confidence: "HIGH",
    reasoning:
      "Based on San Francisco market rates for Senior Frontend Engineers.",
  },
  cultureSignals: {
    positive: ["Mentorship", "Ownership", "Fast-paced"],
    negative: [],
  },
  extractionStatus: {
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
  },
};

const MOCK_ANALYSIS_RESULT_2: AnalysisResult = {
  candidateName: "Sarah Connor",
  contact: {
    email: "sarah.connor@example.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    linkedin: "linkedin.com/in/sarahconnor",
    github: "github.com/sarahconnor",
    portfolio: "sarahconnor.tech",
    extractionConfidence: "HIGH",
  },
  education: [
    {
      degree: "M.S. Software Engineering",
      institution: "MIT",
      graduationYear: 2016,
      gpa: 3.9,
    },
  ],
  totalExperienceYears: 8,
  targetRole: "Senior React Developer",
  scores: {
    overall: 94,
    tech: 96,
    experience: 92,
    projects: 95,
    education: 90,
    culture: 95,
  },
  scoreJustification: {
    tech: "Sarah's technical profile is a near-perfect match — deep React/TypeScript expertise, mature system design capability, and proven cloud architecture experience. No substantive gaps detected against the stated requirements.",
    experience:
      "8 years of progressive experience including 5 years at lead/staff level. Proven track record of team leadership, architectural decision-making, and measurable latency/performance improvements at scale. Minor gap: no explicit Next.js SSR/ISR authorship noted, though full-stack React expertise is well established.",
    projects:
      "Portfolio demonstrates architectural depth with real-world production impact — mission-critical dashboards, high-frequency data systems, and infrastructure-level contributions. Projects reflect the seniority and scope expected for this role.",
    education:
      "MIT Master's in Software Engineering provides exceptional theoretical grounding. GPA and institutional prestige exceed what this role requires, representing a clear advantage.",
    culture:
      "Strong indicators of high ownership, team mentorship, and resilience under pressure. History of driving consensus in ambiguous, fast-moving environments — a strong culture fit signal.",
  },
  recommendation: "HIRE",
  hireRecommendation: true,
  summary:
    "Sarah is an exceptional candidate who exceeds expectations for the Senior React Developer role. Her combination of deep technical expertise, leadership experience, and strong educational background makes her a top-tier choice.",
  shortlistSummary:
    "Top-tier candidate. Strong leadership + technical depth. Immediate hire.",
  keyVectors: [
    "Strength: Lead-level engineering experience with team management and architecture ownership across 5+ years.",
    "Strength: Exceptional React/TypeScript depth combined with cloud infrastructure expertise (AWS, serverless).",
    "Strength: Demonstrated performance impact — 60% latency reduction on mission-critical systems.",
    "Weakness: No explicit mention of Next.js SSR/ISR patterns by name despite full-stack React background.",
  ],
  skills: [
    { name: "React", years: 7, level: 98 },
    { name: "TypeScript", years: 6, level: 95 },
    { name: "AWS", years: 5, level: 85 },
    { name: "System Design", years: 6, level: 90 },
    { name: "GraphQL", years: 4, level: 92 },
  ],
  experience: [
    {
      title: "Lead Engineer",
      company: "Skynet Systems",
      startYear: 2019,
      endYear: null,
      durationYears: 5,
      matchPercentage: 98,
      description:
        "Architected core platform services and led a team of 8 engineers. Reduced latency by 60%.",
    },
    {
      title: "Senior Developer",
      company: "Cyberdyne",
      startYear: 2016,
      endYear: 2019,
      durationYears: 3,
      matchPercentage: 92,
      description:
        "Built mission-critical React dashboards for real-time monitoring.",
    },
  ],
  redFlags: [],
  suggestedInterviewQuestions: [
    "How have you scaled a React application to handle high-frequency data updates?",
    "Describe a time you had to make a difficult architectural trade-off.",
    "How do you approach mentoring junior engineers?",
  ],
  salaryEstimate: {
    min: 160000,
    max: 200000,
    currency: "USD",
    confidence: "HIGH",
    reasoning:
      "Commensurate with Lead/Staff level experience in current market.",
  },
  cultureSignals: {
    positive: ["Leadership", "Resilience", "Innovation"],
    negative: [],
  },
  extractionStatus: {
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
  },
};

const MOCK_ANALYSIS_RESULT_3: AnalysisResult = {
  candidateName: "John Smith",
  contact: {
    email: "john.smith@example.com",
    phone: null,
    location: "Austin, TX",
    linkedin: null,
    github: "github.com/jsmith",
    portfolio: null,
    extractionConfidence: "LOW",
  },
  education: [
    {
      degree: "Bootcamp Certificate",
      institution: "Code Academy",
      graduationYear: 2024,
      gpa: null,
    },
  ],
  totalExperienceYears: 1,
  targetRole: "Senior React Developer",
  scores: {
    overall: 45,
    tech: 40,
    experience: 30,
    projects: 45,
    education: 50,
    culture: 60,
  },
  scoreJustification: {
    tech: "The candidate's technical profile reflects junior-level React knowledge with no evidence of TypeScript, state management at scale, or the performance-oriented patterns required for this role. The gap between current proficiency and the role's technical bar is significant.",
    experience:
      "Only 0.5 years of professional development experience against a 5+ year requirement represents the most critical disqualifying gap. The current role at a local shop involves maintenance tasks and lacks the product complexity expected for senior responsibilities.",
    projects:
      "Projects are limited to basic website maintenance and small feature additions. No evidence of independently architected applications, open-source contributions, or projects demonstrating breadth of the required technologies.",
    education:
      "A bootcamp certificate demonstrates initiative and a structured learning path, but the absence of a formal CS degree limits the candidate's theoretical foundation for the architectural and systems-level thinking this role demands.",
    culture:
      "The candidate shows genuine enthusiasm and a willingness to learn — positive signals for culture fit at a junior level. However, the soft skills and communication patterns on the resume are not calibrated for senior-level responsibilities or cross-team ownership.",
  },
  recommendation: "REJECT",
  hireRecommendation: false,
  summary:
    "John is an enthusiastic junior developer but lacks the depth of experience and technical breadth required for a Senior React Developer position. He would be better suited for a junior or associate role.",
  shortlistSummary:
    "Too junior. Lacks TS & Architecture experience. Pass for now.",
  keyVectors: [
    "Weakness: Only 0.5 years of professional experience versus the 5+ years required — the primary disqualifying factor.",
    "Weakness: No TypeScript, GraphQL, or advanced state management experience — critical gaps for this stack.",
    "Weakness: Projects do not demonstrate required architectural scope or technology breadth.",
    "Strength: Eagerness to learn and collaborative communication style noted as positive signals.",
  ],
  skills: [
    { name: "React", years: 1, level: 40 },
    { name: "JavaScript", years: 1, level: 50 },
    { name: "HTML/CSS", years: 1, level: 60 },
  ],
  experience: [
    {
      title: "Junior Developer",
      company: "Local Shop",
      startYear: 2024,
      endYear: null,
      durationYears: 0.5,
      matchPercentage: 40,
      description:
        "Maintained company website and added simple features using React.",
    },
  ],
  redFlags: [
    {
      type: "experience_mismatch",
      description: "Candidate has 1 year experience for a role requiring 5+.",
      severity: "HIGH",
    },
  ],
  suggestedInterviewQuestions: [
    "What are the differences between props and state?",
    "Explain the component lifecycle in React.",
  ],
  salaryEstimate: {
    min: 80000,
    max: 100000,
    currency: "USD",
    confidence: "LOW",
    reasoning: "Entry level rates apply.",
  },
  cultureSignals: {
    positive: ["Eagerness", "Communication"],
    negative: [],
  },
  extractionStatus: {
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: false,
  },
};

// ---------------------------------------------------------------------------
// Mock Analyses
// ---------------------------------------------------------------------------
export const MOCK_ANALYSES: Analysis[] = [
  {
    id: "a-1",
    jobId: "job-1",
    jobTitle: "Senior React Developer",
    candidateName: "Alex Jensen",
    fileName: "alex_jensen_cv.pdf",
    score: 87,
    status: "CONSIDER",
    date: "2026-02-14",
    summary: "Strong React skills with minor AWS gaps",
    analysisData: MOCK_ANALYSIS_RESULT_1,
  },
  {
    id: "a-2",
    jobId: "job-1",
    jobTitle: "Senior React Developer",
    candidateName: "Sarah Connor",
    fileName: "sarah_connor_resume.pdf",
    score: 94,
    status: "HIRE",
    date: "2026-02-13",
    summary: "Exceptional full-stack profile with leadership experience",
    analysisData: MOCK_ANALYSIS_RESULT_2,
  },
  {
    id: "a-3",
    jobId: "job-1",
    jobTitle: "Senior React Developer",
    candidateName: "John Smith",
    fileName: "john_smith.pdf",
    score: 45,
    status: "REJECT",
    date: "2026-02-12",
    summary: "Insufficient experience for senior-level role",
    analysisData: MOCK_ANALYSIS_RESULT_3,
  },
];

export const MOCK_RECENT_ACTIVITY = [
  {
    id: "act-1",
    type: "analysis_completed",
    title: "Alex Jensen",
    subtitle: "Senior React Developer • 87/100",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    type: "job_created",
    title: "Product Manager",
    subtitle: "Created by You",
    timestamp: "5 hours ago",
  },
  {
    id: "act-3",
    type: "analysis_completed",
    title: "Sarah Connor",
    subtitle: "Senior React Developer • 94/100",
    timestamp: "1 day ago",
  },
];
