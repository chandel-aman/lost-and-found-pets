class HttpError extends Error{
    constructor(message, errorCode){
        super(message);     //Adds message to the error
        this.code = errorCode       //Adds error code to the error
    }
}

module.exports = HttpError;