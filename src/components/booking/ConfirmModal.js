import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../config/axios";
import moment from "moment";
import localStorageService from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";

export default function ConfirmModal({ info }) {
  const [open, setOpen] = React.useState(false);
  const { bookingTime, coach, game } = info;
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    axios.post(`/booking/create/${coach.id}`, {
      bookingTime,
      status: "PENDING",
      game,
      userId: user.id,
    });

    setOpen(false);
    alert("booking completed");
  };

  console.log(bookingTime, "time");
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Confirm this booking?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm this Booking?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bookingTime
              .split("-")
              .map((part) => moment(part).format("DD MMM YYYY HH:mm"))
              .join(" - ")}
            <hr></hr>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              Game: {game} <br></br>Coach: {coach.username} <br></br>
              Rank: {coach.rank}
              <img src={coach.avatar} width="20%" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
