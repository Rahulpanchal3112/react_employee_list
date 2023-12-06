import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  bgcolor: "#fff", // Set background color
  border: "1px solid #eaecf0", // Set border properties
  borderRadius: "0.75rem", // Set border radius
  boxShadow: "0 5px 28px #0000000f", // Set box-shadow
};

const DeleteModal = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={style}>
        <Modaldiv>
          <Typography
            id="delete-modal-description"
            sx={{ mt: 2, fontSize: "20px" }}
          >
            Are You Sure You Want To Delete?
          </Typography>
          <Buttondiv>
            <StyledButton onClick={onConfirmDelete}>Yes</StyledButton>
            <StyledButton onClick={onClose}>Cancel</StyledButton>
          </Buttondiv>
        </Modaldiv>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
const Buttondiv = styled.div`
  display: flex;
  gap: 15px;
`;

const Modaldiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
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
  text-transform: capitalize !important;
`;
