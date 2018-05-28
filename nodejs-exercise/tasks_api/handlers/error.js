let pages = require("./pages");

function errorHandler(error, req, res, next) {
    console.log("Error code: " + error.status);
    console.log("Error message: " + error.message);

    return res.status(error.status || 500).json({
        error: {
            message: error.message || "Something is not right."
        }
    });
}

module.exports = errorHandler;
