import pokeballIcon from "../assets/pokeballl.png";
import { Link } from "react-router-dom";

const Navigation = ({ generationsData, generationsHandleClick }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={pokeballIcon} className="pokeball-icon" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/GuessThePokemon">Who's that pokemon?</Link>
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
