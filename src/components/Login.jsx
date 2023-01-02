import React, { useState } from "react";
import "./Login.scss";
import { auth, db, storage } from "../firebase";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Login() {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch("");

  // const storageRef = ref(storage, displayName);

  // const uploadTask = uploadBytesResumable(storageRef, file);

  const register = () => {
    if (!name) {
      return alert("Please enter your name :)");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({ displayName: name, photoURL: profilePic })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
            db.collection("users").add({
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profilePic,
              key: name.toLowerCase(),
            });
          });
      })
      .catch((error) => alert(error));
  };

  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="login">
      <h1>Hi :D Welcome to Fbock</h1>
      <p>
        Login to your account by hitting "Sign in" button or enter data and hit
        "Register now"
      </p>
      <p> Theeenks, Sara</p>
      <form>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Pic URL"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={loginToApp}>
          Sign in
        </button>
        <div className="login__text">Not a member?</div>
        <button className="login__register" onClick={register}>
          Register now
        </button>
      </form>

      {/* <input type="file" accept="image/png, image/jpg" /> */}
    </div>
  );
}

export default Login;
