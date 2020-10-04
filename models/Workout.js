const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "You must enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "You must enter an exercise name"
        },
        duration: {
          type: Number,
          required: "You must enter an exercise duration"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  }
);

// Render the total duration of all exercises
workoutSchema.virtual('totalDuration').get(function () {
  //As every workout is submitted, add the duration of that exercise to the total
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
