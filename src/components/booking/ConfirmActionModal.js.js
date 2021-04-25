import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../config/axios";
import moment from "moment";

export default function ConfirmActionModal({ handleConfirm, message, title, button }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button
            onClick={() => {
              handleConfirm();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// handleConfirm has to be defined and sent as prop
{
  /* <PayModal
                handleConfirm={handleCancel}
                button="CANCEL BOOKING"
                message="You are cancelling this booking. Are you sure?"
                title="Cancelling booking..."
              /> */
}
