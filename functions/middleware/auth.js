/* eslint-disable promise/no-nesting */
const { admin } = require('../util/admin');

module.exports = (req, res, next) => {
    let ID_TOKEN;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        ID_TOKEN = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(500).json({ error: 'Unauthorized' })
    }

    admin.auth()
        .verifyIdToken(ID_TOKEN)
        .then(decodedToken => {
            req.user = decodedToken;
            return admin.firestore()
                .collection('accounts')
                .doc(req.user.uid)
                .get()
                .then(doc => {
                    req.userDB = doc.data();
                    if (!req.userDB.projectId) {
                        req.userSubmission = null;
                        return next();

                    } else {
                        return admin.firestore()
                            .collection('projects')
                            .doc(req.userDB.projectId)
                            .get()
                            .then(doc => {
                                req.userSubmission = doc.data();
                                return next();
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({ error: err.message });
                            })
                    }

                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: err.message });
                })

        })
        .catch(err => {
            console.error('Error while verifying token ', err);
            if (err.code === 'auth/id-token-expired') {
                return res.status(500).json({ error: 'Invalid Token' })
            } else {
                return res.status(500).json( err.code );
            }
        })
}