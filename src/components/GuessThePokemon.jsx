import { useState, useEffect } from "react";
import ScoreModal from "./ScoreModal";
import lifeCount from "../assets/pokeballsvg.svg";

const GuessThePokemon = ({
  generationsData,
  abilitiesData,
  scoreModal,
  setScoreModal,
  hamburgerToggle,
  hamburgerMenuToggle,
  closeMenu,
}) => {
  const pokeLivesInitialValue = [
    { id: 1, life: lifeCount },
    { id: 2, life: lifeCount },
    { id: 3, life: lifeCount },
  ];
  const [startGameBtn, setStartGameBtn] = useState(true);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [getNewRandomPokemon, setGetNewRandomPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [livesCount, setLivesCount] = useState(3);
  const [pokeLives, setPokeLives] = useState(pokeLivesInitialValue);
  // const [fadeOutIndex, setFadeOutIndex] = useState(-1);
  const [dark, setDark] = useState(0);
  const [disableBtnAfterGuess, setDisableBtnAfterGuess] = useState(false);
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
    closeMenu(false);
    setDisableBtnAfterGuess(false);
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
    setDisableBtnAfterGuess(true);

    const correctAnswer = randomPokemon.name;
    const userChoice = e.target.textContent;

    if (correctAnswer === userChoice) {
      setScore(prevScore => prevScore + 1);
      console.log("Correct!");
    } else {
      setLivesCount(prevLife => prevLife - 1);
      // Remove the first item from pokeLives,
      const updatedItems = pokeLives.slice(1);
      setPokeLives(updatedItems);

      // setFadeOutIndex(fadeOutIndex + 1);
      console.log("wrong!");
    }
    setTimeout(() => {
      getOneRandomPokemon(getNewRandomPokemon);
    }, 1000);
  };

  //check life and show modal if lives turn to zero
  useEffect(() => {
    if (livesCount === 0) {
      setScoreModal(true);
    }
  }, [livesCount]);

  //reset game
  const resetGame = () => {
    setLivesCount(3);
    setScore(0);
    setScoreModal(false);
    setPokeLives(pokeLivesInitialValue);
    getOneRandomPokemon(getNewRandomPokemon);
  };

  return (
    <div className="generation-game-container">
      {/* <!-- Hamburger icon --> */}
      <div
        className={`hamburger-menu ${hamburgerToggle ? "active" : ""}`}
        onClick={hamburgerMenuToggle}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <h1 className="generation-game-title">Who's that pokémon?</h1>
      <div className="gamescore-and-button-container">
        <div
          className={`generation-game-buttons-container ${
            hamburgerToggle ? "show" : ""
          }`}
        >
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
                <div>
                  <img
                    style={{
                      filter: `brightness(${dark}%)`,
                    }}
                    src={randomPokemon.sprites.other.home.front_default}
                    className="game-random-img"
                    onDragStart={e => e.preventDefault()}
                  />
                </div>
              ) : (
                <div style={{ color: "gray", fontSize: ".8em" }}>
                  No Image Available
                </div>
              )}
              {choices.length ? (
                choices.map((choice, index) => (
                  <div key={index}>
                    <button
                      className="game-choices-btn"
                      disabled={disableBtnAfterGuess}
                      onClick={e => checkAnswer(e)}
                    >
                      {choice.name}
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ color: "#fff" }}>
                  Click one of the generation buttons...
                </div>
              )}
            </div>
          </div>
        )}
        <div className="stats-container">
          <div className="generation-score-container">
            <div className="life-container">
              {pokeLives.map(({ id, life }) => (
                <img
                  key={id}
                  src={life}
                  alt="Life-Count"
                  className="poke-lifeCount"
                />
              ))}
            </div>
            <div className="lb-btn-container">
              <p className="score-count">Score: {score}</p>
              <button className="lb-btn" onClick={() => alert("coming soon!")}>
                Leaderboard
              </button>
            </div>
          </div>
        </div>

        {scoreModal && <ScoreModal score={score} resetGame={resetGame} />}
      </div>
    </div>
  );
};

export default GuessThePokemon;
