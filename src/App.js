import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import SessionPage from "./Pages/SessionPage";

function App() {
  return (
    <Router>
      <Switch>
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
