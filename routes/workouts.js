const express = require('express');
const { Workout } = require('../models');
const router = express.Router();

//Get All
router.get('/workouts', (req, res) => {
    Workout.find({})
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get One
router.get('/workouts/range', (req, res) => {
    Workout.find({}).limit(10)
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

//Create One
router.post('/workouts', (req, res) => {
    Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update One
router.put('/workouts/:id', (req, res) => {
    res.send('Hello Update');
});

//Delete One
router.delete('/workouts/:id', (req, res) => {
    res.send('Hello Delete');
    
});

module.exports = router;