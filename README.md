# Pokémon Explorer

A responsive Pokédex-style app for browsing Pokémon, comparing their stats and keeping track of your favourites. Built with React, JSX and plain CSS.

## Features

- **Hero section** with the original Japanese slogan, the Pokémon logo, live stats (total Pokémon, number of types, number of favourites) and an animated pokeball that catches a different Pokémon every cycle.
- **Search** by Pokémon name.
- **Type filters**, color-coded per type. Select several at once on tablet and desktop. On phones they become a dropdown next to the sort control.
- **Sorting** by name, HP or attack, ascending or descending.
- **Card grid** with infinite scrolling: 4 columns on desktop, 3 on tablet, 2 on mobile.
- **Pokémon cards** showing the sprite, name, type, and HP and attack as game-style segmented bars.
- **Favourites**: click the heart on a card. The count in the hero updates instantly.
- **Accessible by default**: keyboard focus styles, labelled controls, and `prefers-reduced-motion` support (the pokeball animation and bar animations are switched off).

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