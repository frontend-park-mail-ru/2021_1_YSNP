class HttpStatus {
    constructor() {
        this.__statuses = {
            OK: 200,
            BadRequest: 400,
            Unauthorized: 401,
            NotFound: 404,
            InternalServerError: 500
        };
    }

    get StatusOK() {
        return this.__statuses.OK;
    }

    get StatusBadRequest() {
        return this.__statuses.BadRequest;
    }

    get StatusUnauthorized() {
        return this.__statuses.Unauthorized;
    }

    get StatusNotFound() {
        return this.__statuses.NotFound;
    }

    get StatusInternalServerError() {
        return this.__statuses.InternalServerError;
    }
}

export const httpStatus = new HttpStatus();