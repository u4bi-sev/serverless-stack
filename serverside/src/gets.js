import * as ddb from './providers/common/dynamodb';
import { success, failed } from './providers/response';

export async function main(event, context, callback) {



    let params = {
            TableName: 'memos',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': event.pathParameters.userId
            }
        };



    try {

        let result = await ddb.call('query', params);

        callback(null, success(result.Items));

    } catch (e) {
        callback(null, failed({ status: false }));
    }

}
