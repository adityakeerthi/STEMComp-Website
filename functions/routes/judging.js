/* eslint-disable promise/no-nesting */
const { admin } = require('../util/admin');

exports.getProjectsToJudge = (req, res) => {
    if (req.userDB.submitted && req.userDB.assigned.length === 2) {
        const data = {};
        admin.firestore()
            .collection('projects')
            .doc(req.userDB.assigned[0])
            .get()
                .then(doc => {
                    data.projectOne = {
                        title: doc.data().title,
                        description: doc.data().description,
                        category: doc.data().category,
                        youtubeURL: doc.data().youtubeURL,
                        projectId: doc.data().projectId,
                        uid: doc.data().uid
                    }
                    return admin.firestore()
                        .collection('projects')
                        .doc(req.userDB.assigned[1])
                        .get()
                            .then(doc => {
                                data.projectTwo = {
                                    title: doc.data().title,
                                    description: doc.data().description,
                                    category: doc.data().category,
                                    youtubeURL: doc.data().youtubeURL,
                                    projectId: doc.data().projectId,
                                    uid: doc.data().uid
                                }
                                return res.send(data);
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

    } else if (!req.userDB.submitted) {
        res.send('You must first submit a project to be able to judge');
    } else {
        res.send('Sorry, you still need to get assigned projects so reload the page');
    }
}

exports.judgeProjectOne = (req, res) => {
    const JUDGED_INPUT = {
        difficulty: req.body.difficulty,
        impact: req.body.impact,
        interest: req.body.interest,
        sources: req.body.sources
    };
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1);
    const day = today.getDate();
    let timePeriod;
    if (year !== 2020) {
        timePeriod = 'Over';
    } else {
        if (month <= 5) {
            timePeriod = 'Needs to launch';
        } else if (month === 6 || month === 7 && day === 1) {
            timePeriod = 'Project Submission';
        } else if (month === 7 && day > 1 && day < 10) {
            timePeriod = 'Judging';
        } else {
            timePeriod = 'Over';
        }
    }
    if (timePeriod !== 'Judging') {
        return res.send('You cannot judge before judging begins.');
    } else if (!req.userDB.submitted) {
        return res.send('You must first submit a project to be able to judge');
    } else if (req.userDB.assigned.length !== 2) {
        return res.send('Sorry, you still need to get assigned projects so reload the page');
    } else {
        return admin.firestore()
            .collection('projects')
            .doc(req.userDB.assigned[0])
            .get()
                .then(doc => {
                    const votes = doc.data().votes;
                    votes[req.user.uid] = JUDGED_INPUT;
                    return admin.firestore()
                                .collection('projects')
                                .doc(req.userDB.assigned[0])
                                .update({ votes: votes })
                                    .then(() => {
                                        return admin.firestore()
                                                    .collection('accounts')
                                                    .doc(req.user.uid)
                                                    .get()
                                                        .then(doc => {
                                                            const userVotes = doc.data().votes;
                                                            userVotes[req.userDB.assigned[0]] = JUDGED_INPUT;
                                                            return admin.firestore()
                                                                        .collection('accounts')
                                                                        .doc(req.user.uid)
                                                                        .update({ votes: userVotes })
                                                                            .then(() => {
                                                                                return res.send('Succesfully judged project 1');
                                                                            })
                                                                            .catch(err => {
                                                                                console.error(err);
                                                                                res.status(500).json({ error: err.message });
                                                                            })
                                                        })
                                                        .catch(err => {
                                                            console.error(err);
                                                            res.status(500).json({ error: err.message });
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

    }
}

exports.judgeProjectTwo = (req, res) => {
    const JUDGED_INPUT = {
        difficulty: req.body.difficulty,
        impact: req.body.impact,
        interest: req.body.interest,
        sources: req.body.sources
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1);
    const day = today.getDate();
    let timePeriod;
    if (year !== 2020) {
        timePeriod = 'Over';
    } else {
        if (month <= 5) {
            timePeriod = 'Needs to launch';
        } else if (month === 6 || month === 7 && day === 1) {
            timePeriod = 'Project Submission';
        } else if (month === 7 && day > 1 && day < 10) {
            timePeriod = 'Judging';
        } else {
            timePeriod = 'Over';
        }
    }
    if (timePeriod !== 'Judging') {
        return res.send('You cannot judge before judging begins.');
    } else if (!req.userDB.submitted) {
        return res.send('You must first submit a project to be able to judge');
    } else if (req.userDB.assigned.length !== 2) {
        return res.send('Sorry, you still need to get assigned projects so reload the page');
    } else {
        admin.firestore()
            .collection('projects')
            .doc(req.userDB.assigned[1])
            .get()
                .then(doc => {
                    const votes = doc.data().votes;
                    votes[req.user.uid] = JUDGED_INPUT;
                    return admin.firestore()
                                .collection('projects')
                                .doc(req.userDB.assigned[1])
                                .update({ votes: votes })
                                    .then(() => {
                                        return admin.firestore()
                                                    .collection('accounts')
                                                    .doc(req.user.uid)
                                                    .get()
                                                        .then(doc => {
                                                            const userVotes = doc.data().votes;
                                                            userVotes[req.userDB.assigned[1]] = JUDGED_INPUT;
                                                            return admin.firestore()
                                                                        .collection('accounts')
                                                                        .doc(req.user.uid)
                                                                        .update({ votes: userVotes })
                                                                            .then(() => {
                                                                                return res.send('Succesfully judged project 2');
                                                                                
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
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                })

    }
}

exports.getProjectsScores = (req, res) => {
    if (req.user.email !== 'stemcomp.info@gmail.com') {
        res.status(500).json({ error: 'You have no authority for this function' });
    } else {
        res.send('Will do');
    }
}
