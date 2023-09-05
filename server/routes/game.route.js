const router = require("express").Router();
const { getAllGames, getGameById } = require("../controllers/game.controller");

router.get("/", getAllGames);
router.get("/:id", getGameById);

module.exports = router;
