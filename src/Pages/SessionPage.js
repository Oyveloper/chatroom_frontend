import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

import errorHandler from "../common/errorHandler";
import Spinner from "../components/Spinner";

import "./Page.css";

export default function SessionPage() {
  const { room } = useParams();
  const [roomStatus, setRoomStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/sessions/${room}`)
      .then(errorHandler)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setRoomStatus("OK");
      })
      .catch((error) => {
        console.log(error);
        setRoomStatus("ERROR");
      });
  }, [room]);

  useEffect(() => {
    if (roomStatus === "OK") {
      connectToBackendTest();
    }
  }, [roomStatus]);

  let content = null;

  if (roomStatus === "") {
    content = <Spinner />;
  } else if (roomStatus === "ERROR") {
    content = "ERROR! The room does not exist";
  } else {
    content = <div className="SessionPage">{room}</div>;
  }

  return <div className="Page">{content}</div>;
}

let stompClient = null;

function connectToBackendTest() {
  let socket = new SockJS("http://localhost:8080/message-websocket");
  stompClient = Stomp.over(socket);
  console.log(stompClient);
  stompClient.connect({}, function (frame) {
    console.log("Connected");
    stompClient.subscribe("/topic/greetings", (greeting) => {});

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
