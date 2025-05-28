"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generateProjectSuggestions, clearProjects } from "@/store/slices/projectSlice"

export default function ProjectSuggestions() {
  const dispatch = useDispatch()
  const { suggestions, loading, error, generated } = useSelector((state) => state.projects)
  const { data: resumeData, uploaded: resumeUploaded } = useSelector((state) => state.resume)
  const { data: scholarData, fetched: scholarFetched } = useSelector((state) => state.scholar)

  const canGenerateSuggestions = resumeUploaded && scholarFetched

  useEffect(() => {
    if (canGenerateSuggestions && !generated && !loading) {
      dispatch(generateProjectSuggestions({ resumeData, scholarData }))
    }
  }, [canGenerateSuggestions, generated, loading, dispatch, resumeData, scholarData])

  const handleGenerateNew = () => {
    if (canGenerateSuggestions) {
      dispatch(clearProjects())
      setTimeout(() => {
        dispatch(generateProjectSuggestions({ resumeData, scholarData }))
      }, 100)
    }
  }

  if (!canGenerateSuggestions) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Suggestions</h2>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-amber-800 font-medium">
              Please upload your resume and fetch your Google Scholar profile to get project suggestions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Project Suggestions</h2>
        {generated && (
          <button
            onClick={handleGenerateNew}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Generating..." : "Generate New"}
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Generating project suggestions...</p>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">Error: {error}</p>
          </div>
        </div>
      )}

      {generated && suggestions.length > 0 && (
        <div className="space-y-8">
          {suggestions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {category.projects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                    >
                      <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Difficulty:</span>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              project.difficulty === "Beginner"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : project.difficulty === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {project.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration:</span>
                          <span className="text-sm text-gray-700 font-medium">{project.duration}</span>
                        </div>

                        {project.skills && project.skills.length > 0 && (
                          <div>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Skills:</span>
                            <div className="flex flex-wrap gap-2">
                              {project.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.researchAreas && project.researchAreas.length > 0 && (
                          <div>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                              Research Areas:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.researchAreas.map((area, areaIndex) => (
                                <span
                                  key={areaIndex}
                                  className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {generated && suggestions.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No project suggestions could be generated based on your profile.</p>
        </div>
      )}
    </div>
  )
}
