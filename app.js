require('debug-trace')({ always: true })
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
var pm2 = require('pm2');
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/// *** To auto restart the server after the 70 usage

pm2.describe('www',(err,proc)=>{
  if(proc[0] && proc[0].monit.cpu>70){
    console.log(proc[0].monit.cpu)
    console.info("pm2 restarted")
      pm2.restart('www', (err, proc) => {

        console.info("pm2 restarted")
      })
  }

})

app.use("/api/v1", require('./app/routes/apis'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message:"Not Found"
  })
});

// error handler
app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  console.log(err)
  if (err.message == "UNAUTHORIZED_ACCESS") {
    res.status(401).json({
      status:false,
      message:"user not logged in"
    })
  }
  else{
    res.status(500).json({
      status:false,
      message:"Something Unexpected"
    })
  }

});

module.exports = app;
