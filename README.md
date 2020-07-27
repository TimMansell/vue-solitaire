<p align="center">
  <a href="https://solitaire.timmansell.com" target="_blank" rel="noopener noreferrer">
    <img src="/src/assets/logo.svg" alt="Solitaire logo" width="150">
  </a>
</p>

<h1 align="center">Solitaire</h1>

## Contents

1. [How to Play](#how-to-play)
1. [Project Setup](#project-setup)
1. [Tests](#tests)

## How to play

The aim of the game is to successfully move all cards from the bottom 8 board columns to the top 4 foundation columns.

### Rules

#### Face up cards

You can move any face up card to any other face up card providing:

- the card being moved to is exposed at the bottom of the column (no cards below it)
- the cards are the same suit and is one value lower
- both cards aren't on the same column

For example, you can move 5♦ to 6♦ but _not_ 8♦ to 7♦.
Moving a card will also move all the cards below it.

#### Kings

If you clear out a column you can only move a **K** to fill that column. All cards below the **K** will also be moved to that column.

#### Foundation

Cards can only be moved to the foundation columns in the following order: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.

- only one suit per column is allowed.
- you can only move an exposed card at the bottom of the column (no cards below it)

### Moving cards

You can move cards by:

- clicking and dragging the card(s) to the desired column (non-touch devices only)
- clicking on the card you want to move and then clicking on the desired column. All cards below the selected card will be moved as well
- double clicking (or tapping) or swiping up on cards will move them to the foundation columns

## Project Setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

## Tests

More information on testing can be found [here](/tests)

### Run unit tests

```
yarn test:unit
```

### Run end-to-end tests

```
yarn test:e2e
```

## Linting

### Lints and fixes CSS & JS files

```
yarn lint
```
