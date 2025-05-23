const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User Schema Model - (Name, email, password, creation Date) with validation rules
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password Must Be Atleast 6 characters"],
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },

    avatarImage: {
      type: String,
      default: "",
    },
    transactions: {
      type: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    budgetLimit: {
      type: Number,
      default: 5000000,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
