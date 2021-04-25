import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../config/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function PayModal({ bookingId, message, title, button }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [paymentSlip, setPaymentSlip] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmPayment = async () => {
    console.log(`bookingId`, bookingId);
    const formData = new FormData();
    formData.append("bookingId", bookingId);
    formData.append("image", paymentSlip);
    await axios.put("/upload-slip/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setOpen(false);
    // setOpenConfirmBookModal(false)
    // fetchReservations().then(() => {
    //   setOpenSnackbar({
    //     open: true,
    //     status: 'success',
    //     message: 'Reservation booked successfully!'
    //   })
    // })
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
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            single
            type="file"
            onChange={(e) => {
              setPaymentSlip(e.target.files[0]);
            }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <p>{paymentSlip.name}</p>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => {
              confirmPayment();
              handleClose();
            }}
          >
            CONFIRM PAYMENT
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
