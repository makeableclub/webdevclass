require("dotenv").load();
const jwt = require("jsonwebtoken");

// authentication: make sure user is logged in
exports.requireLogin = function(req, res, next) {
    // in the headers, authorization token:  Bearer xjsdlfjlsfsadfladjf;asjdf
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
            }
            else {
                return next({
                    status: 401,
                    message: "Please login first"
                });
            }
        });
    }
    catch(err) {
        return next({
            status: 401,
            message: "Please login first"
        });
    }
};

// authorization: make sure the correct user to perform the action
exports.requireCorrectUser = function(req, res, next) {

};
