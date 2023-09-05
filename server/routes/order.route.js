const router = require("express").Router();
const { createOrder, updateOrder } = require("../controllers/order.controller");
const { getAccessToRoute } = require("../middleware/auth/auth");

router.post("/", getAccessToRoute, createOrder);
router.patch("/:id", getAccessToRoute, updateOrder);

module.exports = router;
