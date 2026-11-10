// ============================================================================
// DIVAKARAN — THE SERIES | Portfolio Data
// Single source of truth for all portfolio content
// ============================================================================

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  technologies: string[];
  github?: string;
  demo?: string;
  color: string;
  accentColor: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface Certification {
  title: string;
  issuer: string;
  details?: string;
  credentialLink?: string;
  image?: string;
}

export interface Season {
  number: string;
  title: string;
  sectionId: string;
}

// ============================================================================
// PERSONAL INFO
// ============================================================================

export const personalInfo = {
  name: "DIVAKARAN A P",
  firstName: "DIVAKARAN",
  subtitle: "AI/ML ENGINEER | AGENTIC AI DEVELOPER",
  roles: [
    "AI/ML ENGINEER",
    "AGENTIC AI DEVELOPER",
    "CLOUD & MLOPS ENTHUSIAST",
  ],
  description:
    "I'm a Computer Science and Engineering student passionate about building intelligent applications, machine learning systems and AI-driven solutions for real-world challenges.",
  degree: "B.E. Computer Science and Engineering — Artificial Intelligence and Machine Learning",
  college: "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
  batch: "2024–2028",
  currentYear: "Third Year",
  cgpa: "8.41/10",
  location: "Chennai, Tamil Nadu, India",
  bio: "An aspiring AI/ML engineer interested in Machine Learning, Deep Learning, Agentic AI, LLM applications, cloud computing and software development.",
  github: "https://github.com/divakaranap",
  linkedin: "https://www.linkedin.com/in/divakaran-a-p-374949330/",
  email: "divakaranperumal27@gmail.com",
  phone: "+91 9150390667",
  portfolio: "https://divaportfolio.netlify.app/",
  leetcode: "https://leetcode.com/u/Divakaran276/",
};

// ============================================================================
// SEASONS STRUCTURE
// ============================================================================

export const seasons: Season[] = [
  { number: "01", title: "ABOUT ME", sectionId: "about" },
  { number: "02", title: "TECHNICAL JOURNEY", sectionId: "skills" },
  { number: "03", title: "PROJECT ORIGINALS", sectionId: "projects" },
  { number: "04", title: "EXPERIENCE", sectionId: "experience" },
  { number: "05", title: "ACHIEVEMENTS", sectionId: "achievements" },
  { number: "06", title: "CERTIFICATIONS", sectionId: "certifications" },
  { number: "07", title: "CONTACT", sectionId: "contact" },
];

// ============================================================================
// PROJECTS — "ORIGINALS"
// ============================================================================

export const projectCategories = [
  "AI & Machine Learning",
  "Agentic AI",
  "Cybersecurity",
  "Computer Vision",
  "Smart Applications",
  "Data Science",
];

export const projects: Project[] = [
  {
    id: "insider-threat",
    title: "AI-Driven Insider Threat Detection in Cloud Collaboration Platforms",
    shortTitle: "AI INSIDER THREAT DETECTION",
    description:
      "Behavioural anomaly analysis for identifying suspicious activities in cloud collaboration environments.",
    category: "Cybersecurity",
    technologies: ["Python", "Machine Learning", "Streamlit"],
    github: "https://github.com/divakaranap/Insider-threat-detection",
    demo: "https://688afbcd0dc1ab46496ff80b--insiderthreatdetectionincloud.netlify.app/",
    color: "#00D4FF",
    accentColor: "#0A1628",
    icon: "shield",
  },
  {
    id: "lexi-rag",
    title: "Intelligent Legal Question Answering Using LLMs and RAG",
    shortTitle: "LEXI RAG",
    description:
      "An intelligent legal question-answering system combining Large Language Models and Retrieval-Augmented Generation to retrieve relevant legal information and generate context-grounded responses.",
    category: "AI & Machine Learning",
    technologies: ["LLMs", "RAG", "NLP"],
    color: "#8B5CF6",
    accentColor: "#1A0A2E",
    icon: "scale",
  },
  {
    id: "ai-traffic",
    title: "AI-Based Traffic Analysis",
    shortTitle: "AI TRAFFIC",
    description:
      "An AI-based traffic analysis project focused on intelligent traffic monitoring and data-driven insights.",
    category: "AI & Machine Learning",
    technologies: ["Python", "AI", "Data Analysis"],
    github: "https://github.com/divakaranap/aitraffic",
    color: "#06B6D4",
    accentColor: "#0A1A2E",
    icon: "traffic-cone",
  },
  {
    id: "undo-ai",
    title: "Transactional Execution Layer for AI Agents",
    shortTitle: "UNDO.AI",
    description:
      "A transactional execution layer for multi-step AI agent workflows using compensation actions, reverse-order rollback and execution logs.",
    category: "Agentic AI",
    technologies: ["AI Agents", "Saga Pattern", "Workflow"],
    github: "https://github.com/divakaranap/undo.AI",
    color: "#F59E0B",
    accentColor: "#1A1400",
    icon: "undo",
  },
  {
    id: "omnivoice",
    title: "AI Voice Gateway",
    shortTitle: "OMNIVOICE",
    description:
      "AI voice gateway project focused on intelligent voice interactions and communication workflows.",
    category: "AI & Machine Learning",
    technologies: ["AI", "Voice Processing"],
    github: "https://github.com/divakaranap/OMNIVOICEAIGATEWAY",
    color: "#EC4899",
    accentColor: "#2A0A1E",
    icon: "mic",
  },
  {
    id: "fifa-predictor",
    title: "FIFA AI Predictor",
    shortTitle: "FIFA AI PREDICTOR",
    description: "AI-based football prediction project.",
    category: "AI & Machine Learning",
    technologies: ["Python", "Machine Learning"],
    github: "https://github.com/divakaranap/FIFA_AI_PREDICTOR",
    color: "#10B981",
    accentColor: "#0A1E14",
    icon: "trophy",
  },
  {
    id: "traceid-ai",
    title: "Public Profile and Digital Footprint Intelligence",
    shortTitle: "TRACEID AI",
    description:
      "A cybersecurity system designed to analyze consented input and correlate publicly available information. Highlights responsible and consent-based data analysis.",
    category: "Cybersecurity",
    technologies: ["Python", "OSINT", "Data Analysis"],
    color: "#EF4444",
    accentColor: "#1E0A0A",
    icon: "fingerprint",
  },
  {
    id: "skillloop-ai",
    title: "Agentic AI Multimodal Commute Planner for Chennai",
    shortTitle: "SKILLLOOP AI",
    description:
      "An Agentic AI-based commute planning concept for intelligent multimodal mobility.",
    category: "Agentic AI",
    technologies: ["Agentic AI", "Multimodal"],
    color: "#3B82F6",
    accentColor: "#0A1428",
    icon: "map-pin",
  },
  {
    id: "volunteer-iq",
    title: "Volunteer IQ",
    shortTitle: "VOLUNTEER IQ",
    description: "A volunteer management and coordination project.",
    category: "Smart Applications",
    technologies: ["Web Development"],
    color: "#A855F7",
    accentColor: "#1A0A28",
    icon: "users",
  },
  {
    id: "helmet-detection",
    title: "Smart Helmet Detection",
    shortTitle: "SMART HELMET DETECTION",
    description:
      "Computer vision and deep learning-based helmet detection system.",
    category: "Computer Vision",
    technologies: ["Python", "Deep Learning", "Computer Vision"],
    color: "#F97316",
    accentColor: "#1E1400",
    icon: "hard-hat",
  },
  {
    id: "car-price",
    title: "Car Price Prediction",
    shortTitle: "CAR PRICE PREDICTION",
    description:
      "Machine learning project focused on predicting car prices using data-driven modeling.",
    category: "Data Science",
    technologies: ["Python", "Machine Learning", "Data Science"],
    color: "#14B8A6",
    accentColor: "#0A1E1A",
    icon: "car",
  },
  {
    id: "mall-segmentation",
    title: "Mall Customer Segmentation",
    shortTitle: "MALL CUSTOMER SEGMENTATION",
    description: "Customer segmentation project using K-means clustering.",
    category: "Data Science",
    technologies: ["Python", "K-Means", "Data Science"],
    color: "#6366F1",
    accentColor: "#0A0A28",
    icon: "pie-chart",
  },
];

// ============================================================================
// SKILLS
// ============================================================================

export const skills: Skill[] = [
  // Programming
  { name: "Python", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "C", category: "Programming" },

  // Frameworks & Libraries
  { name: "TensorFlow", category: "Frameworks & Libraries" },
  { name: "Scikit-learn", category: "Frameworks & Libraries" },
  { name: "NumPy", category: "Frameworks & Libraries" },
  { name: "Pandas", category: "Frameworks & Libraries" },

  // Tools & Platforms
  { name: "Git", category: "Tools & Platforms" },
  { name: "GitHub", category: "Tools & Platforms" },
  { name: "AWS", category: "Tools & Platforms" },
  { name: "MATLAB", category: "Tools & Platforms" },
  { name: "Google Colab", category: "Tools & Platforms" },
  { name: "Jupyter Notebook", category: "Tools & Platforms" },
  { name: "Kaggle", category: "Tools & Platforms" },
  { name: "Streamlit", category: "Tools & Platforms" },
  { name: "Google AI Studio", category: "Tools & Platforms" },

  // Development Practices
  { name: "OOP", category: "Development Practices" },
  { name: "Data Structures & Algorithms", category: "Development Practices" },
  { name: "Data Preprocessing", category: "Development Practices" },
  { name: "Model Training & Evaluation", category: "Development Practices" },
  { name: "Version Control", category: "Development Practices" },
  { name: "REST API Integration", category: "Development Practices" },
  { name: "Model Deployment", category: "Development Practices" },

  // Areas of Interest
  { name: "Agentic AI", category: "Areas of Interest" },
  { name: "LLMs", category: "Areas of Interest" },
  { name: "RAG", category: "Areas of Interest" },
  { name: "Generative AI", category: "Areas of Interest" },
  { name: "MLOps", category: "Areas of Interest" },
];

export const skillCategories = [
  "Programming",
  "Frameworks & Libraries",
  "Tools & Platforms",
  "Development Practices",
  "Areas of Interest",
];

// ============================================================================
// EXPERIENCE
// ============================================================================

export const experiences: Experience[] = [
  {
    company: "NSIC CHENNAI",
    role: "Machine Learning Using Python Intern",
    period: "June 09 – June 24, 2026",
    location: "Chennai, India",
  },
  {
    company: "HYUNDAI MOTOR INDIA LIMITED",
    role: "Digital Manufacturing Engineering Intern",
    period: "July 13 – July 31, 2026",
    location: "India",
  },
];

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export const achievements: Achievement[] = [
  {
    title: "Google Student Ambassador",
    description: "Gemini Program 2026",
    icon: "award",
  },
  {
    title: "Paytm Student Ambassador",
    description: "Student Ambassador Program",
    icon: "badge-check",
  },
  {
    title: "NeuraX Hackathon 3.0",
    description: "Finalist",
    icon: "zap",
  },
  {
    title: "Future Forge 2026",
    description: "Finalist",
    icon: "flame",
  },
  {
    title: "ASME Hackathons",
    description: "Finalist",
    icon: "target",
  },
  {
    title: "GirlScript Summer of Code 2026",
    description: "AI/Agents and Open Source Tracks",
    icon: "code",
  },
];

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export const certifications: Certification[] = [
  {
    title: "Data Analytics with Python",
    issuer: "NPTEL",
    details: "72%, Elite | IIT Roorkee | Jan–Apr 2026",
    image: "/assets/certs/cert-nptel-data-analytics-python.png",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    details: "64%, Elite | IIT Madras | Jul–Aug 2025",
    image: "/assets/certs/cert-nptel-python-data-science.png",
  },
  {
    title: "The Joy of Computing Using Python",
    issuer: "NPTEL",
    details: "65%, Elite | IIT Madras | Jan–Apr 2025",
    image: "/assets/certs/cert-nptel-joy-computing.png",
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM",
    details: "Coursera | IBM Professional Track | Jul 2025",
    credentialLink: "https://coursera.org/verify/5GTBFTKONLNP",
    image: "/assets/certs/cert-ibm-ml-python.png",
  },
  {
    title: "Machine Learning Internship",
    issuer: "Prodigy InfoTech",
    details: "1-month | Aug 2025 | Outstanding Remarks",
    image: "/assets/certs/cert-prodigy-ml.png",
  },
  {
    title: "Programming In Java",
    issuer: "NPTEL",
    details: "63%, Elite | IIT Kharagpur | Jul–Oct 2025",
    image: "/assets/certs/cert-nptel-java.png",
  },
  {
    title: "Machine Learning Onramp",
    issuer: "MATLAB",
  },
  {
    title: "Deep Learning Onramp",
    issuer: "MATLAB",
  },
  {
    title: "Introduction to Machine Learning on AWS",
    issuer: "AWS",
  },
];

// ============================================================================
// PROFILE CONFIGURATIONS
// ============================================================================

export type ProfileType = "recruiter" | "developer" | "explorer";

export const profileConfigs: Record<
  ProfileType,
  { label: string; description: string; sectionOrder: string[]; color: string }
> = {
  recruiter: {
    label: "RECRUITER",
    description: "Resume, internships, achievements, technical skills",
    sectionOrder: [
      "hero",
      "about",
      "experience",
      "achievements",
      "skills",
      "projects",
      "certifications",
      "github",
      "leetcode",
      "resume",
      "contact",
    ],
    color: "#00D4FF",
  },
  developer: {
    label: "DEVELOPER",
    description: "GitHub, source code, technical projects, technologies",
    sectionOrder: [
      "hero",
      "projects",
      "skills",
      "github",
      "leetcode",
      "about",
      "experience",
      "achievements",
      "certifications",
      "resume",
      "contact",
    ],
    color: "#8B5CF6",
  },
  explorer: {
    label: "EXPLORER",
    description: "All projects, experiments, AI innovations and creative work",
    sectionOrder: [
      "hero",
      "about",
      "projects",
      "skills",
      "experience",
      "achievements",
      "certifications",
      "github",
      "leetcode",
      "resume",
      "contact",
    ],
    color: "#06B6D4",
  },
};

// ============================================================================
// CHATBOT KNOWLEDGE BASE (for rule-based DIVA AI)
// ============================================================================

export const chatbotResponses: Record<string, string> = {
  name: `My creator is ${personalInfo.name}, an ${personalInfo.roles[0]} based in ${personalInfo.location}.`,
  education: `${personalInfo.name} is pursuing ${personalInfo.degree} at ${personalInfo.college}, Batch ${personalInfo.batch}, currently in ${personalInfo.currentYear} with a CGPA of ${personalInfo.cgpa}.`,
  skills: `Key skills include: Python, Java, C, TensorFlow, Scikit-learn, NumPy, Pandas, AWS, Git, and more. Areas of interest: Agentic AI, LLMs, RAG, Generative AI, MLOps.`,
  projects: `There are 12 original projects including AI Insider Threat Detection, Lexi RAG, AI Traffic Analysis, UNDO.AI, OmniVoice, FIFA AI Predictor, TraceID AI, SkillLoop AI, and more.`,
  experience: `Internships at NSIC Chennai (ML with Python) and Hyundai Motor India Limited (Digital Manufacturing Engineering).`,
  achievements: `Achievements include Google Student Ambassador (Gemini 2026), Paytm Student Ambassador, NeuraX Hackathon 3.0 Finalist, Future Forge 2026 Finalist, ASME Hackathons Finalist, and GirlScript Summer of Code 2026.`,
  contact: `Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}`,
  default: `I'm DIVA AI, the intelligent assistant for ${personalInfo.name}'s portfolio. Ask me about skills, projects, experience, achievements, education, or contact information!`,
};
