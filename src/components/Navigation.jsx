import pokeballIcon from "../assets/pokeballl.png";
import { useState, useEffect } from "react";

const Navigation = ({ generationsData, generationsHandleClick }) => {
  return (
    <header className="header">
      <img src={pokeballIcon} className="pokeball-icon" />
      <nav>
        <ul>
          <li>
            <a href="#">Who's that Pokémon?</a>
          </li>
          <li className="dropdown">
            <a className="dropbtn">Pokémon Generations</a>
            <div className="dropdown-content">
              {generationsData &&
                generationsData.map((generationData, index) => (
                  <a
                    href="#"
                    className="generation-button"
                    key={index}
                    onClick={() =>
                      generationsHandleClick(generationData.pokemon_species)
                    }
                  >
                    Pokémon Generation {index + 1}
                  </a>
                ))}
            </div>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
