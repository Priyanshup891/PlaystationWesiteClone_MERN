const Cart = require("../models/cart.model.js");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.create({
      user: req.user.id,
      game: req.body.gameId,
      quantity: req.body.quantity,
    });
    const doc = await cart.populate("game");
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getAllCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.findById(req.user.id).populate("game");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateCart = asyncHandler(async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const result = await updatedCart.populate("game");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteCart = asyncHandler(async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart is deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { addToCart, getAllCarts, updateCart, deleteCart };
