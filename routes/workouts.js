/* const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')

// Get all
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get Range
router.get('/workouts/range', getWorkout, (req, res) => {
  res.json(res.workout
})

// Create one
router.post('/workouts', async (req, res) => {
  const workout = new Workout({
    workout: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newWorkout = await workout.save()
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update One
router.patch('/workouts/:id', getWorkout, async (req, res) => {
  if (req.body.name != null) {
    res.workout.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.workout.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedWorkout = await res.workout.save()
    res.json(updatedWorkout)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete One
router.delete('/workouts/:id', getWorkout, async (req, res) => {
  try {
    await res.workout.remove()
    res.json({ message: 'Deleted Workout' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getWorkout(req, res, next) {
  let workout
  try {
    workout = await Workout.findById(req.params.id)
    if (workout == null) {
      return res.status(404).json({ message: 'Cannot find workout' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.workout = workout
  next()
}

module.exports = router */

const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get all
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

/* async function getWorkout(req, res, next) {
  let workout;
  try {
    workout = await Workout.findById(req.params.id);
    if (workout == null) {
      return res.status(404).json({ message: 'Cannot find workout' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.workout = workout;
  next();
} */

module.exports = router