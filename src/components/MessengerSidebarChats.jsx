import React, { useContext, useEffect, useState } from "react";

import "./MessengerSidebarChats.scss";
import { MessengerContext } from "../context/MessengerContext";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import MessengerSidebarChat from "./MessengerSidebarChat";

function MessengerSidebarChats() {
  const user = useSelector(selectUser);
  const [chatIds, setChatIds] = useState([]);

  const filterChatIds = (chats) =>
    chats.filter((chat) => chat.includes(user.uid));

  useEffect(() => {
    user &&
      db
        .collection("messages")
        .onSnapshot((snapshot) =>
          setChatIds(filterChatIds(snapshot.docs.map((doc) => doc.id)))
        );
  }, [user]);

  return (
    <div className="messengerSidebarChats">
      {chatIds.map((chatId) => {
        return <MessengerSidebarChat chatId={chatId} key={chatId} />;
      })}
    </div>
  );
}

export default MessengerSidebarChats;
