const { Schema, model, models } = require('mongoose')

const userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 16,
    trim: true,
    default: 'unknown'
  },

  password: {
    type: String,
    // required: true,
    // minlength: 5
  },

  // TODO: Restaurants model
  // favouriteRestaurants: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Restaurant',
  // }],
  favouriteRestaurants: [{
    type: Number,
  }],

}/*, { timestamps: true }*/)

export default models.User || model('User', userSchema)
