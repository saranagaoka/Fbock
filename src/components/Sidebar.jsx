import React, { forwardRef, useState, useContext } from "react";
import "./Sidebar.scss";
import Avatar from "@mui/material/Avatar";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { useSelector } from "react-redux";
import { selectUser, update } from "../features/userSlice";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { MessengerContext } from "../context/MessengerContext";
import { useDispatch } from "react-redux";

const Sidebar = forwardRef((_, ref) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch("");
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const { setDocId, setName, setProfilePic, setUid } =
    useContext(MessengerContext);

  const getUsers = () => {
    db.collection("users")
      .where("uid", "!=", user.uid)
      .get()
      .then((queriedUsers) => {
        setUsers(
          queriedUsers.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    setIsOpen((prev) => !prev);
  };

  const goToChatWithUser = (us) => {
    setDocId([user?.uid, us.data.uid].sort().join(""));
    setName(us.data.displayName);
    setProfilePic(us.data.photoUrl);
    setUid(us.data.uid);
  };

  const openProfileSettings = () => {
    setOpenProfile((prev) => !prev);
  };

  const sendUpdatedPhotoToFirebase = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user.uid)
      .update({ photoUrl: profilePhoto })
      .then(() => {
        dispatch(update({ photoUrl: profilePhoto }));
      });
    setProfilePhoto("");
  };

  return (
    <div className="sidebar" ref={ref}>
      <button className="sidebar__item" onClick={openProfileSettings}>
        <div className="sidebar__itemIcon">
          <Avatar src={user?.photoUrl}>{user.email[0]}</Avatar>
        </div>
        <h3>{user.displayName}</h3>
      </button>
      {openProfile && (
        <div className="sidebar__openProfile">
          <form onSubmit={sendUpdatedPhotoToFirebase}>
            <input
              type="text"
              placeholder="Picture URL"
              value={profilePhoto}
              onChange={(e) => {
                setProfilePhoto(e.target.value);
              }}
            />
          </form>
          <button onClick={sendUpdatedPhotoToFirebase}>save</button>
        </div>
      )}
      <button className="sidebar__item" onClick={getUsers}>
        <div className="sidebar__itemIcon">
          <Diversity1Icon />
        </div>
        <h3>users</h3>
      </button>
      {isOpen && (
        <div className="sidebar__users">
          {users.map((us) => (
            <Link to="/messenger">
              <button
                className="sidebar__user"
                onClick={() => {
                  goToChatWithUser(us);
                }}
              >
                <Avatar src={us?.data.photoUrl}>
                  {us?.data.displayName[0]}
                </Avatar>

                {us?.data.displayName}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

export default Sidebar;
