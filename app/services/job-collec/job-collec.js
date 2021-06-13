const uuid = require('uuid').v4
const JobCollecModel = require('../../models/JobCollec')

class JobCollec {


    /**
  * This function saves the alertInfo
  * @param  {String} alert_of_time this will be in body of request
  * @param {String} alert_message  this will be in body of request
  * 
  */


    async createAlert(alertInfo) {
        console.log(alertInfo)
        return JobCollecModel.create(alertInfo).then((alertInfoResponse) => {
            return { status: true, data: alertInfoResponse }
        })


    }



}
module.exports = new JobCollec()
