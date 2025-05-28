import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import os from "os";  // <--- imported os module

// Disable default body parsing for file uploads (not needed in App Router with request.formData)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

// Extract text from DOCX
async function extractTextFromDOCX(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

// Parse the resume content
function parseResumeContent(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const resumeData = {
    name: lines[0] || "",
    email: "",
    phone: "",
    skills: [],
    education: [],
    experience: [],
    rawText: text,
  };

  // Email extraction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) resumeData.email = emailMatch[0];

  // Phone number regex fixed
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) resumeData.phone = phoneMatch[0];

  // Skills detection
  const skillSet = [
    "javascript", "python", "java", "react", "node.js", "html", "css", "sql", "machine learning", "data analysis",
    "tensorflow", "pytorch", "git", "docker", "kubernetes", "aws", "azure", "mongodb", "postgresql", "express",
    "angular", "vue", "typescript", "c++", "c#", "php", "ruby", "go", "rust", "swift", "kotlin", "flutter", "react native"
  ];
  const skillsText = text.toLowerCase();
  skillSet.forEach(skill => {
    if (skillsText.includes(skill.toLowerCase())) {
      resumeData.skills.push(skill);
    }
  });

  // Education detection
  const educationKeywords = ["education", "degree", "university", "college", "bachelor", "master", "phd"];
  let inEducationSection = false;
  lines.forEach((line) => {
    const lowerLine = line.toLowerCase();
    if (educationKeywords.some(keyword => lowerLine.includes(keyword))) {
      inEducationSection = true;
    }
    if (inEducationSection && line.length > 10) {
      resumeData.education.push(line);
    }
    if (lowerLine.includes("experience") || lowerLine.includes("skills")) {
      inEducationSection = false;
    }
  });

  // Experience detection
  const experienceKeywords = ["experience", "work", "employment", "position", "job"];
  let inExperienceSection = false;
  lines.forEach((line) => {
    const lowerLine = line.toLowerCase();
    if (experienceKeywords.some(keyword => lowerLine.includes(keyword))) {
      inExperienceSection = true;
    }
    if (inExperienceSection && line.length > 10) {
      resumeData.experience.push(line);
    }
    if (lowerLine.includes("education") || lowerLine.includes("skills")) {
      inExperienceSection = false;
    }
  });

  return resumeData;
}

// Main POST handler
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only PDF and DOCX allowed." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size too large. Max is 5MB." }, { status: 400 });
    }

    // Use OS temp directory instead of hardcoded "/tmp"
    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, `resume_${Date.now()}_${file.name}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(tempPath, buffer);

    let text = "";
    if (file.type === "application/pdf") {
      text = await extractTextFromPDF(tempPath);
    } else {
      text = await extractTextFromDOCX(tempPath);
    }

    const parsed = parseResumeContent(text);
    fs.unlinkSync(tempPath);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Resume parsing error:", error);
    return NextResponse.json({ error: "Failed to parse resume. Please try again." }, { status: 500 });
  }
}
