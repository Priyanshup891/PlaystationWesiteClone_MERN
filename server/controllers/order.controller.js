const Order = require("../models/order.model.js");
const User = require("../models/auth.model.js");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendMail.js");

const createOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.create({
      cart: req.body.cart,
      totalAmount: req.body.totalAmount,
      totalItems: req.body.totalItems,
      user: req.user.id,
      status: req.body.status,
      selectedAddress: req.body.selectAddress,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          paymentInfo: req.body.paymentInfo,
          status: req.body.status,
          paidAt: Date.now(),
        },
      },
      {
        new: true,
      }
    );

    const user = await User.findById(req.user.id);

    const emailTemplate = `
    <h3>Thank you for order!</h3>
    `;

    sendEmail({
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Order Received",
      html: emailTemplate,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { createOrder, updateOrder };
