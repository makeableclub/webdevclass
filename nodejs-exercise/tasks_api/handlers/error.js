let pages = require("./pages");

function errorHandler(error, req, res, next) {
    console.log("Error code: " + error.status);
    console.log("Error message: " + error.message);

/*
    // res.header("Content-Type", "application/json");
    if( error.status == 401 ) {
        res.writeHead(401, {'content-type': 'text/html'});
        console.log("Need to login first: " + pages.login);
        return res.end(pages.login);
    }
    else if( error.status == 403 ) {
        res.writeHead(403, {'content-type': 'text/html'});
        console.log("Not authorized to perform action: " + pages.fail);
        return res.end(pages.fail);
    }
*/
    return res.status(error.status || 500).json({
        error: {
            message: error.message || "Something is not right."
        }
    });
}

module.exports = errorHandler;
