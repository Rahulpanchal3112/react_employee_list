// store.js

import { configureStore } from "@reduxjs/toolkit";
import employeeDataReducer from "./reducers/employeeDataSlice";
import employeeFilterDatareducer from "./reducers/employeeFiterSlice";
import Savedatereducer from "./reducers/SavedateSlice";
import openFormreducer from "./reducers/openformSlice";
import employeelistDataSlice from "./reducers/employeelistDataSlice";

const store = configureStore({
  reducer: {
    employeeData: employeeDataReducer,
    employeefilterData: employeeFilterDatareducer,
    selectedDate: Savedatereducer,
    setForm: openFormreducer,
    employeelistfilterData: employeelistDataSlice,
  },
});

export default store;
