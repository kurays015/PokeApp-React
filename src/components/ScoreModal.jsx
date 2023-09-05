const ScoreModal = ({ score, resetGame }) => {
  return (
    <div className="score-modal-container">
      <div className="score-modal-content">
        <h1>Congratulations! You got</h1>
        <p className="score">{score}</p>
        <button className="try-again" onClick={resetGame}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default ScoreModal;
