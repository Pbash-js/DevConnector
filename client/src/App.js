import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import setAuthHeaders from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./profile-forms/CreateProfile";
import EditProfile from "./profile-forms/EditProfile";
import AddEducation from "./profile-forms/AddEducation";
import AddExperience from "./profile-forms/AddExperience";
import Profiles from "./components/Profiles/Profiles";
import ProfileItem from "./components/Profiles/ProfileItem";
import Posts from "./posts/Posts";
import Post from "./posts/Post";
import NotFound from "./components/NotFound";

if (localStorage.token) {
  setAuthHeaders(localStorage.token);
  <Redirect to="/dashboard" />;
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Alert />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={ProfileItem} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />

              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Router>
      </Provider>
    </>
  );
};

export default App;
