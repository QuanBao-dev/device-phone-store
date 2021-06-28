const router = require("express").Router();
const Joi = require("joi");
const { nanoid } = require("nanoid");
const { verifyRole } = require("../middleware/verify");
const Product = require("../models/product.model");

const options = {
  productId: 1,
  title: 1,
  imageUrl: 1,
  tags: 1,
  originalPrice: 1,
  star: 1,
  isSale: 1,
  newPrice: 1,
  kinds: 1,
  description: 1,
  additionalInformation: 1,
  _id: 0,
};

router.get("/", async (req, res) => {
  const { kind, isSale, limit, page } = req.query;
  let queryObject = {};
  try {
    if (kind) queryObject.kinds = kind;
    if (isSale) queryObject.isSale = true;
    let allProducts;
    if (limit)
      allProducts = await Product.find(queryObject)
        .lean()
        .limit(parseInt(limit))
        .select(options);
    if (page)
      allProducts = await Product.find(queryObject)
        .lean()
        .skip((+page - 1) * 9)
        .limit(9)
        .select(options);
    if (!limit && !page)
      allProducts = await Product.find(queryObject).lean().select(options);
    res.send({
      message: allProducts,
    });
  } catch (error) {
    catchError(error, res);
  }
});

router.get("/:productId/reviews", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({ productId })
      .lean()
      .select({ _id: 0, reviews: 1 });
    const { reviews } = product;
    res.send({
      message: reviews || [],
    });
  } catch (error) {
    catchError(error, res);
  }
});

router.delete(
  "/:productId/reviews/:reviewId",
  verifyRole("Admin", "User"),
  async (req, res) => {
    const { productId, reviewId } = req.params;
    const { userVm } = req;
    try {
      const product = await Product.findOne({ productId });
      const newLocal = "Product doesn't exist";
      if (!product) throw newLocal;
      const review = product.reviews.find(
        (review) => review.reviewId === reviewId
      );
      const newError = "You don't have permission";
      if (userVm.userId !== review.userId) throw newError;
      product.reviews = product.reviews.filter(
        (review) => review.reviewId !== reviewId
      );
      await product.save();
      res.send({ message: "success" });
    } catch (error) {
      catchError(error, res);
    }
  }
);

router.put(
  "/:productId/reviews",
  verifyRole("Admin", "User"),
  async (req, res) => {
    const productId = req.params.productId;
    const newReview = req.body;
    const { userVm } = req;
    newReview.reviewId = nanoid();
    newReview.userId = userVm.userId;
    try {
      const product = await Product.findOne({ productId });
      const error = "Product isn't existed";
      if (!product) throw error;
      if (!product.reviews) product.reviews = [];
      product.reviews.push(newReview);
      await product.save();
      res.send({
        message: "success",
      });
    } catch (error) {
      catchError(error, res);
    }
  }
);

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const { isRelatedProductsIncluded } = req.query;
  try {
    const product = await Product.findOne({ productId }).lean().select(options);
    const { tags } = product;
    let dataRelatedProduct = {};
    if (isRelatedProductsIncluded)
      await Promise.all(
        tags.map(async (tag) => {
          const matchData = await Product.aggregate([
            { $match: { tags: tag } },
            { $project: options },
          ]);
          matchData.forEach(
            (dataMatch) =>
              dataMatch.title !== product.title &&
              (dataRelatedProduct[dataMatch.title] = dataMatch)
          );
        })
      );
    if (!product) throw Error("Not found product");
    res.send({
      message: { product, dataRelatedProduct },
    });
  } catch (error) {
    catchError(error, res);
  }
});

router.post("/", verifyRole("Admin"), async (req, res) => {
  const {
    title,
    imageUrl,
    tags,
    originalPrice,
    star,
    isSale,
    newPrice,
    description,
    additionalInformation,
  } = req.body;
  //TODO add one product
  try {
    const newProduct = new Product({
      productId: parseUrlTitle(title),
      title,
      imageUrl,
      tags,
      originalPrice,
      star,
      isSale,
      newPrice,
      description,
      additionalInformation,
    });
    await newProduct.save();
    res.send({ message: newProduct });
  } catch (error) {
    catchError(error, res);
  }
});

router.put("/:productId", verifyRole("Admin"), async (req, res) => {
  const { productId } = req.params;
  try {
    let updateOptions = {};
    if (req.body.star) updateOptions.star = +req.body.star;
    if (req.body.title) updateOptions.title = req.body.title;
    if (req.body.isSale) updateOptions.isSale = req.body.isSale;
    if (req.body.description) updateOptions.description = req.body.description;
    if (req.body.originalPrice)
      updateOptions.originalPrice = req.body.originalPrice;
    if (req.body.additionalInformation)
      updateOptions.additionalInformation = req.body.additionalInformation;
    if (req.body.kinds) updateOptions.kinds = req.body.kinds;
    validation(updateOptions, {
      title: Joi.string().min(1),
      isSale: Joi.boolean(),
      description: Joi.string().min(1),
      originalPrice: Joi.string().min(1),
      additionalInformation: Joi.object(),
      star: Joi.number().min(1),
      kinds: Joi.array(),
    });
    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      updateOptions,
      { new: true }
    )
      .lean()
      .select(options);
    const error = "Product isn't existed";
    if (!updatedProduct) throw error;
    res.send({ message: updatedProduct });
  } catch (error) {
    catchError(error, res);
  }
});

router.delete("/:productId", verifyRole("Admin"), async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOneAndDelete({ productId })
      .lean()
      .select(options);
    res.send({
      message: product,
    });
  } catch (error) {
    catchError(error, res);
  }
});

module.exports = router;

function parseUrlTitle(title) {
  return title
    .toLocaleLowerCase()
    .replace(/[″!@#$%^&*.]/g, "")
    .replace(/ /g, "-");
}

function catchError(error, res) {
  if (error) return res.status(400).send({ error });
  res.status(404).send({ error: "404 not found" });
}

function validation(data, schemaOptions) {
  const schema = Joi.object(schemaOptions);
  const result = schema.validate(data);
  if (result.error) throw Error(result.error.details[0].message);
}
