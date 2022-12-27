import React, { forwardRef } from "react";
import "./Sidebar.scss";
import Avatar from "@mui/material/Avatar";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Sidebar = forwardRef(({}, ref) => {
  const user = useSelector(selectUser);

  return (
    <div className="sidebar" ref={ref}>
      <div className="sidebar__item">
        <div className="sidebar__itemIcon">
          <Avatar src={user?.photoUrl}>{user.email[0]}</Avatar>
        </div>
        <h3>{user.displayName}</h3>
      </div>
      <div className="sidebar__item">
        <div className="sidebar__itemIcon">
          <Diversity1Icon />
        </div>
        <h3>ziomki</h3>
      </div>
    </div>
  );
});

export default Sidebar;
