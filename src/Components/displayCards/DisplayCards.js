import { useState } from "react";
import styles from "./DisplayCards.module.css"; 
import ReactCardFlip from "react-card-flip";
import { errorMessage } from "../../constants/errorMessages";
import { details } from "../../constants/cardsDetails";

export default function DisplayCards() {
  const [flippedCards, setFlippedCards] = useState(
    details.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
  );
  const [searchQuery, setSearchQuery] = useState("");

  const flipCard = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = details.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.headingCards}>
        <h3>{errorMessage.eoiOfferingsHeading}</h3>
        <p>{errorMessage.eoiOfferings}</p>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search cards by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>Clear Search</button>
      </div>

      <div className={styles.displayCards}>
        {filteredCards.length > 0 ? (
          filteredCards.map((info) => (
            <ReactCardFlip
              key={info.id}
              flipDirection="vertical"
              isFlipped={flippedCards[info.id]}
            >
              <div className={styles.card} onClick={() => flipCard(info.id)}>
                <img className={styles.cardImage} src={info.src} alt="Card Display" />
                <h1>{info.name}</h1>
              </div>
              <div className={`${styles.card} ${styles.cardBack}`} onClick={() => flipCard(info.id)}>
                <p>{info.description}</p>
              </div>
            </ReactCardFlip>
          ))
        ) : (
          <p>No cards found matching your search.</p>
        )}
      </div>
    </>
  );
}
