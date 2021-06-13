const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PolicyCategory = new Schema({
    category_name:String
});
module.exports = mongoose.model("PolicyCategory", PolicyCategory, "policy_category");
