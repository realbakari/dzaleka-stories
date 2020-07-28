const router = require("express").Router();

const actions = require("./register");

router.route("/").post(async (req, res, next) => {
  const user = req.body;
  if (user && user.email && user.password) {
    try {
      const {id} = await actions.addUser(user);
      if (id) {
        res.status(201).json({ message: "User successfully added.", id });
      } else {
        res.status(400).json({ message: "The user already exists." });
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).json({
      message: "Please provide a  email and password for registration."
    });
  }
});

module.exports = router;
