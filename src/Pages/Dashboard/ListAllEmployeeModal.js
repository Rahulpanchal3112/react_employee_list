import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RemoveEmployee } from "../../Redux/reducers/employeeDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 4,
  bgcolor: "#fff",
  border: "1px solid #eaecf0",
  borderRadius: "0.75rem",
  boxShadow: "0 5px 28px #0000000f",
};

const ListAllEmployeeModal = ({ open, onClose }) => {
  const data = useSelector((state) => state?.employeeData?.users);
  const dispatch = useDispatch();

  const handleDeleteEmployee = (index) => {
    dispatch(RemoveEmployee(index));
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="employee-list-modal-title"
      aria-describedby="employee-list-modal-description"
    >
      <Box sx={style}>
        <Modaldiv>
          <Labeldiv>
            <Typography
              id="employee-list-modal-description"
              sx={{
                mt: 2,
                fontSize: "20px",
                textAlign: "center",
                mb: 2,
                width: "90%",
              }}
            >
              Employee List
            </Typography>
            {/* <StyledButton onClick={onClose}>X</StyledButton> */}
          </Labeldiv>
          <Table>
            <Tablehead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </Tablehead>
            <TableBody>
              {data && data.length > 0
                ? data?.map((emp_data, index) => {
                    return (
                      <TableRow>
                        <TableCell>{emp_data.user}</TableCell>
                        <TableCellAction>
                          {/* <StyledButton>
                            <EditIcon />
                          </StyledButton> */}
                          <StyledButton
                            onClick={() => handleDeleteEmployee(index)}
                          >
                            <DeleteIcon />
                          </StyledButton>
                        </TableCellAction>
                      </TableRow>
                    );
                  })
                : ""}
            </TableBody>
          </Table>
        </Modaldiv>
      </Box>
    </Modal>
  );
};

export default ListAllEmployeeModal;

const Labeldiv = styled.div`
  display: flex;
  align-items: center;
`;

const TableHeader = styled.th`
  padding: 8px;
`;

const TableBody = styled.tbody``;

const Tablehead = styled.thead`
  background-color: #f05537 !important;
  color: #fff;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background: #f6f9fc !important;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-right: 1px solid #ddd;
  width: 350px !important;
  text-align: center;
  font-weight: 600;
  font-family: Poppins, sans-serif !important;
`;
const TableCellAction = styled.td`
  padding: 8px;
  /* border: 1px solid #ddd; */
  display: flex;
  justify-content: space-evenly;
`;

const Modaldiv = styled.div``;

const StyledButton = styled(Button)`
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
`;
