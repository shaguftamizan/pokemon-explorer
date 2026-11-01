import hero from "./components/hero";
import { pokemons } from "./data/pokemons";

export default function App() {
  return <hero pokemons={pokemons} favouritesCount={0} />;
}