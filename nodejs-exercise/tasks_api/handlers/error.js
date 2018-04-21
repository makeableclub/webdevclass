function errorHandler(error, req, res, next) {
    return response.status(error.statue || 500).json({
        error: {
            message: error.message || "Something is not right."
        }
    });
}

module.exports = errorHandler;
