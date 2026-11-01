import { useState } from "react";
import { spriteUrl } from "../data/pokemons";
import "./Hero.css";

const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg";

/* The pokeball plays one catch sequence per CSS animation cycle.
   When the cycle restarts, the sprite is hidden (the Pokémon is inside the ball),
   so we swap to the next Pokémon at that exact moment. */
function PokeballScene({ pokemons }) {
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      pokemons.findIndex((p) => p.name === "Pikachu")
    )
  );
  const pokemon = pokemons[index];

  const showNext = () => setIndex((i) => (i + 1) % pokemons.length);

  return (
    <div className="catch">
      <div className="scene">
        <div className="pokeball">
          <div className="pokeball__glow" />
          <div className="pokeball__light" />
          <div className="pokeball__half pokeball__top" />
          <div className="pokeball__half pokeball__bottom" />
          <div className="pokeball__button" />
        </div>

        <img
          className="scene__sprite"
          src={spriteUrl(pokemon.id)}
          alt={pokemon.name}
          onAnimationIteration={showNext}
        />

        <span className="spark spark--1" aria-hidden="true">✦</span>
        <span className="spark spark--2" aria-hidden="true">✦</span>
        <span className="spark spark--3" aria-hidden="true">✦</span>
        <span className="spark spark--4" aria-hidden="true">✦</span>
      </div>

      <p className="catch__caption">Gotcha! {pokemon.name} was caught!</p>
    </div>
  );
}

export default function Hero({ pokemons, favouritesCount = 0 }) {
  const typeCount = new Set(pokemons.map((p) => p.type)).size;

  const stats = [
    { value: pokemons.length, label: "Pokémon in the explorer", accent: "orange" },
    { value: typeCount, label: "Different types", accent: "red" },
    { value: favouritesCount, label: "Favourites", accent: "sand" },
  ];

  return (
    <section className="hero">
      <h1 className="hero__slogan" lang="ja">
        ポケモンゲットだぜー！
      </h1>

      <img className="hero__logo" src={LOGO_URL} alt="Pokémon" />

      <div className="hero__body">
        <ul className="hero__stats">
          {stats.map((stat) => (
            <li key={stat.label} className={`stat stat--${stat.accent}`}>
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <PokeballScene pokemons={pokemons} />
      </div>
    </section>
  );
}
