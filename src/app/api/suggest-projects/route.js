import { NextResponse } from "next/server"

// Project suggestion engine
function generateProjectSuggestions(resumeData, scholarData) {
  const suggestions = []

  // Technical Skills Based Projects
  if (resumeData.skills && resumeData.skills.length > 0) {
    const techProjects = generateTechProjects(resumeData.skills)
    if (techProjects.length > 0) {
      suggestions.push({
        category: "Technical Skills Projects",
        projects: techProjects,
      })
    }
  }

  // Research Based Projects
  if (scholarData.researchInterests && scholarData.researchInterests.length > 0) {
    const researchProjects = generateResearchProjects(scholarData.researchInterests, resumeData.skills)
    if (researchProjects.length > 0) {
      suggestions.push({
        category: "Research Projects",
        projects: researchProjects,
      })
    }
  }

  // Interdisciplinary Projects
  if (resumeData.skills && scholarData.researchInterests) {
    const interdisciplinaryProjects = generateInterdisciplinaryProjects(
      resumeData.skills,
      scholarData.researchInterests,
    )
    if (interdisciplinaryProjects.length > 0) {
      suggestions.push({
        category: "Interdisciplinary Projects",
        projects: interdisciplinaryProjects,
      })
    }
  }

  // Career Development Projects
  const careerProjects = generateCareerProjects(resumeData, scholarData)
  if (careerProjects.length > 0) {
    suggestions.push({
      category: "Career Development",
      projects: careerProjects,
    })
  }

  return suggestions
}

function generateTechProjects(skills) {
  const projects = []
  const skillsLower = skills.map((s) => s.toLowerCase())

  // Web Development Projects
  if (skillsLower.some((s) => ["javascript", "react", "node.js", "html", "css"].includes(s))) {
    projects.push({
      title: "Full-Stack Portfolio Website",
      description:
        "Build a responsive portfolio website showcasing your projects and skills with modern web technologies.",
      difficulty: "Intermediate",
      duration: "2-3 weeks",
      skills: skills.filter((s) => ["JavaScript", "React", "Node.js", "HTML", "CSS"].includes(s)),
    })

    projects.push({
      title: "Real-time Chat Application",
      description: "Create a real-time messaging app with user authentication, rooms, and message history.",
      difficulty: "Advanced",
      duration: "3-4 weeks",
      skills: skills.filter((s) => ["JavaScript", "React", "Node.js", "Socket.io"].includes(s)),
    })
  }

  // Data Science Projects
  if (skillsLower.some((s) => ["python", "machine learning", "data analysis", "tensorflow", "pytorch"].includes(s))) {
    projects.push({
      title: "Predictive Analytics Dashboard",
      description: "Build a dashboard that analyzes trends and makes predictions from real-world datasets.",
      difficulty: "Intermediate",
      duration: "2-3 weeks",
      skills: skills.filter((s) => ["Python", "Machine Learning", "Data Analysis"].includes(s)),
    })

    projects.push({
      title: "Computer Vision Image Classifier",
      description: "Develop an image classification system using deep learning for a specific domain.",
      difficulty: "Advanced",
      duration: "3-4 weeks",
      skills: skills.filter((s) => ["Python", "TensorFlow", "PyTorch", "Machine Learning"].includes(s)),
    })
  }

  // Mobile Development Projects
  if (skillsLower.some((s) => ["react native", "flutter", "swift", "kotlin"].includes(s))) {
    projects.push({
      title: "Cross-Platform Mobile App",
      description: "Create a mobile application that solves a real-world problem with native features.",
      difficulty: "Intermediate",
      duration: "3-4 weeks",
      skills: skills.filter((s) => ["React Native", "Flutter", "Swift", "Kotlin"].includes(s)),
    })
  }

  // Cloud/DevOps Projects
  if (skillsLower.some((s) => ["docker", "kubernetes", "aws", "azure"].includes(s))) {
    projects.push({
      title: "Microservices Architecture",
      description: "Design and implement a scalable microservices system with containerization and orchestration.",
      difficulty: "Advanced",
      duration: "4-5 weeks",
      skills: skills.filter((s) => ["Docker", "Kubernetes", "AWS", "Azure"].includes(s)),
    })
  }

  return projects.slice(0, 4) // Limit to 4 projects
}

function generateResearchProjects(researchInterests, skills = []) {
  const projects = []
  const interestsLower = researchInterests.map((i) => i.toLowerCase())

  // AI/ML Research Projects
  if (
    interestsLower.some(
      (i) => i.includes("machine learning") || i.includes("artificial intelligence") || i.includes("deep learning"),
    )
  ) {
    projects.push({
      title: "Novel ML Algorithm Implementation",
      description: "Implement and evaluate a cutting-edge machine learning algorithm from recent research papers.",
      difficulty: "Advanced",
      duration: "4-6 weeks",
      researchAreas: researchInterests.filter(
        (i) => i.toLowerCase().includes("machine learning") || i.toLowerCase().includes("artificial intelligence"),
      ),
      skills: skills.filter((s) => ["Python", "TensorFlow", "PyTorch", "Machine Learning"].includes(s)),
    })

    projects.push({
      title: "Comparative Study of AI Models",
      description: "Conduct a comprehensive comparison of different AI models for a specific application domain.",
      difficulty: "Intermediate",
      duration: "3-4 weeks",
      researchAreas: researchInterests.filter((i) => i.toLowerCase().includes("artificial intelligence")),
      skills: skills.filter((s) => ["Python", "Data Analysis", "Machine Learning"].includes(s)),
    })
  }

  // Computer Vision Projects
  if (interestsLower.some((i) => i.includes("computer vision") || i.includes("image processing"))) {
    projects.push({
      title: "Advanced Computer Vision Pipeline",
      description: "Develop a complete computer vision system for object detection and tracking in real-time.",
      difficulty: "Advanced",
      duration: "5-6 weeks",
      researchAreas: researchInterests.filter((i) => i.toLowerCase().includes("computer vision")),
      skills: skills.filter((s) => ["Python", "OpenCV", "TensorFlow", "PyTorch"].includes(s)),
    })
  }

  // Natural Language Processing Projects
  if (interestsLower.some((i) => i.includes("natural language") || i.includes("nlp") || i.includes("text"))) {
    projects.push({
      title: "Advanced NLP Research Tool",
      description: "Build a sophisticated natural language processing tool for text analysis and generation.",
      difficulty: "Advanced",
      duration: "4-5 weeks",
      researchAreas: researchInterests.filter(
        (i) => i.toLowerCase().includes("natural language") || i.toLowerCase().includes("nlp"),
      ),
      skills: skills.filter((s) => ["Python", "NLTK", "spaCy", "Transformers"].includes(s)),
    })
  }

  // Data Science Research Projects
  if (interestsLower.some((i) => i.includes("data") || i.includes("analytics") || i.includes("statistics"))) {
    projects.push({
      title: "Large-Scale Data Analysis Study",
      description: "Conduct a comprehensive analysis of large datasets to uncover insights and patterns.",
      difficulty: "Intermediate",
      duration: "3-4 weeks",
      researchAreas: researchInterests.filter((i) => i.toLowerCase().includes("data")),
      skills: skills.filter((s) => ["Python", "R", "SQL", "Data Analysis"].includes(s)),
    })
  }

  return projects.slice(0, 3) // Limit to 3 projects
}

function generateInterdisciplinaryProjects(skills, researchInterests) {
  const projects = []
  const skillsLower = skills.map((s) => s.toLowerCase())
  const interestsLower = researchInterests.map((i) => i.toLowerCase())

  // Tech + Research combinations
  if (
    skillsLower.some((s) => ["javascript", "react", "python"].includes(s)) &&
    interestsLower.some((i) => i.includes("data") || i.includes("research"))
  ) {
    projects.push({
      title: "Research Data Visualization Platform",
      description: "Create an interactive web platform for visualizing and exploring research datasets.",
      difficulty: "Intermediate",
      duration: "3-4 weeks",
      skills: skills.filter((s) => ["JavaScript", "React", "Python", "D3.js"].includes(s)),
      researchAreas: researchInterests.filter((i) => i.toLowerCase().includes("data")),
    })
  }

  if (
    skillsLower.some((s) => ["machine learning", "python"].includes(s)) &&
    interestsLower.some((i) => i.includes("biology") || i.includes("medicine") || i.includes("health"))
  ) {
    projects.push({
      title: "AI-Powered Healthcare Solution",
      description:
        "Develop a machine learning system for healthcare applications like diagnosis or treatment prediction.",
      difficulty: "Advanced",
      duration: "5-6 weeks",
      skills: skills.filter((s) => ["Python", "Machine Learning", "TensorFlow"].includes(s)),
      researchAreas: researchInterests.filter(
        (i) => i.toLowerCase().includes("biology") || i.toLowerCase().includes("medicine"),
      ),
    })
  }

  if (
    skillsLower.some((s) => ["javascript", "react", "node.js"].includes(s)) &&
    interestsLower.some((i) => i.includes("education") || i.includes("learning"))
  ) {
    projects.push({
      title: "Educational Technology Platform",
      description: "Build an interactive learning platform that incorporates your research insights into education.",
      difficulty: "Intermediate",
      duration: "4-5 weeks",
      skills: skills.filter((s) => ["JavaScript", "React", "Node.js"].includes(s)),
      researchAreas: researchInterests.filter((i) => i.toLowerCase().includes("education")),
    })
  }

  return projects.slice(0, 2) // Limit to 2 projects
}

function generateCareerProjects(resumeData, scholarData) {
  const projects = []

  // Portfolio Enhancement
  projects.push({
    title: "Professional Portfolio Enhancement",
    description: "Create a comprehensive digital portfolio showcasing your technical skills and research work.",
    difficulty: "Beginner",
    duration: "1-2 weeks",
    skills: ["HTML", "CSS", "JavaScript"],
    researchAreas: [],
  })

  // Open Source Contribution
  if (resumeData.skills && resumeData.skills.length > 0) {
    projects.push({
      title: "Open Source Contribution Project",
      description: "Contribute to open source projects related to your skills and research interests.",
      difficulty: "Intermediate",
      duration: "2-3 weeks",
      skills: resumeData.skills.slice(0, 3),
      researchAreas: scholarData.researchInterests ? scholarData.researchInterests.slice(0, 2) : [],
    })
  }

  // Research Publication Tool
  if (scholarData.publications && scholarData.publications.length > 0) {
    projects.push({
      title: "Research Publication Management Tool",
      description: "Build a tool to help researchers manage, organize, and analyze their publications and citations.",
      difficulty: "Intermediate",
      duration: "3-4 weeks",
      skills: ["JavaScript", "React", "Node.js", "Database"],
      researchAreas: ["Academic Research", "Data Management"],
    })
  }

  return projects
}

export async function POST(request) {
  try {
    const { resumeData, scholarData } = await request.json()

    if (!resumeData && !scholarData) {
      return NextResponse.json({ error: "Resume data or Scholar data is required" }, { status: 400 })
    }

    const suggestions = generateProjectSuggestions(resumeData || {}, scholarData || {})

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Project suggestion API error:", error)
    return NextResponse.json({ error: "Failed to generate project suggestions. Please try again." }, { status: 500 })
  }
}
