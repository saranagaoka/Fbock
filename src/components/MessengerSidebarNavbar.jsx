import React from "react";
import "./MessengerSidebarNavbar.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function MessengerSidebarNavbar() {
  const user = useSelector(selectUser);
  const backFunction = () => {};
  return (
    <div className="messengerSidebarNavbar">
      <span className="messengerSidebarNavbar__logo">
        <Link to="/">
          <ArrowBackIosIcon onClick={backFunction} />
        </Link>
        <p>Chitty Chatty</p>
      </span>
      <div className="messengerSidebarNavbar__user">
        <Avatar src={user?.photoUrl}>{user?.email[0]}</Avatar>
        <span>{user?.displayName}</span>
      </div>
    </div>
  );
}

export default MessengerSidebarNavbar;
