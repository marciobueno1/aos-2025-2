const errorHandler = (res, error) => 
{
    console.error('Erro interno do servidor:', error);
    res.status(500).send({ message: 'Internal Server Error' });

}

export default errorHandler;    