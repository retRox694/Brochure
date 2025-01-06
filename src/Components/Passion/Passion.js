import { useState } from "react";
import { passionDetails } from "../../constants/passionDetails";
import styles from "./Passion.module.css"; 
import { errorMessage } from "../../constants/errorMessages";

export default function Passion() {
  const [selectedId, setSelectedId] = useState(passionDetails[0]?.id);

  const handleImageClick = (id) => {
    if (selectedId !== id) {
      setSelectedId(id);
    }
  };

  const handleJoinNowClick = () => {
    const formSection = document.getElementById("formSection");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={styles.passionHeading}>
        <h3>{errorMessage.eoiPassionHeading}</h3>
        <p>{errorMessage.eoiPassionDesc}</p>
      </div>

      <div className={styles.passionMain}>
        <div className={styles.passionNavbar}>
          {passionDetails.map((item) => (
            <div key={item.id} className={`${styles.passionItem} ${selectedId === item.id ? styles.selectedItem : ''}`} onClick={() => handleImageClick(item.id)} style={selectedId !== item.id ? { filter: "grayscale(100%)" } : {}}
>
              <img
                src={item.src}
                alt={item.name}
                onClick={() => handleImageClick(item.id)}
                className={styles.passionImage}
              />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>

       
        <div>
          {selectedId && (
            <div className={styles.description}>
              {passionDetails
                .filter((item) => item.id === selectedId)
                .map((item) => (
                  <div className={styles.descriptionInfo} key={item.id}>
                    <div className={styles.descriptionInfoChild}>
                      <div className={styles.descriptionText}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>

                      <div className={styles.descriptionList}>
                        <ul>
                          {item.listPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.joinBtn}>
                        <button onClick={handleJoinNowClick}>Join Now</button>
                      </div>
                    </div>

                   
                    <div className={styles.descriptionImage}>
                      <img src={item.descriptionSrc} alt={item.name} />
                    </div>

                    
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
