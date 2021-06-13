// const {parentPort, workerData} = require("worker_threads");
const uuid = require('uuid').v4
const UserModel = require('../models/User')
const PolicyCategoryModel = require('../models/PolicyCategory')
const PolicyCarrierModel = require('../models/PolicyCarrier')
const PolicyInfoModel = require('../models/PolicyInfo')
const { parentPort, workerData } = require("worker_threads");
const csv = require('csvtojson')
const _ = require('lodash')
const MovieService = require('../services/csv-processing/csv-processing')
// console.log("filepath -------->", workerData.filepath)


function processCsv(file) {

    return new Promise((resolve, reject) => {

        console.log("file----------->", file)


        return MovieService.processCsv(file).then((res) => {




            return resolve({ status: true, data: res })

        })


    })





}


parentPort.on("message", data => {
    processCsv(data.filepath).then(data => {
        console.log("worked Data", data)

        console.log("---------------->data", data)
        parentPort.postMessage({ status:true,message:"File Processed Sucessfully"});
    })
})
