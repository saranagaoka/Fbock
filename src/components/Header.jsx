import React, { useContext, useState } from "react";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import MessageIcon from "@mui/icons-material/Message";
import Avatar from "@mui/material/Avatar";
import { auth, db } from "../firebase";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessengerContext } from "../context/MessengerContext";
import logo from "../images/solidarity.png";

function Header() {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);

  const { resetUser, setName, setProfilePic, setUid, setDocId } =
    useContext(MessengerContext);

  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    resetUser();
  };
  const goToTiktok = () => {
    window.open("https://www.tiktok.com/pl-PL/", "_blank");
  };

  const goToSlitherio = () => {
    window.open("https://slither.io/", "_blank");
  };

  const goToGitHub = () => {
    window.open("https://github.com/saranagaoka/Fbock", "_blank");
  };

  const findUser = (e) => {
    const inputValue = e.target.value;
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
  };

  return (
    <div className="header">
      <div className="header__left">
        <img width={30} height={30} src={logo} alt="app icon" />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" onChange={findUser} />
          <div className="header__searchbar">
            {users.map(({ id, data: { displayName, photoUrl, uid } }) => {
              const pickUser = () => {
                setName(displayName);
                setProfilePic(photoUrl);
                setUid(uid);
                setDocId([user?.uid, uid].sort().join(""));
              };

              return (
                <Link to="/messenger">
                  <button
                    key={id}
                    className="header__searchUser"
                    onClick={pickUser}
                  >
                    <div className="header__userChatInfo">
                      <Avatar src={photoUrl}></Avatar>

                      <span>{displayName}</span>
                    </div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="header__middle">
        <HomeIcon onClick={goToGitHub} />
        <OndemandVideoIcon onClick={goToTiktok} />
        <VideogameAssetIcon onClick={goToSlitherio} />
      </div>
      <div className="header__right">
        <Link to="/messenger" onClick={resetUser}>
          <MessageIcon />
        </Link>

        <button className="header__logOut" onClick={logoutOfApp}>
          <Avatar src={user?.photoUrl}></Avatar>Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
