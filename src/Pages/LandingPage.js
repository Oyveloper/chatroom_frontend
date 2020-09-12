import React, { useState } from "react";

// Styles
import "./Page.css";
import "./LandingPage.css";

import errorHandler from "../common/errorHandler";

export default function LandingPage() {
  const welcomeDialog = (
    <div className="LandingDialog" id="MessageContainer">
      <h1>Welcome to Open Chatroom</h1>
      <div id="WelcomeActionContainer">
        <a className="button button-blue" href="/join">
          Join room by code
        </a>
        <a href="/create" className="button button-blue">
          Create new Room
        </a>
      </div>
    </div>
  );

  return <div className="LandingPage Page">{welcomeDialog}</div>;
}

const createRoomByCode = async (code) => {
  return fetch(`http://localhost:8080/sessions/${code}`, { method: "POST" })
    .then(errorHandler)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.log("Error when creating new session");
      return false;
    });
};
