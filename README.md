[![Build Status](https://travis-ci.com/Ooblioob/react-card-game.svg?branch=master)](https://travis-ci.com/Ooblioob/react-card-game)
[![codecov](https://codecov.io/gh/Ooblioob/react-card-game/branch/master/graph/badge.svg)](https://codecov.io/gh/Ooblioob/react-card-game)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1cb6dde25e3fbcd9811/maintainability)](https://codeclimate.com/github/Ooblioob/react-card-game/maintainability)
![Dependencies](https://img.shields.io/david/ooblioob/react-card-game)
![Dev Dependencies](https://img.shields.io/david/dev/ooblioob/react-card-game)

# Card Matching Game

A simple card matching game that gave me a chance to explore React as a framework!

Decide for yourself: the greatest card matching game ever? 

<img src="docs/gameplay_trailer.gif" alt="Card Matching Game Trailer" height="200px">

## How To Play ♠♣♥♦

Check out our [detailed gameplay instructions](docs/instructions.md)

## Architecture 🏡

Read more about some of the [design decisions](docs/architecture.md)

## Development 🎴🃏

### `npm start`

```bash
# start development server at:
# http://localhost:3000/react-card-game
npm start
```

Localhost: http://localhost:300/react-card-game

## Testing 🧪✅

### `npm test`

```bash
# run unit tests (interactive)
npm test

# run unit tests (CI-mode)
npm test --watchAll=false

# generate coverage report
npm test -- --coverage --watchAll=false
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) from Create React App for more information.

## Deployments 🚀

### `npm build` & `npm deploy`

```bash
# Builds a minified, optimized bundle in PRODUCTION mode
# does NOT deploy
npm build

# Builds AND deploys to gh-pages
npm run deploy
```

Production Environment: https://ooblioob.github.io/react-card-game

## Framework Choices 📋

- **Unit Testing**: Jest w/ Enzyme
- **Linting/Style Guide**: eslint (react config)
- **Authentication**: Auth0
- **Routing**: React-Router
- **Confetti**: canvas-confetti

## Contributions

I ❤ feedback and I'm always trying to improve my craft. If you see something I should improve, file an [issue](https://github.com/Ooblioob/react-card-game/issues)

Specifically, I'd love to improve:

- Writing more idiomatic React/Javascript code
- Testing more effectively
- Balancing delightful features with code that helps me practice and improve my craft
