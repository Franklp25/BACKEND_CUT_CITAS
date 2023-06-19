'use strict'

const sendSuccessResponse = async (res, data, message) => {
    console.log(res);
    const response = {
        status: 'success',
        data,
        message
    };
    sendResponse(res, 200, response);
};

const sendErrorResponse = async (res, statusCode, message) => {
    console.log(res);
    const response = {
        status: 'error',
        message
    };
    sendResponse(res, statusCode, response);
};

const sendResponse = async (res, statusCode, response) => {
    res.status(statusCode).json(response);
};

export {
    sendSuccessResponse,
    sendErrorResponse
}