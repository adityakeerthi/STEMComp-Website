function toProjectSubmission(){
    $("html, body").delay(0).animate({scrollTop: $('#project-submission-content').offset().top }, 1500);
}

function toJudgingPanel(){
    $("html, body").delay(0).animate({scrollTop: $('#judging-panel-content').offset().top }, 1500);
}

document.addEventListener('DOMContentLoaded', e => {
    const TOKEN = localStorage.getItem('UserToken');
    document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
    if (TOKEN === undefined) {
        console.log("hi")
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"token": localStorage.getItem('UserToken')});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/validateAuthorization", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === 'Authorized') {
                    
                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", BEARER_HEADER);
                    
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        redirect: 'follow'
                    };
                    
                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/userData", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            result = JSON.parse(result);

                            if (result.timePeriod === 'Project Submission') {
                                
                                document.getElementById('project-submission-content').innerHTML = `
                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Project Submission:</h5>
                                    <section class="dashboard-column">
                                        <form id="project-submission-form">
                                            <label for="project-title"> Project Title </label> <br />
                                            <input type="text" id="project-title" size="30" /> <br />
                                            <label for="project-description"> Project Description </label> <br />
                                            <textarea type="password" id="project-description" size="30"> </textarea> <br />
                                            <label for="category"> Category </label> <br />
                                            <select id="category">
                                                <option value= "life-sciences"> Life Sciences </option>
                                                <option value= "mathematical-sciences-and-technology"> Mathematical Sciences & Technology </option>
                                            </select> <br />
                                            <label for="youtube-url"> Youtube URL </label> 
                                            <input type="url" id="youtube-url" /> <br />
                                            
                                        </form>
                                        <button id="project-submission-button" class="btn yellow darken-2 z-depth-0"> Submit </button> <br /> <br />
                                    </section>
                                `
                                document.getElementById('judging-panel-content').innerHTML = `
                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Judging Panel:</h5>
                                    <section class="banner"> 
                                        The judging panel will open on July 1st!
                                    </section>
                                `                                
                                if (result.submitted) {
                                    const YOUTUBE_TOKEN = ('https://www.youtube.com/embed/' + result.userSubmission.youtubeURL.split('https://www.youtube.com/watch?v=')[1]);

                                    document.getElementById('project-submission-content').innerHTML += `
                                        <section class="dashboard-column">
                                            <section class="banner-submitted">
                                                This is your current video submission on Youtube, you can reupload it until July 1st, 11:59pm.
                                            </section><br>
                                            <iframe width="420" height="315" src="${YOUTUBE_TOKEN}"> </iframe>
                                        </section>
                                    `
                                } else {
                                    document.getElementById('project-submission-content').innerHTML += `
                                        <section class="dashboard-column">
                                            <section class="banner">
                                                The Submission Deadline on July 1st at 11:59pm.
                                            </section><br>
                                            <section class="banner">
                                                Go back to the mainpage for the Judging Criteria!
                                            </section>
                                        </section>
                                    `
                                }
                                document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');

                                document.getElementById('project-submission-button').addEventListener('click', e => {
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
                                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                    var myHeaders = new Headers();
                                    myHeaders.append("Authorization", BEARER_HEADER);
                                    myHeaders.append("Content-Type", "application/json");
                                    
                                    var raw = JSON.stringify({
                                        "title": document.getElementById('project-submission-form')['project-title'].value,
                                        "description": document.getElementById('project-submission-form')['project-description'].value,
                                        "category": document.getElementById('project-submission-form')['category'].value,
                                        "youtubeURL": document.getElementById('project-submission-form')['youtube-url'].value
                                    });
                                    
                                    var requestOptions = {
                                        method: 'POST',
                                        headers: myHeaders,
                                        body: raw,
                                        redirect: 'follow'
                                    };
                                    
                                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/submission", requestOptions)
                                        .then(response => response.text())
                                        .then(result => {
                                            document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                            window.location.reload();
                                        })
                                        .catch(error => console.log('error', error));

                                })


                            } else if (result.timePeriod === 'Judging') {
                                if (result.submitted) {
                                    if (result.assigned.length === 2) {
                                        const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                        var myHeaders = new Headers();
                                        myHeaders.append("Authorization", BEARER_HEADER);
                                        
                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            redirect: 'follow'
                                        };
                                        
                                        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/projectsToJudge", requestOptions)
                                            .then(response => response.text())
                                            .then(result => {
                                                result = JSON.parse(result);

                                                document.getElementById('project-submission-content').innerHTML = `
                                                    you already submitted
                                                `
                                                if (result.projectOne.category === 'life-sciences') {
                                                    result.projectOne.category = 'Life Sciences';
                                                } else if (result.projectOne.category === 'mathematical-sciences-and-technology') {
                                                    result.projectOne.category = 'Mathematical Sciences and Technology';
                                                }
                                                if (result.projectTwo.category === 'life-sciences') {
                                                    result.projectTwo.category = 'Life Sciences';
                                                } else if (result.projectTwo.category === 'mathematical-sciences-and-technology') {
                                                    result.projectTwo.category = 'Mathematical Sciences and Technology';
                                                }
                                                
                                                document.getElementById('judging-panel-content').innerHTML = `
                                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Judging Panel:</h5>

                                                    <section class="dashboard-row judging-panel-1">
                                                        <section id="judging-content-1-1" class="dashboard-column">
                                                            <form id="judging-panel-1">
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="interestCrit"> <br>
                                                                <label for="interestCrit"> Interest </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="difficultyCrit"> <br>
                                                                <label for="difficultyCrit"> Difficulty </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="impactCrit"> <br>
                                                                <label for="impactCrit"> Impact </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="sourcesCrit"> <br>
                                                                <label for="sourcesCrit"> Sources </label> <br>
                                                            </form>
                                                            <button id="judging-panel-1-button" class="btn-css"> JUDGE </button>
                                                        </section>
                                                        <section id="judging-content-1-2" class="dashboard-column">
                                                            <a><button id="about-btn" class="home-button"> <b>Title:</b> ${result.projectOne.title} </button></a> <br />
                                                            <a><button id="about-btn" class="home-button"> <b>Description:</b> ${result.projectOne.description} </button></a> <br />
                                                            <a><button id="about-btn" class="home-button"> <b>Category:</b> ${result.projectOne.category} </button></a> <br />
                                                            <a target="_blank" href="${result.projectOne.youtubeURL}" ><button id="about-btn" class="home-button"> <b>Click for Youtube Link</b> </button></a> <br />
                                                        </section>
                                                    </section>
                                                    <section class="dashboard-row judging-panel-2">
                                                        <section id="judging-content-2-1" class="dashboard-column">
                                                            <form id="judging-panel-2" class="range-field">
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="interestCrit"> <br>
                                                                <label for="interestCrit"> Interest </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="difficultyCrit"> <br>
                                                                <label for="difficultyCrit"> Difficulty </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="impactCrit"> <br>
                                                                <label for="impactCrit"> Impact </label> <br>
                                                                <input type="range" min="1" max="100" value="50" class="slider" id="sourcesCrit"> <br>
                                                                <label for="sourcesCrit"> Sources </label> <br>
                                                            </form>
                                                            <button id="judging-panel-2-button" class="btn yellow darken-2 z-depth-0"> JUDGE </button>
                                                        </section>
                                                        <section id="judging-content-2-2" class="dashboard-column">
                                                            <a><button id="about-btn" class="home-button"> <b>Title:</b> ${result.projectTwo.title} </button></a> <br />
                                                            <a><button id="about-btn" class="home-button"> <b>Description:</b> ${result.projectTwo.description} </button></a> <br />
                                                            <a><button id="about-btn" class="home-button"> <b>Category:</b> ${result.projectTwo.category} </button></a> <br />
                                                            <a target="_blank" href="${result.projectTwo.youtubeURL}" ><button id="about-btn" class="home-button"> <b>Click for Youtube Link</b> </button></a> <br />
                                                        </section>
                                                    </section>        
                                                `
                                                document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                                document.getElementById('judging-panel-1-button').addEventListener('click', e => {
                                                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Authorization", BEARER_HEADER);
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({
                                                        "difficulty": parseInt(document.getElementById('judging-panel-1')['difficultyCrit'].value),
                                                        "impact": parseInt(document.getElementById('judging-panel-1')['impactCrit'].value),
                                                        "interest": parseInt(document.getElementById('judging-panel-1')['interestCrit'].value),
                                                        "sources": parseInt(document.getElementById('judging-panel-1')['sourcesCrit'].value)
                                                    });
                                                    
                                                    var requestOptions = {
                                                        method: 'POST',
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: 'follow'
                                                    };
                                                    
                                                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/judgeProjectOne", requestOptions)
                                                        .then(response => response.text())
                                                        .then(result => console.log(result))
                                                        .catch(error => console.log('error', error));
                                                });

                                                document.getElementById('judging-panel-2-button').addEventListener('click', e => {
                                                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Authorization", BEARER_HEADER);
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({
                                                        "difficulty": parseInt(document.getElementById('judging-panel-2')['difficultyCrit'].value),
                                                        "impact": parseInt(document.getElementById('judging-panel-2')['impactCrit'].value),
                                                        "interest": parseInt(document.getElementById('judging-panel-2')['interestCrit'].value),
                                                        "sources": parseInt(document.getElementById('judging-panel-2')['sourcesCrit'].value)
                                                    });
                                                    
                                                    var requestOptions = {
                                                        method: 'POST',
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: 'follow'
                                                    };
                                                    
                                                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/judgeProjectTwo", requestOptions)
                                                        .then(response => response.text())
                                                        .then(result => console.log(result))
                                                        .catch(error => console.log('error', error));
                                                });

                                            })
                                            .catch(error => console.log('error', error));
                                            
                                    } else {
                                        const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                        var myHeaders = new Headers();
                                        myHeaders.append("Authorization", BEARER_HEADER);
                                        
                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            redirect: 'follow'
                                        };
                                        
                                        fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/assign", requestOptions)
                                            .then(response => response.text())
                                            .then(result => {
                                                window.location.reload();
                                            })
                                            .catch(error => console.log('error', error));
                                    }


                                } else {
                                    document.getElementById('judging-panel-content').innerHTML = `
                                        <section class="banner"> 
                                            Sorry, you cannot judge other projects if you had not submitted your own.
                                        </section>
                                    `
                                    document.getElementById('project-submission-content').innerHTML = `
                                        <section class="banner"> 
                                            Sorry, you have passed the submission deadline, you will not be able to submit your project.
                                        </section>
                                    `
                                }
                            } else if (result.timePeriod === "Needs to launch") {
                                window.location.href = './index.html'
                            }

                        })
                        .catch(error => console.log('error', error));


                } else if (result === 'Unauthorized' || result === 'Token has expired') {
                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                    window.location.href = './login.html';

                } else {
                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                    window.location.href = './login.html';
                }
            })
            .catch(error => console.log('error', error));

    }
})