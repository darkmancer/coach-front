import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../config/axios";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

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

export default function PayModal({ coachId, setTrigger}) {
    const history = useHistory();
    const { isAuthenticated} = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reviewScore, setReviewScore] = React.useState(0);
  
  const [input, setInput] = useState({
  
    review: "",
  });
  useEffect(() => {}, [input]);

  const handleClickOpen = () => {
    if(!isAuthenticated){
    alert("you must login first")
    history.push('/login')
    } else {
    setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const confirmReview = async () => {
    const {review} = input

    console.log("submit works");
    
    const res = await axios.post(`review/create-review/${coachId}`, {
      reviewScore,
      review,
    });
    console.log(res);
    setTrigger((prev)=> !prev)
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Write a review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Write a review</DialogTitle>

        <DialogActions>
          <Grid container spacing={2}>
          <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate this coach</Typography>
        <Rating
          name="simple-controlled"
          value={reviewScore}
          onChange={(event, newValue) => {
            setReviewScore(newValue);
          }}
        />
      </Box>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="review"
                label="Review"
                type="review"
                id="review"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => {
              confirmReview();
              handleClose();
            }}
          >
            CONFIRM REVIEW
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// handleConfirm has to be defined and sent as prop
{
  /* <ReviewModal
             
              /> */
}
