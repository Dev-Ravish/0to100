const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    User.findOne({
        username: req.headers.username,
        password: req.headers.password
    }).then(user => {
        if(user){
            next();
        }else{
            res.status(400).json({
                message:"User credentials does not match."
            })
        }
    })
       

}

module.exports = userMiddleware;