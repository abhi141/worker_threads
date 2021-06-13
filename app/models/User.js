const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const debug = require('debug')("task-on-worker-theards:server");

mongoose.connect('mongodb://localhost/insurance_info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  //   poolSize:16
});
let dbConnection = mongoose.connection
dbConnection.on("open", () => {
  debug("Connected to mongo DB")
  // parentPort.postMessage({ status: "subscribe" });;
})
const User = new Schema({
  first_name: String,
  dob: String,
  address: String,
  phone_number: String,
  state: String,
  zipcode: String,
  email: String,
  gender: String,
  user_type: String,
  account_name:String
});


module.exports = mongoose.model("User", User, "user");
