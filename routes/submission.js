const express = require('express');

const router = express.Router();

/* GET users listing. */
router.post('/', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;