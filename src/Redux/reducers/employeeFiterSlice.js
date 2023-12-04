import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeFilter: {},
};

const employeeFilterSlice = createSlice({
  name: "employeefilterData",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.employeeFilter = action.payload;
    },
  },
});

export default employeeFilterSlice.reducer;
export const { setFilter } = employeeFilterSlice.actions;
