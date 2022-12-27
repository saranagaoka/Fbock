import React, { useContext } from "react";
import "./MessengerMessage.scss";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import dayjs from "dayjs";
import { MessengerContext } from "../context/MessengerContext";
import { useState } from "react";
import { useEffect } from "react";

function MessengerMessage({ uid, photoUrl, timestamp, message, picture }) {
  const { name, profilePic, docId } = useContext(MessengerContext);
  const user = useSelector(selectUser);
  const [timer, setTimer] = useState("now");

  const isOwner = user.uid == uid;
  const messageTimestamp = dayjs((timestamp?.seconds || 0) * 1000);

  const getTimeInMinutes = () => dayjs().diff(messageTimestamp, "minute");

  const formatTime = (t) => {
    return t < 1
      ? "now"
      : t < 60
      ? `${t} min`
      : t < 24 * 60
      ? messageTimestamp.format("HH:mm")
      : messageTimestamp.format("HH:mm DD-MM-YY");
  };

  const updateTime = () => {
    if (getTimeInMinutes() < 60) {
      const interval = setInterval(() => {
        getTimeInMinutes() < 60
          ? setTimer(formatTime(getTimeInMinutes()))
          : clearInterval(interval);
      }, 1000);
    } else {
      setTimer(formatTime(getTimeInMinutes()));
    }
  };

  useEffect(() => {
    updateTime();
  }, [timestamp]);

  return (
    <div className={isOwner ? "messengerMessage__owner" : "messengerMessage"}>
      <div className="messengerMessage__info">
        <Avatar src={isOwner ? user.photoUrl : profilePic}>
          {user.displayName[0]}
        </Avatar>
        <span>{timer}</span>
      </div>
      <div className="messengerMessage__content">
        <p>{message}</p>
        {picture && <img src={picture} alt="message photo" />}
      </div>
    </div>
  );
}

export default MessengerMessage;
