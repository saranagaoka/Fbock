import React, { useContext, useEffect, useRef, useState } from "react";
import MessengerMessage from "./MessengerMessage";
import "./MessengerMessages.scss";
import { db } from "../firebase";
import { MessengerContext } from "../context/MessengerContext";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

function MessengerMessages() {
  const [messages, setMessages] = useState([]);
  const { docId, unsubscribe, setUnsubscribe } = useContext(MessengerContext);
  const scrollToBottom = useScrollToBottom();

  const getData = () => {
    unsubscribe && unsubscribe();
    let unsub = db
      .collection("messages")
      .doc(docId)
      .collection("chat")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    setUnsubscribe(() => unsub);
  };

  useEffect(() => {
    getData();
  }, [docId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollToBottom className="messagesScroll">
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
      </div>
    </ScrollToBottom>
  );
}

export default MessengerMessages;
