import React, { useState } from "react";
import PanoramaIcon from "@mui/icons-material/Panorama";
import "./FeedPostBox.scss";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import LinearProgress from "@mui/material/LinearProgress";

function FeedPostBox() {
  const user = useSelector(selectUser);
  const [displayPictureUrl, setDisplayPictureUrl] = useState(false);
  const [input, setInput] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const addPicture = () => {
    setDisplayPictureUrl((displayPicture) => !displayPicture);
  };
  const sendPost = (e) => {
    e.preventDefault();
    setLoading(true);
    db.collection("posts")
      .add({
        name: user.displayName,
        photoUrl: user.photoUrl || "",
        message: input,
        picture: picture || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setInput("");
        setLoading(false);
      });
  };

  return (
    <div className="feedPostBox__wrapper">
      <div className="feedPostBox">
        <form onSubmit={sendPost}>
          <input
            className="feedPostBox__textBox"
            type="text"
            placeholder="What's up, Buddie?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
        </form>

        <div className="feedPostBox__buttons">
          {displayPictureUrl && (
            <input
              className="feedPostBox__url"
              type="text"
              placeholder="Optional pic URL"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          )}
          <button className="feedPostBox__pic" onClick={addPicture}>
            <PanoramaIcon />
          </button>
          <button
            className="feedPostBox__send"
            onClick={sendPost}
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
      <div className="feedPostBox__loading">
        {loading && <LinearProgress />}
      </div>
    </div>
  );
}

export default FeedPostBox;
