const { admin } = require('../util/admin');

exports.submission = (req, res) => {
    const SUBMISSION = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        youtubeURL: req.body.youtubeURL,
        uid: req.user.uid,
        email: req.user.email,
        assigned: [],
        assignedCount: 0,
        votes: {}
    }
    
    if (req.userDB.submitted) {
        admin.firestore()
            .collection('projects')
            .doc(req.userDB.projectId)
            .update(SUBMISSION)
                .then(() => {
                    return admin.firestore()
                        .collection('accounts')
                        .doc(SUBMISSION.uid)
                        .update({ submitted: true })
                            .then(() => {
                                return res.send('Successfully updated');
                            })  
                            .catch(err => {
                                return res.status(500).json({ error: err.message });
                            })
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                })
    } else {
        admin.firestore()
            .collection('projects')
            .add(SUBMISSION)
                .then(doc => {
                    return admin.firestore()
                        .collection('accounts')
                        .doc(SUBMISSION.uid)
                        .update({ submitted: true, projectId: doc.id })
                            .then(() => {
                                return admin.firestore()
                                    .collection('projects')
                                    .doc(doc.id)
                                    .update({ projectId: doc.id })
                                        .then(() => {
                                            return res.send('Successfully Submitted');
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            return res.status(500).json({ error: err.message });
                                        })
                                
                            })  
                            .catch(err => {
                                return res.status(500).json({ error: err.message });
                            })
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                })
    }

}

exports.deleteSubmission = (req, res) => {
    admin.firestore()
        .collection('projects')
        .doc(req.userDB.projectId)
        .delete()
            .then(() => {
                return admin.firestore()
                    .collection('accounts')
                    .doc(req.user.uid)
                    .update({ submitted: false, projectId: "" })
                        .then(() => {
                            return res.send(' Successfully deleted project submission. ')
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

exports.assign = (req, res) => {
    // res.send(req.userDB);
    if (req.userDB.assigned.length !== 0) {
        res.send('Already assigned');
    } else if (req.userDB.submitted) {
        let data = [];

        const orderedData = admin.firestore().collection('projects').orderBy('assignedCount').limit(3);

        return Promise.all([orderedData.get()])
            .then(firstIter => {
                firstIter.forEach(secondIter => {
                    secondIter.forEach(finalIter => {
                        data.push(finalIter);
                    })
                })
                const possAssignedProjects = [data[0]["_fieldsProto"]["projectId"]["stringValue"], data[1]["_fieldsProto"]["projectId"]["stringValue"], data[2]["_fieldsProto"]["projectId"]["stringValue"]];
                
                if (possAssignedProjects.indexOf(req.userDB.projectId) > -1) possAssignedProjects.splice(possAssignedProjects.indexOf(req.userDB.projectId), 1)
                const finalAssigned = [possAssignedProjects[0], possAssignedProjects[1]];
                // res.send(finalAssigned);

                return admin.firestore()
                    .collection('accounts')
                    .doc(req.user.uid)
                    .update({ assigned: finalAssigned })
                        .then(() => {
                            return admin.firestore()
                                .collection('projects')
                                .doc(finalAssigned[0])
                                .update({ assignedCount: admin.firestore.FieldValue.increment(1), assigned: admin.firestore.FieldValue.arrayUnion(req.user.uid) })
                                    .then(() => {
                                        return admin.firestore()
                                            .collection('projects')
                                            .doc(finalAssigned[1])
                                            .update({ assignedCount: admin.firestore.FieldValue.increment(1), assigned: admin.firestore.FieldValue.arrayUnion(req.user.uid) })
                                                .then(() => {
                                                    return res.send('Successfully assigned projects');
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

    } else {
        return res.send('You must submit a project in order to judge other projects');
    }
}


