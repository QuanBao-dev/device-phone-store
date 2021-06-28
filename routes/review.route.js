const Joi = require("joi");
const { nanoid } = require("nanoid");
const { verifyRole } = require("../middleware/verify");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const router = require("express").Router();

router.post("/", verifyRole("Admin", "User"), async (req, res) => {
  try {
    validation(req.body, {
      star: Joi.number().required(),
      content: Joi.string().required(),
      imageUrl: Joi.string().required(),
      createdAt: Joi.date().required(),
      productId: Joi.string().required(),
    });
    const [product, user] = await Promise.all([
      Product.findOne({ productId: req.body.productId }),
      User.findOne({ userId: req.userVm.userId })
        .lean()
        .select({ _id: -1, username: 1, email: 1 }),
    ]);
    if (!product.reviews) product.reviews = [];
    if (product.reviews)
      product.reviews.push({
        reviewId: nanoid(),
        star: req.body.star,
        username: user.username,
        email: user.gmail,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        createdAt: req.body.createdAt,
      });
    await product.save();
    const message = product.toJSON();
    delete message._id;
    res.send({ message });
  } catch (error) {
    catchError(error, res);
  }
});

router.delete("/", verifyRole("Admin", "User"), async (req, res) => {
  const userId = req.userVm.userId;
  try {
    validation(req.body, {
      userId: Joi.string().required(),
      productId: Joi.string().required(),
      reviewId: Joi.string().required(),
    });
    if (userId !== req.body.userId) throw Error("Access denied");
    let product = await Product.findOne({
      productId: req.body.productId,
    });
    product.reviews = product.reviews.filter((review) => {
      return review.reviewId !== req.body.reviewId;
    });
    res.send({ message: "success" });
  } catch (error) {
    catchError(error, res);
  }
});

function validation(data, schemaOptions) {
  const schema = Joi.object(schemaOptions);
  const result = schema.validate(data);
  if (result.error) throw Error(result.error.details[0].message);
}

function catchError(error, res) {
  if (error) return res.status(400).send({ error });
  res.status(404).send({ error: "404 not found" });
}

module.exports = router;