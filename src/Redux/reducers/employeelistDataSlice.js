import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeListFilter: {},
};

const employeelistDataSlice = createSlice({
  name: "employeelistfilterData",
  initialState,
  reducers: {
    setListFilter: (state, action) => {
      state.employeeListFilter = action.payload;
    },
  },
});

export default employeelistDataSlice.reducer;
export const { setListFilter } = employeelistDataSlice.actions;
