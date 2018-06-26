import * as ddb from './providers/common/dynamodb';
import { success, failed } from './providers/response';

export async function main(event, context, callback) {



    let params = {
            TableName: 'memos',
            Key: {
                userId: event.pathParameters.userId,
                memoId: event.pathParameters.memoId
            }
        };



    try {

        let result = await ddb.call('get', params);

        callback(null, result.Item ?
            success(result.Item)
            :
            failed({ 
                status: false,
                error: 'Item not found.'
            }));

    } catch (e) {
        callback(null, failed({ status: false }));
    }

}