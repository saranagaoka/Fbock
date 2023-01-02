import { useState } from "react";
import { createContext } from "react";

export const MessengerContext = createContext({
  name: "",
  setName: () => {},
  profilePic: "",
  setProfilePic: () => {},
  uid: "",
  setUid: () => {},
  docId: "",
  setDocId: () => {},
  resetUser: () => {},
});
export const MessengerProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uid, setUid] = useState("");
  const [docId, setDocId] = useState("");

  const resetUser = () => {
    setName("");
    setProfilePic("");
    setUid("");
    setDocId("");
  };

  return (
    <MessengerContext.Provider
      value={{
        name: name,
        setName: setName,
        profilePic: profilePic,
        setProfilePic: setProfilePic,
        uid: uid,
        setUid: setUid,
        docId: docId,
        setDocId: setDocId,
        resetUser: resetUser,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
