const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    location: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);


const Photo = mongoose.model("Photo", photoSchema);

module.exports = { Photo };
