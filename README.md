# letspayalex

Sharing is caring. This project makes it easier to share!

## Installation

Install node.js, e.g. via `brew install node`. Then run `npm install` in the root directory of the project and in the `backend` and `frontend` directories.

Install mongodb locally via

- `brew tap mongodb/brew`
- `brew update`
- `brew install mongodb-community@7.0`.
- Set up a folder for the database, e.g. `mkdir -p data/db`.

Install typescript globally via `npm install -g typescript`. You may need to run `npm link typescript` and add `--legacy-peer-deps` to the `npm install` command if you get an error.

## Run the Application

Run the database with `mongod --dbpath data/db`.

To start the backend navigate to the `backend` directory and run `npm run server`.

To start the frontend navigate to the `frontend` directory and run `npm start`.

The server is located at port `6001` and the frontend is loaded on port `3001`.

## Development

To automatically restart your server whenever you make changes, install nodemon globally with `npm install -g nodemon` and then start your server with `nodemon server.js`.

## Useful tips

### lint

We use [eslint](https://eslint.org/docs/latest/use/command-line-interface) for linting. To run, `npx eslint "frontend/**`.

### Editor config

When using VSC, install EditorConfig plugin.

## TODO: do we need typescript?

`npm install -g typescript`
