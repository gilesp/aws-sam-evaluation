const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const transcribeService = new AWS.TranscribeService();

async function lambdaHandler(event, context, callback) {
  let s3ObjectKey = extractKeyFromS3Event(event);
  let s3ObjectBucket = extractBucketFromS3Event(event);

  let transcribeParams = {
    LanguageCode: "en-GB",
    Media: {
      MediaFileUri: "https://s3." + process.env.AWS_REGION + ".amazonaws.com/" +  s3ObjectBucket + "/" + s3ObjectKey
      //MediaFileUri: "https://s3.amazonaws.com/" +  s3ObjectBucket + "/" + s3ObjectKey
    },
    MediaFormat: "mp3",
    TranscriptionJobName: "Transcribing-" + s3ObjectKey.replace("/", "_"),
    OutputBucketName: s3ObjectBucket,
    Settings: {
      ShowSpeakerLabels: true,
      MaxSpeakerLabels: 10
    }
  };

  let success = false;
  // console.log(transcribeParams);
  transcribeService.startTranscriptionJob(transcribeParams, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
  console.log("Transcription Job invoked");

  callback(null);
}

/**
 * Extract the key from an S3 event.
 * @param s3Event Inbound S3 event.
 * @return {string} decoded key.
 */
function extractKeyFromS3Event(s3Event) {
  let key = s3Event['Records'][0]['s3']['object']['key'];

  if (!key) {
    throw new Error("Unable to retrieve key information from the event");
  }

  return key.replace(/\+/g,' ');
}

/**
 * Extract the bucket from an S3 event.
 * @param s3Event Inbound S3 event.
 * @return {string} Bucket
 */
function extractBucketFromS3Event(s3Event) {
  let bucketName = s3Event['Records'][0]['s3']['bucket']['name'];

  if (!bucketName) {
    throw new Error("Unable to retrieve bucket information from the event");
  }

  return bucketName;
}

exports.lambdaHandler = lambdaHandler;
