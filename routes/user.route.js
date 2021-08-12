const User = require("../models/user.model");
const { compare, genSalt, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { verifyRole, verifyLogin } = require("../middleware/verify");
const Joi = require("joi");
const router = require("express").Router();
let options = {
  path: "/",
  sameSite: "lax",
  secure: false,
  httpOnly: false,
  signed: true,
};

router.post("/login", verifyLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    validation(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const user = await User.findOne({ email }).lean();
    const newLocal = "User doesn't exist";
    if (!user) throw newLocal;
    const newLocal_1 = "your Email or Password is wrong";
    if (user.email !== email) throw newLocal_1;
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw newLocal_1;
    const token = sign(
      {
        userId: user.userId,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      }
    );
    handleOptionsCookie();
    res.cookie("idUser", token, options);
    res.send({ message: token });
  } catch (error) {
    console.log(error);
    catchError(error, res);
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    validation(req.body, {
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const user = await User.findOne({ email }).lean();
    if (user) {
      const newLocal = "email existed";
      throw newLocal;
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.send({
      message: "sign up success",
    });
  } catch (error) {
    console.log(error);
    catchError(error, res);
  }
});

router.put("/:userId/edit", verifyRole("User", "Admin"), async (req, res) => {
  const { password, currentPassword, username, email } = req.body;
  try {
    validation(req.body, {
      password: Joi.string().min(6),
      currentPassword: Joi.string().min(6).required(),
      username: Joi.string(),
      email: Joi.string().email(),
    });
    const user = await User.findOne({ userId: req.userVm.userId });
    const isValidPassword = await compare(currentPassword, user.password);
    const newLocal_1 = "Invalid Password";
    if (!isValidPassword) throw newLocal_1;
    if (password) {
      const salt = genSalt(10);
      const hashPassword = hash(password, salt);
      user.password = hashPassword;
    }
    if (username) user.username = username;
    if (email) {
      const isGmailExist = !!(await User.findOne({ email })
        .select({ _id: 1 })
        .lean());
      if (isGmailExist) {
        const newLocal = "Gmail existed";
        throw newLocal;
      }
      user.email = email;
    }
    await user.save();
    res.send({ message: "edit success" });
  } catch (error) {
    catchError(error, res);
  }
});

router.delete("/logout", verifyRole("Admin", "User"), (req, res) => {
  try {
    if (!req.userVm) {
      const newLocal_1 = "Access denied";
      throw newLocal_1;
    }
    res.cookie("idUser", "", {
      expires: new Date(Date.now() - 43200 * 1000),
    });
    res.send({ message: "success" });
  } catch (error) {
    catchError(error, res);
  }
});

module.exports = router;
function handleOptionsCookie() {
  options.expires = new Date(Date.now() + 43200 * 1000);
  if (process.env.NODE_ENV === "development") {
    options.secure = false;
    options.httpOnly = false;
  }
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
    options.httpOnly = true;
  }
}

function catchError(error, res) {
  if (error) return res.status(400).send({ error });
  res.status(404).send({ error: "404 not found" });
}

function validation(data, schemaOptions) {
  const schema = Joi.object(schemaOptions);
  const result = schema.validate(data);
  if (result.error) throw result.error.details[0].message;
}
