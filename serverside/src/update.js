import * as ddb from './providers/common/dynamodb';
import { success, failed } from './providers/response';
import { verifyJSON } from './providers/request';

export async function main(event, context, callback) {



    let data = verifyJSON(event.body),
        params = {
            TableName: 'memos',
            Key: {
                userId: event.pathParameters.userId,
                memoId: event.pathParameters.memoId
            },
            UpdateExpression: 'SET title = :title, content = :content, attachment = :attachment',
            ExpressionAttributeValues: {
                ':attachment': data.attachment ? data.attachment : null,
                ':content': data.content ? data.content : null,
                ':title': data.title ? data.title : null
            },
            ReturnValues: 'ALL_NEW'
        };



    try {

        await ddb.call('update', params);

        callback(null, success({ status: true }));

    } catch (e) {
        callback(null, failed({ status: false }));
    }

}