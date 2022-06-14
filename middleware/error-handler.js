import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    
    const defaultError = {}
  
    switch(err.name){
        case "ValidationError":
            defaultError.statusCode = StatusCodes.BAD_REQUEST
            defaultError.msg = Object.values(err.errors).map(item => item.message).join(",");
            break
        default:
            defaultError.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            defaultError.msg = err.message || "Hubo un problema, nténtalo de nuevo más tarde..."
            break;
    }

    
    if(err.code && err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} Este campo tiene que ser único`
    }

    if(err.errors && err.errors.password && (err.errors.password.kind === "minlength" || err.errors.password.kind === "maxlength") ){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `La contraseña debe de tener entre 6 y 20 caracteres`
    }

    res.status(defaultError.statusCode).json({msg: defaultError.msg})

 
    
}

export default errorHandlerMiddleware