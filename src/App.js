import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import SessionPage from "./Pages/SessionPage";

import JoinPage from "./Pages/JoinPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join">
          <JoinPage />
        </Route>
        <Route path="/random">Random</Route>

        <Route path="/sessions/:room">
          <SessionPage />
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
