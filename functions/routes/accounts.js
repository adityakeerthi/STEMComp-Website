/* eslint-disable promise/no-nesting */
const { admin } = require('../util/admin');

const firebase = require('firebase');
const config = require('../util/config');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validators');

const bcrypt = require('bcryptjs');
const saltRounds = 13;

exports.signup = (req, res) => {
    const NEW_ACCOUNT = {
        email: req.body.email,
        password: String(req.body.password),
        confirmPassword: req.body.confirmPassword,
        primaryAccount: req.body.primaryAccount,
        secondaryAccount: req.body.secondaryAccount,
        toggleTeam: req.body.toggleTeam,
        votes: {},
        assigned: [],
        submitted: false,
        projectId: ""
    };

    const { valid, errors } = validateSignupData (
        NEW_ACCOUNT
    )

    if (!valid) return res.status(500).json( errors )
    
    bcrypt.hash(NEW_ACCOUNT.password, 13, (err, hash) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message })
        }
        NEW_ACCOUNT.hashedPassword = hash;

        let TOKEN, UID;
        firebase.auth().createUserWithEmailAndPassword(NEW_ACCOUNT.email, NEW_ACCOUNT.password)
            .then(data => {
                UID = data.user.uid;
                // return res.status(201).json({ message: `user ${data.user.uid} signed up successfully` });
                return data.user.getIdToken()
                    .then(token => {
                        TOKEN = token;
                        const DB_ACCOUNT = {
                            email: NEW_ACCOUNT.email,
                            hashedPassword: NEW_ACCOUNT.hashedPassword,
                            primaryAccount: NEW_ACCOUNT.primaryAccount,
                            secondaryAccount: NEW_ACCOUNT.secondaryAccount,
                            votes: {},
                            assigned: [],
                            submitted: false  
                        }

                        return admin.firestore()
                            .collection('accounts')
                            .doc(UID)
                            .set(DB_ACCOUNT)
                            .then(() => {
                                return res.status(201).json({ token });
                            })
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({ error: err.message });
                    })
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: err.message });
            })

    })

}

exports.login = (req, res) => {
    const ACCOUNT = {
        email: req.body.email,
        password: req.body.password
    }

    const { valid, errors } = validateLoginData(
        ACCOUNT
    )

    if (!valid) return res.status(400).json( errors )

    firebase.auth().signInWithEmailAndPassword(ACCOUNT.email, ACCOUNT.password)
        .then(data => {
            return admin.firestore()
                .collection('accounts')
                .doc(data.user.uid)
                .get()
                .then(doc => {
                    return bcrypt.compare(ACCOUNT.password, doc.data().hashedPassword)
                        .then(result => {
                            return data.user.getIdToken()
                                .then(token => {
                                    if (result) {
                                        return res.json({ token });
                                    } else {
                                        return res.status(500).json({ error: 'Your password does not match with the hashed password' });
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                    return res.status(500).json({ error: err.message });
                                })
                        })
                        .catch(err => {
                            console.error(err);
                            return res.status(500).json({ error: err.message });
                        })
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
}

exports.validateAuthorization = (req, res) => {
    const IDToken = req.body.token;
    admin.auth()
        .verifyIdToken(IDToken)
        .then(decodedToken => {
            return res.send('Authorized');
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/id-token-expired') {
                return res.send('Token has expired');
            } else {
                return res.send('Unauthorized');
            }
        })
}

exports.userData = (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1);
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    console.log(day, hours, minutes);

    if (year !== 2020) {
        req.userDB.timePeriod = 'Over';
    } else {
        if (month === 7) {
            if (day <= 2) {
                if (hours <= 3 && minutes <= 59) {
                    req.userDB.timePeriod = 'Project Submission';
                } else if (hours > 3) {
                    req.userDB.timePeriod = 'Judging';
                }
            } else if (day >= 3 && day <= 9) {
                if (day === 9) {
                    if (hours <= 3 && minutes <= 59) {
                        req.userDB.timePeriod = 'Judging';
                    } else if (hours > 3) {
                        req.userDB.timePeriod = 'Over';
                    }
                } else {
                    req.userDB.timePeriod = 'Judging';
                }
            } else {
                req.userDB.timePeriod = 'Over';
            }
        } else {
            req.userDB.timePeriod = 'Over';
        }
    }
    req.userDB.userSubmission = req.userSubmission;

    res.send(req.userDB);
}
