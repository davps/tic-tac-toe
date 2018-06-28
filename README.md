# Showcase of my development workflow

Since all my relevant development work is focused on private, commercial codebases, I am writing this small tic tac toe game to showcase my skillsets to the world. Hello, world!

|            | Status                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CI service | [![Build Status](https://travis-ci.org/davps/tic-tac-toe.png?branch=master)](https://travis-ci.org/davps/tic-tac-toe)                                          |
| Tests      | [![Coverage Status](https://coveralls.io/repos/github/davps/tic-tac-toe/badge.png?branch=master)](https://coveralls.io/github/davps/tic-tac-toe?branch=master) |

## Live demo

[View the live demo on Heroku](https://tic-tac-toe-david.herokuapp.com/) or the [individual UI components](https://davps.github.io/tic-tac-toe) of my Storybook on Github Pages.

![Demo Animation](./docs/demo.gif?raw=true)

## Tech stack

- Create-react-app, which includes: React, JSX, ES6, Webpack, Babel and other amazing projects.
- Prettier Code Formatter + ESLint setup with Airbnb's style guide + VSCode integration
- Jest + Enzyme for tests, including `@storybook/addon-storyshots` to snapshot test my Storybook and puppeteer for e2e tests.
- Storybook of [my UI components](https://davps.github.io/tic-tac-toe)
- Travis CI to build the production bundles and deploy it to Heroku, run the tests, creating and publishing [the test coverage report](https://coveralls.io/github/davps/tic-tac-toe) and the [UI documentation as a Storybook](https://davps.github.io/tic-tac-toe) on Github Pages.

## Best practices

- Super-high test coverage, including unit tests, integration tests and end to end tests.
- Application of the DRY principle.
- Usage of a linter and code formatting.
- Atomic design and Component Driven Development for the UI. Each UI component does only one thing and one thing well and are tested in isolation then later in conjunction and build their documentations as I write the code using Storybook.
- Test Driven Development for the business logic.
- Good separation of concerns between the views (React components) and their state management (Redux).
- Pixel-perfect CSS on the react components (see how I use styled components on `Board.jsx` and `Square.jsx`.
