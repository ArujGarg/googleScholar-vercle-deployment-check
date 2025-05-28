import { configureStore } from "@reduxjs/toolkit"
import resumeReducer from "./slices/resumeSlice"
import scholarReducer from "./slices/scholarSlice"
import projectsReducer from "./slices/projectSlice"

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    scholar: scholarReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["resume/uploadResume/pending", "resume/uploadResume/fulfilled"],
      },
    }),
})

export default store
