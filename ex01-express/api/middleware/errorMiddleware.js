const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).send("Internal Server Error");
};

export default errorMiddleware;