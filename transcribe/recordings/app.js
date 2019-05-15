const AWS = require('aws-sdk');
const s3 = new AWS.S3();


//Alternatively, make this an async function and use Promise.all to
//wait for all responses to come in before invoking callback
function listRecordings(event, context, callback) {
  let response;

  try {
    let listParams = {
      Bucket: process.env.RecordingsBucket,
      MaxKeys: 100,
      Prefix: 'recordings/'
    };
    
    s3.listObjectsV2(listParams, function (err, data) {
      if (err) {
        response = createErrorResponse(err);
      } else {
        let recordings = data.Contents.filter(r => r.Key.endsWith(".mp3")).map(r => {
          return {
            'name': r.Key,
            'modified': r.LastModified,
            'url': s3.getSignedUrl('getObject', {Bucket: process.env.RecordingsBucket, Key: r.Key})
          };
        });

        response = createResponse(200, recordings);
      }
      console.log("RESPONSE: " + JSON.stringify(response));
      callback(null, response);
    });
  } catch (err) {
    console.log("ERROR");
    callback(createErrorResponse(err));
  }
}

function createErrorResponse(err) {
  console.log(err);
  return createResponse(500, err);
}

function createResponse(code, body) {
  return {
    statusCode: code,
    headers: {
        "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(body)
  };
}

exports.listRecordings = listRecordings;
