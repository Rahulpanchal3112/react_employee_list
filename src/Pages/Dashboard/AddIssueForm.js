import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { setEmployeeIssues } from "../../Redux/reducers/employeeDataSlice";
import { setListFilter } from "../../Redux/reducers/employeelistDataSlice";
import { setFilter } from "../../Redux/reducers/employeeFiterSlice";
import { setopenFormstate } from "../../Redux/reducers/openformSlice";
// import { setEmployeeIssues } from "../../Redux/reducers/employeeDataSlice";

const AddIssueForm = () => {
  const dispatch = useDispatch();
  const userSelected_date = useSelector(
    (state) => state?.selectedDate?.userSelectDate
  );
  const Employee_selected_data = useSelector(
    (state) => state?.employeefilterData?.employeeFilter
  );
  const showForm = useSelector((state) => state?.setForm?.open);
  const [age, setAge] = React.useState("");
  const [Issues, setIssues] = useState({
    issue: "",
    EstimatedTime: "",
    ActualTime: "",
    Date: "",
    user: "",
  });

  const [issueError, setIssueError] = useState("");
  const [actualTimeError, setActualTimeError] = useState("");
  const [estimatedTimeError, setEstimatedTimeError] = useState("");

  useEffect(() => {
    setIssues({
      ...Issues,
      Date: userSelected_date,
      user: Employee_selected_data?.user,
    });
  }, [userSelected_date, Employee_selected_data]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "issue":
        setIssueError("");
        break;
      case "ActualTime":
        setActualTimeError("");
        break;
      default:
        setEstimatedTimeError("");
    }

    setIssues({
      ...Issues,
      [name]: value,
    });
  };

  const validate = () => {
    let isValid = true;

    if (!Issues.issue || Issues.issue.trim().length === 0) {
      setIssueError("Description is required");
      isValid = false;
    } else if (Issues.issue.length > 300) {
      setIssueError("Description should be > 300  words");
      isValid = false;
    } else {
      setIssueError("");
    }

    if (!Issues.ActualTime) {
      setActualTimeError("required filed");
      isValid = false;
    } else {
      setActualTimeError("");
    }

    if (!Issues.EstimatedTime) {
      setEstimatedTimeError("required filed");
      isValid = false;
    } else {
      setEstimatedTimeError("");
    }

    return isValid;
  };

  const AddEmployeeissue = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(setEmployeeIssues(Issues));
      setDate();
      dispatch(setopenFormstate(!showForm));
      setIssues({
        issue: "",
        EstimatedTime: "",
        ActualTime: "",
        Date: "",
        user: "",
      });
    }
  };

  const setDate = () => {
    const Getdata = localStorage.getItem("employeeDataState");
    let data = JSON.parse(Getdata);
    const date = userSelected_date;
    const user = Employee_selected_data?.user;
    const filterdata = data?.filter((item) => {
      return user === item?.user;
    });
    if (filterdata.length > 0) {
      dispatch(setFilter(filterdata[0]));
    }
    const Datewise_filter_issues = {
      ...filterdata[0],
      Issues: filterdata[0]?.Issues.filter((issue) => issue.Date === date),
    };

    dispatch(setListFilter(Datewise_filter_issues));
  };

  return (
    <>
      <MainListing>
        <Listingdiv>
          <IssueDescription>
            <IssueText>
              <Descriptionfield
                placeholder="Add Issues Description"
                multiline
                rows={2}
                maxRows={4}
                name="issue"
                onChange={handleChange}
                error={!!issueError}
                helperText={issueError}
              />
            </IssueText>
          </IssueDescription>
          <Timeduration>
            <ActualTime>
              <Timefield
                id="outlined-basic"
                label="Actual Time"
                variant="outlined"
                name="ActualTime"
                onChange={handleChange}
                error={!!actualTimeError}
                // helperText={actualTimeError}
              />
              {actualTimeError && (
                <Typography variant="caption" color="error">
                  {actualTimeError}
                </Typography>
              )}
            </ActualTime>
            <EstimetedTime>
              <Timefield
                id="outlined-basic"
                label="Estimated Time"
                variant="outlined"
                name="EstimatedTime"
                onChange={handleChange}
                error={!!estimatedTimeError}
                // helperText={estimatedTimeError}
              />
              {estimatedTimeError && (
                <Typography variant="caption" color="error">
                  {estimatedTimeError}
                </Typography>
              )}
            </EstimetedTime>
            <div>
              <Addbutton variant="contained" onClick={AddEmployeeissue}>
                Add
              </Addbutton>
            </div>
          </Timeduration>
        </Listingdiv>
      </MainListing>
    </>
  );
};

export default AddIssueForm;

const MainHeader = styled.div``;

const Descriptionfield = styled(TextField)`
  width: 100% !important;
`;

const Timefield = styled(TextField)`
  height: 50px !important;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    height: 50px !important;
  }
`;

const IssueheaderText = styled.div`
  text-align: center;
`;

const MainListing = styled.div`
  margin-top: 25px;
  width: 100% !important;
  padding: 25px;
  display: flex;
  gap: 100px !important;
  border: 1px solid #eaecf0;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 5px 28px #0000000f;
  justify-content: center;
`;

const Listingdiv = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  /* padding-bottom: 10px; */
  gap: 50px !important;
`;
const IssueDescription = styled.div`
  width: 800px;
`;
const ActualTime = styled.div`
  width: 180px;
  text-align: center;
`;
const EstimetedTime = styled.div`
  width: 180px;
  text-align: center;
`;
const IssueText = styled.div``;
const Timeduration = styled.div`
  display: flex;
  gap: 25px !important;
  align-items: center;
`;

// const Form = styled(FormControl)`
//   width: 100% !important;
// `;

const Addbutton = styled(Button)`
  width: 100px !important;
  border: 1px solid #f05537 !important;
  background-color: #f05537 !important;
  font-weight: 600 !important;
  line-height: 1.25rem !important;
  color: white !important;
  text-align: center !important;
  white-space: nowrap !important;
  cursor: pointer !important;
  height: 2.5rem !important;
  font-size: 1rem !important;
  border-radius: 5px !important;
  font-family: Poppins, sans-serif !important;
  text-transform: capitalize !important;
`;
