import logo from "../../assets/GitHub-Mark.png";
const About = () => {
  return (
    <div className="about">
      <h1>
        This PokeDexApp is made using HTML, CSS, JavaScript, React, and pokeAPI
        by Christ Narvarte
      </h1>
      <p>You can search and play a guessing game</p>
      <a
        href="https://github.com/kurays015/PokeApp-React"
        target="_blank"
        title="code"
      >
        <img src={logo} width="50px" />
      </a>
    </div>
  );
};

export default About;
