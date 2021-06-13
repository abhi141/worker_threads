const { Worker } = require("worker_threads");

// Ref https://livecodestream.dev/post/how-to-work-with-worker-threads-in-nodejs/

class WorkerCreation {


    //Create new worker
    async createWorker(filepath) {
        return new Promise(async (resolve, reject) => {
            console.log(filepath)
            const worker = new Worker("/home/eunimart/Desktop/sample_book_my_show/app/utils/worker.js");
            worker.postMessage({ filepath: filepath })



            // return resolve(result)

            //Listen for a message from worker
            worker.on("message", result => {
                console.log("result---------->", result)
                return resolve(result)
            });

            worker.on("error", error => {
                console.log("error---------->", error)
                return resolve({ status: false, message: JSON.stringify(error) })
            });

            worker.on("exit", exitCode => {
                console.log("exitCode---------->", exitCode)
                console.log(exitCode);
                return resolve({ status: false, message: JSON.stringify(exitCode) })
            })
        })
    }

}
module.exports = new WorkerCreation()