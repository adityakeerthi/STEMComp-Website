// Getting
var today = new Date();
var dd = today.getDate() * 1;
var mm = (today.getMonth() + 1) * 100;
var yyyy = today.getFullYear();
today = dd + mm + yyyy;
// 2632
console.log(today)
today = 1
// Listening for auth status changes
const projectSubmissionContent = document.getElementById('project-submission-content');

auth.onAuthStateChanged(user => {
    const email = user.email;

    if(user) {
        
        if (false) { // if (today <= 2632) { // June 12 2020 ~ change on finialization
            console.log(today >= 2632)
            projectSubmissionContent.innerHTML = `
            YOU HAVE PASSED SUBMISSION DEADLINE. YOU CANNOT SUBMIT. TRY AGAIN NEXT TIME
            `
        // } else if (today >=  2632) {
        //     console.log("WAIT SOME TIME")
        //     projectSubmissionContent.innerHTML = `
        //     HAS NOT OPENED YET
        //     `
        } else {

            projectSubmissionContent.innerHTML = `
            <section class="dashboard-column-1">
                <form id="projectSubmissionForm">

                    <input type="text" id="project-title" size="30" required /> <br />
                    <label for="project-title"> Project Title </label> <br />

                    <textarea type="password" id="project-description" size="30" required> </textarea> <br />
                    <label for="project-description"> Project Description </label> <br />

                    <select id="category">
                        <option value= "life-sciences"> Life Sciences </option>
                        <option value= "mathematical-sciences-and-technology"> Mathematical Sciences & Technology </option>
                    </select> <br />
                    <label for="category"> Category </label> <br />

                    <input type="url" id="youtube-url" required /> <br/>
                    <label for="youtube-url">Youtube URL</label> <br />

                    <button class="btn yellow darken-2 z-depth-0"> Submit </button> <br /> <br />

                </form>
            </section>
            
            <section class="dashboard-column-1" id="youtube-video-information">                               
            </section>
            `

            db.collection('users').doc(email).get().then((doc) => {

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
                            votes: {}

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
                                    window.location.reload();
                                })

                                projectSubmissionForm.reset();
                                window.location.reload();

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
                        <a target="_blank" href="${URL}"><button id="about-btn" class="home-button"> Current Video on Youtube </button></a> <br /> <br />
                        <a ><button onClick="deleteSubmission()" id="about-btn" class="home-button"> Delete Submission </button></a>
                        
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

function deleteSubmission() {
    console.log("ayy")
}

// ANIMATE ON SCROLL  [ THIS IS THE ONLY ANIMATION I'M EVER GOING TO DO LOL ~ ADITYA]
function toProjectSubmission() {
    $("html, body").delay(0).animate({scrollTop: $('#project-submission').offset().top }, 2000);
}

function toJudgingPanel() {
    $("html, body").delay(0).animate({scrollTop: $('#judging-panel').offset().top }, 2000);
}