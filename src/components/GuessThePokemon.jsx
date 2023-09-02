//new bug
//choices is being rendered already without it's element (empty) that causing an error, i need to conditional render it

/* 
game:
1. there is a 5 seconds countdown for user to choose their answer
2. after 5 seconds, the randomPokemon will run again in interval
3. randomPokemon will stop only if user's life reaches 0




*/

import { useState, useEffect } from "react";

const GuessThePokemon = ({ generationsData, abilitiesData }) => {
  const [startGameBtn, setStartGameBtn] = useState(true);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [dark, setDark] = useState(true);
  const [disableBtnAfterGuess, setDisableBtnAfterGuess] = useState(false);
  const noImg =
    randomPokemon && randomPokemon.sprites.other.home.front_default !== null;
  const getOneRandomPokemon = eachGenerationArray => {
    const threeChoices = [];

    while (threeChoices.length < 3) {
      const random = Math.floor(Math.random() * eachGenerationArray.length);
      const randomPokemons = eachGenerationArray[random].name;
      const found = abilitiesData.find(
        ability => ability.name === randomPokemons
      );
      const hasValidData = found !== undefined;

      if (!threeChoices.includes(randomPokemons) && hasValidData) {
        threeChoices.push(found);
      }
    }
    //shuffle choices
    for (let i = threeChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [threeChoices[i], threeChoices[j]] = [threeChoices[j], threeChoices[i]];
    }

    //pass to setter function
    setChoices(threeChoices);

    //get one random in the three choices
    const randomNumber = Math.floor(Math.random() * threeChoices.length);
    const randomPokemonInThreeChoices = threeChoices[randomNumber];
    setRandomPokemon(randomPokemonInThreeChoices);
    setDark(true);
    setDisableBtnAfterGuess(false);
  };

  const checkAnswer = e => {
    const correctAnswer = randomPokemon.name;
    const userChoice = e.target.textContent;

    if (correctAnswer === userChoice) {
      setScore(prevScore => prevScore + 1);
      setDark(false);
      setDisableBtnAfterGuess(true);
      alert("Correct!");
    } else {
      setLife(prevLife => prevLife - 1);
      setDisableBtnAfterGuess(true);
      alert("wrong!");
    }
  };

  return (
    <div className="generation-game-container">
      <h1 className="generation-game-title">Guess The Pokemon...</h1>
      <div className="gamescore-and-button-container">
        <div className="generation-game-buttons-container">
          {generationsData &&
            generationsData.map((generationData, index) => (
              <button
                className="game-generation-button"
                key={index}
                onClick={() =>
                  getOneRandomPokemon(generationData.pokemon_species)
                }
                disabled={startGameBtn}
              >
                Generation {index + 1}
              </button>
            ))}
        </div>
        {startGameBtn ? (
          <button
            className="game-start-btn"
            onClick={() => setStartGameBtn(false)}
          >
            Start Game
          </button>
        ) : (
          <div className="game-choices">
            <div className="game-random-pokemon">
              {randomPokemon && noImg ? (
                <img
                  style={{
                    filter: dark ? "brightness(0%)" : "brightness(100%)",
                  }}
                  src={randomPokemon.sprites.other.home.front_default}
                  className="game-random-img"
                  onDragStart={e => e.preventDefault()}
                />
              ) : (
                <div style={{ color: "gray", fontSize: ".8em" }}>
                  No Image Available
                </div>
              )}
            </div>
            {choices.length ? (
              choices.map((choice, index) => (
                <button
                  className="game-choices-btn"
                  key={index}
                  disabled={disableBtnAfterGuess}
                  onClick={e => checkAnswer(e)}
                >
                  {choice.name}
                </button>
              ))
            ) : (
              <div style={{ color: "#fff" }}>
                Click one of the generation buttons...
              </div>
            )}
          </div>
        )}
        <div className="generation-score-container">
          <p>Score: {score}</p>
          <p>Life: {life}</p>
        </div>
      </div>
    </div>
  );
};

export default GuessThePokemon;
