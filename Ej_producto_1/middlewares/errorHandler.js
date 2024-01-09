//Middlawares para manejo de errores
const errorHandler = (err,req,res,next) =>{
    console.error(err);
    res.status(err.status || 500).json({error : err.massage || 'Error en el servidor'});
};

module.exports = errorHandler;