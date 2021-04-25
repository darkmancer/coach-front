import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import AllGames from "./pages/AllGames";
import Home from "./pages/Home";
import CoachProfile from "./pages/CoachProfile";
import User from "./pages/User";
import { AuthContext } from "./contexts/AuthContextProvider";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <div>
      {!isAuthenticated && (
        <Switch>
          <Route exact path="/login" component={Auth} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/allgames" component={AllGames} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/coach-profile/:id" component={CoachProfile} />
          <Redirect to="/home" />
        </Switch>
      )}
      {isAuthenticated && (
        <Switch>
          <Route exact path="/allgames" component={AllGames} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/coach-profile/:id" component={CoachProfile} />
          <Route exact path="/user" component={User} />
          <Redirect to="/home" />
        </Switch>
      )}
    </div>
  );
}

export default App;
