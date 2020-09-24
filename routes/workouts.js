const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get All
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Range
router.get('/range', async (req, res) => {
  try {
    const workouts = await Workout.find().limit(7);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Create One
router.post('/', async (req, res) => {
  const workout = new Workout(
    {
      exercises: [{
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance
      }]
    });
  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Update One
router.put("/:id", async (req, res) => {
  try {
  const workout = await Workout.findByIdAndUpdate(req.params.id,
    { $push: { exercises: [{
      type: req.body.type,
      name: req.body.name,
      duration: req.body.duration,
      weight: req.body.weight,
      reps: req.body.reps,
      sets: req.body.sets,
      distance: req.body.distance
    }]} }
  );
  res.status(201).json(workout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// Delete One
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.body.id);
    res.json({ message: 'Deleted workout' })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;