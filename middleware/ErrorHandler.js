const ErrorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res
    .status(err.code || err.statusCode || 500)
    .json(err.message || err.msg || "Server Error");
};

module.exports = ErrorHandlerMiddleware;
