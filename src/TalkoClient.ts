import * as io from "socket.io-client";

// require("dotenv").config();
// const PORT = process.env.CLIENT_PORT || 5050;
var socket;
var name;
// session: Session;

export default class TalkoClient {
  // constructor() {
  //   this.session = session;
  // }

  start = (port, upState, username) => {
    socket = io(":" + port);
    name = username;

    socket.on("connect", () => {
      alert("CONNECTED to Chat Server!");
    });

    socket.on("greeting", message => {
      // upState(message);
      console.log("SERVER: " + message);
    });

    socket.on("disconnect", message => {
      // upState();
      alert(
        "SERVER MESSAGE: " +
          message +
          "\nADD DISCONNECT HERE IN /src/client/TakoClient.js"
      );
      console.log("SERVER: " + message.content);
    });

    socket.on("send_message", message => {
      upState(message);
      console.log("RCVD: " + message.content);
    });
  };

  sendMessage = message => {
    console.log("SENT: " + message.content);
    socket.emit("send_message", message);
  };
}
