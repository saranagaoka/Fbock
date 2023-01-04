import React, { useState, useContext, useEffect } from "react";
import "./MessengerSidebarSearch.scss";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../firebase";
import { MessengerContext } from "../context/MessengerContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function MessengerSidebarSearch() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { setName, setProfilePic, setUid, setDocId } =
    useContext(MessengerContext);
  const user = useSelector(selectUser);

  const findUser = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    inputValue
      ? db
          .collection("users")
          .where("key", ">=", inputValue.toLowerCase())
          .where("key", "<=", inputValue.toLowerCase() + "\uf8ff")
          .get()
          .then((queriedUsers) => {
            setUsers(
              queriedUsers.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          })
      : setUsers([]);
  }, [inputValue]);

  return (
    <div className="messengerSidebarSearch">
      <div className="messengerSidebarSearch__form">
        <SearchIcon />
        <input
          type="text"
          placeholder="Find a user"
          onChange={findUser}
          value={inputValue}
        />
      </div>

      {users.map(({ id, data: { displayName, photoUrl, uid } }) => {
        const pickUser = () => {
          setName(displayName);
          setProfilePic(photoUrl);
          setUid(uid);
          setDocId([user?.uid, uid].sort().join(""));
          setInputValue("");
        };

        return (
          <button
            key={id}
            className="messengerSidebarSearch__userChat"
            onClick={pickUser}
          >
            <Avatar src={photoUrl}></Avatar>
            <div className="messengerSidebarSearch__userChatInfo">
              <span>{displayName}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MessengerSidebarSearch;
