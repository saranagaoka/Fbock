import React, { forwardRef, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./Post.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "./Comment.jsx";
import firebase from "firebase/compat/app";

const Post = forwardRef(
  ({ name, message, photoUrl, picture, postId, likes }, ref) => {
    const user = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [sending, setSending] = useState(false);
    const [comments, setComments] = useState([]);
    useEffect(() => {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }, []);
    const sentComment = (e) => {
      e.preventDefault();
      setSending(true);
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          name: user.displayName,
          photoUrl: user.photoUrl || "",
          comment: comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setComment("");
          setSending(false);
          setOpen(true);
        });
    };
    const liked = !!likes.find((el) => el == user.uid);
    const like = () => {
      const newLikes = liked
        ? likes.filter((l) => l != user.uid)
        : [...likes, user.uid];
      db.collection("posts").doc(postId).update({ likes: newLikes });
    };
    const handleOpenComments = () => {
      setOpen((prev) => !prev);
    };

    return (
      <div ref={ref} className="post">
        <div className="post__body">
          {picture && <img src={picture} alt="your pic here" />}
          <div
            className={`post__message ${picture ? "post__displayPicture" : ""}`}
          >
            <div className="post__header">
              <Avatar src={photoUrl}>{name[0]}</Avatar>
              <div className="post__info">
                <p>{name}</p>
              </div>
              <div className="post__infoLike">
                <p>{likes?.length || ""}</p>
                <button onClick={like}>
                  {liked ? (
                    <FavoriteIcon fontSize="small" color="error" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>
            <p>{message}</p>
          </div>
        </div>

        <div className="post__footer">
          <div className="post__footerCommentBox">
            <button
              className="post__footerCommentButton"
              onClick={handleOpenComments}
            >
              <p>{comments.length || ""}</p>
              <ChatBubbleOutlineIcon fontSize="small" />
            </button>

            <form onSubmit={sentComment}>
              <input
                type="text"
                placeholder="Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={sending}
              />
            </form>
          </div>

          {open && (
            <div className="post__comments">
              {comments.map(({ id, data }) => (
                <Comment
                  key={id}
                  name={data.name}
                  photoUrl={data.photoUrl}
                  comment={data.comment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Post;
