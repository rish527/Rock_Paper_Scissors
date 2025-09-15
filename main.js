// Variable
const btnRules=document.querySelector(".rules-btn");
const btnClose=document.querySelector(".close-btn");
const moduleRules=document.querySelector(".module");

const CHOICES=[
    {
      name:"paper",
      beats:"rock"  
    },
    {
      name:"scissors",
      beats:"paper"  
    },
    {
      name:"rock",
      beats:"scissors"  
    },
]
const choiceButtons=document.querySelectorAll('.choice-btn')
const gameDiv=document.querySelector('.game')
const resultsDiv=document.querySelector('.results')
const resultDivs=document.querySelectorAll('.results-result')

const resultWinner=document.querySelector('.results-winner')
const resultText=document.querySelector('.result-text')

const score1=document.querySelector('.my_num')
const score2=document.querySelector('.ai_num')
const playAgainBtn=document.querySelector('.play-again')
let mys=0;
let ais=0;

//Game Logic

choiceButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const choiceName=button.dataset.choice;
        const choice=CHOICES.find(choice=>choice.name===choiceName)
        choose(choice)
    })
})
function aiChoose(){
    const rand=Math.floor(Math.random()*CHOICES.length)
    return CHOICES[rand];
}
function choose(choice){
    const aichoice=aiChoose();
    displayResults([choice,aichoice]);
    displayWinner([choice,aichoice]);
}

function displayResults(results){
    resultDivs.forEach((resultDiv,idx)=>{
        setTimeout(()=>{
            resultDiv.innerHTML=`
                <div class="choice ${results[idx].name}">
                    <img src="./images/icon-${results[idx].name}.svg" alt="${results[idx].name}"/>
                </div>
            `;
        },idx*1000);
    });

    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}
function displayWinner(results){
    setTimeout(()=>{
        const userWins=isWinner(results)
        const aiWins=isWinner(results.reverse())

        if(userWins){
            resultText.innerText="you win"
            // resultDivs[0].classList.toggle('winner')
            keepScore(1,mys,score1)
            mys=mys+1;
        }else if(aiWins){
            resultText.innerText="YOU lOSE"
            // resultDivs[1].classList.toggle('winner')
            keepScore(1,ais,score2)
            ais=ais+1;
        }else{
            resultText.innerText="draw"
        }
        resultWinner.classList.toggle('hidden')
        resultsDiv.classList.toggle('show-winner')
    },0);
}
function isWinner(results){
    return results[0].beats===results[1].name;
}
function keepScore(point,s,score){
    s+=point;
    score.innerText=s;
}

playAgainBtn.addEventListener("click",()=>{
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')
    resultDivs.forEach(resultDiv=>{
        resultDiv.innerHTML=""
        resultDiv.classList.remove('winner')
    })
    resultText.innerText="";
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle("show-winner");
})



// Rules
btnRules.addEventListener('click',()=>{
    moduleRules.classList.toggle("show-module");
});
btnClose.addEventListener('click',()=>{
    moduleRules.classList.toggle("show-module");
});
