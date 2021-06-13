const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PolicyCarrier = new Schema({
    company_name:String,
});
module.exports = mongoose.model("PolicyCarrier", PolicyCarrier, "policy_carrier");
