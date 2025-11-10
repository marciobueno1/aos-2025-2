const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('erro interno do servidor');

};

export default errorMiddleware;