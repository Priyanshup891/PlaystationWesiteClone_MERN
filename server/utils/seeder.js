const Game = require("../models/game.model.js");
const games = require("../data/games.json");

const seedGames = async () => {
  try {
    await Game.deleteMany();
    console.log("Games are deleted!");

    await Game.insertMany(games);
    console.log("All games are added!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedGames;
