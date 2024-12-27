import styles from "./Slider.css";
import Marquee from "react-fast-marquee";
import img1 from "../../Images/one.png";
import img2 from "../../Images/two.png";
import img3 from "../../Images/three.png";
import img4 from "../../Images/four.png";
import img5 from "../../Images/five.png";
import img6 from "../../Images/six.png";
import img7 from "../../Images/seven.png";
import img8 from "../../Images/eight.png";
import img9 from "../../Images/nine.png";

export default function Slider() {
  return (
    <div className="sliderSection">
      <div className="sliderHeading">
        <p>Trusted by leading skill development organizations</p>
      </div>

      <div className="slides">
        <Marquee speed={150}>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          <div className="slider_image">
            <img src={img1} alt="slider_image" />
          </div>
          
          
        </Marquee>
      </div>
    </div>
  );
}
