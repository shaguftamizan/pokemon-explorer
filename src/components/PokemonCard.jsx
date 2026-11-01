import { spriteUrl } from "../data/pokemons";
import { typeStyles } from "../data/types";
import "./pokemoncard.css";

// Paste a direct image URL here (or an imported file from src/assets) to use your own
// favourite icon. While this is empty, a built-in heart is shown instead.
const FAV_ICON_URL = "https://res.cloudinary.com/dmryieb7p/image/upload/v1793512848/pokemon-explorer/favourite-icon_vfu2bh.svg";

function FavouriteIcon() {
  if (FAV_ICON_URL) {
    return <img className="card__fav-icon" src={FAV_ICON_URL} alt="" />;
  }
  return (
    <svg className="card__fav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

function StatBar({ label, value, max, variant }) {
  return (
    <div className={`stat-bar stat-bar--${variant}`}>
      <span className="stat-bar__label">{label}</span>
      <div
        className="stat-bar__track"
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="stat-bar__fill" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="stat-bar__value">{value}</span>
    </div>
  );
}

export default function PokemonCard({
  pokemon,
  isFavourite,
  onToggleFavourite,
  maxHp,
  maxAttack,
}) {
  const { id, name, type, hp, attack } = pokemon;
  const style = typeStyles[type];

  return (
    <article
      className="card"
      style={{ "--type": style.color, "--type-ink": style.ink }}
    >
      <button
        type="button"
        className={`card__fav${isFavourite ? " is-active" : ""}`}
        aria-pressed={isFavourite}
        aria-label={
          isFavourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`
        }
        onClick={() => onToggleFavourite(id)}
      >
        <FavouriteIcon />
      </button>

      <div className="card__media">
        <img
          className="card__sprite"
          src={spriteUrl(id)}
          alt={name}
          loading="lazy"
        />
      </div>

      <h3 className="card__name">{name}</h3>
      <span className="card__type">{type}</span>

      <div className="card__stats">
        <StatBar label="HP" value={hp} max={maxHp} variant="hp" />
        <StatBar label="Atk" value={attack} max={maxAttack} variant="attack" />
      </div>
    </article>
  );
}
