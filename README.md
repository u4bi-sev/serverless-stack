# Serverless Stack

### Console

- #### [AWS Lambda](https://console.aws.amazon.com/lambda)

- #### [AWS API Gateway](https://console.aws.amazon.com/apigateway)

- #### [AWS S3](https://s3.console.aws.amazon.com/s3)

- #### [AWS Dynamodb](https://ap-northeast-2.console.aws.amazon.com/dynamodb)

- #### [AWS IAM](https://console.aws.amazon.com/iam)

- #### [AWS CloudFormation](https://console.aws.amazon.com/cloudformation)


## 사용자 추가

1. [사용자추가 바로가기](https://console.aws.amazon.com/iam/home#/users$new)
    > **1**. 사용자 이름 기입 ✔

    > **2**. 프로그래밍 방식 엑세스 체크 ✔

    > 다음: 권한 ✔

2. 기존 정책 직접 연결 선택 ✔
    > **1**. AdministratorAccess 검색 후 선택 ✔

    > 다음: 검토 ✔

3. 사용자 만들기 선택  ✔

4. [.csv 다운로드] ✔
    > Access key ID, Secret access key


## AWS CLI 설치

1. Homebrew를 통해 설치

    ```shell
    $ brew install awscli
    ```
2. AWS CLI에 엑세스키 추가

    ```shell
    $ aws configure
    ```

    > **1**. Access Key ID :

    > **2**. AWS Secret Access Key :
    
    > Default region name and Default output format : (기본값으로 Skip ✔)

## DynamoDB 테이블 생성

1. [테이블 생성 바로가기](https://ap-northeast-2.console.aws.amazon.com/dynamodb/home?region=ap-northeast-2#create-table:)
    > **1**. 테이블 이름 (memos)

    > **2**. 기본키 (userId)

    > 정렬키 추가 선택 ✔

    > **3**. 정렬키 (memoId)

    > 생성 ✔

---

## Serverless Framework 설정
> AWS Lambda와 Amazon API Gateway를 사용하여 서버사이드 구성

1. NPM을 통해 설치

```shell
$ npm install -g serverless
```

2. 프로젝트 이동 / 패키지 설치

```shell
$ cd serverside

$ npm install
```

3. region 변경이 필요하면 변경

`serverside/src/providers/common/dynamodb.js`

```javascript
AWS.config.update({ 
    region: 'ap-northeast-2'
});
```

`serverless.yml`
```
region:ap-northeast-2
```
### API Endpoints 테스트

> 메모 생성 API 호출 후 mocks/*.json의 `pathParameters.id`(memoId) 변경

- **Response**

```json
{
    "statusCode": 200,
    "body": {
        "userId": "MEMO-USER-1",
        "memoId": "273a78b0-7953-11e8-ab77-dfbc85a4dcd9",
        "title": "Memo Title",
        "content": "Memo content",
        "createdAt": 1530010740723
    }
}
```

| Name | Command |
| -------- | ------------ |
| 메모 생성 | $ serverless invoke local --function create --path mocks/mock-create.json |
| 메모 읽기 | $ serverless invoke local --function get --path mocks/mock-get.json |
| 모든 메모 읽기 | $ serverless invoke local --function gets --path mocks/mock-gets.json |
| 메모 수정 | $ serverless invoke local --function update --path mocks/mock-update.json |
| 메모 삭제 | $ serverless invoke local --function delete --path mocks/mock-delete.json |

### 서버리스 API 배포

```shell
$ serverless deploy
```

```shell
Service Information
service: serverside
stage: prod
region: ap-northeast-2
stack: serverside-prod
api keys:
  None
endpoints:
  POST - https://{}.execute-api.ap-northeast-2.amazonaws.com/prod/memos
  GET - https://{}.execute-api.ap-northeast-2.amazonaws.com/prod/memos/{userId}/{memoId}
  GET - https://{}.execute-api.ap-northeast-2.amazonaws.com/prod/memos/{userId}
  PUT - https://{}.execute-api.ap-northeast-2.amazonaws.com/prod/memos/{userId}/{memoId}
  DELETE - https://{}.execute-api.ap-northeast-2.amazonaws.com/prod/memos/{userId}/{memoId}
functions:
  create: serverside-prod-create
  get: serverside-prod-get
  gets: serverside-prod-gets
  update: serverside-prod-update
  delete: serverside-prod-delete
Serverless: Publish service to Serverless Platform...
```