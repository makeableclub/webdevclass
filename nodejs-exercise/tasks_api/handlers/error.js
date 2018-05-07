function errorHandler(error, req, res, next) {
    // res.header("Content-Type", "application/json");

    return res.status(error.status || 500).json({
        error: {
            message: error.message || "Something is not right."
        }
    });
}

module.exports = errorHandler;
