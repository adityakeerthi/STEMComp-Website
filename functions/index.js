// Firebase Functions
const functions = require('firebase-functions');

// React Application
const app = require('express')();
const cors = require('cors');

var domain = ['https://stemcomp2020.com']

var corsOptions = {
    origin: function (origin, callback) {
        if (domain.indexOf(origin) === 0) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

// Middleware
const AUTH_MIDDLEWARE = require('./middleware/auth');

// Routes
const { submission, deleteSubmission, assign } = require('./routes/projects');
const { signup, login, validateAuthorization, userData } = require('./routes/accounts');
const { getProjectsToJudge, judgeProjectOne, judgeProjectTwo, getProjectsScores } = require('./routes/judging');

// Account Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/validateAuthorization', validateAuthorization);
app.post('/userData', AUTH_MIDDLEWARE, userData);

// Submission Routes
app.post('/submission', AUTH_MIDDLEWARE, submission);
app.get('/deleteSubmission', AUTH_MIDDLEWARE, deleteSubmission);

// Onload Routes
app.post('/assign', AUTH_MIDDLEWARE, assign);

// Judging Routes
app.post('/projectsToJudge', AUTH_MIDDLEWARE, getProjectsToJudge);
app.post('/judgeProjectOne', AUTH_MIDDLEWARE, judgeProjectOne);
app.post('/judgeProjectTwo', AUTH_MIDDLEWARE, judgeProjectTwo);
app.get('/getProjectsScores', AUTH_MIDDLEWARE, getProjectsScores)

// Exporting 
exports.api = functions.https.onRequest(app);
