const introText = document.getElementById("intro-text");
const instructions = document.getElementById("instructions");
const judging = document.getElementById("judging");
const criteria = document.getElementsByClassName("criteria");
const firstText = document.getElementById("first-text");
const firstVal = document.getElementById("first-val");
const secondText = document.getElementById("second-text");
const secondVal = document.getElementById("second-val");
const thirdText = document.getElementById("third-text");
const thirdVal = document.getElementById("third-val");
const sixtyTop = document.getElementsByClassName("sixty-top");
const sixtyBot = document.getElementsByClassName("sixty-bot");
const fifteenBot = document.getElementsByClassName("fifteen-bot");
const sevenBot = document.getElementsByClassName("seven-bot");
const twentyTop = document.getElementsByClassName("twenty-top");
const epp = document.getElementById("epp");
const grant = document.getElementById("grant");
const prizetext = document.getElementById("prizetext");
const title = document.getElementById("title");
const logo = document.getElementById("logo");
const thirteenLeft = document.getElementsByClassName("thirteen-left");
const icons = document.getElementsByClassName("fa-2x");
const contactText = document.getElementById("contact-text");
const bigLogo = document.getElementsByClassName("sponsor-logo-l");
const airboss = document.getElementById("airboss");
const ig = document.getElementById("ig");
const fb = document.getElementById("fb");
const mail = document.getElementById("mail");
const subText = document.getElementById("sub-text");
const titleBtn = document.getElementById("title-btn");
const logopic = document.getElementById("logopic");
const navigationBar = document.getElementById("navigation-bar");
const aboutBtn = document.getElementById("about-btn");
const detailsBtn = document.getElementById("deets-btn");
const prizesBtn = document.getElementById("prizes-btn");
const sponsorsBtn = document.getElementById("sponsors-btn");
const contactBtn = document.getElementById("contact-btn");
const regBtn = document.getElementById("reg-btn");
const logBtn = document.getElementById("log-btn");


// accomodate margins and sizes for narrow (mobile, tablet, split screen, etc) displays 
function styleChange(display) {

    if(display.matches) {
        introText.classList.remove("col-3");
        introText.classList.add("col-5");
        instructions.classList.remove("col-6");
        instructions.classList.add("col-12");
        judging.classList.remove("col");
        judging.classList.remove("col-12");
        judging.style.marginLeft = "11vmin";
        for(let i=0; i<criteria.length; i++){
            criteria[i].style.textAlign = "right";
        }
        firstText.style.fontSize = "1.5vmax";
        secondText.style.fontSize = "1.5vmax";
        thirdText.style.fontSize = "1.5vmax";
        firstVal.style.fontSize = "7vmax";
        secondVal.style.fontSize = "5vmax";
        thirdVal.style.fontSize = "5vmax";
        for(let i=0; i<sixtyTop.length; i++){
            sixtyTop[i].style.marginTop ="40vmin";
        }
        for(let i=0; i<sixtyBot.length; i++){
            sixtyBot[i].style.marginBottom ="40vmin";
        }
        for(let i=0; i<fifteenBot.length; i++){
            fifteenBot[i].style.marginBottom ="7vh";
        }
        for(let i=0; i<sevenBot.length; i++){
            sevenBot[i].style.marginBottom ="4vh";
        }
        for(let i=0; i<twentyTop.length; i++){
            twentyTop[i].style.marginTop ="15vh";
        }
        grant.classList.remove("col-6");
        grant.classList.add("col-12");
        epp.classList.remove("col-6");
        epp.classList.add("col-12");
        prizetext.classList.remove("col-12");
        prizetext.classList.add("col-10");
        logo.style.marginRight = "2vmax";
        for(let i=0; i<thirteenLeft.length; i++){
            thirteenLeft[i].style.marginLeft = "7vmin";
        }
        for(let i=0; i<bigLogo.length; i++){
            bigLogo[i].style.height = "30vw";
        }
        airboss.style.height = "40vw";
        epp.style.marginTop = "7vh";
        mail.classList.remove("col-11");
        mail.classList.add("col-10");
        fb.classList.remove("col-11");
        fb.classList.add("col-10");
        ig.classList.remove("col-11");
        ig.classList.add("col-10");
        title.style.height = "90vh";
        aboutBtn.style.fontSize = "1.2vmax";
        detailsBtn.style.fontSize = "1.2vmax";
        prizesBtn.style.fontSize = "1.2vmax";
        sponsorsBtn.style.fontSize = "1.2vmax";
        contactBtn.style.fontSize = "1.2vmax";
        regBtn.style.fontSize = "1.2vmax";
        logBtn.style.fontSize = "1.2vmax";
    }

    else {
        title.style.height = "120vh";
        introText.classList.remove("col-5");
        introText.classList.add("col-3");
        instructions.classList.remove("col-12");
        instructions.classList.add("col-6");
        judging.classList.remove("col-12");
        judging.classList.add("col");
        judging.style.marginLeft = "0vmin";
        for(let i=0; i<criteria.length; i++){
            criteria[i].style.textAlign = "left";
        }
        firstText.style.fontSize = "3vmax";
        secondText.style.fontSize = "2vmax";
        thirdText.style.fontSize = "1.5vmax";    
        firstVal.style.fontSize = "13vmax";
        secondVal.style.fontSize = "9vmax";
        thirdVal.style.fontSize = "7vmax";
        for(let i=0; i<sixtyTop.length; i++){
            sixtyTop[i].style.marginTop ="60vmin";
        }
        for(let i=0; i<sixtyBot.length; i++){
            sixtyBot[i].style.marginBottom ="60vmin";
        }
        for(let i=0; i<fifteenBot.length; i++){
            fifteenBot[i].style.marginBottom ="15vh";
        }
        for(let i=0; i<sevenBot.length; i++){
            sevenBot[i].style.marginBottom ="7vh";
        }
        for(let i=0; i<twentyTop.length; i++){
            twentyTop[i].style.marginTop ="20vh";
        }
        grant.classList.remove("col-12");
        grant.classList.add("col-6");
        epp.classList.remove("col-12");
        epp.classList.add("col-6");
        prizetext.classList.remove("col-10");
        prizetext.classList.add("col-12");
        logo.style.marginRight = "2vmin";
        for(let i=0; i<thirteenLeft.length; i++){
            thirteenLeft[i].style.marginLeft = "13vmin";
        }
        for(let i=0; i<bigLogo.length; i++){
            bigLogo[i].style.height = "15vw";
        }
        airboss.style.height = "20vw";
        epp.style.marginTop = "15vh";
        mail.classList.remove("col-10");
        mail.classList.add("col-11");
        fb.classList.remove("col-10");
        fb.classList.add("col-11");
        ig.classList.remove("col-10");
        ig.classList.add("col-11");
        aboutBtn.style.fontSize = "1vmax";
        detailsBtn.style.fontSize = "1vmax";
        prizesBtn.style.fontSize = "1vmax";
        sponsorsBtn.style.fontSize = "1vmax";
        contactBtn.style.fontSize = "1vmax";
        regBtn.style.fontSize = "1vmax";
        logBtn.style.fontSize = "1vmax";
    }
}

// these functions extend the previous ones in series for increasingly narrow displays

function titleChange1(display) {

    if(display.matches){
        logo.style.marginRight = "4vmax";
        for(let i=0; i<thirteenLeft.length; i++){
            thirteenLeft[i].style.marginLeft = "7vmin";
        }
        for(let i=0; i<icons.length; i++){
            icons[i].classList.remove("fa-2x");
        }
        title.style.height = "85vh";
    }
    else {
        for(let i=0; i<icons.length; i++){
            icons[i].classList.add("fa-2x");
        }
    }
}

function titleChange2(display) {

    if(display.matches){
        logo.style.marginRight = "5vmax";
        for(let i=0; i<thirteenLeft.length; i++){
            thirteenLeft[i].style.marginLeft = "5vmin";
        }
        for(let i=0; i<icons.length; i++){
            icons[i].classList.remove("fa-2x");
        }
        contactText.style.paddingLeft = "20vw";
        introText.classList.remove("col-5");
        introText.classList.add("col-7");
        subText.classList.remove("col-7");
        subText.classList.add("col-9");
        titleBtn.classList.remove("col-4");
        titleBtn.classList.add("col-8");
    }
    else {
        for(let i=0; i<thirteenLeft.length; i++){
            thirteenLeft[i].style.marginLeft = "7vmin";
        }
        for(let i=0; i<icons.length; i++){
            icons[i].classList.add("fa-2x");
        }
        contactText.style.paddingLeft = "40vw";
        introText.classList.remove("col-7");
        introText.classList.add("col-5");
        subText.classList.remove("col-9");
        subText.classList.add("col-7");
        titleBtn.classList.remove("col-8");
        titleBtn.classList.add("col-4");
    }
}

function titleChange3(display) {

    if(display.matches) {
        logopic.style.marginRight = "5vmin";
        logo.style.marginRight = "12vmin";
        aboutBtn.style.fontSize = "2vmax";
        detailsBtn.style.fontSize = "2vmax";
        prizesBtn.style.fontSize = "2vmax";
        sponsorsBtn.style.fontSize = "2vmax";
        contactBtn.style.fontSize = "2vmax";
        regBtn.style.fontSize = "2vmax";
        logBtn.style.fontSize = "2vmax";
    }
    else {
        aboutBtn.style.fontSize = "1vmax";
        detailsBtn.style.fontSize = "1vmax";
        prizesBtn.style.fontSize = "1vmax";
        sponsorsBtn.style.fontSize = "1vmax";
        contactBtn.style.fontSize = "1vmax";
        regBtn.style.fontSize = "1vmax";
        logBtn.style.fontSize = "1vmax";  
    }
}

// function that gets called at the beginning to set up features based on initial view
function firstDisplay(display) {

    // check if display is narrower than desktop first
    if(display.matches) {
        // call functions from largest to smallest display so mobile has priority on first page load
        styleChange(smallView);
        titleChange1(smallerView);
        titleChange2(mobileView);
        titleChange3(evenSmallerMobile);
    }
}

const smallView = window.matchMedia("(min-height: 65vw)");
const smallerView = window.matchMedia("(min-height: 110vw)");
const mobileView = window.matchMedia("(min-height: 120vw)");
const evenSmallerMobile = window.matchMedia("(min-height: 140vw)");

evenSmallerMobile.addListener(titleChange3);
smallerView.addListener(titleChange1);
mobileView.addListener(titleChange2);
smallView.addListener(styleChange);

// first display
firstDisplay(smallView);


