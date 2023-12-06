import { Typography, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { UpdateEmployee } from "../../Redux/reducers/employeeDataSlice";
import { setListFilter } from "../../Redux/reducers/employeelistDataSlice";
import { setFilter } from "../../Redux/reducers/employeeFiterSlice";
import { RemoveEmployeeIssue } from "../../Redux/reducers/employeeDataSlice";
import DeleteModal from "./DeleteModal";

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
  const [age, setAge] = React.useState("");
  const [editedIssue, setEditedIssue] = useState({});
  const [editableRow, setEditableRow] = useState(null);

  const [issueError, setIssueError] = useState("");
  const [actualTimeError, setActualTimeError] = useState("");
  const [estimatedTimeError, setEstimatedTimeError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const handleEdit = (item_index) => {
    setEditableRow(item_index === editableRow ? null : item_index);
    const singleEmployeeData = employeeData?.Issues[item_index];
    setEditedIssue({
      ...singleEmployeeData,
      user: Employee_selected_data?.user,
      id: item_index,
    });
  };

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
    setEditedIssue({
      ...editedIssue,
      [name]: value,
    });
  };

  console.log("editedIssue", editedIssue);
  const isValidNumber = (input) => /^\d{1,2}$/.test(input);
  const validate = () => {
    let isValid = true;

    if (!editedIssue.issue || editedIssue.issue.trim().length === 0) {
      setIssueError("Description is required");
      isValid = false;
    } else if (editedIssue.issue.length > 300) {
      setIssueError("Description should be > 300  words");
      isValid = false;
    } else {
      setIssueError("");
    }

    if (!editedIssue.ActualTime) {
      setActualTimeError("Required Filed");
      isValid = false;
    } else if (!isValidNumber(editedIssue.ActualTime)) {
      setActualTimeError("Invalid Time Hours");
      isValid = false;
    } else {
      setActualTimeError("");
    }
    if (!editedIssue.EstimatedTime) {
      setEstimatedTimeError("Required Filed");
      isValid = false;
    } else if (!isValidNumber(editedIssue.EstimatedTime)) {
      setEstimatedTimeError("Invalid Time Hours");
      isValid = false;
    } else {
      setEstimatedTimeError("");
    }

    return isValid;
  };
  const handleSave = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(UpdateEmployee(editedIssue));
      setEditableRow(null);
      setUpdateData();
    }
  };

  const setUpdateData = () => {
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

  const handleDelete = (item_index) => {
    setSelectedDeleteIndex(item_index);
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
      setUpdateData();
      handleCloseModal(); // Close the modal after deleting
    }
  };

  console.log("employeeData", employeeData);

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
                <ActualTime>Actual Hours</ActualTime>
                <EstimetedTime>Estimated Hours</EstimetedTime>
              </Timeduration>
              <Actions>Action</Actions>
            </ListingHeaderdiv>
          </MainHeader>
        )}

        {employeeData?.Issues?.map((list_data, index) => {
          const isEditable = editableRow === index;

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
                      <ActualTime>{list_data?.ActualTime} hours</ActualTime>
                      <EstimetedTime>
                        {list_data?.EstimatedTime} hours
                      </EstimetedTime>
                    </>
                  )}

                  <Actions>
                    {isEditable ? (
                      <EditSavebtn variant="contained" onClick={handleSave}>
                        Save
                      </EditSavebtn>
                    ) : (
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
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

const Spantext = styled.div`
  display: flex;
  justify-content: center;
  height: 138px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
  background-color: #fff;
  border-bottom: 1px solid #eaecf0 !important;
  gap: 15px;
  align-items: center;
  text-align: center;
`;

const DescriptionText = styled(TextField)`
  width: 100% !important;
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
  /* border: 1px solid #eaecf0; */
`;

const ListingHeaderdiv = styled.div`
  color: white !important;
  align-items: center;
  display: flex;
  /* padding-bottom: 10px; */
  justify-content: center;
  height: 40px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
`;

const Listingdiv = styled.div`
  /* color: #101828 !important; */

  display: flex;
  justify-content: center;
  height: 138px;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
  background-color: #fff;
  border-bottom: 1px solid #eaecf0 !important;
  gap: 15px;
`;

const IssueDescription = styled.div`
  width: 800px;
  word-wrap: break-word !important;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ActualTime = styled.div`
  width: 150px;
  text-align: center;
`;

const EstimetedTime = styled.div`
  width: 150px;
  text-align: center;
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
