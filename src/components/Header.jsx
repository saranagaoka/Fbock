import React from "react";
import "./Header.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import MessageIcon from "@mui/icons-material/Message";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Avatar from "@mui/material/Avatar";
import { auth } from "../firebase";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  const goToTiktok = () => {
    window.open("https://www.tiktok.com/pl-PL/", "_blank");
  };

  const goToSlitherio = () => {
    window.open("https://slither.io/", "_blank");
  };

  return (
    <div className="header">
      <div className="header__left">
        <FiberManualRecordIcon />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="header__middle">
        <HomeIcon />
        <OndemandVideoIcon onClick={goToTiktok} />
        <VideogameAssetIcon onClick={goToSlitherio} />
      </div>
      <div className="header__right">
        <Link to="/messenger">
          <MessageIcon />
        </Link>

        <CircleNotificationsIcon />
        <button className="header__logOut" onClick={logoutOfApp}>
          <Avatar src={user?.photoUrl}></Avatar>Wyloguj
        </button>
      </div>
    </div>
  );
}

export default Header;
