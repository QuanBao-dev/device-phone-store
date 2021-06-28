const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, require: true },
  title: { type: String, require: true },
  imageUrl: { type: String, require: true },
  tags: { type: [String], require: true },
  originalPrice: { type: String },
  star: { type: Number, require: true },
  isSale: { type: Boolean, require: true },
  newPrice: { type: String },
  description: { type: String, require: true },
  additionalInformation: {
    type: mongoose.SchemaTypes.Mixed,
    require: true,
  },
  kinds: {
    type: [String],
    default: [],
  },
  reviews: {
    type: [
      mongoose.Schema({
        _id: false,
        userId: { type: String, require: true },
        reviewId: { type: String, require: true },
        star: { type: Number, require: true },
        username: { type: String, require: true },
        email: { type: String, require: true },
        content: { type: String, require: true },
        imageUrl: {
          type: String,
          default:
            "https://secure.gravatar.com/avatar/a6744578f6a2d7f0c351ed2ddcb40742?s=70&d=mm&r=g",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }),
    ],
  },
});

module.exports = mongoose.model("products", productSchema);
