import React, { useState } from "react";

// Styles
import "./Page.css";
import "./LandingPage.css";

import errorHandler from "../common/errorHandler";
import { Redirect } from "react-router-dom";

export default function LandingPage() {
  const [joinMethod, setJoinMethod] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const [joinedRoom, setJoinedRoom] = useState(false);

  const joinDialog = (
    <div
      className={`LandingDialog ${joinMethod === "join" ? "ActiveDialog" : ""}`}
    >
      <label htmlFor="joinRoomId">
        Enter the code for the room you want to join
      </label>
      <br />
      <input
        name="joinRoomId"
        id="joinRoomId"
        type="text"
        value={roomCode}
        placeholder="Enter a room code"
        onChange={(event) => setRoomCode(event.target.value)}
      />

      <button
        onClick={() => {
          setJoinedRoom(roomCode);
        }}
      ></button>
    </div>
  );

  const createDialog = (
    <div
      id="create-dialog"
      className={`LandingDialog ${
        joinMethod === "create" ? "ActiveDialog" : ""
      }`}
    >
      <h1>Enter a room code for your new room</h1>
      <br />
      <input
        name="createRoomId"
        id="createRoomId"
        type="text"
        value={roomCode}
        placeholder="Enter a room code or leave empty for a random code"
        onChange={(event) => {
          setRoomCode(event.target.value);
        }}
      />
      <button
        className="button button-blue"
        onClick={() => {
          createRoomByCode(roomCode).then((success) => {
            if (success) {
              setJoinedRoom(true);
            }
          });
        }}
      >
        Join room
      </button>
    </div>
  );

  const welcomeDialog = (
    <div
      className={`LandingDialog ${joinMethod === "" ? "ActiveDialog" : ""}`}
      id="MessageContainer"
    >
      <h1>Welcome to Open Chatroom</h1>
      <div id="WelcomeActionContainer">
        <button
          className="button button-blue"
          type="button"
          onClick={() => {
            setJoinMethod("code");
          }}
        >
          Join room by code
        </button>
        <button
          className="button button-blue"
          type="button"
          onClick={() => {
            setJoinMethod("create");
          }}
        >
          Create new Room
        </button>
      </div>
    </div>
  );

  if (joinedRoom) {
    return <Redirect to={`/sessions/${roomCode}`} />;
  }

  return (
    <div className="LandingPage Page">
      {welcomeDialog}
      {createDialog}
      {joinDialog}
    </div>
  );
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
