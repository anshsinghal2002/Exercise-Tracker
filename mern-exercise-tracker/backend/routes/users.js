const router = require("express").Router();
let User = require("../models/user.model"); //model that we just created

//Our first route. First endpoint that handles incoming http get requests. If LocalHost:5000/users/ then this is going to happen
router.route("/").get((req, res) => {
  User.find() //mongoos method that gets a list of all the users from the mongodb atlas db
    .then((users) => res.json(users)) //return users in json format
    .catch((err) => res.status(400).json("Error: " + err)); //catch error if at all
});

//second route handles incoming post requests

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
//always needed
module.exports = router;
