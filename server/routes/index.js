var express = require("express");
const userModel = require("../model/user.model");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Registration And Login");
});

router.post("/register", (req, res) => {
  // To post / insert data into database

  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      userModel
        .create(req.body)
        .then((log_reg_form) =>
          res.json({
            data: log_reg_form,
            message: "User registered successfully!",
          })
        )
        .catch((err) => res.json(err));
    }
  });
});

router.post("/login", (req, res) => {
  // To find record from the database
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Wrong password" });
      }
    }
    // If user not found then
    else {
      res.json({ message: "No records found! " });
    }
  });
});

module.exports = router;
