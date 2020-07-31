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
                            console.log(result);
                            result = JSON.parse(result);
                            console.log(result);

                            if (result.userSubmission !== null) {
                                if (result.userSubmission.youtubeURL.includes('https://youtu.be/')) {
                                    window.userYoutubeToken = ('https://www.youtube.com/embed/' + result.userSubmission.youtubeURL.split('https://youtu.be/')[1]);
                                } else if (result.userSubmission.youtubeURL.includes('https://www.youtube.com/watch?v=')) {
                                    window.userYoutubeToken = (result.userSubmission.youtubeURL.split('https://www.youtube.com/watch?v=')[1]);
                                    window.userYoutubeToken = 'https://www.youtube.com/embed/' + window.userYoutubeToken.substring(0, 11);
                                }
                            }

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
                                            <label for="special-prize-1"> Special Prize #1 </label> <br />
                                            <select id="special-prize-1">
                                                <option value= "none"> None </option>
                                                <option value= "best-covid-19-project"> Best COVID-19 Project </option>
                                                <option value= "best-video-presentation"> Best Video Presentation </option>
                                                <option value= "entrepreneurial-potential"> Entrepreneurial Potential </option>
                                                <option value= "future-data-scientist"> Future Data Scientist </option>
                                                <option value= "best-environmental-project"> Best Environmental Project </option>
                                                <option value= "wrdsb-future-engineer"> WRDSB Future Engineer </option>
                                            </select> <br />
                                            <label for="special-prize-2"> Special Prize #2 </label> <br />
                                            <select id="special-prize-2">
                                                <option value= "none"> None </option>
                                                <option value= "best-covid-19-project"> Best COVID-19 Project </option>
                                                <option value= "best-video-presentation"> Best Video Presentation </option>
                                                <option value= "entrepreneurial-potential"> Entrepreneurial Potential </option>
                                                <option value= "future-data-scientist"> Future Data Scientist </option>
                                                <option value= "best-environmental-project"> Best Environmental Project </option>
                                                <option value= "wrdsb-future-engineer"> WRDSB Future Engineer </option>
                                            </select> <br />
                                            
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
                                if (result.submitted && result.userSubmission) {
                                    if (result.userSubmission.youtubeURL.includes('https://youtu.be/')) {
                                        const YOUTUBE_TOKEN = ('https://www.youtube.com/embed/' + result.userSubmission.youtubeURL.split('https://youtu.be/')[1]);
                                        document.getElementById('project-submission-content').innerHTML += `
                                            <section class="dashboard-column">
                                                <section class="banner-submitted">
                                                    This is your current video submission on Youtube, you can reupload it until July 1st, 11:59pm.
                                                </section><br>
                                                <iframe width="420" height="315" src="${YOUTUBE_TOKEN}"> </iframe>
                                            </section>
                                        ` 
                                    } else if (result.userSubmission.youtubeURL.includes('https://www.youtube.com/watch?v=')) {
                                        let YOUTUBE_TOKEN = (result.userSubmission.youtubeURL.split('https://www.youtube.com/watch?v=')[1]);
                                        YOUTUBE_TOKEN = 'https://www.youtube.com/embed/' + YOUTUBE_TOKEN.substring(0, 11);
                                        document.getElementById('project-submission-content').innerHTML += `
                                            <section class="dashboard-column">
                                                <section class="banner-submitted">
                                                    This is your current video submission on Youtube, you can reupload it until July 1st, 11:59pm.
                                                </section><br>
                                                <iframe width="420" height="315" src="${YOUTUBE_TOKEN}"> </iframe>
                                            </section>
                                        ` 
                                    }

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
                                        "youtubeURL": document.getElementById('project-submission-form')['youtube-url'].value,
                                        "specialprize1": document.getElementById('project-submission-form')['special-prize-1'].value,
                                        "specialprize2": document.getElementById('project-submission-form')['special-prize-2'].value                                        
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
                                    console.log(result);
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
                                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Project Submission:</h5>
                                                    <section class="dashboard-column">
                                                        <section class="full-banner"> 
                                                            The video on the right is your project submission. Scroll down below finish peer judging two projects.
                                                        </section>
                                                    </section>
                                                    <section class="dashboard-column">
                                                        <iframe width="420" height="3150" src="${window.userYoutubeToken}"> </iframe>
                                                    </section>
                                                `
                                                console.log(result);
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

                                                if (result.projectOne.specialPrize1 === 'best-video-presentation') {
                                                    result.projectOne.specialPrize1 = 'Best Video Presentation';
                                                } else if (result.projectOne.specialPrize1 === 'entrepreneurial-potential') {
                                                    result.projectOne.specialPrize1 = 'Entrepreneurial Potential';
                                                } else if (result.projectOne.specialPrize1 === 'best-covid-19-project') {
                                                    result.projectOne.specialPrize1 = 'Best COVID-19 Project';
                                                } else if (result.projectOne.specialPrize1 === 'future-data-scientist') {
                                                    result.projectOne.specialPrize1 = 'Future Data Scientist';
                                                } else if (result.projectOne.specialPrize1 === 'best-environmental-project') {
                                                    result.projectOne.specialPrize1 = 'Best Environmental Project';
                                                } else if (result.projectOne.specialPrize1 === 'wrdsb-future-engineer') {
                                                    result.projectOne.specialPrize1 = 'WRDSB Future Engineer';
                                                }

                                                if (result.projectOne.specialPrize2 === 'best-video-presentation') {
                                                    result.projectOne.specialPrize2 = 'Best Video Presentation';
                                                } else if (result.projectOne.specialPrize2 === 'entrepreneurial-potential') {
                                                    result.projectOne.specialPrize2 = 'Entrepreneurial Potential';
                                                } else if (result.projectOne.specialPrize2 === 'best-covid-19-project ') {
                                                    result.projectOne.specialPrize2 = 'Best COVID-19 Project';
                                                } else if (result.projectOne.specialPrize2 === 'future-data-scientist') {
                                                    result.projectOne.specialPrize2 = 'Future Data Scientist';
                                                } else if (result.projectOne.specialPrize2 === 'best-environmental-project') {
                                                    result.projectOne.specialPrize2 = 'Best Environmental Project';
                                                } else if (result.projectOne.specialPrize2 === 'wrdsb-future-engineer') {
                                                    result.projectOne.specialPrize2 = 'WRDSB Future Engineer';
                                                }

                                                if (result.projectTwo.specialPrize1 === 'best-video-presentation') {
                                                    result.projectTwo.specialPrize1 = 'Best Video Presentation';
                                                } else if (result.projectTwo.specialPrize1 === 'entrepreneurial-potential') {
                                                    result.projectTwo.specialPrize1 = 'Entrepreneurial Potential';
                                                } else if (result.projectTwo.specialPrize1 === 'best-covid-19-project') {
                                                    result.projectTwo.specialPrize1 = 'Best COVID-19 Project';
                                                } else if (result.projectTwo.specialPrize1 === 'future-data-scientist') {
                                                    result.projectTwo.specialPrize1 = 'Future Data Scientist';
                                                } else if (result.projectTwo.specialPrize1 === 'best-environmental-project') {
                                                    result.projectTwo.specialPrize1 = 'Best Environmental Project';
                                                } else if (result.projectTwo.specialPrize1 === 'wrdsb-future-engineer') {
                                                    result.projectTwo.specialPrize1 = 'WRDSB Future Engineer';
                                                }

                                                if (result.projectTwo.specialPrize2 === 'best-video-presentation') {
                                                    result.projectTwo.specialPrize2 = 'Best Video Presentation';
                                                } else if (result.projectTwo.specialPrize2 === 'entrepreneurial-potential') {
                                                    result.projectTwo.specialPrize2 = 'Entrepreneurial Potential';
                                                } else if (result.projectTwo.specialPrize2 === 'best-covid-19-project ') {
                                                    result.projectTwo.specialPrize2 = 'Best COVID-19 Project';
                                                } else if (result.projectTwo.specialPrize2 === 'future-data-scientist') {
                                                    result.projectTwo.specialPrize2 = 'Future Data Scientist';
                                                } else if (result.projectTwo.specialPrize2 === 'best-environmental-project') {
                                                    result.projectTwo.specialPrize2 = 'Best Environmental Project';
                                                } else if (result.projectTwo.specialPrize2 === 'wrdsb-future-engineer') {
                                                    result.projectTwo.specialPrize2 = 'WRDSB Future Engineer';
                                                }
                                                console.log(result.projectOne.youtubeURL, result.projectTwo.youtubeURL);
                                                if (result.projectOne.youtubeURL.includes('https://youtu.be/')) {
                                                    window.projectOneYoutubeURL = ('https://www.youtube.com/embed/' + result.projectOne.youtubeURL.split('https://youtu.be/')[1]);
                                                } else if (result.projectOne.youtubeURL.includes('https://www.youtube.com/watch?v=')) {
                                                    window.projectOneYoutubeURL = (result.projectOne.youtubeURL.split('https://www.youtube.com/watch?v=')[1]);
                                                    window.projectOneYoutubeURL = 'https://www.youtube.com/embed/' + window.projectOneYoutubeURL.substring(0, 11);
                                                }

                                                if (result.projectTwo.youtubeURL.includes('https://youtu.be/')) {
                                                    window.projectTwoYoutubeURL = ('https://www.youtube.com/embed/' + result.projectTwo.youtubeURL.split('https://youtu.be/')[1]);
                                                } else if (result.projectTwo.youtubeURL.includes('https://www.youtube.com/watch?v=')) {
                                                    // window.projectTwoYoutubeURL = (result.projectOne.youtubeURL.split('https://www.youtube.com/watch?v=')[1]);
                                                    window.projectTwoYoutubeURL = 'https://www.youtube.com/embed/' + result.projectOne.youtubeURL.split('https://www.youtube.com/watch?v=')[1];
                                                }
                                                statusColourProjectOne = '#d32f2f'; // red
                                                statusColourProjectTwo = '#388E3C'; // green
                                                if (result.projectOne.submitted) {
                                                    result.projectOne.submitted = 'Judged';
                                                    statusColourProjectOne = '#388E3C';
                                                } else {
                                                    result.projectOne.submitted = 'Not Judged Yet';
                                                    statusColourProjectOne = '#d32f2f';
                                                }

                                                if (result.projectTwo.submitted) {
                                                    result.projectTwo.submitted = 'Judged';
                                                    statusColourProjectTwo = '#388E3C';
                                                } else {
                                                    result.projectTwo.submitted = 'Not Judged Yet';
                                                    statusColourProjectTwo = '#d32f2f';
                                                }

                                                console.log(window.projectOneYoutubeURL, window.projectTwoYoutubeURL)
                                                console.log(result);
                                                document.getElementById('judging-panel-content').innerHTML = `
                                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Judging Panel:</h5>
                                                    
                                                    <section class="judge-row judge-banner"> 
                                                        Below, there are two projects that you are required to submit before July 10th, 2020. <br>
                                                        You can edit your submission until July 10th, 2020. <br> <br>
                                                        <B> What we expect from you to judge these projects: </B> <br/>
                                                        • Interest ~ How engaging was the video and is the content clear for the audience?  <br>
                                                        • Difficulty ~ Does the project dive deep into the complexities of their chosen topic? <br>
                                                        • Impact ~ Does the project help solve the problem the author addresses? <br> <br>
                                                        <u> <b> Please judge honestly, we will be monitoring all of your responses. </b> </u>
                                                    </section>
                                                    
                                                    <section class="judge-title">
                                                        <u> ${result.projectOne.title} </u>
                                                    </section>

                                                    <section class="dashboard-row judge-banner">
                                                        <section style="color: ${statusColourProjectOne}" >
                                                            <b> Status: </b> ${result.projectOne.submitted}
                                                        </section>
                                                        <br/>
                                                        <section id="judging-content-1-1" class="dashboard-column">
                                                            <form id="judging-panel-1">
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="interestOutput"> 5 </output> <br>
                                                                    <input onchange="interestOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="interestCrit"><br>
                                                                    <label for="interestCrit"> Interest </label> <br>
                                                                </section>
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="difficultyOutput"> 5 </output> <br>
                                                                    <input onchange="difficultyOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="difficultyCrit"> <br>
                                                                    <label for="difficultyCrit"> Difficulty </label> <br>
                                                                </section>
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="impactOutput"> 5 </output> <br>
                                                                    <input onchange="impactOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="impactCrit"> <br>
                                                                    <label for="impactCrit"> Impact </label> <br>
                                                                </section>
                                                            </form>
                                                            <button id="judging-panel-1-button" class="btn yellow darken-2 z-depth-0"> JUDGE </button>
                                                        </section>
                                                        <br/>
                                                        <section id="judging-content-1-2" class="dashboard-column">

                                                            <iframe width="420" height="315" src="${window.projectOneYoutubeURL}"> </iframe>
                                                            <section class="judge-info-banner">
                                                                <b> Description: </b> ${result.projectOne.description}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Category: </b> ${result.projectOne.category}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Special Prize #1: </b> ${result.projectOne.specialPrize1}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Special Prize #2: </b> ${result.projectOne.specialPrize2}
                                                            </section>

                                                        </section>
                                                    </section>

                                                    <section class="judge-title">
                                                        <u> ${result.projectTwo.title} </u>
                                                    </section>

                                                    <section class="dashboard-row judge-banner">
                                                        <section style="color: ${statusColourProjectTwo}" >
                                                            <b> Status: </b> ${result.projectTwo.submitted}
                                                        </section>
                                                        <br/>
                                                        <section id="judging-content-2-1" class="dashboard-column">
                                                            <form id="judging-panel-2" class="range-field">
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="interestOutput"> 5 </output> <br>
                                                                    <input onchange="interestOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="interestCrit"><br>
                                                                    <label for="interestCrit"> Interest </label> <br>
                                                                </section>
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="difficultyOutput"> 5 </output> <br>
                                                                    <input onchange="difficultyOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="difficultyCrit"> <br>
                                                                    <label for="difficultyCrit"> Difficulty </label> <br>
                                                                </section>
                                                                <section class="mark-banner">
                                                                    <output> Value: </output>
                                                                    <output id="impactOutput"> 5 </output> <br>
                                                                    <input onchange="impactOutput.value = value" type="range" min="1" max="5" value="5" class="slider" id="impactCrit"> <br>
                                                                    <label for="impactCrit"> Impact </label> <br>
                                                                </section>
                                                            </form>
                                                            <button id="judging-panel-2-button" class="btn yellow darken-2 z-depth-0"> JUDGE </button>
                                                        </section>
                                                        <br/>
                                                        <section id="judging-content-2-2" class="dashboard-column">

                                                            <iframe width="420" height="315" src="${window.projectTwoYoutubeURL}"> </iframe>
                                                            <section class="judge-info-banner">
                                                                <b> Description: </b> ${result.projectTwo.description}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Category: </b> ${result.projectTwo.category}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Special Prize #1: </b> ${result.projectTwo.specialPrize1}
                                                            </section>
                                                            <section class="judge-info-banner">
                                                                <b> Special Prize #2: </b> ${result.projectTwo.specialPrize2}
                                                            </section>

                                                        </section>
                                                    </section>        
                                                `
                                                document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                                document.getElementById('judging-panel-1-button').addEventListener('click', e => {
                                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
                                                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Authorization", BEARER_HEADER);
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({
                                                        "difficulty": parseInt(document.getElementById('judging-panel-1')['difficultyCrit'].value),
                                                        "impact": parseInt(document.getElementById('judging-panel-1')['impactCrit'].value),
                                                        "interest": parseInt(document.getElementById('judging-panel-1')['interestCrit'].value)
                                                    });
                                                    
                                                    var requestOptions = {
                                                        method: 'POST',
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: 'follow'
                                                    };
                                                    
                                                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/judgeProjectOne", requestOptions)
                                                        .then(response => response.text())
                                                        .then(result => {
                                                            document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                                            window.location.reload();
                                                        })
                                                        .catch(error => console.log('error', error));
                                                });

                                                document.getElementById('judging-panel-2-button').addEventListener('click', e => {
                                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'block');
                                                    const BEARER_HEADER = 'Bearer ' + localStorage.getItem('UserToken');
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Authorization", BEARER_HEADER);
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({
                                                        "difficulty": parseInt(document.getElementById('judging-panel-2')['difficultyCrit'].value),
                                                        "impact": parseInt(document.getElementById('judging-panel-2')['impactCrit'].value),
                                                        "interest": parseInt(document.getElementById('judging-panel-2')['interestCrit'].value)
                                                    });
                                                    
                                                    var requestOptions = {
                                                        method: 'POST',
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: 'follow'
                                                    };
                                                    
                                                    fetch("https://us-central1-stemcomp-2020-live.cloudfunctions.net/api/judgeProjectTwo", requestOptions)
                                                        .then(response => response.text())
                                                        .then(result => {
                                                            document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                                            window.location.reload();
                                                        })
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
                                    document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                    document.getElementById('judging-panel-content').innerHTML = `
                                        <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Judging Panel:</h5>
                                        <section class="full-banner"> 
                                            Sorry, you cannot judge other projects if you had not submitted your own.
                                        </section>
                                    `
                                    document.getElementById('project-submission-content').innerHTML = `
                                        <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Project Submission:</h5>
                                        <section class="full-banner"> 
                                            Sorry, you have passed the submission deadline, you will not be able to submit your project.
                                        </section>
                                    `
                                }
                            } else if (result.timePeriod === "Needs to launch") {
                                window.location.href = './index.html'
                            } else if (result.timePeriod === "Over") {
                                document.querySelectorAll('.loading').forEach(item => item.style.display = 'none');
                                document.getElementById('judging-panel-content').innerHTML = `
                                    <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                                `
                                document.getElementById('project-submission-content').innerHTML = `
                                    <h5 class="col-12 login-heading" id="project-submission" style="height: auto; text-align: center;">Current Status:</h5>
                                    <section class="full-banner"> 
                                        Hey there! Professional Judging is currently undergoing, so check your e-mails in the next few weeks!
                                    </section>
                                `
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