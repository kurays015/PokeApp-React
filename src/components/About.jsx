import github from "../assets/GitHub-Mark.png";
const About = () => {
  return (
    <div className="about">
      <h1>This PokeDexApp is made using pokeAPI by Christ Narvarte</h1>
      <p>You can search and play a guessing game</p>
      <a
        href="https://github.com/kurays015/PokeApp-React"
        target="_blank"
        title="code"
      >
        <img src={github} width="50px" />
      </a>
    </div>
  );
};

export default About;
