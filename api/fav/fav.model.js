const mongoose = require("mongoose");
const FavSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Fav", FavSchema);
