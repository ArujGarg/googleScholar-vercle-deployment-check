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
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Google Scholar Profile</h2>

      {!fetched ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Google Scholar Profile URL
            </label>
            <input
              type="url"
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://scholar.google.com/citations?user=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !profileUrl.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Fetching Profile..." : "Fetch Profile"}
          </button>
        </form>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-800">Profile Fetched Successfully!</h3>
            <button onClick={handleClear} className="text-red-600 hover:text-red-800 font-medium">
              Clear
            </button>
          </div>

          {data && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Author Information</h4>
                <p className="text-gray-600">{data.name || "Name not found"}</p>
                <p className="text-gray-600">{data.affiliation || "Affiliation not found"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Statistics</h4>
                <p className="text-gray-600">Citations: {data.totalCitations || 0}</p>
                <p className="text-gray-600">H-index: {data.hIndex || 0}</p>
                <p className="text-gray-600">Publications: {data.publications?.length || 0}</p>
              </div>

              {data.researchInterests && data.researchInterests.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">Research Interests</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.researchInterests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.publications && data.publications.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">Recent Publications</h4>
                  <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                    {data.publications.slice(0, 5).map((pub, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-800">{pub.title}</p>
                        <p className="text-xs text-gray-600">
                          {pub.authors} - {pub.year}
                        </p>
                        <p className="text-xs text-gray-500">Citations: {pub.citations || 0}</p>
                      </div>
                    ))}
                  </div>
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
