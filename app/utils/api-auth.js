const UserService = require('../services/user/user')
module.exports = function () {
    return async function (req, res, next) {
        let header = req.header("token")
        let buf = new Buffer(header, 'base64')
        let account_id = buf.toString('ascii')
        let validateToken = await UserService.validateToken(account_id)
        console.log(validateToken)
        if (validateToken) {
            console.log("If Header*********")
            next()
        }
        else {
            console.log("else Header*********")
            next(new Error("UNAUTHORIZED_ACCESS"))

        }
        console.log(header)
    }


}