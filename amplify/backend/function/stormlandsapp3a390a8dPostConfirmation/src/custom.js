var AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB();
// THE HOLY FINALLY WORKING CODE
exports.handler = async (event, context) => {
  console.log(event);
  let date = new Date();
  let userAttributes = event.request.userAttributes;

  // Subject (sub)
  // The sub claim is a unique identifier (UUID) for the authenticated
  // user. It is not the same as the user name, which might not be unique
  let sub = userAttributes.sub;

  if (sub) {
    var params = {
      Item: {
        id: { S: sub },
        __typename: { S: 'User'},
        username: { S: event.userName},
        email: { S: userAttributes.email },
        createdAt: { S: date.toISOString()},
      },
      TableName: process.env.USERTABLE,
    };
    const promise = await createUser(params);
    console.log("Promise response: ",promise)
    return event;
  } else {
    console.log("Error: Nothing was written in DynamoDB");
    return event;
  }

   function createUser(params) {
    return new Promise((resolve,reject) => {
      ddb.putItem(params, function (err, data) {
        if (err) reject(err, err.stack); // an error occurred
        else resolve(data); // successful response
      });
    })
  }
};
