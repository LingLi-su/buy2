const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = mongoose.Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
    url: {
      type: String,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  { timestamps: true }
);


const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Tag };
