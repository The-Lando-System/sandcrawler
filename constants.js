module.exports = {
  GOOGLE_TOKEN_INFO_URL: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
  ADMIN_EMAILS: {
    'matt.voget@gmail.com' : true
  },
  PORT: process.env.PORT | 3000,
  WEB_REQUEST_DB_CONNECTION: process.env.WEB_REQUEST_DB_CONNECTION,
  RESULT_DB_CONNECTION: process.env.RESULT_DB_CONNECTION,
  WEB_REQUEST_ID: process.env.WEB_REQUEST_ID,
  REQUEST_INTERVAL: process.env.REQUEST_INTERVAL || 10000,
  SAVE_DUPLICATES: process.env.SAVE_DUPLICATES || false,
  COLLECTION_NAME: process.env.COLLECTION_NAME || 'DefaultCollection'
};