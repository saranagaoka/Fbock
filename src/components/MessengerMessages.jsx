import React, { useContext, useEffect, useRef, useState } from "react";
import MessengerMessage from "./MessengerMessage";
import "./MessengerMessages.scss";
import { db } from "../firebase";
import { MessengerContext } from "../context/MessengerContext";

function MessengerMessages() {
  const [messages, setMessages] = useState([]);
  const { docId } = useContext(MessengerContext);

  useEffect(() => {
    db.collection("messages")
      .doc(docId)
      .collection("chat")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [docId]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messengerMessages">
      {messages.length > 0 ? (
        messages.map(
          ({
            id,
            data: { name, message, photoUrl, picture, timestamp, uid },
          }) =>
            timestamp && (
              <MessengerMessage
                key={id}
                name={name}
                message={message}
                photoUrl={photoUrl}
                picture={picture}
                timestamp={timestamp}
                uid={uid}
              />
            )
        )
      ) : (
        <p>no messages</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessengerMessages;
