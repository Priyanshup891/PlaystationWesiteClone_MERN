const router = require("express").Router();
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/payment.controller");
const { getAccessToRoute } = require("../middleware/auth/auth");

router.post("/process", getAccessToRoute, processPayment);
router.get("/stripeapi", getAccessToRoute, sendStripeApi);

module.exports = router;
