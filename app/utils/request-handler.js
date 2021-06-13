module.exports = function (method, ...args) {
    // console.log(method,)
    return function (req, res, next) {
        try {
            // console.log(req)

            method(...args).then((methodResponse) => {
                // console.log("methodResponse--------->",methodResponse)
                return res.send(methodResponse)
            })

        } catch (error) {
            console.log(error)
            return res.send(

                {
                    status: false,
                    message:"Something Went Wrong",
                    error:error.name
                }
            )
        }



    }
}