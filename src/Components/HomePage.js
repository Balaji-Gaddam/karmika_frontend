import React, { useEffect, useState } from 'react';
import "../App.css";
import homeImage from "../Components/images/4741.jpg";
import {Link} from "react-router-dom"

function HomePage() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const phrases = ["  karmika Dalam", " కార్మిక దళం", " कर्मिक दल"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showKarmikaDalam, setShowKarmikaDalam] = useState(false);

  useEffect(() => {
    let phraseIndex = 0;
    let letterIndex = 0;
    let setCompleted = false;

    const interval = setInterval(() => {
      if (!setCompleted) {
        if (letterIndex < phrases[phraseIndex].length) {
          setCurrentPhrase((prevPhrase) => prevPhrase + phrases[phraseIndex].charAt(letterIndex));
          letterIndex++;
        } else if (phraseIndex === phrases.length - 1) {
          setCompleted = true;
          phraseIndex = 0; // Reset to first phrase
          letterIndex = 0; // Reset letter index
          setCurrentPhrase(""); // Clear current phrase
          setShowKarmikaDalam(true); // Show "Karmika Dalam" during the gap
          setTimeout(() => {
            setCompleted = false;
            setShowKarmikaDalam(false); // Hide "Karmika Dalam" after the gap
          }, 20000); // Wait for 20 seconds before resetting
        } else {
          phraseIndex++;
          letterIndex = 0; // Reset letter index
          setCurrentIndex(phraseIndex);
          setCurrentPhrase("");
        }
      }
    }, 300); // Change typing speed here

    return () => clearInterval(interval);
  }, []); // Run only once

  return (
    <div className='Total_Home'>
      <div className='HomeLogo'>
        {showKarmikaDalam ? <h1>Karmika Dalam</h1> : <h1>{currentPhrase}</h1>}
        <Link to='/services'>Select your karmika</Link>
      </div>
        <img src={homeImage} alt='imageHome' />
    </div>
  );
}

export default HomePage;
