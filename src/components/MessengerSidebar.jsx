import React from "react";
import "./MessengerSidebar.scss";
import MessengerSidebarChats from "./MessengerSidebarChats";
import MessengerSidebarNavbar from "./MessengerSidebarNavbar.jsx";
import MessengerSidebarSearch from "./MessengerSidebarSearch";

function MessengerSidebar() {
  return (
    <div className="messengerSidebar">
      <MessengerSidebarNavbar />
      <MessengerSidebarSearch />
      <MessengerSidebarChats />
    </div>
  );
}

export default MessengerSidebar;
