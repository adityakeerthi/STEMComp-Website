// const dashboardContent = document.getElementById('dashboard-content');

// Getting
var today = new Date();
var dd = today.getDate() * 1;
var mm = (today.getMonth() + 1) * 100;
var yyyy = today.getFullYear();
today = dd + mm + yyyy;
// 2632


// auth.onAuthStateChanged(user => {
//     if (user) {
//         // dashboardContent.innerHTML = `
//         // logg
//         // `
//     } else {
//         // dashboardContent.innerHTML = `
//         // hi
//         // `
//     }
// })

// Listening for auth status changes
const projectSubmissionContent = document.getElementById('project-submission-content');

auth.onAuthStateChanged(user => {
    const email = user.email;

    if(user) {
        
        if (today >= 2632) { // June 12 2020 ~ change onfinialization
            projectSubmissionContent.innerHTML = `
            YOU HAVE PASSED SUBMISSION DEADLINE. YOU CANNOT SUBMIT. TRY AGAIN NEXT TIME
            `
        } else {

            db.collection('users').doc(email).get().then((doc) => {
                console.log(doc.data().submitted)
                
                const projectSubmissionForm = document.getElementById('projectSubmissionForm');
                projectSubmissionForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    // getting project info
                    const projectTitle = projectSubmissionForm['project-title'].value;
                    const projectDescription = projectSubmissionForm['project-description'].value;
                    const category = projectSubmissionForm['category'].value;
                    const youtubeURL = projectSubmissionForm['youtube-url'].value;
                
                    db.collection('users').doc(email).get().then((doc) => {
                        // Getting their first names
                        const firstName = doc.data().firstname;
                        const lastName = doc.data().lastname;
                        console.log(firstName, lastName)

                        return db.collection('submissions').doc(email).set({
                            title: projectTitle,
                            description: projectDescription,
                            youtubeURL: youtubeURL,
                            category: category,
                            email: email,
                            firstname: firstName,
                            lastname: lastName,
                            assigned: [],
                            voted: [],                    

                        }).then(() => {
                            return db.collection('users').doc(email).update({
                                submitted: true

                            }).then(() => {
                                // resetting the form

                                db.collection('submissions').doc(email).get().then((doc) => {
                                    const TITLE = doc.data().title;
                                    const DESCRIPTION = doc.data().description;
                                    const CATEGORY = doc.data().category
                                    const URL = doc.data().youtubeURL;

                                    const youtubeVideoInformation = document.getElementById('youtube-video-information');
                                    youtubeVideoInformation.innerHTML = `
                                    <h2> Current Project Details </h2> 
                                    <a ><button id="about-btn" class="home-button"> <b>Title:</b> ${TITLE} </button></a> <br /> <br />
                                    <a ><button id="about-btn" class="home-button"> <b>Description:</b> ${DESCRIPTION} </button></a> <br /> <br />
                                    <a ><button id="about-btn" class="home-button"> <b>Category:</b> ${CATEGORY} </button></a> <br /> <br />
                                    <a target="_blank" href="${URL}"><button id="about-btn" class="home-button"> Current Video on Youtube </button></a>
                                    ` // edit the goddamn css aditya, it needs to look better ~ aditya
                    
                                })

                                projectSubmissionForm.reset();


                            })

                        })
                    
                    })

                    // console.log(projectTitle, projectDescription, category, youtubeURL);
                })
                
                if (doc.data().submitted) {
                    db.collection('submissions').doc(email).get().then((doc) => {
                        const TITLE = doc.data().title;
                        const DESCRIPTION = doc.data().description;
                        const CATEGORY = doc.data().category
                        const URL = doc.data().youtubeURL;

                        const youtubeVideoInformation = document.getElementById('youtube-video-information');
                        youtubeVideoInformation.innerHTML = `
                        <h2> Current Project Details </h2> 
                        <a ><button id="about-btn" class="home-button"> <b>Title:</b> ${TITLE} </button></a> <br /> <br />
                        <a ><button id="about-btn" class="home-button"> <b>Description:</b> ${DESCRIPTION} </button></a> <br /> <br />
                        <a ><button id="about-btn" class="home-button"> <b>Category:</b> ${CATEGORY} </button></a> <br /> <br />
                        <a target="_blank" href="${URL}"><button id="about-btn" class="home-button"> Current Video on Youtube </button></a>
                        ` // edit the goddamn css aditya, it needs to look better ~ aditya
    
                    })

                } else {
                    const youtubeVideoInformation = document.getElementById('youtube-video-information');
                    youtubeVideoInformation.innerHTML = `
                    <h2> Make sure you submit your video through the form on the left! </h2>
                    <a ><button id="about-btn" class="home-button"> WATH'S UP </button></a>
                    `
                }

            })



        }

    } else {

    }



})

// ANIMATE ON SCROLL  [ THIS IS THE ONLY ANIMATION I'M EVER GOING TO DO LOL ~ ADITYA]
function toProjectSubmission() {
    $("html, body").delay(0).animate({scrollTop: $('#project-submission').offset().top }, 2000);
}

function toJudgingPanel() {
    $("html, body").delay(0).animate({scrollTop: $('#judging-panel').offset().top }, 2000);
}