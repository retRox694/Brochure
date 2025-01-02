import './styles.css'
import { details } from "../../constants/cardsDetails";
import { useState } from "react";
import { errorMessage } from "../../constants/errorMessages";
import ReactCardFlip from "react-card-flip";

export function CardTrial() {
  const [flippedCards, setFlippedCards] = useState(
    details.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
  );

  const flipCard = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="headingCards">
        <h3>{errorMessage.eoiOfferingsHeading}</h3>
        <p>{errorMessage.eoiOfferings}</p>
      </div>
      <div className="displayCards">
        {details.map((info) => (
          <ReactCardFlip
            key={info.id}
            flipDirection="vertical"
            isFlipped={flippedCards[info.id]}
          >
            <div className="card" onClick={() => flipCard(info.id)}>
              <img className="cardImage" src={info.src} alt="Card Display" />
              <h1>{info.name}</h1>
            </div>
            <div className="card cardBack" onClick={() => flipCard(info.id)}>
              <p>{info.description}</p>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </>
  );
}
