// Getting
var today = new Date();
var dd = today.getDate() * 1;
var mm = (today.getMonth() + 1) * 100;
var yyyy = today.getFullYear();
today = dd + mm + yyyy;
// 2632
console.log(today)
today = 2632

function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
};

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

auth.onAuthStateChanged(user => {
    if (user) {
        
        if (2632 <= today && today <= 2662) { // 30 days after
            console.log("HI")
            db.collection('users').doc(user.email).get().then(doc => {
                const assigned = doc.data().assigned.length;
                const accounts = [];
                const submitted = doc.data().submitted;
                
                if (submitted) {                
                    if (assigned !== 2) {
                        db.collection('submissions').onSnapshot(snapshot => {
                            const data = snapshot.docs;
                            const loops = data.length;
                            
                            for (let i = 0; i < loops; i++) {
                                let userData = data[i].data();
                                let userLength = userData.assigned.length.toString(10);
                                let userValue = userLength + "|" + userData.email;
                                console.log(i);
                                
                                db.collection('users').doc(user.email).get().then(doc => {
                                    console.log('')
                                })
                                
                                if (userData.email === user.email) {
                                    console.log(userData.email, user.email);
                                } else {
                                    accounts.push(userValue)
                                }
                                
                            }
                            
                            let newAssigned = accounts.sort();
                            for (let i = 0; i < newAssigned.length; i++) {
                                let emailTemp = newAssigned[i].split("|");
                                newAssigned[i] = emailTemp[1]
                            }
                            newAssigned = removeDuplicates(newAssigned)
                            console.log(newAssigned)

                            if (newAssigned[0] === undefined) {
                                console.log("oh no uncalled")
                            } else {
                                let firstAssigned, secondAssigned;
                                newAssigned = removeDuplicates(newAssigned)
                                firstAssigned = newAssigned[0];
                                secondAssigned = newAssigned[1];

                                db.collection('users').doc(user.email).update({
                                    assigned: [firstAssigned, secondAssigned]

                                }).then(() => {
                                    
                                    db.collection('users').doc(user.email).get().then(() => {
                                        if (doc.data().assigned.length) {
                                            
                                        } else {
                                            console.log(newAssigned[0]);

                                            console.log(secondAssigned);
                                            db.collection('submissions').doc(firstAssigned).update({
                                                assigned: arrayUnion( user.email )
                                            
                                            }).then(() => {
                                                db.collection('submissions').doc(secondAssigned).update({
                                                    assigned: arrayUnion( user.email )

                                                }).then(() => {
                                                    // window.location.reload();

                                                })
                                                
                                            })
                                        }
                                        
                                    })
                                    
                                })
                                                            
                            }

                        })

                    } else {
                        // Adding them to the innerHTML
                        const judgingContent1_1 = document.getElementById('judging-content-1-1');
                        const judgingContent1_2 = document.getElementById('judging-content-1-2');
                        const judgingContent2_1 = document.getElementById('judging-content-2-1');
                        const judgingContent2_2 = document.getElementById('judging-content-2-2');

                        console.log("hi")

                        judgingContent1_1.innerHTML = `
                        <form id="judging-panel-1" class="range-field">
                            <input type="range" min="1" max="100" value="50" class="slider" id="interestCrit">
                            <label for="interestCrit"> Interest </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="difficultyCrit">
                            <label for="difficultyCrit"> Difficulty </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="impactCrit">
                            <label for="impactCrit"> Impact </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="sourcesCrit">
                            <label for="sourcesCrit"> Sources </label><br>
                            <button class="btn yellow darken-2 z-depth-0"> JUDGE </button><br><br>
                        </form>
                        `;
                        judgingContent2_1.innerHTML = `
                        <form id="judging-panel-2" class="range-field">
                            <input type="range" min="1" max="100" value="50" class="slider" id="interestCrit">
                            <label for="interestCrit"> Interest </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="difficultyCrit">
                            <label for="difficultyCrit"> Difficulty </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="impactCrit">
                            <label for="impactCrit"> Impact </label><br>
                            <input type="range" min="1" max="100" value="50" class="slider" id="sourcesCrit">
                            <label for="sourcesCrit"> Sources </label><br>
                            <button class="btn yellow darken-2 z-depth-0"> JUDGE </button><br><br>
                        </form>
                        `;



                        db.collection('users').doc(user.email).get().then(doc => {
                            const assignedList = doc.data().assigned;
                            const votedMap = doc.data().votes;
                            const judgeContent1_2 = document.getElementById('judging-content-1-2');
                            const judgeContent2_2 = document.getElementById('judging-content-2-2');


                            db.collection('submissions').doc(assignedList[0]).get().then(doc_one => {
                                judgeContent1_2.innerHTML = `
                                <h2> The Project you are judging...  </h2> 
                                <a ><button id="about-btn" class="home-button"> <b>Title:</b> ${doc_one.data().title} </button></a> <br /> <br />
                                <a ><button id="about-btn" class="home-button"> <b>Description:</b> ${doc_one.data().description} </button></a> <br /> <br />
                                <a ><button id="about-btn" class="home-button"> <b>Category:</b> ${doc_one.data().category} </button></a> <br /> <br />
                                <a target="_blank" href="${doc_one.data().youtubeURL}"><button id="about-btn" class="home-button"> Current Video on Youtube </button></a>
                                `

                            })

                            db.collection('submissions').doc(assignedList[1]).get().then(doc_one => {
                                judgeContent2_2.innerHTML = `
                                <h2> The Project you are judging...  </h2> 
                                <a ><button id="about-btn" class="home-button"> <b>Title:</b> ${doc_one.data().title} </button></a> <br /> <br />
                                <a ><button id="about-btn" class="home-button"> <b>Description:</b> ${doc_one.data().description} </button></a> <br /> <br />
                                <a ><button id="about-btn" class="home-button"> <b>Category:</b> ${doc_one.data().category} </button></a> <br /> <br />
                                <a target="_blank" href="${doc_one.data().youtubeURL}"><button id="about-btn" class="home-button"> Current Video on Youtube </button></a>
                                `

                            })

                            if (votedMap[assignedList[0]] && votedMap[assignedList[1]]) {
                                votedOne = true;
                                votedTwo = true;                               

                            } else if (votedMap[assignedList[0]]) {
                                votedOne = true;
                            } else if (votedMap[assignedList[1]]) {
                                votedTwo = true;
                            } else {
                                console.log("no votes exists")
                            }

                        })

                        const judgingForm1 = document.getElementById('judging-panel-1');
                        judgingForm1.addEventListener('submit', (e) => {
                            e.preventDefault();

                            db.collection('users').doc(user.email).get().then(doc => {
                                let currentlyJudging = doc.data().assigned[0];

                                db.collection('submissions').doc(currentlyJudging).get().then(doc => {
                                    const voted = doc.data().votes;

                                    voted[user.email] = {
                                        interest: parseInt(judgingForm1["interestCrit"].value),
                                        difficulty: parseInt(judgingForm1["difficultyCrit"].value),
                                        impact: parseInt(judgingForm1["impactCrit"].value),
                                        sources: parseInt(judgingForm1["sourcesCrit"].value)
                                    }

                                    db.collection('submissions').doc(currentlyJudging).update({
                                        votes: voted

                                    }).then(() => {
                                        db.collection('users').doc(user.email).get().then(doc => {
                                            const userVotes = doc.data().votes;

                                            userVotes[currentlyJudging] = {
                                                interest: parseInt(judgingForm1["interestCrit"].value),
                                                difficulty: parseInt(judgingForm1["difficultyCrit"].value),
                                                impact: parseInt(judgingForm1["impactCrit"].value),
                                                sources: parseInt(judgingForm1["sourcesCrit"].value)
                                            }

                                            console.log(userVotes)

                                            db.collection('users').doc(user.email).update({
                                                votes: userVotes

                                            }).then(() => {
                                                judgingForm1.reset();
                                                window.location.reload();
                                            })

                                        })

                                    })

                                })


                            })

                        })

                        const judgingForm2 = document.getElementById('judging-panel-2');
                        judgingForm2.addEventListener('submit', (e) => {
                            e.preventDefault();
                            console.log("HI 2");

                            db.collection('users').doc(user.email).get().then(doc => {
                                let currentlyJudging = doc.data().assigned[1];

                                db.collection('submissions').doc(currentlyJudging).get().then(doc => {
                                    const voted = doc.data().votes;

                                    voted[user.email] = {
                                        interest: parseInt(judgingForm2["interestCrit"].value),
                                        difficulty: parseInt(judgingForm2["difficultyCrit"].value),
                                        impact: parseInt(judgingForm2["impactCrit"].value),
                                        sources: parseInt(judgingForm2["sourcesCrit"].value)
                                    }

                                    db.collection('submissions').doc(currentlyJudging).update({
                                        votes: voted

                                    }).then(() => {
                                        db.collection('users').doc(user.email).get().then(doc => {
                                            const userVotes = doc.data().votes;

                                            userVotes[currentlyJudging] = {
                                                interest: parseInt(judgingForm2["interestCrit"].value),
                                                difficulty: parseInt(judgingForm2["difficultyCrit"].value),
                                                impact: parseInt(judgingForm2["impactCrit"].value),
                                                sources: parseInt(judgingForm2["sourcesCrit"].value)
                                            }

                                            console.log(userVotes)

                                            db.collection('users').doc(user.email).update({
                                                votes: userVotes

                                            }).then(() => {
                                                judgingForm2.reset();
                                                window.location.reload();
                                            })

                                        })

                                    })

                                })


                            })

                        })

                    }

                }
            
            })
        
        } else {
            // Out of time
            console.log("OUT OF TIME")

        }

    } else {
        // window.location.href = "./index.html";
        console.log("logged out")
    }


})