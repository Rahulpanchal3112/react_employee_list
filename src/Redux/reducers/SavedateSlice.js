import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSelectDate: "",
};

const SavedateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.userSelectDate = action.payload;
    },
  },
});

export default SavedateSlice.reducer;
export const { setSelectedDate } = SavedateSlice.actions;
