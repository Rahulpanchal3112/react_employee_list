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
import { validateIssues } from "./validationUtils";
import { setglobalState } from "./dateUtils";

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
    ProjectName: "",
    EstimatedTime: "",
    ActualTime: "",
    Date: "",
    user: "",
  });

  const [issueError, setIssueError] = useState("");
  const [projectnameError, setProjectnameError] = useState("");
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
    setIssues({
      ...Issues,
      [name]: value,
    });
    switch (name) {
      case "issue":
        setIssueError("");
        break;
      case "ActualTime":
        setActualTimeError("");
        break;
      case "ProjectName":
        setProjectnameError("");
        break;
      default:
        setEstimatedTimeError("");
    }
  };

  const AddEmployeeissue = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateIssues(Issues);
    if (isValid) {
      dispatch(setEmployeeIssues(Issues));
      setglobalState(userSelected_date, Employee_selected_data, dispatch);
      dispatch(setopenFormstate(!showForm));
      setIssues({
        issue: "",
        EstimatedTime: "",
        ActualTime: "",
        Date: "",
        user: "",
      });
    } else {
      setIssueError(errors.issue);
      setProjectnameError(errors.projectName);
      setActualTimeError(errors.actualTime);
      setEstimatedTimeError(errors.estimatedTime);
    }
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
            <ProjectName>
              <Timefield
                id="outlined-basic"
                placeholder="Project Name"
                variant="outlined"
                name="ProjectName"
                onChange={handleChange}
                error={!!projectnameError}
              />
              {projectnameError && (
                <Typography variant="caption" color="error">
                  {projectnameError}
                </Typography>
              )}
            </ProjectName>

            <ActualTime>
              <Timefield
                id="outlined-basic"
                placeholder="Actual Time"
                variant="outlined"
                name="ActualTime"
                onChange={handleChange}
                error={!!actualTimeError}
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
                placeholder="Estimated Time"
                variant="outlined"
                name="EstimatedTime"
                onChange={handleChange}
                error={!!estimatedTimeError}
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
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #eaecf0;
    }
    &:hover fieldset {
      border-color: #eaecf0;
    }
    &.Mui-focused fieldset {
      border-color: #ffad95;
      color: #101828;
      box-shadow: 5px 5px 10px #ffe7e0;
    }
  }
`;

const Timefield = styled(TextField)`
  height: 50px !important;
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    height: 50px !important;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: #eaecf0;
    }
    &:hover fieldset {
      border-color: #eaecf0;
    }
    &.Mui-focused fieldset {
      border-color: #ffad95;
      color: #101828;
      box-shadow: 5px 5px 10px #ffe7e0;
    }
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
  width: 650px !important;
`;
const ActualTime = styled.div`
  width: 180px;
  text-align: center;
`;

const ProjectName = styled.div`
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
