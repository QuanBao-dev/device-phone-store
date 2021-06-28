const router = require("express").Router();
const path = require("path");

const handleRouteFrontEnd = (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
};

router.get("/", handleRouteFrontEnd);

router.get("/product/:productId", handleRouteFrontEnd);

router.get("/shop/page/:page", handleRouteFrontEnd);

router.get("/register", handleRouteFrontEnd);

router.get("/login", handleRouteFrontEnd);

router.get("/checkout", handleRouteFrontEnd);

module.exports = router;
