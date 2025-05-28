'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadResume, clearResume } from '@/store/slices/resumeSlice'

export default function ResumeUploader() {
  const [dragActive, setDragActive] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, uploaded, data } = useSelector((state) => state.resume)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only PDF or DOCX files')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    dispatch(uploadResume(file))
  }

  const handleClear = () => {
    dispatch(clearResume())
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Resume</h2>
      
      {!uploaded ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {loading ? 'Processing...' : 'Drop your resume here or click to browse'}
              </p>
              <p className="text-sm text-gray-500">PDF or DOCX files only (max 5MB)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-800">Resume Parsed Successfully!</h3>
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear
            </button>
          </div>
          
          {data && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Personal Information</h4>
                <p className="text-gray-600">{data.name || 'Name not found'}</p>
                <p className="text-gray-600">{data.email || 'Email not found'}</p>
                <p className="text-gray-600">{data.phone || 'Phone not found'}</p>
              </div>
              
              {data.skills && data.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.education && data.education.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">Education</h4>
                  {data.education.map((edu, index) => (
                    <p key={index} className="text-gray-600">{edu}</p>
                  ))}
                </div>
              )}
              
              {data.experience && data.experience.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">Experience</h4>
                  {data.experience.map((exp, index) => (
                    <p key={index} className="text-gray-600">{exp}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}
    </div>
  )
}
