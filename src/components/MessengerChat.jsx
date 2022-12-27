import React, { useContext } from "react";
import "./MessengerChat.scss";
import Avatar from "@mui/material/Avatar";
import MessengerMessages from "./MessengerMessages";
import MessengerChatInput from "./MessengerChatInput";
import { MessengerContext } from "../context/MessengerContext";

function MessengerChat() {
  const { name, profilePic, docId } = useContext(MessengerContext);

  return (
    <div className="messengerChat">
      <div className="messengerChat__info">
        <Avatar src={profilePic}></Avatar>
        <span>{name}</span>
      </div>
      {docId && (
        <>
          <MessengerMessages />
          <MessengerChatInput />
        </>
      )}
    </div>
  );
}

export default MessengerChat;
