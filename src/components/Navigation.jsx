import { Link } from "react-router-dom";
import pikachu from "../assets/pikachu-dance.gif";

const Navigation = ({ generationsData, generationsHandleClick }) => {
  return (
    <header className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img src={pikachu} style={{ margin: ".7em", width: "100px" }} />
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/GuessThePokemon" className="nav-btn">
              Guess The Pokemon
            </Link>
          </li>
          <li className="dropdown">
            <a className="nav-btn">Pokémon Generations</a>
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
            <Link to="/about" className="nav-btn">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
