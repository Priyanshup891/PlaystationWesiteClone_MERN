const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
const authRoute = require("./routes/auth.route.js");
const gameRoute = require("./routes/game.route.js");
const cartRoute = require("./routes/cart.route.js");
const orderRoute = require("./routes/order.route.js");
const paymentRoute = require("./routes/payment.route.js");
const seedGames = require("./utils/seeder");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/game", gameRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is setup on http://localhost:${PORT}`);
});

connectDatabase();
seedGames();
