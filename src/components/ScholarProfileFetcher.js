"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchScholarProfile, clearScholar } from "@/store/slices/scholarSlice"

export default function ScholarProfileFetcher() {
  const [profileUrl, setProfileUrl] = useState("")
  const dispatch = useDispatch()
  const { loading, error, fetched, data } = useSelector((state) => state.scholar)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!profileUrl.trim()) {
      alert("Please enter a Google Scholar profile URL")
      return
    }

    // Basic URL validation
    if (!profileUrl.includes("scholar.google.com")) {
      alert("Please enter a valid Google Scholar profile URL")
      return
    }

    dispatch(fetchScholarProfile(profileUrl))
  }

  const handleClear = () => {
    dispatch(clearScholar())
    setProfileUrl("")
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Google Scholar Profile</h3>
            {!fetched && (
              <p className="text-sm text-gray-600">
                Connect your Google Scholar profile to enhance project recommendations
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {!fetched ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="profileUrl" className="block text-sm font-semibold text-gray-700">
                Google Scholar Profile URL
              </label>
              <input
                type="url"
                id="profileUrl"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://scholar.google.com/citations?user=..."
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !profileUrl.trim()}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Fetching Profile..." : "Fetch Profile"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Profile Fetched Successfully</span>
              </div>
              <button
                onClick={handleClear}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>

            {data && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Author Information</h4>
                  <p className="font-semibold text-lg text-gray-900">{data.name || "Name not found"}</p>
                  <p className="text-gray-600">{data.affiliation || "Affiliation not found"}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{data.totalCitations || 0}</div>
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Citations</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{data.hIndex || 0}</div>
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">H-index</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700">{data.publications?.length || 0}</div>
                    <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Publications</div>
                  </div>
                </div>

                {data.researchInterests && data.researchInterests.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Research Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.researchInterests.map((interest, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-colors"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data.publications && data.publications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Recent Publications
                    </h4>
                    <div className="bg-gray-50 rounded-xl border border-gray-200 max-h-48 overflow-y-auto">
                      <div className="p-4 space-y-4">
                        {data.publications.slice(0, 5).map((pub, index) => (
                          <div key={index} className="space-y-2">
                            {index > 0 && <div className="border-t border-gray-200 pt-4"></div>}
                            <div>
                              <p className="text-sm font-semibold text-gray-900 leading-relaxed">{pub.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-600">
                                  {pub.authors} ({pub.year})
                                </p>
                                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium border border-blue-200">
                                  <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  {pub.citations || 0} citations
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 mt-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
