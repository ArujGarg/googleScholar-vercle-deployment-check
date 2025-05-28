import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for uploading and parsing resume
export const uploadResume = createAsyncThunk("resume/uploadResume", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append("resume", file)

    const response = await fetch("/api/parse-resume", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to parse resume")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    data: null,
    loading: false,
    error: null,
    uploaded: false,
  },
  reducers: {
    clearResume: (state) => {
      state.data = null
      state.uploaded = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.uploaded = true
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearResume } = resumeSlice.actions
export default resumeSlice.reducer
