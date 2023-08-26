import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Aside from "./components/Aside";
import Section from "./components/Section";
import Modal from "./components/Modal";
import { apikey } from "./apiurl";
import { generationURLs } from "./apiurl";

function App() {
  const [fetchPokemonURL, setFetchPokemonURL] = useState([]); //fetchPokemonURL setFetchPokemonURL
  const [loading, setLoading] = useState(false);
  const [getPokemonAbilities, setGetPokemonAbilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const delay = 500;
  const offset = (currentPage - 1) * itemsPerPage;

  //pokemon search
  const [searchPokemon, setSearchPokemon] = useState("");
  const [renderSearched, setRenderSearched] = useState([]);

  //pagination disabled
  const disableSubtractPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const disableAddedPages = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
  const isDisabledSubtract = disableSubtractPages.includes(currentPage);
  const isDisabledAdd = disableAddedPages.includes(currentPage);

  //use effect for pokemon per page rendered and pokemon generations
  useEffect(() => {
    //fetch api url
    const fetchPokemonsData = async () => {
      try {
        // Combine API requests into a single Promise.all
        const [pokemonsResponse, generationsResponse] = await Promise.all([
          //for pagination endpoint
          fetch(`${apikey}/?limit=${itemsPerPage}&offset=${offset}`),
          //for pokemons generations array
          Promise.all(generationURLs.map(url => fetch(url))),
        ]);

        if (!pokemonsResponse.ok) {
          throw new Error("Error Fetching Pokemon Data");
        }
        const { results } = await pokemonsResponse.json();
        setFetchPokemonURL(results);

        const generationData = await Promise.all(
          generationsResponse.map(res => res.json())
        );
        setGenerationsData(generationData);
      } catch (error) {
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

  //pokemon generations button starts
  const [generationsData, setGenerationsData] = useState([]); // array of arrays of generations
  const [abilitiesData, setAbilitiesData] = useState([]); //pokemonsAbilitiesData in single array
  const [activeData, setActiveData] = useState([]); //active data in page, either pokemon types or generations
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    sprites: {},
    abilities: [],
    types: [],
  });
  const maxPage = Math.floor(abilitiesData.length / itemsPerPage);

  //use effect for fetching all 1281 pokemons
  useEffect(() => {
    const findPokemonGenerations = async () => {
      const pokemonAbilitiesArray = [];
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1281"
        );
        const { results } = await response.json();

        for (const pokemon of results) {
          const response = await fetch(pokemon.url);
          const pokemonAbilitiesData = await response.json();
          pokemonAbilitiesArray.push(pokemonAbilitiesData);
        }
        setAbilitiesData(pokemonAbilitiesArray);
      } catch (error) {
        console.log(error);
      }
    };
    findPokemonGenerations();
  }, []);

  //generations click render
  const generationsHandleClick = generationData => {
    setLoading(true);
    setGetPokemonAbilities([]);
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
  if (modal) {
    document.body.classList.add("remove-scroll");
  } else {
    document.body.classList.remove("remove-scroll");
  }

  //handle modal soon...
  const toggleModal = (name, sprites, abilities, types) => {
    setModalData({ name, sprites, abilities, types });
    setModal(true);
    // console.log(abilities);
  };

  const handleSearch = e => {
    setSearchPokemon(e.target.value);
  };

  //search pokemon
  const handleSubmit = async e => {
    setGetPokemonAbilities([]);
    // setActiveData([]);
    setSearchPokemon("");
    e.preventDefault();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
      );
      const data = await response.json();
      console.log(data);
      setRenderSearched(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigation
        generationURLs={generationURLs}
        generationsData={generationsData}
        generationsHandleClick={generationsHandleClick}
      />
      <main className="main">
        <Aside
          handleTypeClick={handleTypeClick}
          searchPokemon={searchPokemon}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
        <Section
          pokemonPerPage={getPokemonAbilities}
          currentPage={currentPage}
          loading={loading}
          activeData={activeData}
          maxPage={maxPage}
          toggleModal={toggleModal}
          renderSearched={renderSearched}
        />
        {modal && (
          <Modal closeModal={setModal} modalData={modalData} modal={modal} />
        )}
      </main>
      <section className="pagination-container">
        <button
          className="prev10-pages"
          disabled={isDisabledSubtract}
          style={{ fontSize: "2rem" }}
          onClick={subtract10Page}
        >
          &#xab;
        </button>
        <button
          className="prev"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          prev
        </button>
        <button
          className="next"
          onClick={nextPage}
          disabled={currentPage === 64}
        >
          next
        </button>
        <button
          className="next10-pages"
          disabled={isDisabledAdd}
          style={{ fontSize: "2rem" }}
          onClick={add10Page}
        >
          &#xbb;
        </button>
      </section>
    </>
  );
}

export default App;
