const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

const processPayment = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const sendStripeApi = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_PUBLISH_KEY,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { processPayment, sendStripeApi };
