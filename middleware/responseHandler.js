'use strict'

const sendSuccessResponse = async (res, data, message) => {
    const response = {
        status: 'ok',
        data,
        message
    };
    sendResponse(res, 200, response);
};

const sendErrorResponse = async (res, statusCode, message) => {
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