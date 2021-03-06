const express = require("express");
const { validateUser } = require("../controllers/users");
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Login",
      user: req.user
    });
  }
});

router.post("/", (req, res) => {
  validateUser(req, res);
});

module.exports = router;
