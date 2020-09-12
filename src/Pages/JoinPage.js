import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./JoinPage.css";

export default function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const history = useHistory();
  return (
    <div className="Page" id="JoinPage">
      <form action="">
        <h1>Enter the code for the room you want to enter</h1>

        <input
          name="roomCode"
          type="text"
          value={roomCode}
          onChange={(event) => {
            setRoomCode(event.target.value);
          }}
        />

        <button
          class="button button-blue"
          onClick={() => {
            history.push(`/sessions/${roomCode}`);
          }}
        >
          Join Room
        </button>
      </form>
    </div>
  );
}
