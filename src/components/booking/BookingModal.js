import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Calendar from "./Calendar";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BookingModal({ coach, user }) {
  const history = useHistory();
  const { isAuthenticated} = useContext(AuthContext);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  console.log(user, coach);

  const handleOpen = () => {
    if(!isAuthenticated){
      alert("you must login first")
      history.push('/login')
    }else{
    setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Available Time for Today</h2>
      <Calendar coach={coach} user={user}></Calendar>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Book this Coach
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
