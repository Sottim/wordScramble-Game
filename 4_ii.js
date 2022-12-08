const TextWord = document.querySelector(".word");
const Hint = document.querySelector(".hint span");
timeText = document.querySelector(".time b");
totalScore = document.querySelector(".container h4");
inputField = document.querySelector("input");
refreshBtn = document.querySelector(".refresh-word");
checkBtn = document.querySelector(".check-word");

let correctWord, userInput, timer;
let myscore = 0;

const time = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            timeText.innerText = maxTime;
            if(maxTime < 10){
                timeText.style.color = "red"; 
            }
        }
        else {
            clearInterval(timer);
            alert(`Time Over! ${correctWord.toUpperCase()} was the correct word.`);
            clearInterval(timer);
            initGame(); // calling this function to restart the game
        }
    }, 1000);
}


const initGame = () => { //getting random object from the array words in the other js file
    time(30);
    let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random object from words
    let wordArray = randomObj.word.split(""); // split each words
    
    for(let i = 0; i<wordArray.length; i++ ){
        let j = Math.floor(Math.random() * (i+1));
        //shuffling and swiping wordArray letters 
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }
    //putting wordArray in Text
    TextWord.innerHTML = wordArray.join();
    Hint.innerHTML = randomObj.hint;
    correctWord = randomObj.word.toLowerCase(); // setting the randomly generated word to correct word
    inputField.value = ""; //making input field empty
    inputField.setAttribute("maxlength", correctWord.length); //setting the input maxlength attr value to word length
}
initGame(); // calling this function

const checkWord = () => {
    userInput = inputField.value.toLowerCase();
    //console.log(userInput);
    if(!userInput) alert(`Please enter the word.`);

    else if(userInput !== correctWord)
        return alert(`Sorry, ${userInput} is not a correct word.`);

    else {
        alert(`Congrats, ${userInput.toUpperCase()} is a correct word.`);
        myscore++;
        totalScore.innerHTML = `Score = ${myscore}`;
        inputField.value = ""; 
        time(30);
        initGame();
    }
    
    }

//putting event listerner in refreshButtton
refreshBtn.addEventListener('click',initGame);
checkBtn.addEventListener('click', checkWord);
