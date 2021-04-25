import { useContext, useState } from "react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";
import localStorageService from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { BottomNavigation } from "@material-ui/core";
import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import {useQuery} from "react-query"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        playpal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { setIsAuthenticated, setUser, user } = useContext(AuthContext);
  const history = useHistory();

  // const fetchUsers = () => {
  //   const res = await axios.post("/login", { username, password });
  // }
  // const {data, status} = useQuery("users", fetchUsers)

  // const validateInput = () => {
  //   const newError = {};
  //   if (!username) newError.username = "username is required";
  //   if (!password) newError.password = "password is required";
  //   setError(newError);
  // };

  const handleSubmit = async (e) => {
    try {
      console.log("submit called");
      e.preventDefault();
      // validateInput();
      const res = await axios.post("/login", { username, password });
      // console.log(res);
      if (res.status == 400) {
        console.log("log in failed");
        history.push("/login");
        return;
      }
      localStorageService.setToken(res.data.token);
      setIsAuthenticated(true);
      const decoded = jwt_decode(res.data.token);
      console.log(`decoded`, decoded);
      await setUser(decoded);

      history.push("/home");
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => history.push("/register")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default Login;
