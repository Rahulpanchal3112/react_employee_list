import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const originalDate = new Date();
const formattedDate = moment(originalDate).format("DD-MM-YYYY");

const initialState = {
  userSelectDate: formattedDate,
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
