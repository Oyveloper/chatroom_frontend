import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(Stomp);
    connectToBackendTest(setMessage);
  });

  const latestMessageDisplay = (
    <div className="messageDisplay">
      <p>{message}</p>
    </div>
  );

  return <div className="App">{latestMessageDisplay}</div>;
}

let stompClient = null;
function connectToBackendTest(setMessage) {
  let socket = new SockJS("http://localhost:8080/message-websocket");
  stompClient = Stomp.over(socket);
  console.log(stompClient);
  stompClient.connect({}, function (frame) {
    console.log("Connected");
    stompClient.subscribe("/topic/greetings", (greeting) => {
      setMessage(greeting.body);
    });

    sendMessage();
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  console.log("Disconnect");
}

function sendMessage() {
  stompClient.send("/app/greetings", {}, JSON.stringify({ content: "me" }));
}

function showGreeting() {}

export default App;
