import React, { Fragment } from "react";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar></Navbar>
      <Route exact path='/' component={Landing}></Route>
      {/* Every page except the landing page will have the container, landing page image must be all over */}
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </section>
    </Fragment>
  </Router>
);
export default App;
