const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PolicyInfo = new Schema({
    policy_number:String, 
    policy_start_date:String, 
    policy_end_date:String, 
    policy_category:String, 
    company_collection_id:String,
    user_id:String,
    agent_name:String
}); 

module.exports = mongoose.model("PolicyInfo", PolicyInfo, "policy_info");