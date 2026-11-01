import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "./PokemonCard";
import { typeStyles } from "../data/types";
import "./explorer.css";

const PAGE_SIZE = 8; // two rows of four per "page"

const SORTS = {
  "name-asc":    { label: "Name (A–Z)",          compare: (a, b) => a.name.localeCompare(b.name) },
  "name-desc":   { label: "Name (Z–A)",          compare: (a, b) => b.name.localeCompare(a.name) },
  "hp-desc":     { label: "HP (high to low)",    compare: (a, b) => b.hp - a.hp },
  "hp-asc":      { label: "HP (low to high)",    compare: (a, b) => a.hp - b.hp },
  "attack-desc": { label: "Attack (high to low)", compare: (a, b) => b.attack - a.attack },
  "attack-asc":  { label: "Attack (low to high)", compare: (a, b) => a.attack - b.attack },
};

export default function PokemonExplorer({ pokemons, favourites, onToggleFavourite }) {
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState([]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const typeCounts = useMemo(
    () =>
      pokemons.reduce((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1;
        return acc;
      }, {}),
    [pokemons]
  );
  const types = Object.keys(typeCounts).sort();

  const maxHp = useMemo(() => Math.max(...pokemons.map((p) => p.hp)), [pokemons]);
  const maxAttack = useMemo(() => Math.max(...pokemons.map((p) => p.attack)), [pokemons]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pokemons
      .filter(
        (p) =>
          (!q || p.name.toLowerCase().includes(q)) &&
          (activeTypes.length === 0 || activeTypes.includes(p.type))
      )
      .sort(SORTS[sortBy].compare);
  }, [pokemons, query, activeTypes, sortBy]);

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  // Start again from the first page whenever the list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeTypes, sortBy]);

  // Infinite scroll: load the next page when the sentinel scrolls into view
  useEffect(() => {
    const node = sentinelRef.current;
    if (!hasMore || !node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE);
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  const toggleType = (type) =>
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const clearAll = () => {
    setQuery("");
    setActiveTypes([]);
  };

  return (
    <section className="explorer">
      <aside className="filters" aria-label="Filter by type">
        <div className="filters__header">
          <h2 className="filters__title">Types</h2>
          {activeTypes.length > 0 && (
            <button type="button" className="filters__clear" onClick={() => setActiveTypes([])}>
              Clear
            </button>
          )}
        </div>

        <ul className="filters__list">
          {types.map((type) => {
            const active = activeTypes.includes(type);
            const { color, ink } = typeStyles[type];
            return (
              <li key={type}>
                <button
                  type="button"
                  className={`type-chip${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  style={{ "--type": color, "--type-ink": ink }}
                  onClick={() => toggleType(type)}
                >
                  <span className="type-chip__name">{type}</span>
                  <span className="type-chip__count">{typeCounts[type]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="catalog">
        <div className="toolbar">
          <label className="search">
            <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.2-4.2"
              />
            </svg>
            <input
              type="search"
              placeholder="Search Pokémon by name"
              aria-label="Search Pokémon by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

        <div className="type-select">
            <select
                aria-label="Filter by type"
                value={activeTypes[0] ?? "all"}
                onChange={(e) =>
                        setActiveTypes(e.target.value === "all" ? [] : [e.target.value])
                }
            >
                <option value="all">All types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type} ({typeCounts[type]})
                        </option>
                        ))}
            </select>
        </div>

        <label className="sort">
            <span>Sort by</span>
            <select aria-label="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {results.length > 0 ? (
          <>
            <ul className="grid">
              {visible.map((pokemon) => (
                <li key={pokemon.id}>
                  <PokemonCard
                    pokemon={pokemon}
                    isFavourite={favourites.includes(pokemon.id)}
                    onToggleFavourite={onToggleFavourite}
                    maxHp={maxHp}
                    maxAttack={maxAttack}
                  />
                </li>
              ))}
            </ul>

            {hasMore ? (
              <div ref={sentinelRef} className="grid__status">
                Loading more Pokémon(s)…
              </div>
            ) : (
              <p className="grid__status">That's all {results.length} Pokémon.</p>
            )}
          </>
        ) : (
          <div className="empty">
            <p>No Pokémon(s) match your search.</p>
            <button type="button" className="empty__button" onClick={clearAll}>
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
