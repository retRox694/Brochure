import qrenciaLogo from "../../Images/QrenciaLogo.png";
import noCommissionLogo from "../../Images/Video-Thumbnail-Banner.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.containerNav}> 
      <div className={styles.leftLogo}>
        <img className={styles.qLogo} src={qrenciaLogo} alt="Qrencia Logo" />
        <p>
          Organize your <span>Competitions</span> and <span>Workshops</span>{" "}
          with Qrencia
        </p>
      </div>

      <div className={styles.rightLogo}>
        <img className={styles.navLogo} src={noCommissionLogo} alt="Navbar Logo" />
      </div>
    </div>
  );
}
