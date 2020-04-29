# Architecture

## Design Goals

### Follow React Idioms

React has evolved substantially in the last 5 years. Learning to use "modern" react can be tricky, since the framework continues to evolve. Specifically:

- Using hooks like `useState` and `useEffect` to write more functional components
- Using ES6 styles, like spread operators and destructuring
- Learning to use `async` and `await` as needed to resolve promises
- Leveraging the built in defaults from Create React App vs navigating the world of WebPack / Babel / other customizations

### Write Only Pure Functions

This was a personal goal. Pure functions (functions that do not modify passed parameters, i.e. no side effects) have incredible benefits and are substantially easier to test. It also helps keep functions small and composable.

That said, it is _very_ tempting to simply modify the state of an object. My goal was to be explict about which functions were impure. There are some tradeoffs for this, mainly around performance, but the scale of data we're working with (`array.length` < 100 in all cases) makes that tradeoff acceptable.

## Component Design

```JSX
<Auth0Provider>
  <App>
    <Game>
      <Card />
      <Card />
      ...
      <Card />
    </Game>
  </App>
</Auth0Provider>
```

### `<Auth0Provider>`

Provides the User context from the Auth0 client.

I chose to use Auth0 for a few reasons:<br>
**Off-the-shelf:** Why build my own framework? Authentication protocol isn't my focus for this project, so I'd rather use something off the shelf<br>
**Follow Best Practices:** Auth0 is a reputable company with a focus on security. They implement many best practices by default, so using their client vastly improves the security over my own design<br>
**Avoid the JWT in Local Storage Anti-pattern:** Most tutorials on authentication use JWT in local storage for ease of setup, but [this is a recognized anti-pattern](https://www.rdegges.com/2018/please-stop-using-local-storage/) in production builds

### `<App>`

This component merely handles rendering the high-level site layout and routing. There's nothing special about it.

### `<Game>`

Handles the user interaction and rendering of the basic card game.

There are 4 ways the user can interact with the game:
| User Action | Outcome |
|-------------|---------|
| Clicking "Start Over?" | Resets the game to the starting position |
| Clicking "Shuffle" | Shuffles the cards into a random position (but does not change the value of cards) |
| Clicking "Unflip" | Unflips all cards that are flipped (but does not change the value of cards) |
| Clicking on a card | Flips the card and alters the state of the game |

The `<Game>` component is responsible for checking if card clicks result in matches or cause the game to be won, and updates the state appropriately.

### `<Card>`

This is a functional component responsible for displaying the card. This includes looking up the right image for the front and back of the card. It's state is passed in from the `<Game>` component.

## Helpers and Utilities

Much of the basic card game's logic has been pulled out into utils or helper methods. This helps promote writing pure functions but also avoids the temptation to create massive Objects or Classes for passing around state.

## CSS Framework

I'm using the [W3.CSS](https://www.w3schools.com/w3css/default.asp) framework. Why? 🤷‍♂️

- Wanted a responsive web design based on standards
- Didn't want to waste time building my own CSS layout, since that's not the focus of this project
- All bootstrap sites look the same. In hindsight, I probably should have just used bootstrap
- I'm not an expert in CSS frameworks
