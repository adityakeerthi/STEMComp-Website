


// accomodate margins and sizes for narrow (mobile, tablet, split screen, etc) displays 
// there needs to be a new, thinner one SPECIFICALLY FOR TITLE BLOCK

function styleChange(query) {

    const introText = document.getElementById("intro-text");
    const logo = document.getElementById("logo");
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


    if(query.matches) {
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
    }
    else {
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
    }
}

const smallView = window.matchMedia("(min-height: 65vw)");

smallView.addListener(styleChange);
styleChange(smallView);


// making nav bar buttons scroll

function scroll(id) {
    document.getElementById(id).scrollIntoView();
}

