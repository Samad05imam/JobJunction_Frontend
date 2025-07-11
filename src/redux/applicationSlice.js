import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions; // ✅ fixed `.json` → `.actions`
export default applicationSlice.reducer;
