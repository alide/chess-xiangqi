## A Xiangqi-Chess game

## Starting application

The application is assembled in [Webpack](https://webpack.github.io/), a web module bundler that runs on [NodeJS](https://nodejs.org/en/). Latest version of `npm` is prefered ( ~> 3.7.3).
If you already installed `npm`, this upgrade can be done with:

> sudo npm install -g npm@latest

To deploy the application on a local server, go the project directory in Terminal or Command Prompt(windows), run

> npm install

this will take 5-10 mins depending on your hardware. then run

> npm run start

At this point a browser page should open, or you can manually load in a modern browser `http://localhost:8000`.


## Upcoming work
----------------

### Building up many widget that can display

- [x] game timer
- [x] display of the current player
- [ ] graveyard

### Game Options
- [x] Reset
- [ ] Undo

### History
- [ ] history of moves
- [ ] clickable to link to the move

### Simple AI
- [ ] Produce optimally decided options based on value of position and pieces
  e.g. Chariot = 5, Cannon = 4, Knight = 3, etc.