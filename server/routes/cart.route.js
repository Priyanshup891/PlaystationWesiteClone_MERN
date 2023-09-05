const router = require("express").Router();
const {
  addToCart,
  getAllCarts,
  updateCart,
  deleteCart,
} = require("../controllers/cart.controller");
const { getAccessToRoute } = require("../middleware/auth/auth");

router.post("/", getAccessToRoute, addToCart);
router.get("/", getAccessToRoute, getAllCarts);
router.patch("/:id", getAccessToRoute, updateCart);
router.delete("/:id", getAccessToRoute, deleteCart);

module.exports = router;
