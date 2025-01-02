import styles from "./Slider.module.css"; 
import Marquee from "react-fast-marquee";
import { sliderImages } from "../../SliderImages/SliderImages";

export default function Slider() {
  return (
    <div className={styles.sliderSection}> 
      <div className={styles.sliderHeading}>
        <p>Trusted by leading skill development organizations</p>
      </div>

      <div className={styles.slides}>
        <Marquee speed={100} direction="right" gradient={false}>
          {sliderImages.map((image) => (
            <div key={image.id} className={styles.sliderImage}> 
              <a href={image.link} target="blank"><img src={image.src} alt={image.name} /></a>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
