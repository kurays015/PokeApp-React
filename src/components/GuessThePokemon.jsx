import { useState } from "react";
import ScoreModal from "./ScoreModal";

const GuessThePokemon = ({
  generationsData,
  abilitiesData,
  scoreModal,
  setScoreModal,
}) => {
  const [startGameBtn, setStartGameBtn] = useState(true);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [getNewRandomPokemon, setGetNewRandomPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [dark, setDark] = useState(0);
  // const [disableBtnAfterGuess, setDisableBtnAfterGuess] = useState(false);
  const noImg =
    randomPokemon && randomPokemon.sprites.other.home.front_default !== null;

  const generateChoices = eachGenerationArray => {
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
    return shuffleChoices(threeChoices);
  };

  const getOneRandomPokemon = eachGenerationArray => {
    const choices = generateChoices(eachGenerationArray);
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    //pass to setter function
    const hasDuplicate = choices.some(
      (choice, index) => choices.indexOf(choice.name) !== index
    );
    //remove duplicated name
    if (hasDuplicate) {
      setChoices(choices);
    }
    setRandomPokemon(randomChoice);
    // setDisableBtnAfterGuess(false);
    setGetNewRandomPokemon(prevData => [...prevData, ...eachGenerationArray]);
  };

  const shuffleChoices = threeChoices => {
    const shuffledChoices = [...threeChoices];
    //shuffle choices
    for (let i = shuffledChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChoices[i], shuffledChoices[j]] = [
        shuffledChoices[j],
        shuffledChoices[i],
      ];
    }
    return shuffledChoices;
  };

  const checkAnswer = e => {
    setDark(100);

    const correctAnswer = randomPokemon.name;
    const userChoice = e.target.textContent;

    if (correctAnswer === userChoice) {
      setScore(prevScore => prevScore + 1);
      console.log("Correct!");
    } else {
      setLife(prevLife => prevLife - 1);
      if (life === 2) {
        //remove the 1 life pokeball
      } else if (life === 1) {
        //remove the 1 life pokeball
      } else if (life === 0) {
        //remove the 1 life from pokeball
        setScoreModal(true); //then show modal of score
      }

      console.log("wrong!");
    }

    setTimeout(() => {
      getOneRandomPokemon(getNewRandomPokemon);
      setDark(0);
    }, 1500);
    // setDisableBtnAfterGuess(true);
  };

  const resetGame = () => {
    setLife(3);
    setScore(0);
    setScoreModal(false);
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
                    filter: `brightness(${dark}%)`,
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
                  // disabled={disableBtnAfterGuess}
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
        {scoreModal && <ScoreModal score={score} resetGame={resetGame} />}
      </div>
    </div>
  );
};

export default GuessThePokemon;
