const router = require("express").Router();
let Exercise = require("../models/exercise.model"); //model that we just created

//Our first route. First endpoint that handles incoming http get requests. If LocalHost:5000/users/ then this is going to happen
router.route("/").get((req, res) => {
  Exercise.find() //mongoos method that gets a list of all the users from the mongodb atlas db
    .then((exercises) => res.json(exercises)) //return users in json format
    .catch((err) => res.status(400).json("Error: " + err)); //catch error if at all
});

//second route handles incoming post requests

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
