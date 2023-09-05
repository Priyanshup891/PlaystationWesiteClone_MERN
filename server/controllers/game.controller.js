const Game = require("../models/game.model.js");
const asyncHandler = require("express-async-handler");

const getAllGames = asyncHandler(async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getGameById = asyncHandler(async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { getAllGames, getGameById };
