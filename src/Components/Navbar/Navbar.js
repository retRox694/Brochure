import logo from "../../Images/QrenciaLogo.png";
import logoB from "../../Images/Video-Thumbnail-Banner.png";
import styles from "./Navbar.css";

export default function Navbar() {
  return (
    <div className="containerNav">
      <div className="leftLogo">
        <img className="qLogo" src={logo} alt="Qrencia Logo" />
        <p>
          Organize your <span>Competitions</span> and <span>Workshops</span>{" "}
          with Qrencia
        </p>
      </div>

      <div className="rightLogo">
        <img className="navLogo" src={logoB} alt="NavLogo" />
      </div>
    </div>
  );
}
