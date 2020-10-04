const router = require("express").Router();
const Workout = require("../models/workout.js");

//Post
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    //Add workout to existing exercises
    { $push: { exercises: body } },
    //Validate that the submitted form isn't missing any required information
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get all workouts
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get workouts in range
router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(12)
    .then(dbWorkouts => {
      console.log(dbWorkouts)
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete a workout
router.delete("/api/workouts", (req, res) => {
  Workout.findByIdAndDelete(req.body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
