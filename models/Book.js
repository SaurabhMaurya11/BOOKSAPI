const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    name: String,
    author: String,
    price: String,
    pages:String,
    image: {
      type: String,
      default: "default.png",
    },
  },
//   {
//     timestamps: true,
//   }
);

module.exports = mongoose.model("Book", BookSchema);
