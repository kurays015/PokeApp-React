import { useEffect, useState, modal } from "react";

const Modal = ({ modalData, closeModal }) => {
  const [getEffect, setGetEffect] = useState("");
  useEffect(() => {
    const getEffect = async () => {
      for (const ability of modalData.abilities) {
        const response = await fetch(ability.ability.url);
        const { effect_entries } = await response.json();
        setGetEffect(effect_entries[1].effect);
      }
    };
    getEffect();
  }, []);

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${!modal ? "zoom-in" : "zoom-out"}`}>
        <button onClick={() => closeModal(false)} className="close-modal">
          X
        </button>
        <div className="modal-content">
          <div>
            <img
              src={modalData.sprites.other.home.front_default}
              alt={modalData.name}
              className="modal-img"
            />
            <p className="modal-type">
              {modalData.types.map(type => type.type.name).join(", ")}
            </p>
            <h2 className="modal-name">{modalData.name}</h2>
          </div>
          <div className="abilities-container">
            <h1>Abilities</h1>
            <p className="ability-name">
              {modalData.abilities
                .map(ability => ability.ability.name)
                .join(", ")}
            </p>
            <p className="effect">{getEffect}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
