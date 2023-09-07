import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";

import { apiurl } from "./apiurl";
import { generationURLs } from "./apiurl";
import MainAndSection from "./components/pages/MainAndSection";
import About from "./components/pages/About";

//react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuessThePokemon from "./components/GuessThePokemon";

function App() {
  const [fetchPokemonURL, setFetchPokemonURL] = useState([]); //fetchPokemonURL setFetchPokemonURL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getPokemonAbilities, setGetPokemonAbilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const delay = 500;
  const offset = (currentPage - 1) * itemsPerPage;

  //pokemon search
  const [searchPokemon, setSearchPokemon] = useState("");
  const [renderSearched, setRenderSearched] = useState(null);

  //pagination disabled
  const disableSubtractPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const disableAddedPages = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
  const isDisabledSubtract = disableSubtractPages.includes(currentPage);
  const isDisabledAdd = disableAddedPages.includes(currentPage);

  //pokemon generations button starts
  const [generationsData, setGenerationsData] = useState([]); // array of arrays of generations
  const [abilitiesData, setAbilitiesData] = useState([]); //pokemonsAbilitiesData in single array
  const [activeData, setActiveData] = useState([]); //active data in page, either pokemon types or generations
  const [modal, setModal] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    sprites: {},
    abilities: [],
    types: [],
  });
  const maxPage = Math.floor(1281 / itemsPerPage);

  //use effect for pokemon per page rendered and pokemon generations
  useEffect(() => {
    //fetch api url
    const fetchPokemonsData = async () => {
      try {
        // Combine API requests into a single Promise.all
        const [pokemonsResponse, generationsResponse] = await Promise.all([
          //for pagination endpoint
          fetch(`${apiurl}/?limit=${itemsPerPage}&offset=${offset}`),
          //for pokemons generations array
          Promise.all(generationURLs.map(url => fetch(url))),
        ]);

        const { results } = await pokemonsResponse.json();
        setFetchPokemonURL(results);

        const generationData = await Promise.all(
          generationsResponse.map(res => res.json())
        );
        setGenerationsData(generationData);
      } catch (error) {
        setError(error, "Error occured while fetching data");
        console.log(error);
      }
    };
    fetchPokemonsData();
  }, [currentPage]);

  //use effect for pushing all abilities data in empty array
  useEffect(() => {
    //fetch url in api key
    const fetchURL = async () => {
      try {
        const abilitiesPromises = fetchPokemonURL.map(async pokemon => {
          const response = await fetch(pokemon.url);
          return response.json();
        });
        const pokemonAbilitiesData = await Promise.all(abilitiesPromises);
        setGetPokemonAbilities(pokemonAbilitiesData);
      } catch (error) {
        setError(error, "Error occured while fetching data");
        console.log(error);
      }
    };
    fetchURL();
  }, [fetchPokemonURL]);

  //pagination prev and next
  const nextPage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    setLoading(true);
    setTimeout(() => setLoading(false), delay);
  };
  const add10Page = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 10);
    setLoading(true);
    setTimeout(() => setLoading(false), delay);
  };
  const prevPage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
    setLoading(true);
    setTimeout(() => setLoading(false), delay);
  };
  const subtract10Page = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage - 10);
    setLoading(true);
    setTimeout(() => setLoading(false), delay);
  };

  //use effect for fetching all 1281 pokemons by batching it
  useEffect(() => {
    const fetchPokemonBatch = async (offset, limit) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const { results } = await response.json();

        const dataPromises = results.map(async pokemon => {
          const response = await fetch(pokemon.url);
          return response.json();
        });
        const pokemonData = await Promise.all(dataPromises);

        // Filter out duplicates before adding data to the state
        setAbilitiesData(prevData => {
          const newData = pokemonData.filter(
            pokemon =>
              !prevData.some(prevPokemon => prevPokemon.id === pokemon.id)
          );
          return [...prevData, ...newData];
        });

        // Fetch next batch if there are more Pokémon
        const nextOffset = offset + limit;
        if (nextOffset < 1281) {
          fetchPokemonBatch(nextOffset, limit);
        }
      } catch (error) {
        setError(error, "Error occurred while fetching data");
        console.error(error);
      }
    };

    // Start fetching with an initial offset and limit
    fetchPokemonBatch(0, 50); // Adjust the limit as needed
  }, []);

  //generations click render
  const generationsHandleClick = generationData => {
    setLoading(true);
    setGetPokemonAbilities([]);
    setRenderSearched(null);
    const generationsPokemonArray = [];
    for (const gen of generationData) {
      const pokemonAbility = abilitiesData.find(
        ability => ability.name === gen.name
      );
      if (pokemonAbility) {
        generationsPokemonArray.push(pokemonAbility);
      }
    }
    setActiveData(generationsPokemonArray); // Set activeData first
    setTimeout(() => setLoading(false), 5000);
  };

  //pokemon types click render
  const handleTypeClick = e => {
    setLoading(true);
    setGetPokemonAbilities([]);
    setRenderSearched(null);
    //Aside poke type names
    const pokeTypeName =
      e.target.parentNode.parentNode.querySelector(".poke-type").textContent;
    const pokeTypeLowerCaseFirstIndex =
      pokeTypeName.charAt(0).toLowerCase() + pokeTypeName.slice(1);
    // when this function runs, it filters each pokemon types
    const filtered = abilitiesData
      .filter(pokemon => {
        const typeName = pokemon.types;
        return typeName.some(
          type => type.type.name === pokeTypeLowerCaseFirstIndex
        );
      })
      .map(pokemon => pokemon);
    setActiveData(filtered);

    setTimeout(() => setLoading(false), delay);
  };

  //remove scroll when modal is open
  if (modal || scoreModal) {
    document.body.classList.add("remove-scroll");
  } else {
    document.body.classList.remove("remove-scroll");
  }

  //handle modal
  const toggleModal = (name, sprites, abilities, types) => {
    setModalData({ name, sprites, abilities, types });
    setModal(true);
  };

  const handleSearch = e => {
    setSearchPokemon(e.target.value);
  };

  //search pokemon
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setGetPokemonAbilities([]);
      setActiveData([]);
      setSearchPokemon("");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
      );
      const data = await response.json();
      setRenderSearched(data);
    } catch (error) {
      setError(error, "Error occured while fetching data");
      console.log(error);
    }
    setTimeout(() => setLoading(false), delay);
  };

  //guess the pokemon game
  const guessThePokemonGame = () => {};

  return (
    <>
      <Router>
        <Navigation
          generationURLs={generationURLs}
          generationsData={generationsData}
          generationsHandleClick={generationsHandleClick}
          guessThePokemonGame={guessThePokemonGame}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainAndSection
                handleTypeClick={handleTypeClick}
                searchPokemon={searchPokemon}
                handleSearch={handleSearch}
                handleSubmit={handleSubmit}
                pokemonPerPage={getPokemonAbilities}
                currentPage={currentPage}
                loading={loading}
                activeData={activeData}
                maxPage={maxPage}
                toggleModal={toggleModal}
                renderSearched={renderSearched}
                isDisabledSubtract={isDisabledSubtract}
                isDisabledAdd={isDisabledAdd}
                subtract10Page={subtract10Page}
                prevPage={prevPage}
                nextPage={nextPage}
                add10Page={add10Page}
                modal={modal}
                modalData={modalData}
                setModal={setModal}
                error={error}
              />
            }
          />
          <Route
            path="/GuessThePokemon"
            element={
              <GuessThePokemon
                generationsHandleClick={generationsHandleClick}
                generationsData={generationsData}
                abilitiesData={abilitiesData}
                setScoreModal={setScoreModal}
                scoreModal={scoreModal}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
