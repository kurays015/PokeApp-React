import { useState } from "react";
import arrow from "../assets/arrow.png";

const Section = ({
  pokemonPerPage,
  currentPage,
  loading,
  activeData,
  renderSearched,
  toggleModal,
  maxPage,
  handleAsideToggle,
  isShow,
  regionName,
  genNumber,
}) => {
  const isFilled = pokemonPerPage.length ? pokemonPerPage : activeData;

  function RenderSearched() {
    return (
      <div>
        <img
          className="pokemon-img"
          src={renderSearched.sprites.other.home.front_default}
          alt={renderSearched.name}
          onClick={() =>
            toggleModal(
              renderSearched.name,
              renderSearched.sprites,
              renderSearched.abilities,
              renderSearched.types
            )
          }
        />
        <p className="pokemon-types">
          {renderSearched.types.map(type => type.type.name).join(", ")}
        </p>
        <p className="pokemon-name">{renderSearched.name}</p>
      </div>
    );
  }

  function RenderTypesAndGeneration() {
    return (
      <>
        {isFilled.map(({ name, sprites, id, types, abilities }) => (
          <div key={id} className="card-container">
            {sprites.other.home.front_default === null ? (
              <p style={{ color: "#fff" }}>No Image Available</p>
            ) : (
              <img
                className="pokemon-img"
                src={sprites.other.home.front_default}
                alt={name}
                onClick={() => toggleModal(name, sprites, abilities, types)}
              />
            )}
            <p className="pokemon-types">
              {types.map(type => type.type.name).join(", ")}
            </p>
            <p className="pokemon-name">{name}</p>
          </div>
        ))}
      </>
    );
  }

  return (
    <section className="pokemons-container">
      <>
        {genNumber && regionName ? (
          <h1 className="generation-number">
            {genNumber.toUpperCase()} - {regionName.toUpperCase()}
          </h1>
        ) : (
          ""
        )}
      </>
      <p className="page-number">
        Page {currentPage} of {maxPage ? maxPage : "Calculating..."}
      </p>
      <img
        src={arrow}
        className={`aside-toggle-arrow ${isShow ? "rotate" : ""}`}
        onClick={handleAsideToggle}
      />

      {loading ? (
        <div className="loading">Please wait or click again...</div>
      ) : isFilled.length ? (
        <RenderTypesAndGeneration />
      ) : (
        renderSearched && <RenderSearched />
      )}
      <p className="page-number">
        Page {currentPage} of {maxPage ? maxPage : "Calculating..."}
      </p>
    </section>
  );
};

export default Section;
