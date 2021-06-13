const uuid = require('uuid').v4
const UserModel = require('../../models/User')
const PolicyCategoryModel = require('../../models/PolicyCategory')
const PolicyCarrierModel = require('../../models/PolicyCarrier')
const PolicyInfoModel = require('../../models/PolicyInfo')
// const WorkerThreadsParent = require("worker_threads").parentPort;

const csv = require('csvtojson')
const _ = require('lodash')
class Movie {


    /**
   * This function process csv and saves into the database
   * @param  {String} file  file is filepath of csv.
   */

    async processCsv(file) {

        let jsonArray = await csv().fromFile(file);

        jsonArray = JSON.parse(JSON.stringify(jsonArray))


        let policyInfoArr = []
        let userArr = []

        jsonArray.forEach(obj => {
            let user = {
                first_name: obj.firstname,
                dob: obj.address,
                phone_number: obj.phone,
                address: obj.address,
                state: obj.state,
                zipcode: obj.zip,
                email: obj.email,
                gender: obj.gender,
                user_type: obj.userType,
                account_name: obj.account_name,
                agent_name: obj.agent

            }

            userArr.push(user)

        })

        let companyUniq = _.uniqBy(jsonArray, function (e) {
            return e.company_name;
        })
        let companyArr = []

        companyUniq.forEach(obj => {
            companyArr.push(_.pick(obj, ["company_name"]))
        })


        let categoryUniq = _.uniqBy(jsonArray, function (e) {
            return e.category_name;
        })
        let categoryArr = []

        categoryUniq.forEach(obj => {
            categoryArr.push(_.pick(obj, ["category_name"]))
        })


        // console.log(userArr)
        await UserModel.create(userArr)

        await PolicyCarrierModel.create(companyArr)

        await PolicyCategoryModel.create(categoryUniq)

        // jsonArray




        for (let obj in jsonArray) {
            let companyId = await PolicyCarrierModel.findOne({ "company_name": jsonArray[obj].company_name }, { _id: 1 })
            // console.log(companyId)
            // companyId=JSON.parse(JSON.stringify(companyId))
            let userId = await UserModel.findOne({ "email": jsonArray[obj].email }, { _id: 1 })
            // console.log("email----->",obj,userId)
            let policyInfo = {

                policy_number: jsonArray[obj].policy_number,
                policy_start_date: jsonArray[obj].policy_start_date,
                policy_end_date: jsonArray[obj].policy_end_date,
                company_collection_id: companyId["_id"] ? companyId["_id"] : "",
                user_id: userId["_id"] ? userId["_id"] : "",
                policy_category: jsonArray[obj]["category_name"],
                agent_name: jsonArray[obj].agent


            }
            policyInfoArr.push(policyInfo)

        }

        let policyInfoSave = await PolicyInfoModel.create(policyInfoArr)

        return { status: true, data: policyInfoSave }


    }

    /**
  * This function generates the o/p of policy holded by single user
  * @param  {String} user_name  Input was user_name mapped to first_name.
  */

    async getpolicyInfoByUserName(queryParam) {
        let userId = null
        //marin@icloud.com
        if (queryParam.user_name) {
            let search = new RegExp(queryParam.user_name, 'i');
            userId = await UserModel.findOne({ first_name: queryParam.user_name }, { _id: 1 })
            console.log(userId)
        }
        else {
            return { status: false, message: "No user name given" }
        }
        if (userId) {
            let policyInfo = await PolicyInfoModel.find({ user_id: userId["_id"] })

            return { status: true, data: policyInfo }
        }

    }



    /**
  *  This function gives all the policy holded by each user.
  */

    async getpolicyInfoByUser(queryParam) {


        let policyInfo = await PolicyInfoModel.aggregate([{ $group: { _id: { user_id: "$user_id", policy_category: "$policy_category" } } }])

        return { status: true, data: policyInfo }


    }
}
module.exports = new Movie()
