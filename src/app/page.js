"use client"

import ResumeUploader from "@/components/ResumeUploader"
import ResumeTextInput from "@/components/ResumeTextInput"
import ScholarProfileFetcher from "@/components/ScholarProfileFetcher"
import ProjectSuggestions from "@/components/ProjectSuggestions"

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Personalized Project Recommendations</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your resume and connect your Google Scholar profile to receive AI-powered project suggestions tailored
          to your skills, experience, and research interests.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ResumeUploader />
          <div className="border-t pt-6">
            <ResumeTextInput />
          </div>
        </div>
        <ScholarProfileFetcher />
      </div>

      <ProjectSuggestions />
    </div>
  )
}
