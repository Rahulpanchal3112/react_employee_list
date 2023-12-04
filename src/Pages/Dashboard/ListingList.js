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
    setEditedIssue({
      ...editedIssue,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(UpdateEmployee(editedIssue));
    setEditableRow(null);
    setUpdateData();
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
    const delete_data = {
      user: Employee_selected_data?.user,
      id: item_index,
    };
    dispatch(RemoveEmployeeIssue(delete_data));
  };

  return (
    <>
      <MainListing>
        {employeeData && Object.keys(employeeData).length > 0 && (
          <MainHeader>
            <Listingdiv>
              <IssueDescription>
                <IssueheaderText>Description</IssueheaderText>
              </IssueDescription>
              <Timeduration>
                <ActualTime>Actual Time</ActualTime>
                <EstimetedTime>Estimated Time</EstimetedTime>
              </Timeduration>
              <Actions>Action</Actions>
            </Listingdiv>
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
                        rows={4}
                        value={editedIssue.issue || ""}
                        variant="standard"
                        onChange={handleChange}
                        name="issue"
                      />
                    ) : (
                      <Typography>{list_data?.issue}</Typography>
                    )}
                  </IssueText>
                </IssueDescription>
                <Timeduration>
                  {isEditable ? (
                    <>
                      <input
                        type="text"
                        value={editedIssue.ActualTime || ""}
                        onChange={handleChange}
                        name="ActualTime"
                      />
                      <input
                        type="text"
                        value={editedIssue.EstimatedTime || ""}
                        onChange={handleChange}
                        name="EstimatedTime"
                      />
                    </>
                  ) : (
                    <>
                      <ActualTime>{list_data?.ActualTime}</ActualTime>
                      <EstimetedTime>{list_data?.EstimatedTime}</EstimetedTime>
                    </>
                  )}

                  <Actions>
                    {isEditable ? (
                      <Button variant="contained" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                    )}

                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Actions>
                </Timeduration>
              </Listingdiv>
            </React.Fragment>
          );
        })}
      </MainListing>
    </>
  );
};

export default ListingList;

const MainHeader = styled.div``;

const IssueheaderText = styled.div`
  text-align: center;
`;

const MainListing = styled.div``;

const Listingdiv = styled.div`
  align-items: center;
  /* justify-content: space-between; */
  display: flex;
  padding-bottom: 10px;
  justify-content: center;
`;

const IssueDescription = styled.div`
  width: 800px;
`;

const ActualTime = styled.div`
  width: 150px;
  text-align: center;
`;

const EstimetedTime = styled.div`
  width: 150px;
  text-align: center;
`;

const IssueText = styled.div``;

const Timeduration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Actions = styled.div`
  width: 100px;
  text-align: center;
`;
