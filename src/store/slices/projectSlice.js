import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for generating project suggestions
export const generateProjectSuggestions = createAsyncThunk(
  "projects/generateSuggestions",
  async ({ resumeData, scholarData }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/suggest-projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, scholarData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate project suggestions")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
    generated: false,
  },
  reducers: {
    clearProjects: (state) => {
      state.suggestions = []
      state.generated = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateProjectSuggestions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generateProjectSuggestions.fulfilled, (state, action) => {
        state.loading = false
        state.suggestions = action.payload.suggestions
        state.generated = true
      })
      .addCase(generateProjectSuggestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearProjects } = projectsSlice.actions
export default projectsSlice.reducer
