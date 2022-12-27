import React, { useContext } from "react";
import "./MessengerSidebarChat.scss";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import { useEffect } from "react";
import { MessengerContext } from "../context/MessengerContext";

function MessengerSidebarChat({ chatId }) {
  const user = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState();
  const [lastMessage, setLastMessage] = useState("");
  const { setName, setProfilePic, setUid, setDocId } =
    useContext(MessengerContext);
  const chatWithUserId = chatId.replace(user.uid, "");

  const setChat = () => {
    setName(userInfo.displayName);
    setProfilePic(userInfo.photoUrl);
    setUid(userInfo.uid);
    setDocId([user?.uid, userInfo.uid].sort().join(""));
  };

  useEffect(() => {
    db.collection("users")
      .where("uid", "==", chatWithUserId)
      .get()
      .then((queriedUsers) => {
        setUserInfo(queriedUsers.docs.map((doc) => doc.data())[0]);
      });
    db.collection("messages")
      .doc(chatId)
      .collection("chat")
      .orderBy("timestamp", "asc")
      .limitToLast(1)
      .onSnapshot((queriedMessages) => {
        setLastMessage(
          queriedMessages.docs.map((doc) => doc.data())[0].message
        );
      });
  }, []);

  return (
    <button className="messengerSidebarChat" onClick={setChat}>
      {userInfo ? (
        <div className="messengerSidebarChat__userChat">
          <Avatar src={userInfo.photoUrl}></Avatar>
          <div className="messengerSidebarChat__userChatInfo">
            <span>{userInfo.displayName}</span>
            <p>{lastMessage}</p>
          </div>
        </div>
      ) : (
        <div className="messengerSidebarChat__noInfo">Loading</div>
      )}
    </button>
  );
}
export default MessengerSidebarChat;
