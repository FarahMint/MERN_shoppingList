// Bring in mongoose
const mongoose = require("mongoose");

//To create a schema create const Schema & set it = to mongoose.Schema

const Schema = mongoose.Schema;

// Create Schema

//const ItemSchema = set to a new Schema obj
//then that schema obj takes in an obj which is going to have the field we want

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
// mongoose.model(<name>,  <name of the schema defined above>)

//So this model can be exported & can use it in other files
