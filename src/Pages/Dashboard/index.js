import * as React from "react";
import styled from "styled-components";
import Header from "./Header";
import ListingList from "./ListingList";
import User from "../../Api/EmployeeData";
import { useSelector } from "react-redux";
import AddIssueForm from "./AddIssueForm";

const Dashboard = () => {
  const showForm = useSelector((state) => state?.setForm?.open);

  return (
    <>
      <Maindiv>
        <Header />
        <ListingList />
        {showForm && <AddIssueForm />}
      </Maindiv>
    </>
  );
};

export default Dashboard;

const Maindiv = styled.div`
  width: 100% !important;
  min-height: 100vh !important;
  padding: 25px;
`;
