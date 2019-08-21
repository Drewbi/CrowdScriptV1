const express = require("express");
const { addUser } = require("../controllers/users");
const router = express.Router();

/* GET register page. */
router.get("/", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

router.post("/", (req, res) => {
  addUser(req, res);
});

module.exports = router;
