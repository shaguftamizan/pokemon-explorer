# Pokémon Explorer

A responsive Pokédex-style app for browsing Pokémon, comparing their stats and keeping track of your favourites. Built with React, JSX and plain CSS.

## Tech stack

- [React](https://react.dev/) (function components and hooks)
- [Vite](https://vitejs.dev/)
- Plain CSS with custom properties, no UI libraries
- [Quantico](https://fonts.google.com/specimen/Quantico) for text, with Noto Sans JP as a fallback for the Japanese slogan (Quantico has no Japanese glyphs)

## Notes and limitations

- Favourites are kept in memory only, so they reset when the page is refreshed.
- Sprites are loaded from the [PokeAPI sprites repository](https://github.com/PokeAPI/sprites), and the logo from Wikimedia Commons, so the app needs an internet connection to show them.
- The type filter on phones is a single-select dropdown, while the chips on larger screens allow multiple types.

## Credits and disclaimer

Pokémon sprite images come from the [PokeAPI sprites project](https://github.com/PokeAPI/sprites).

This is an unofficial fan project, built for learning. Pokémon and all related names, characters and logos are trademarks of Nintendo, Game Freak and Creatures Inc. This project is not affiliated with or endorsed by them.