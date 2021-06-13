const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobCollec = new Schema({
    time_of_alert: {type:String},
    alert_message :{type:String}

});
module.exports = mongoose.model("JobCollec", JobCollec, "job_collec");
