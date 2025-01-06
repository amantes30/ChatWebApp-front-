"use client";
import { useEffect, useState } from "react";

import io from "socket.io-client";
const storedUsername = window.localStorage.getItem("username");
export function Chat() {
  const [textInput, setInput] = useState("");

  useEffect(() => {
    // if not using Sockets for listener on backend update message Handler here.
    try{
      const socket = io(process.env.REACT_APP_SERVER_URL);
      // Connect to the server and pass the storedUsername
      socket.on(
          "connect",
          () => {
            socket.emit("login", storedUsername);
          },
      );
      socket.on("send message", (msg, sender) => {
        MakeMessageHtml(msg, sender);
      });

      const form = document.getElementById("form");
      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", ()=>{handleLogout(socket)});
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        var message = e.target.elements.message.value;
        if (message) {
          socket.emit("send message", message, storedUsername);
          form.reset();
        }
      });
    }
    catch(err){
      alert("Backend Server is currently in down");
    }


  }, []);

  

  return (
    <>
      <div className="panel">
        <ul id="messages">{}</ul>
      </div>

      <form id="form" className="msg-inp-form">
        <textarea
          onChangeCapture={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Message"
          name="message"
          title=""
          rows={2}
          id="msgInp"
        />
        <div>
          {textInput === "" ? (
              <SendButton disabled={true}/>
          ) : (
              <SendButton disabled={false}/>
          )}
          <button id="logoutBtn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-power"
                viewBox="0 0 16 16"
            >
              <path d="M7.5 1v7h1V1z"/>
              <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

function SendButton({disabled}) {
  return (
      <button disabled={disabled} id="sendBtn">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
        >
          <path
              d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
      </svg>
    </button>
  );
}

function handleLogout(socket) {
  socket.emit("logout", storedUsername);
  window.localStorage.removeItem("username");
  window.location.href = "/";
}

function MakeMessageHtml(msg, sender){
  const item = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");

  p.textContent = sender[0];
  p.classList.add("username-txt");
  div.className = "msg-txt";
  div.textContent = msg;
  item.className = sender === storedUsername ? "msg i" : "msg";

  item.appendChild(div);
  item.appendChild(p);
  document.getElementById("messages").appendChild(item);

  document
      .getElementById("messages")
      .scrollTo(0, document.body.scrollHeight);
}
