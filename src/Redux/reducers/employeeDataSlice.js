import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
};

const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.users = action?.payload;
    },

    setEmployeeIssues: (state, action) => {
      const { issue, EstimatedTime, ActualTime, Date, user } = action.payload;
      const foundUserIndex = state.users.findIndex(
        (userData) => userData.user === user
      );
      if (foundUserIndex !== -1) {
        const newIssue = {
          issue,
          EstimatedTime,
          ActualTime,
          Date,
        };
        state.users[foundUserIndex].Issues.push(newIssue);
        saveStateToLocalStorage(state.users);
      }
    },

    AddNewEmployee: (state, action) => {
      state.users.push({
        user: action.payload,
        Issues: [],
      });
      saveStateToLocalStorage(state.users);
    },

    UpdateEmployee: (state, action) => {
      const { issue, EstimatedTime, ActualTime, Date, user, id } =
        action.payload;
      const foundUser = state.users.find((userData) => userData.user === user);

      if (foundUser && foundUser.Issues[id]) {
        foundUser.Issues[id] = {
          issue,
          EstimatedTime,
          ActualTime,
          Date,
        };
        saveStateToLocalStorage(state.users);
      }
    },

    RemoveEmployeeIssue: (state, action) => {
      const { id, user } = action.payload;
      const foundUser = state.users.find((userData) => userData.user === user);
      if (foundUser) {
        if (id >= 0 && id < foundUser.Issues.length) {
          foundUser.Issues.splice(id, 1);
          saveStateToLocalStorage(state.users);
        }
      }
    },
  },
});

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("employeeDataState", serializedState);
  } catch (err) {
    console.error("Error saving state to local storage:", err);
  }
};

export default employeeDataSlice.reducer;
export const {
  setEmployees,
  setEmployeeIssues,
  AddNewEmployee,
  UpdateEmployee,
  RemoveEmployeeIssue,
} = employeeDataSlice.actions;
