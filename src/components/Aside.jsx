const Aside = ({
  handleTypeClick,
  searchPokemon,
  handleSearch,
  handleSubmit,
}) => {
  return (
    <aside>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search pokemon..."
          className="pokemon-search"
          value={searchPokemon}
          onChange={handleSearch}
        />
      </form>
      <div className="icon-container">
        <div className="icon electric">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/electric.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Electric</p>
      </div>

      <div className="icon-container">
        <div className="icon water">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/water.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Water</p>
      </div>

      <div className="icon-container">
        <div className="icon rock">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/rock.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Rock</p>
      </div>

      <div className="icon-container">
        <div className="icon normal">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/normal.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Normal</p>
      </div>

      <div className="icon-container">
        <div className="icon flying">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/flying.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Flying</p>
      </div>

      <div className="icon-container">
        <div className="icon poison">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/poison.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Poison</p>
      </div>

      <div className="icon-container">
        <div className="icon ground">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/ground.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Ground</p>
      </div>

      <div className="icon-container">
        <div className="icon bug">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/bug.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Bug</p>
      </div>

      <div className="icon-container">
        <div className="icon ghost">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/ghost.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Ghost</p>
      </div>

      <div className="icon-container">
        <div className="icon steel">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/steel.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Steel</p>
      </div>

      <div className="icon-container">
        <div className="icon fire">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/fire.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Fire</p>
      </div>

      <div className="icon-container">
        <div className="icon grass">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/grass.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Grass</p>
      </div>

      <div className="icon-container">
        <div className="icon psychic">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/psychic.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Psychic</p>
      </div>

      <div className="icon-container">
        <div className="icon ice">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/ice.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Ice</p>
      </div>

      <div className="icon-container">
        <div className="icon dragon">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/dragon.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Dragon</p>
      </div>

      <div className="icon-container">
        <div className="icon dark">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/dark.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Dark</p>
      </div>

      <div className="icon-container">
        <div className="icon fairy">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/fairy.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Fairy</p>
      </div>

      <div className="icon-container">
        <div className="icon fighting">
          <img
            src="https://duiker101.github.io/pokemon-type-svg-icons/icons/fighting.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Fighting</p>
      </div>

      <div className="icon-container">
        <div className="icon un">
          <img
            src="https://www.svgrepo.com/show/131030/question-mark.svg"
            onClick={handleTypeClick}
          />
        </div>
        <p className="poke-type">Unknown</p>
      </div>
    </aside>
  );
};

export default Aside;
