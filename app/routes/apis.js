const router = require('express').Router()
const CsvProcessing = require('../services/csv-processing/csv-processing')
const WokerService = require('../services/worker/worker')
const JobCollecService = require('../services/job-collec/job-collec')
const JobCollecOneService = require('../services/job-collec-one/job-collec-one')
const Handler = require('../utils/request-handler')
const multer = require('multer')
var upload = multer({ dest: 'upload/'});
var type = upload.single('recfile');



router.post("/create_alert",type,((req,res,next)=>{
    console.log("----------*******")
    Handler(JobCollecService.createAlert,req.body)(req,res,next)

}))


router.get("/get_jobs",type,((req,res,next)=>{
    console.log("----------*******")
    Handler(JobCollecOneService.checkAndInsertMessage,req.body)(req,res,next)

}))

router.get("/get_policy_info",type,((req,res,next)=>{
    console.log("----------*******",req.params)
    Handler(CsvProcessing.getpolicyInfoByUserName,req.query)(req,res,next)

}))


router.get("/get_policy_info_aggreate",type,((req,res,next)=>{
    console.log("----------*******")
    Handler(CsvProcessing.getpolicyInfoByUser,req.query)(req,res,next)

}))

router.post("/process_csv",type,((req,res,next)=>{
    console.log("----------*******",req.file.path)
    Handler(CsvProcessing.processCsv,req.file.path)(req,res,next)

}))

router.post("/process_csv_worker",type,((req,res,next)=>{
    console.log("----------*******",req.file.path)
    Handler(WokerService.createWorker,req.file.path)(req,res,next)

}))
module.exports=router