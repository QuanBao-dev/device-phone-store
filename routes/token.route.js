const { verifyRole } = require("../middleware/verify");
const User = require("../models/user.model");

const router = require("express").Router();

router.get("/", verifyRole("Admin", "User"), async (req, res) => {
  const user = await User.findOne({ userId: req.userVm.userId }).lean().select({
    _id: 0,
    firstName: 1,
    lastName: 1,
    email: 1,
    role: 1,
    userId: 1
  });
  res.send({ message: user });
});

module.exports = router;
