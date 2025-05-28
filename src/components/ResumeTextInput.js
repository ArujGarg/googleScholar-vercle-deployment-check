"use client"

export default function ResumeTextInput({ onChange, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Alternative: Paste Resume Text</h3>
            <p className="text-sm text-gray-600">If you prefer not to upload a file, you can paste your resume text here</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          <label htmlFor="resumeText" className="block text-sm font-semibold text-gray-700">
            Resume Text
          </label>
          <textarea
            id="resumeText"
            rows={8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
          />
        </div>
      </div>
    </div>
  )
}
