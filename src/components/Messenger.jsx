import React from "react";
import MessengerChat from "./MessengerChat";
import MessengerSidebar from "./MessengerSidebar";
import "./Messenger.scss";

function Messenger() {
  return (
    <div className="messenger">
      <div className="messenger__container">
        <MessengerSidebar />
        <MessengerChat />
      </div>
    </div>
  );
}

export default Messenger;
