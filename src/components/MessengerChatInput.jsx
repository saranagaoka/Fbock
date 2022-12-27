import React, { useState, useRef, useContext } from "react";
import "./MessengerChatInput.scss";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { MessengerContext } from "../context/MessengerContext";

function MessengerChatInput() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const inputRef = useRef(null);
  const { docId, uid } = useContext(MessengerContext);

  const fileSelect = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPicture(reader.result);
    };
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    db.collection("messages")
      .doc(docId)
      .collection("chat")
      .add({
        message: input,
        picture: picture || "",
        uid: user.uid,
        // do wyjebania jak cos ale dopiero na koniec koniec koniec
        uid2: uid,
        docId: docId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        db.collection("messages")
          .doc(docId)
          .set({ docId: docId })
          .then(() => {
            setInput("");
            setPicture("");
            setLoading(false);
            setTimeout(() => {
              inputRef.current.focus();
            }, 0);
          });
      });
  };
  return (
    <div className="messengerChatInput">
      <form onSubmit={sendMessage}>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          placeholder="Napisz wiadomość.."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
        />
        {picture != "" && (
          <div className="messengerChatInput__picture">
            <img src={picture} alt="added pic" />
          </div>
        )}
      </form>
      <div className="messengerChatInput__send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={fileSelect}
          className="messengerChatInput__pictureInput"
        />

        <label htmlFor="file">
          <WallpaperIcon />
        </label>
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MessengerChatInput;
