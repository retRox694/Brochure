import "./Trial.css";
import { Videos } from "../../Videos/Videos";
import React, { useState } from "react";

export default function Popup() {
  // State to manage which video is playing (video ID)
  const [playingVideo, setPlayingVideo] = useState(null);

  // Function to handle video play on thumbnail click
  const handlePlay = (videoId) => {
    setPlayingVideo(videoId); // Set the current video to be played
  };

  return (
    <section>
      <div>
        <h3>
          Watch how Qrencia <span> benefited </span> experts
        </h3>
      </div>
      <div className="mainContainer">
        {Videos.map((video) => {
          const isPlaying = playingVideo === video.id; // Check if the video is playing

          return (
            <div className="videoContainer" key={video.id}>
              {isPlaying ? (
                // Show the iframe when the video is playing
                <iframe
                  className="videoPlayer"
                  src={`https://www.youtube.com/embed/${video.src}?autoplay=1`}
                  title={video.name}
                  allowFullScreen
                ></iframe>
              ) : (
                // Show the thumbnail before the video is played
                <div
                  className="thumbnailContainer"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${video.src}/maxresdefault.jpg)`,
                  }}
                  onClick={() => handlePlay(video.id)} // Play video on click
                >
                  <div className="playButton">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="white"
                    >
                      <polygon points="0,0 50,25 0,50" />
                    </svg>
                  </div>
                </div>
              )}
              <p>{video.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
