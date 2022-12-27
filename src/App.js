import React, { useEffect } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Widgets from "./components/Widgets";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import { auth } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messenger from "./components/Messenger.jsx";
import { MessengerProvider } from "./context/MessengerContext";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <MessengerProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <div className={`app ${!user ? "log" : ""}`}>
                {!user ? (
                  <Login />
                ) : (
                  <>
                    <Header />
                    <div className="app__body">
                      <Sidebar />
                      <Feed />
                      <Widgets />
                    </div>
                  </>
                )}
              </div>
            }
          />
          <Route path="messenger" element={<Messenger />} />
        </Routes>
      </BrowserRouter>
    </MessengerProvider>
  );
}

export default App;
