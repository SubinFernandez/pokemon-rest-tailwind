This is a demo web-app listing all Pokemons in the gallery page and showing details in the details page.

## Live Demo
This demo app is hosted on Vercel at [pokemon-rest-tailwind.vercel.app](https://pokemon-rest-tailwind.vercel.app/).

## Tech Stack
- Next.js
- TypeScript
- React hooks and Context
- TailWind CSS
- HeroIcons
- REST APIs from [pokeapi.co](https://pokeapi.co)
- Jest and React-Testing-Library
- ESLint, Husky & Prettier

**Note**: No external state management tool such as MobX or Redux is used in the demo, as this is a simple use-case.

## Features
### Landing Page
The landing page has the Hero component apart from common components such as Header and sticky Footer.

### Gallery Page
The gallery page has following features:
- lists Pokemons in a lot of 10, 20 or 50 per page
- navigation with options of pervious and next pages
- sort Pokemons by name (Sorting by weight & height is not implemented as they are not part of the Pokemon list REST API)
- filter by name or ability and to reset any filter
- gallery page's URL has page offset and items limit as query parameters, useful if URL needs to be sent to someone
- the page remembers its scroll position while returning from the details page

### Details Page
The details page shows species data and stats of the selected Pokemon. The URL pattern used is /pokemons/[pokemon name or id]
