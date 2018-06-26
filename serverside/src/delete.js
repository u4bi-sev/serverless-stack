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

        await ddb.call('delete', params);

        callback(null, success({ status: true }));

    } catch (e) {
        callback(null, failed({ status: false }));
    }

}