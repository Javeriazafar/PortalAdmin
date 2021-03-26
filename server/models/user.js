const mongoose= require ('mongoose');
const { string } = require('prop-types');

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
   
  },
  facebookId:{type:String},
  accessToken:{type:String},
  name: { type: String},
  email: { type: String},
  password: { type: String},
  id: { type: String },
});

module.exports= mongoose.model("User", userSchema);