import React from "react";
import "./Widgets.scss";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__messenger">
        <div className="widgets__header">
          <p>Podcasts</p>
        </div>
        <div className="widgets__contacts">
          <iframe
            height="180"
            src="https://www.youtube.com/embed/5ENcCdmxsSM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <iframe
            src="https://open.spotify.com/embed/episode/27mgOnpWSLyc2KFbEyVr8q?utm_source=generator&t=0"
            width="100%"
            title="spotify podcast"
            height="140"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            src="https://open.spotify.com/embed/episode/58sM5E2Gg6sjjyW2bVgKgg?utm_source=generator&t=0"
            width="100%"
            height="140"
            title="spotify podcast 2"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            src="https://open.spotify.com/embed/playlist/1ZPHBmsAdCQJdDDgt35reA?utm_source=generator"
            width="100%"
            title="spotify podcast playlist"
            height="140"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            src="https://open.spotify.com/embed/playlist/5GUtmRhAjpVYZUD7CHriLW?utm_source=generator"
            width="100%"
            height="140"
            frameBorder="0"
            title="spotify music playlist"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
