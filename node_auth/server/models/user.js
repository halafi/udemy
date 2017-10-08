const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true, // AAA@AAA.AA vs aaa@aaa.aa
  },
  password: String
});

// on save hook, encrypt password
// before saving a model run this function
userSchema.pre('save', function(next) { // function needed
  const user = this;

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // encrypt password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted
      user.password = hash;
      next(); // save the model
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  })
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
