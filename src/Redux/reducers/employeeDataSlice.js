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
      const { issue, ProjectName, EstimatedTime, ActualTime, Date, user } =
        action.payload;
      const foundUserIndex = state.users.findIndex(
        (userData) => userData.user === user
      );
      if (foundUserIndex !== -1) {
        const newIssue = {
          issue,
          ProjectName,
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
      const { issue, ProjectName, EstimatedTime, ActualTime, Date, user, id } =
        action.payload;
      const foundUser = state.users.find((userData) => userData.user === user);

      if (foundUser) {
        const dateWiseRecords = foundUser.Issues.filter(
          (item) => item.Date === Date
        );

        if (dateWiseRecords.length > id) {
          const indexToUpdate = foundUser.Issues.findIndex(
            (item) => item === dateWiseRecords[id]
          );

          if (indexToUpdate !== -1) {
            foundUser.Issues[indexToUpdate] = {
              issue,
              ProjectName,
              EstimatedTime,
              ActualTime,
              Date,
            };

            saveStateToLocalStorage(state.users);
          }
        }
      }
    },

    RemoveEmployeeIssue: (state, action) => {
      const { user, date, id } = action.payload;
      const foundUser = state.users.find((userData) => userData.user === user);

      if (foundUser) {
        const dateWiseRecords = foundUser.Issues.filter(
          (item) => item.Date === date
        );

        if (dateWiseRecords.length > id) {
          const indexToDelete = foundUser.Issues.findIndex(
            (item) => item === dateWiseRecords[id]
          );

          if (indexToDelete !== -1) {
            foundUser.Issues.splice(indexToDelete, 1);

            saveStateToLocalStorage(state.users);
          }
        }
      }
    },

    setCopyOfEmployeeData: (state, action) => {
      console.log(action.payload, "action.payload");
      const { user, Issues } = action.payload;

      console.log(user, "user");
      console.log(Issues, "Issues");

      const foundUserIndex = state.users.findIndex(
        (userData) => userData.user === user
      );
      if (foundUserIndex !== -1) {
        const userIssues = state.users[foundUserIndex].Issues;
        Issues.forEach((newIssue) => {
          userIssues.push(newIssue);
        });
        saveStateToLocalStorage(state.users);
      }
    },

    RemoveEmployee: (state, action) => {
      console.log(action?.payload, "action-->");
      state.users.splice(action?.payload, 1);
      saveStateToLocalStorage(state.users);
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
  setCopyOfEmployeeData,
  RemoveEmployee,
} = employeeDataSlice.actions;
