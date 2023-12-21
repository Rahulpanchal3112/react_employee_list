import { Typography, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { UpdateEmployee } from "../../Redux/reducers/employeeDataSlice";
import { RemoveEmployeeIssue } from "../../Redux/reducers/employeeDataSlice";
import DeleteModal from "./DeleteModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { setglobalState } from "../../common/dateUtils";
import { validateIssues } from "../../common/validationUtils";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

const shapeCircleStyles = { borderRadius: "50%" };
const circle = <Box component="span" sx={{ ...shapeCircleStyles }} />;

const ListingList = () => {
  const employeeData = useSelector(
    (state) => state?.employeelistfilterData?.employeeListFilter
  );

  const dispatch = useDispatch();
  const userSelected_date = useSelector(
    (state) => state?.selectedDate?.userSelectDate
  );
  const Employee_selected_data = useSelector(
    (state) => state?.employeefilterData?.employeeFilter
  );
  const [editedIssue, setEditedIssue] = useState({});
  const [editableRow, setEditableRow] = useState(null);

  const [issueError, setIssueError] = useState("");
  const [actualTimeError, setActualTimeError] = useState("");
  const [estimatedTimeError, setEstimatedTimeError] = useState("");
  const [projectnameError, setProjectnameError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsperpage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleEdit = (item_index) => {
    const actualIndex = page * rowsperpage + item_index;
    setEditableRow(actualIndex === editableRow ? null : actualIndex);
    const singleEmployeeData = employeeData?.Issues[actualIndex];
    setEditedIssue({
      ...singleEmployeeData,
      user: Employee_selected_data?.user,
      id: actualIndex,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditedIssue({
      ...editedIssue,
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

  const handleSave = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateIssues(editedIssue);

    if (isValid) {
      dispatch(UpdateEmployee(editedIssue));
      setEditableRow(null);
      setglobalState(userSelected_date, Employee_selected_data, dispatch);
    } else {
      setIssueError(errors.issue);
      setProjectnameError(errors.projectName);
      setActualTimeError(errors.actualTime);
      setEstimatedTimeError(errors.estimatedTime);
    }
  };

  const handleclose = () => {
    setEditableRow(null);
  };

  const handleDelete = (item_index) => {
    const actualIndex = page * rowsperpage + item_index;
    setSelectedDeleteIndex(actualIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteIndex !== null) {
      const item_index = selectedDeleteIndex;
      const delete_data = {
        user: Employee_selected_data?.user,
        id: item_index,
        date: userSelected_date,
      };
      dispatch(RemoveEmployeeIssue(delete_data));
      setglobalState(userSelected_date, Employee_selected_data, dispatch);
      handleCloseModal();
    }
  };

  const [currentTime] = useState(new Date());
  const startTime = new Date();
  startTime.setHours(11, 0, 0);

  const calculateTimeDifference = () => {
    const differenceInMillis = currentTime.getTime() - startTime.getTime();
    const diffInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const remainingMillis = differenceInMillis - diffInHours * 60 * 60 * 1000;
    const diffInMinutes = Math.floor(remainingMillis / (1000 * 60));

    const formattedMinutes =
      diffInMinutes < 10 ? `0${diffInMinutes}` : `${diffInMinutes}`;
    const formattedDifference = `${diffInHours}:${formattedMinutes}`;

    return formattedDifference;
  };

  const difference = calculateTimeDifference();

  var abc;
  const ChangeTimeDateformat = async (EstimatedTime) => {
    if (EstimatedTime === "12:00") {
      abc = "1:00";
    } else {
      const currentTime = EstimatedTime;

      const [hours, minutes] = currentTime.split(":").map(Number);

      const currentDate = new Date();
      currentDate.setHours(hours);
      currentDate.setMinutes(minutes);

      currentDate.setHours(currentDate.getHours() + 1);

      const updatedHours = currentDate.getHours();
      const updatedMinutes = currentDate.getMinutes();

      const formattedHours =
        updatedHours === 0
          ? "12"
          : String(updatedHours > 12 ? updatedHours - 12 : updatedHours);
      const formattedMinutes = String(updatedMinutes).padStart(2, "0");

      abc = `${formattedHours}:${formattedMinutes}`;
    }
  };

  function getTimeDifference(ends) {
    const startDate = new Date(`01/01/2000 11:00 AM`);
    const endDate = new Date(`01/01/2000 ${ends} PM`);

    const differenceMs = endDate - startDate;

    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <MainListing>
        {employeeData && Object.keys(employeeData).length > 0 && (
          <MainHeader>
            <ListingHeaderdiv>
              <IssueDescription>
                <IssueheaderText>Issue Details</IssueheaderText>
              </IssueDescription>
              <Timeduration>
                <ProjectList>Project Name</ProjectList>
                <ActualTime>Actual Hours</ActualTime>
                <EstimetedTime>Estimated Hours</EstimetedTime>
                <EstimetedTime>Status</EstimetedTime>
                <Actions>Action</Actions>
              </Timeduration>
            </ListingHeaderdiv>
          </MainHeader>
        )}

        {employeeData?.Issues?.slice(
          page * rowsperpage,
          page * rowsperpage + rowsperpage
        ).map((list_data, index) => {
          const actualIndex = page * rowsperpage + index;
          const isEditable = editableRow === actualIndex;
          ChangeTimeDateformat(list_data?.EstimatedTime);

          var formattedActualTime;
          var formattedEstimatedTime;
          formattedActualTime = getTimeDifference(list_data?.ActualTime);
          formattedEstimatedTime = getTimeDifference(list_data?.EstimatedTime);

          console.log("formattedActualTime", formattedActualTime);
          console.log("formattedEstimitedTime", formattedEstimatedTime);

          // console.log("difference", difference);
          return (
            <React.Fragment key={index}>
              <Listingdiv>
                <IssueDescription>
                  <IssueText>
                    {isEditable ? (
                      <TextField
                        id={`issue-${index}`}
                        multiline
                        rows={3}
                        value={editedIssue.issue || ""}
                        variant="standard"
                        onChange={handleChange}
                        name="issue"
                        error={!!issueError}
                        helperText={issueError}
                      />
                    ) : (
                      <Typography>{list_data?.issue}</Typography>
                    )}
                  </IssueText>
                </IssueDescription>
                <Timeduration>
                  {isEditable ? (
                    <>
                      <TimeText
                        id="standard-basic"
                        label="Project Name"
                        variant="standard"
                        value={editedIssue.ProjectName || ""}
                        onChange={handleChange}
                        name="ProjectName"
                        error={!!projectnameError}
                        helperText={projectnameError}
                      />
                      <TimeText
                        id="standard-basic"
                        label="ActualTime"
                        variant="standard"
                        value={editedIssue.ActualTime || ""}
                        onChange={handleChange}
                        name="ActualTime"
                        error={!!actualTimeError}
                        helperText={actualTimeError}
                      />

                      <TimeText
                        id="standard-basic"
                        label="EstimatedTime"
                        variant="standard"
                        value={editedIssue.EstimatedTime || ""}
                        onChange={handleChange}
                        name="EstimatedTime"
                        error={!!estimatedTimeError}
                        helperText={estimatedTimeError}
                      />
                    </>
                  ) : (
                    <>
                      <ProjectList>{list_data?.ProjectName}</ProjectList>
                      <ActualTime>
                        {list_data?.ActualTime
                          ? `${list_data?.ActualTime} hours`
                          : ""}
                      </ActualTime>
                      <EstimetedTime>
                        {list_data?.EstimatedTime} hours
                      </EstimetedTime>
                      <StatusIcon>
                        <Stack spacing={3} direction="row">
                          {list_data?.ActualTime &&
                          formattedActualTime <= formattedEstimatedTime ? (
                            <SuccessBadgeIcon
                              color="secondary"
                              badgeContent=" "
                            >
                              {circle}
                            </SuccessBadgeIcon>
                          ) : list_data?.ActualTime ? (
                            <FailureBadgeIcon
                              color="secondary"
                              badgeContent=" "
                            >
                              {circle}
                            </FailureBadgeIcon>
                          ) : null}
                        </Stack>
                      </StatusIcon>
                    </>
                  )}

                  <Actions>
                    {isEditable ? (
                      <EditButtons>
                        <EditSavebtn variant="contained" onClick={handleSave}>
                          Save
                        </EditSavebtn>
                        <EditSavebtn variant="contained" onClick={handleclose}>
                          X
                        </EditSavebtn>
                      </EditButtons>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                      </>
                    )}

                    <IconButton onClick={() => handleDelete(index)}>
                      {!isEditable && <DeleteIcon />}
                    </IconButton>
                  </Actions>
                </Timeduration>
              </Listingdiv>
            </React.Fragment>
          );
        })}
        {employeeData?.Issues?.length === 0 ? (
          <Spantext>
            No Results Found <br></br>
            We Could Not Find Any Results Please Add Details
          </Spantext>
        ) : (
          ""
        )}
        {employeeData?.Issues?.length > 0 && (
          <PaginationDiv>
            <Stack spacing={2}>
              <StyledPagination
                variant="outlined"
                shape="rounded"
                count={Math.ceil(employeeData?.Issues?.length / rowsperpage)}
                component="div"
                rowsperpage={5}
                page={page + 1}
                onChange={handleChangePage}
              />
            </Stack>
          </PaginationDiv>
        )}

        {isModalOpen && (
          <DeleteModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onConfirmDelete={handleConfirmDelete}
          />
        )}
      </MainListing>
    </>
  );
};

export default ListingList;

const SuccessBadgeIcon = styled(Badge)`
  .css-jcn4dz-MuiBadge-badge {
    background-color: green !important;
    z-index: 0 !important;
  }
`;

const FailureBadgeIcon = styled(Badge)`
  .css-jcn4dz-MuiBadge-badge {
    background-color: red !important;
    z-index: 0 !important;
  }
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative !important;
  top: 15px !important;
`;

const StyledPagination = styled(Pagination)`
  .Mui-selected {
    background-color: #f05537 !important;
    color: white !important;
    font-weight: 600 !important;
  }
  .MuiPaginationItem-previousNext {
    background-color: #fff !important;
    color: #f05537 !important;
    font-weight: 600 !important;
  }
`;

const EditButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Spantext = styled.div`
  display: flex;
  justify-content: center;
  height: 138px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
  background-color: #fff;
  border-bottom: 1px solid #eaecf0 !important;
  gap: 15px;
  align-items: center !important;
  text-align: center;
`;

const TimeText = styled(TextField)`
  width: 150px; !important;
`;

const EditSavebtn = styled(Button)`
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

const MainHeader = styled.div`
  background-color: #f05537;
`;

const IssueheaderText = styled.div`
  text-align: center;
`;

const MainListing = styled.div`
  margin-top: 25px;
`;

const ListingHeaderdiv = styled.div`
  color: white !important;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 40px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
`;

const Listingdiv = styled.div`
  display: flex;
  justify-content: center;
  height: 138px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
  background-color: #fff;
  border-bottom: 1px solid #eaecf0 !important;
  gap: 15px;
  align-items: center;
`;

const IssueDescription = styled.div`
  width: 650px;
  word-wrap: break-word !important;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ActualTime = styled.div`
  width: 150px;
  text-align: center;
`;

const ProjectList = styled.div`
  width: 150px;
  text-align: center;
`;

const EstimetedTime = styled.div`
  width: 150px;
  text-align: center;
`;

const StatusIcon = styled.div`
  width: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const IssueText = styled.div`
  .MuiTextField-root {
    width: 100% !important;
  }
`;

const Timeduration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px !important;
`;

const Actions = styled.div`
  width: 100px;
  text-align: center;
  display: flex;
`;
