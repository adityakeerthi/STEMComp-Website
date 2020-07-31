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
                    tsubmitted = false;
                    votesObj = doc.data().votes;

                    if (votesObj[req.user.uid]) {
                        tsubmitted = true;
                    }

                    data.projectOne = {
                        title: doc.data().title,
                        description: doc.data().description,
                        category: doc.data().category,
                        youtubeURL: doc.data().youtubeURL,
                        projectId: doc.data().projectId,
                        specialPrize1: doc.data().specialPrize1,
                        specialPrize2: doc.data().specialPrize2,
                        submitted: tsubmitted,
                        uid: doc.data().uid
                    }
                    return admin.firestore()
                        .collection('projects')
                        .doc(req.userDB.assigned[1])
                        .get()
                            .then(doc => {
                                tsubmitted = false;
                                votesObj = doc.data().votes;
            
                                if (votesObj[req.user.uid]) {
                                    tsubmitted = true;
                                }

                                data.projectTwo = {
                                    title: doc.data().title,
                                    description: doc.data().description,
                                    category: doc.data().category,
                                    youtubeURL: doc.data().youtubeURL,
                                    projectId: doc.data().projectId,
                                    specialPrize1: doc.data().specialPrize1,
                                    specialPrize2: doc.data().specialPrize2,
                                    submitted: tsubmitted,
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
        interest: req.body.interest
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
        } else if (month === 7 && day > 1 && day < 9) {
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
        interest: req.body.interest
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
    const FINAL_OBJ = {};
    if (req.user.email !== 'stemcomp.info@gmail.com') {
        res.status(500).json({ error: 'You have no authority for this function' });
    } else {
        return admin.firestore()
                    .collection('projects')
                    .onSnapshot(snapshot => {
                        const data = snapshot.docs; var score = 0; var final = '';
                        let bestOverall = []; let bestCovid = []; let bestVideoPresentation = []; let bestEntrepreneurial = []; let bestFutureDataScience = []; let bestEnvironmentalProject = []; let bestWRDSBEngineer = [];
                        let finalBestOverall = []; let finalBestCovid = []; let finalBestVideoPresentation = []; let finalBestEntrepreneurial = []; let finalBestFutureDataScience = []; let finalBestEnvironmentalProject = []; let finalBestWRDSBEngineer = [];
                        
                        data.forEach(doc => {
                            const project = doc.data();

                            score = 0; final = '';
                            const keys = Object.keys(project.votes);
                            keys.forEach(key => {
                                score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                            })
                            bestOverall.push({
                                id: project.projectId,
                                category: project.category,
                                url: project.youtubeURL,
                                title: project.title,
                                email: project.email,
                                score: score
                            });

                            if (project.specialPrize1 === 'best-covid-19-project' || project.specialPrize2 === 'best-covid-19-project') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestCovid.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                            if (project.specialPrize1 === 'best-video-presentation' || project.specialPrize2 === 'best-video-presentation') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestVideoPresentation.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                            if (project.specialPrize1 === 'entrepreneurial-potential' || project.specialPrize2 === 'entrepreneurial-potential') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestEntrepreneurial.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                            if (project.specialPrize1 === 'future-data-scientist' || project.specialPrize2 === 'future-data-scientist') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestFutureDataScience.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                            if (project.specialPrize1 === 'best-environmental-project' || project.specialPrize2 === 'best-environmental-project') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestEnvironmentalProject.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                            if (project.specialPrize1 === 'wrdsb-future-engineer' || project.specialPrize2 === 'wrdsb-future-engineer') {
                                score = 0; final = '';
                                const keys = Object.keys(project.votes);
                                keys.forEach(key => {
                                    score += project.votes[key].impact + project.votes[key].interest + project.votes[key].difficulty;
                                })
                                bestWRDSBEngineer.push({
                                    id: project.projectId,
                                    category: project.category,
                                    url: project.youtubeURL,
                                    title: project.title,
                                    email: project.email,
                                    score: score
                                });
                            }
                        })
                        
                        bestOverall.sort((a, b) => { return b.score - a.score });
                        bestOverall.forEach(doc => { finalBestOverall.push(doc) });
                        
                        bestCovid.sort((a, b) => { return b.score - a.score });
                        bestCovid.forEach(doc => { finalBestCovid.push(doc) });
                        
                        bestVideoPresentation.sort((a, b) => { return b.score - a.score });
                        bestVideoPresentation.forEach(doc => { finalBestVideoPresentation.push(doc) });
                        
                        bestEntrepreneurial.sort((a, b) => { return b.score - a.score });
                        bestEntrepreneurial.forEach(doc => { finalBestEntrepreneurial.push(doc) });
                        
                        bestFutureDataScience.sort((a, b) => { return b.score - a.score });
                        bestFutureDataScience.forEach(doc => { finalBestFutureDataScience.push(doc) });
                        
                        bestEnvironmentalProject.sort((a, b) => { return b.score - a.score });
                        bestEnvironmentalProject.forEach(doc => { finalBestEnvironmentalProject.push(doc) });
                        
                        bestWRDSBEngineer.sort((a, b) => { return b.score - a.score });
                        bestWRDSBEngineer.forEach(doc => { finalBestWRDSBEngineer.push(doc) });

                        FINAL_OBJ.overall = finalBestOverall; FINAL_OBJ.bestCovid = finalBestCovid; FINAL_OBJ.bestVideoPresentation = finalBestVideoPresentation; FINAL_OBJ.bestEntrepreneurial = finalBestEntrepreneurial; FINAL_OBJ.bestFutureDataScience = finalBestFutureDataScience; FINAL_OBJ.bestEnvironmentalProject = finalBestEnvironmentalProject; FINAL_OBJ.bestWRDSBEngineer = finalBestWRDSBEngineer;

                        res.send(FINAL_OBJ);
                    })
    }
}
