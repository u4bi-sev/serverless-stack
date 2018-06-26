export const response = (statusCode, body) => ({
    statusCode: statusCode,
    body: body,
    // headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true }
});
export const success = body => response(200, body);
export const failed = body => response(500, body);