import React from "react";
import "./Comment.scss";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";

const Comment = ({ name, photoUrl, comment }) => {
  const user = useSelector(selectUser);

  return (
    <div className="comment">
      <div className="comment__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <p>{name}</p>
      </div>
      <div className="comment__body">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
