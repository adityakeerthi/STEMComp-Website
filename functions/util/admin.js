const admin = require('firebase-admin');
const serviceAccountKey = require('./serviceAccountKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://stemcomp-2020-test-824e6.firebaseio.com"
});

module.exports = { admin };