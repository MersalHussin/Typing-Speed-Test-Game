// Get Selectors

let startButton = document.querySelector(".start")
let errorLvl = document.querySelector(".error-lvl")
let theWord = document.querySelector(".the-word")
let levelSpan = document.querySelector(".message .lvl")
let seconds = document.querySelector(".message .seconds")
let input = document.querySelector("input")
let upComingWordContainer = document.querySelector(".upcoming-word")
let upComingWord = document.querySelector(".upcoming-word .up-word")
let control = document.querySelector(".control")
let timeLeftSpan = document.querySelector(".control .time span")
let score = document.querySelector(".control .score")
let scoreGot = document.querySelector(".control .score .got")
let scoreTotal = document.querySelector(".control .score .total")
let finish = document.querySelector(".finish span")
// settings of levels
let inputRadios = document.querySelectorAll(".container-of-control input");
let arrOfInputs = Array.from(inputRadios);

//array of words

const words = [
    "DOM",
    "AJAX",
    "HTTP",
    "URL",
    "API",
    "Front-end",
    "Back-end",
    "Server",
    "Client",
    "Browser",
    "Responsive",
    "CMS",
    "MVC",
    "Framework",
    "Single Page",
    "JSON",
    "XML",
    "Git",
    "Repository",
    "CSS ",
    "Build Tools",
    "NPM",
    "Responsive",
    "React",
    "Node.js",
    ];

let orginalWordsLength = words.length


const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 2,
};

let defultLevelName;
let defultLevelSeconds;
let defultLevelFristSeconds;

// settings on loacal storage
let savedLevel = localStorage.getItem("selectedLevel")
    defultLevelName = savedLevel;
    defultLevelSeconds = lvls[defultLevelName];
    defultLevelFristSeconds = lvls[defultLevelName] + 3;
    levelSpan.innerHTML = defultLevelName
    seconds.innerHTML = defultLevelSeconds;
    timeLeftSpan.innerHTML = defultLevelSeconds;
    scoreTotal.innerHTML = words.length;
    let inputCheckedFromLocal = arrOfInputs.find((input)=> input.id === savedLevel)


// when click on lvls
arrOfInputs.forEach((ele) => {
  ele.addEventListener("click", () => {
    ele.setAttribute("checked", "");
    // error message display none
    errorLvl.style.display = "none"
    arrOfInputs.forEach((input) => {
        //Check if input !== element who i clicked
        if (input != ele) {
            input.removeAttribute("checked");
        }
    });
    
    // set defult values || i Checked
    defultLevelName = ele.id;
    defultLevelSeconds = lvls[defultLevelName];
    defultLevelFristSeconds = lvls[defultLevelName] + 3;
    
    // Setting Level Name + Second + Score
    levelSpan.innerHTML = defultLevelName;
    seconds.innerHTML = defultLevelSeconds;
    timeLeftSpan.innerHTML = defultLevelSeconds;
    scoreTotal.innerHTML = words.length;
    
    // Save At Local Storage
    localStorage.setItem("selectedLevel", defultLevelName);
});
});




//Disable Paste Event 

input.onpaste = function(){
    return false    
}

startButton.onclick = function(){
    //Generate Word Function
    let checkeInput = arrOfInputs.find((ele)=> ele.hasAttribute("checked"))
    if(checkeInput){
        input.focus();
        this.remove();
        genWords();
        errorLvl.style.display = "none"
    }else{
        errorLvl.style.display = "flex"
    }
    
    inputCheckedFromLocal.setAttribute("checked","")
}


function genWords(){
    // create Random word
    let randomWord =words[Math.floor(Math.random()*words.length)]
    //index of random words
    let indexOfRandomWord = words.indexOf(randomWord)
    //remove the word from words array
    words.splice(indexOfRandomWord , 1)
    // empty up-coming word
    upComingWordContainer.innerHTML = ""
    //add randoam word on the word
    theWord.innerHTML = randomWord

    //for loop on up-coming words
    for(i=0; i<words.length; i++){
        let word = words[i]
        let span = document.createElement("span")
        let spanTxt = document.createTextNode(word)

        span.appendChild(spanTxt)
        upComingWordContainer.appendChild(span).classList.add("up-word")
    }
    //Call Start Play Func
    startPlay();
}

function startPlay(){
    // Check if oraginalWordsLength - 1(27) = words.length (27)=> after splice
    if(orginalWordsLength - 1 == words.length){
        timeLeftSpan.innerHTML = defultLevelFristSeconds
    }else{
        timeLeftSpan.innerHTML = defultLevelSeconds
    }
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0"){
        // stop Time
            clearInterval(start)
        
            if(theWord.innerHTML.trim().toLowerCase() === input.value.trim().toLowerCase()){
                input.value = ""
                scoreGot.innerHTML++;
                if(words.length > 0){
                    genWords()
                }
                else{
                    finish.innerHTML = "Congratiolations"
                    finish.classList.add("good")
                }
            }else{
                finish.innerHTML = "Game Over"
                finish.classList.add("bad")
                input.style.pointerEvents = "none"
            }
        }
    }, 1000);
}