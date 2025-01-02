import { useState } from "react";
import styles from "./Popup.module.css";
import { Videos } from "../../Videos/Videos";
import playBtn from '../../Images/Video-play-icon.svg';
import { errorMessage } from "../../constants/errorMessages";

export default function Popup() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [videoToPlay, setVideoToPlay] = useState(null); 

  const openModal = (videoId) => {
    setVideoToPlay(videoId); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setVideoToPlay(null); 
  };

  return (
    <>
      <div className={styles.popupHeading}>
        <h3>{errorMessage.eoiPopupHeading}</h3>
        <p>{errorMessage.eoiPopupMsg}</p>
      </div>
      <section>
        <div className={styles.sectionHeading}>
          <h3>
            Watch how Qrencia <span> benefited </span> experts
          </h3>
        </div>
        <div className={styles.mainContainer}>
          {Videos.map((video) => (
            <div className={styles.videoContainer} key={video.id}>
              <div className={styles.videoThumbnail} onClick={() => openModal(video.id)}>
                <img
                  className={styles.videoThumbnailImg}
                  src={`https://img.youtube.com/vi/${video.src}/0.jpg`}
                  alt={video.name}
                />
                <div className={styles.playButton}>
                  <img src={playBtn} alt="Play Button" />
                </div>
              </div>
              <p className={styles.videoName}>{video.name}</p>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> 
              <button className={styles.closeButton} onClick={closeModal}> &times; </button>
              <iframe
                className={styles.videoPlayerModal}
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
