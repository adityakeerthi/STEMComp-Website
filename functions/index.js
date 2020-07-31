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

// app.use(cors(corsOptions));
app.use(cors());

// Middleware
const AUTH_MIDDLEWARE = require('./middleware/auth');

// Routes
const { submission, deleteSubmission, assign } = require('./routes/projects');
const { signup, login, validateAuthorization, userData } = require('./routes/accounts');
const { getProjectsToJudge, judgeProjectOne, judgeProjectTwo, getProjectsScores } = require('./routes/judging');

// Account Routes
app.post('/signup', cors(corsOptions), signup);
app.post('/login', cors(corsOptions), login);
app.post('/validateAuthorization', cors(corsOptions), validateAuthorization);
app.post('/userData', cors(corsOptions), AUTH_MIDDLEWARE, userData);

// Submission Routes
app.post('/submission', cors(corsOptions), AUTH_MIDDLEWARE, submission);
app.get('/deleteSubmission', cors(corsOptions), AUTH_MIDDLEWARE, deleteSubmission);

// Onload Routes
app.post('/assign', cors(corsOptions), AUTH_MIDDLEWARE, assign);

// Judging Routes
app.post('/projectsToJudge', cors(corsOptions), AUTH_MIDDLEWARE, getProjectsToJudge);
app.post('/judgeProjectOne', cors(corsOptions), AUTH_MIDDLEWARE, judgeProjectOne);
app.post('/judgeProjectTwo', cors(corsOptions), AUTH_MIDDLEWARE, judgeProjectTwo);
app.get('/getProjectsScores', AUTH_MIDDLEWARE, getProjectsScores)

// Exporting 
exports.api = functions.https.onRequest(app);
