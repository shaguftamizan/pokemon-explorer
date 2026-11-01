import { useState } from "react";
import Hero from "./components/Hero";
import PokemonExplorer from "./components/PokemonExplorer";
import { pokemons } from "./data/pokemons";

export default function App() {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <>
      <Hero pokemons={pokemons} favouritesCount={favourites.length} />
      <PokemonExplorer
        pokemons={pokemons}
        favourites={favourites}
        onToggleFavourite={toggleFavourite}
      />
    </>
  );
}
