export const response = (statusCode, body) => ({
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true }
});
export const success = body => response(200, body);
export const failed = body => response(500, body);