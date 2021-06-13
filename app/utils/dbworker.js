const mongoose = require('mongoose');
const debug = require('debug')("task-on-worker-theards:server");
const { parentPort } = require("worker_threads")

mongoose.connect('mongodb://localhost/insurance_info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
//   poolSize:16
});
let dbConnection=mongoose.connection
dbConnection.on("open",()=>{
    debug("Connected to mongo DB")
    parentPort.postMessage({ status: "subscribe" });;
})
parentPort.on("message", data => {
    
       
        parentPort.postMessage({ status: "subscribe" });;
    // })
})
