import { useState } from "react";
import "./DisplayCards.css";
import ReactCardFlip from "react-card-flip";
import data from "../../Data.json"; // Import your data
import { errorMessage } from "../../constants/errorMessages";

export default function DisplayCards() {
  // This will hold the flip state for each card
  const [flippedCards, setFlippedCards] = useState(
    data.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
  );

  // Function to flip individual card
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
      {data.map((info) => (
        <ReactCardFlip
          key={info.id}
          flipDirection="vertical"
          isFlipped={flippedCards[info.id]}
        >
          <div className="card" onClick={() => flipCard(info.id)}>
            <h1>{info.name}</h1>
          </div>
          <div className="card card-back" onClick={() => flipCard(info.id)}>
            <p>{info.description}</p>
          </div>
        </ReactCardFlip>
      ))}
    </div>
    </>
  );
}
