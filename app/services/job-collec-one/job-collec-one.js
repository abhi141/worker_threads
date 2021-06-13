const uuid = require('uuid').v4
const JobCollecModel = require('../../models/JobCollec')
const JobCollecOneModel = require('../../models/JobCollecOne')

class JobCollecOne {

     /**
  * This function check and insert's the messages into JobCollecOne from JobCollec
  */
    async checkAndInsertMessage() {
        return new Promise(async(resolve, reject) => {
            let messagesArr = []
            let messageData = await JobCollecModel.find({})
            // messageData=JSON.parse(JSON.stringify(messageData))
            console.log(messageData)
            if (messageData) {

                messageData.forEach(alertMessage => {
                    
                    let date = new Date()
                    date=date.setSeconds(0)
                    let prevDate =new Date(alertMessage.time_of_alert).getDate()
                    let prevHrs =new Date(alertMessage.time_of_alert).getUTCHours()
                    let prevMin =new Date(alertMessage.time_of_alert).getUTCMinutes()
                    let presentDate =new Date().getDate()
                    let presentHrs =new Date().getUTCHours()
                    let presentMin =new Date().getUTCMinutes()
                    console.log("prev--->",prevDate,prevHrs,prevMin,"present",presentDate,presentHrs,presentMin)
                    if ((prevDate==presentDate)&&(prevHrs==presentHrs)&&(prevMin==presentMin)) {
                       
                        messagesArr.push({time_of_alert:alertMessage.time_of_alert,alert_message:alertMessage.alert_message})
                        
                    }

                })


                if(messagesArr.length>0){
                    return JobCollecOneModel.create(messagesArr).then((alertMessageCreatedResponse) => {
                        return resolve({ status: true, data: alertMessageCreatedResponse })
                    })
                }
                else {
                    return resolve({status: true, message: "No Jobs to insert" })
                }
            }
            else {
                return resolve({status: true, message: "No Jobs to insert" })
            }
        })
    }



}
module.exports = new JobCollecOne()
