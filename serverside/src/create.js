import uuid from 'uuid';
import * as ddb from './providers/common/dynamodb';
import { success, failed } from './providers/response';
import { verifyJSON } from './providers/request';

export async function main(event, context, callback) {



    let data = verifyJSON(event.body),
        params = {
            TableName: 'memos',
            Item: {
                userId: data.userId,
                memoId: uuid.v1(),
                title: data.title,
                content: data.content,
                attachment: data.attachment,
                createdAt: Date.now()
            }
        };



    try {

        await ddb.call('put', params);

        callback(null, success(params.Item));

    } catch(e) {
        callback(null, failed({status: false}));
    }

}