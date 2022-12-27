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
});
export const MessengerProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uid, setUid] = useState("");
  const [docId, setDocId] = useState("");
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
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
