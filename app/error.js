const notFoundHandler = (_req, res, next) => {
  const error = new Error("Resourse not found");
  error.status = 404;
  next(error);
};

const errorHandler = (error, _req, res, next) => {
  console.log("Tanim", error);
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: error.message || "something went wrong!",
    });
  }
};

module.exports = { notFoundHandler, errorHandler };
