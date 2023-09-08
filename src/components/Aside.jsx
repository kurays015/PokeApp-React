import { typesArray } from "../typesArray";

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
      {typesArray.map(({ logoLink, typeName }, index) => (
        <div className="icon-container" key={index}>
          <div className={`icon ${typeName.toLowerCase()}`}>
            <img src={logoLink} onClick={handleTypeClick} />
          </div>
          <p className="poke-type">{typeName}</p>
        </div>
      ))}
    </aside>
  );
};

export default Aside;
