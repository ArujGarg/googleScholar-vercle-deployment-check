"use client"

import ResumeUploader from "@/components/ResumeUploader"
import ResumeTextInput from "@/components/ResumeTextInput"
import ScholarProfileFetcher from "@/components/ScholarProfileFetcher"
import ProjectSuggestions from "@/components/ProjectSuggestions"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto py-12 px-4 space-y-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 border border-blue-200">
            <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Get Personalized Project Recommendations
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Upload your resume and connect your Google Scholar profile to receive AI-powered project suggestions
            tailored to your skills, experience, and research interests.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <ResumeUploader />
            <ResumeTextInput />
          </div>
          <ScholarProfileFetcher />
        </div>

        <ProjectSuggestions />
      </div>
    </div>
  )
}
