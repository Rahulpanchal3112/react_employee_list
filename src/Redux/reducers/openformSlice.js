import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const openformSlice = createSlice({
  name: "setForm",
  initialState,
  reducers: {
    setopenFormstate: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default openformSlice.reducer;
export const { setopenFormstate } = openformSlice.actions;
