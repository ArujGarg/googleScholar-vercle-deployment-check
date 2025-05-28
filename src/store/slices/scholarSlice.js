import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for fetching Google Scholar profile
export const fetchScholarProfile = createAsyncThunk("scholar/fetchProfile", async (profileUrl, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/scholar-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileUrl }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Scholar profile")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const scholarSlice = createSlice({
  name: "scholar",
  initialState: {
    data: null,
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    clearScholar: (state) => {
      state.data = null
      state.fetched = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScholarProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchScholarProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.fetched = true
      })
      .addCase(fetchScholarProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearScholar } = scholarSlice.actions
export default scholarSlice.reducer
