import React, { useEffect, useState } from "react";
import "./Feed.scss";
import FeedPostBox from "./FeedPostBox";
import Post from "./Post";
import { db } from "../firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="feed">
      <FeedPostBox />

      <div className="feed__posts">
        <FlipMove>
          {posts.map(
            ({ id, data: { name, message, photoUrl, picture, likes } }) => (
              <Post
                key={id}
                name={name}
                message={message}
                photoUrl={photoUrl}
                picture={picture}
                postId={id}
                likes={likes || []}
              />
            )
          )}
        </FlipMove>
      </div>
    </div>
  );
}

export default Feed;
