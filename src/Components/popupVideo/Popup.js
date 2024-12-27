import "./Popup.css";
import { Videos } from "../../Videos/Videos";
import React, { useState } from "react";
import playBtn from '../../Images/Video-play-icon.svg'
import { errorMessage } from "../../constants/errorMessages";

export default function Popup() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [videoToPlay, setVideoToPlay] = useState(null); // Track the video to play

  // Function to open the modal and set the video to play
  const openModal = (videoId) => {
    setVideoToPlay(videoId); // Set the video to be played
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setVideoToPlay(null); // Reset video to play
  };

  return (
    <>
    <div className="popupHeading">
      <h3>{errorMessage.eoiPopupHeading}</h3>
      <p>{errorMessage.eoiPopupMsg}</p>
    </div>
    <section>
      <div>
        <h3>
          Watch how Qrencia <span> benefited </span> experts
        </h3>
      </div>
      <div className="mainContainer">
        {Videos.map((video) => (
          <div className="videoContainer" key={video.id}>
            <div className="videoThumbnail" onClick={() => openModal(video.id)}>
              <img
                className="videoThumbnailImg"
                src={`https://img.youtube.com/vi/${video.src}/0.jpg`}
                alt={video.name}
              />
              <div className="playButton">
                <img src={playBtn} alt="Play Button" />
              </div>
            </div>
            <p>{video.name}</p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}> {/* Click outside to close */}
          <div className="modalContent" onClick={(e) => e.stopPropagation()}> {/* Prevent closing on clicking inside modal */}
            <button className="closeButton" onClick={closeModal}> &times; </button>
            <iframe
              className="videoPlayerModal"
              src={`https://www.youtube.com/embed/${Videos.find((video) => video.id === videoToPlay)?.src}`}
              title="Video"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
    </>
  );
}
