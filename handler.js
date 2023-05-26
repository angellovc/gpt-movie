const aws = require('aws-sdk');

let dbConfig = {};

if (process.env.IS_OFFLINE) {
    dbConfig = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    }
}
const dynamodb = new aws.DynamoDB.DocumentClient(dbConfig);

const getUsers = async (event, context) => {
    let params = {
        TableName: 'usersTable'
    };
    const response = await dynamodb.query(params).promise();
    console.log(response);
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': response})
    }
}

const getUser = async (event, context) => {
    const id = event.pathParameters.id;
    let params = {
        ExpressionAttributeValues: { ':pk': id },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };
    const response = await dynamodb.query(params).promise();
    console.log(response);
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': response})
    }
}


module.exports = {
    getUsers,
    getUser
}