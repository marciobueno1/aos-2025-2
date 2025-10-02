const errorHandler = (res, error) => {
  console.error(error);
  return res.status(500).send("Internal Server Error");
};

export default errorHandler;