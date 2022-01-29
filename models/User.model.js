const { Schema, model } = require("mongoose")

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
    //required: true,
    // minlength: 5
  },

  favouriteRestaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  }],

}, { timestamps: true })


const User = model("User", userSchema)

module.exports = User
