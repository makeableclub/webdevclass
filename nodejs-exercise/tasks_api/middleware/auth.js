require("dotenv").load();
const jwt = require("jsonwebtoken");

// authentication: make sure user is logged in
exports.requireLogin = function(req, res, next) {
    // in the headers, authorization token:  Bearer xjsdlfjlsfsadfladjf;asjdf-<JWT>
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
            message: "Error - please login first"
        });
    }
};

// authorization: make sure the correct user to perform the action
// the userid in JWT needs to match userid in the URL, so one can only access his own tasks
exports.requireCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if( decoded && decoded.id === req.params.id ) {
                // good!
                return next();
            }

            // sorry
            return next({
                status: 401,
                message: "Unauthorized to perform action"
            });
        });
    }
    catch(err) {
        return next({
            status: 401,
            message: "Error: Unauthorized to perform action"
        });
    }
};
