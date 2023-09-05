const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: [true, "Please provide different e-mail"],
    },
    password: {
      type: Schema.Types.String,
      required: true,
      minlength: [6, "Please provide a longer password than your input"],
    },
    role: {
      type: Schema.Types.String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
