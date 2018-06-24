# Showcase of my development workflow [![Build Status](https://travis-ci.org/davps/tic-tac-toe.svg?branch=master)](https://travis-ci.org/davps/tic-tac-toe) [![Coverage Status](https://coveralls.io/repos/github/davps/tic-tac-toe/badge.svg?branch=master)](https://coveralls.io/github/davps/tic-tac-toe?branch=master)

I am developing this Tic tac toe game to showcase my skillsets.

## Live demo

[View the live demo](https://davps.github.io/tic-tac-toe) of tic-tac-toe and the individual components on my Storybook

## Tech stack

- Create-react-app, which includes: React, JSX, ES6, Webpack, Babel and other amazing projects.
- Prettier Code Formatter + ESLint setup with Airbnb's style guide + VSCode integration
- Jest + Enzyme for tests, including `@storybook/addon-storyshots` to snapshot test my Storybook
- Storybook of [my UI components](https://davps.github.io/tic-tac-toe)
- Travis CI to build the production bundles, run the tests, creating and publishing [the test coverage report](https://coveralls.io/github/davps/tic-tac-toe) and the [UI documentation as a Storybook](https://davps.github.io/tic-tac-toe) on Github Pages.

## Best practices

- Application of the DRY principle everywhere, including:
  - having a single “source of truth” on the shared react states,
  - using a single enumeration object to render the same information on two different components
- Usage of a linter and code formatting.
- Regression tests.
- Atomic design and Component Driven Development for the UI. Each UI component does only one thing and one thing well and are tested in isolation then later in conjunction and build their documentations as I write the code using Storybook.
- Test Driven Development for the business logic.
- Good separation of concerns between the views (React components) and their state management (Redux) - WIP.

## Relevant history:

- Original code, this is what I've developed in about 1 hour, not completed but close
  https://github.com/davps/tic-tac-toe/tree/445c98f32a92aa389390323664d45c61c1e680b2

- Tic tac toe - Feature complete. This is a basic version, at this point the tech stack only includes react, nothing more.
  https://github.com/davps/tic-tac-toe/commit/14351e298328162af2c4384eb2957d9beb66b6b2

- Applying optimizations for React:
  Fixed the unnecesary render() calls by calling `setState` only once on [this function](https://github.com/davps/tic-tac-toe/commit/7372b0c2bad344e92bce18d64bde4276a3ee8128#diff-84599220e354fbfa3b9310dec52ed9bcL270).
