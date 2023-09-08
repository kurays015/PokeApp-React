import Aside from "../Aside";
import SectionContent from "../SectionContent";
import Modal from "../Modal";
import { useState } from "react";

const MainAndSection = ({
  handleTypeClick,
  searchPokemon,
  handleSearch,
  handleSubmit,
  pokemonPerPage,
  currentPage,
  loading,
  activeData,
  maxPage,
  toggleModal,
  renderSearched,
  isDisabledSubtract,
  isDisabledAdd,
  subtract10Page,
  prevPage,
  nextPage,
  add10Page,
  modal,
  modalData,
  setModal,
  error,
}) => {
  //aside toggle
  const [isShow, setIsShow] = useState(false);

  const handleAsideToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <main className="main">
        <Aside
          handleTypeClick={handleTypeClick}
          searchPokemon={searchPokemon}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
          isShow={isShow}
        />
        {error ? (
          <h1>{error}</h1>
        ) : (
          <SectionContent
            pokemonPerPage={pokemonPerPage}
            currentPage={currentPage}
            loading={loading}
            activeData={activeData}
            maxPage={maxPage}
            toggleModal={toggleModal}
            renderSearched={renderSearched}
            handleAsideToggle={handleAsideToggle}
            isShow={isShow}
          />
        )}
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
};

export default MainAndSection;
