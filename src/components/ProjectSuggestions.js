'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { generateProjectSuggestions,clearProjects } from '@/store/slices/projectSlice'

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
      <div className="w-full max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Suggestions</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            Please upload your resume and fetch your Google Scholar profile to get project suggestions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Project Suggestions</h2>
        {generated && (
          <button
            onClick={handleGenerateNew}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate New'}
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Generating project suggestions...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {generated && suggestions.length > 0 && (
        <div className="space-y-6">
          {suggestions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.category}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {category.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Difficulty:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium text-gray-500">Duration:</span>
                        <span className="ml-2 text-xs text-gray-700">{project.duration}</span>
                      </div>
                      
                      {project.skills && project.skills.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-gray-500">Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {project.researchAreas && project.researchAreas.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-gray-500">Research Areas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.researchAreas.map((area, areaIndex) => (
                              <span
                                key={areaIndex}
                                className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
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
          ))}
        </div>
      )}

      {generated && suggestions.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600">No project suggestions could be generated based on your profile.</p>
        </div>
      )}
    </div>
  )
}
