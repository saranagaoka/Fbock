import React, { useContext } from "react";
import "./MessengerChat.scss";
import Avatar from "@mui/material/Avatar";
import MessengerMessages from "./MessengerMessages";
import MessengerChatInput from "./MessengerChatInput";
import { MessengerContext } from "../context/MessengerContext";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

function MessengerChat() {
  const { name, profilePic, docId } = useContext(MessengerContext);

  return (
    <div className="messengerChat">
      {docId ? (
        <>
          <div className="messengerChat__info">
            <Avatar src={profilePic}></Avatar>
            <span>{name}</span>
          </div>
          <MessengerMessages />
          <MessengerChatInput />
        </>
      ) : (
        <div className="messengerChat__noMessages">
          <p>Choose a user</p>
          <ForumOutlinedIcon />
        </div>
      )}
    </div>
  );
}

export default MessengerChat;
