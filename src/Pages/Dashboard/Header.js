import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import ListingList from "./ListingList";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilter } from "../../Redux/reducers/employeeFiterSlice";
import { setSelectedDate } from "../../Redux/reducers/SavedateSlice";
import { setopenFormstate } from "../../Redux/reducers/openformSlice";
import { setListFilter } from "../../Redux/reducers/employeelistDataSlice";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AddNewEmployee } from "../../Redux/reducers/employeeDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = () => {
  const [dateError, setDateError] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [employeeName, setEmployeeName] = React.useState("");

  const abc = false;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeeData?.users);
  const Employee_selected_data = useSelector(
    (state) => state?.employeefilterData?.employeeFilter
  );
  const userSelected_date = useSelector(
    (state) => state?.selectedDate?.userSelectDate
  );
  const showForm = useSelector((state) => state?.setForm?.open);

  const [age, setAge] = React.useState("");
  const [employeeData, setEmployeeData] = useState();
  const [test, setTest] = useState();

  const handleChange = (event) => {
    let user = event?.target?.value;
    setAge(user);
    const filterdata = data?.filter((item) => {
      return user === item?.user;
    });
    if (filterdata.length > 0) {
      dispatch(setFilter(filterdata[0]));
      setEmployeeData(filterdata[0]?.Issues);
    }
    setDateError(false);
    dispatch(setListFilter({}));
    dispatch(setSelectedDate(""));
  };

  const setDate = (date) => {
    let Comparedate = moment(date).format("DD-MM-YYYY");
    dispatch(setSelectedDate(Comparedate));
    setShowButton(false);
    const Datewise_filter_issues = {
      ...Employee_selected_data,
      Issues: Employee_selected_data?.Issues.filter(
        (issue) => issue.Date === Comparedate
      ),
    };

    dispatch(setListFilter(Datewise_filter_issues));
  };

  const handleOpenForm = () => {
    dispatch(setopenFormstate(!showForm));
  };

  const handleValidation = () => {
    console.log("onFocus Called");
  };

  const handleAddEmployee = () => {
    dispatch(AddNewEmployee(employeeName));
    setOpen(!open);
  };

  return (
    <>
      <Headerdiv>
        <Employeelist>
          <DropdownList>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Employees</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Employees"
                  onChange={handleChange}
                >
                  {data && data.length > 0
                    ? data?.map((emp_data) => {
                        return (
                          <MenuItem value={emp_data.user}>
                            {emp_data.user}
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>
            </Box>
          </DropdownList>
        </Employeelist>
        <Datelist>
          <div>
            <DatePicker
              value={userSelected_date}
              onChange={(date) => setDate(date)}
              placeholderText="Select Date"
              disabled={dateError}
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ textTransform: "capitalize" }}
            >
              Add User
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleOpenForm}
              disabled={showButton}
              sx={{ textTransform: "capitalize" }}
            >
              Add Description
            </Button>
          </div>
        </Datelist>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Employee
              </Typography>
              <ModalTextfield
                id="outlined-basic"
                label="Add Employee Name"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleAddEmployee}
              >
                Add +
              </Button>
            </Box>
          </Modal>
        </div>
      </Headerdiv>
    </>
  );
};

export default Header;

const Headerdiv = styled.div`
  width: 100% !important;
  padding: 25px;
  display: flex;
  gap: 100px !important;
`;

const ModalTextfield = styled(TextField)`
  height: 50px !important;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    height: 50px !important;
  }
`;

const Employeelist = styled.div`
  width: 100% !important;
  display: flex;
  justify-content: end;
`;

const Datelist = styled.div`
  width: 100% !important;
  display: flex;
  gap: 75px;
  align-items: center;
  .react-datepicker-wrapper {
    height: 100% !important;
    width: 300px !important;
  }
  .react-datepicker__input-container {
    height: 100% !important;
    input {
      height: 100% !important;
      width: 300px !important;
      padding: 16.5px 14px !important;
      border-radius: 4px !important;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
      font-weight: 400 !important;
      font-size: 1rem !important;
      border: 0.5px solid lightgray !important;
    }
  }
`;

const DropdownList = styled.div`
  width: 300px !important;
`;
