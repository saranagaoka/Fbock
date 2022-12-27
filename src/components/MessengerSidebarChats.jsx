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

  const getChatsWithUsers = (condition, callBack) => {
    db.collection("messages")
      .where("docId", condition, user.uid) //TODO: search for id at the end of docId
      .get()
      .then((queriedDocId) => {
        callBack(queriedDocId.docs.map((doc) => doc.data().docId));
      });
  };

  useEffect(() => {
    user &&
      getChatsWithUsers("<=", (chats) => {
        getChatsWithUsers(">=", (chats2) => {
          setChatIds([...chats, ...chats2]);
        });
      });

    // db
    //   .collection("messages")
    //   .where("docId", "<=", user.uid) //TODO: search for id at the end of docId
    //   .get()
    //   .then((queriedDocId) => {
    //     setChatIds(queriedDocId.docs.map((doc) => doc.data().docId));

    //   });
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