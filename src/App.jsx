import Hero from "./components/Hero";
import { pokemons } from "./data/pokemons";

export default function App() {
  return <Hero pokemons={pokemons} favouritesCount={0} />;
}