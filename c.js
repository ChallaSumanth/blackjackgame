let blackjackgame={
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#Dealer-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];
const hitsound=new Audio('swish.m4a');
const winsound=new Audio('cash.mp3');
const losssound=new Audio('aww.mp3');
document.querySelector("#blackjack-hit-button").addEventListener('click',bl);
document.querySelector("#blackjack-stand-button").addEventListener('click',dealerlogic);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackdeal);
function bl(){
    if(blackjackgame['isstand']==false){
    let card=randomcard();
    showcard(card,YOU);
    updatescore(card,YOU);
    showscore(YOU);

}
}
function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}
function showcard(card, activeplayer){
    if(activeplayer['score']<=21){
    let cardimage=document.createElement('img');
    cardimage.src=`${card}.png`;
    document.querySelector(activeplayer['div']).appendChild(cardimage);
    hitsound.play();
}
}
function blackjackdeal(){
    //showresult(computewinner());
    //or
    if(blackjackgame['turnsover']===true){
        blackjackgame['isstand']=false;
     let yourimages=document.querySelector("#your-box").querySelectorAll('img');
    let dealerimages=document.querySelector("#dealer-box").querySelectorAll('img');
   for(let i=0;i<yourimages.length;i++){
       yourimages[i].remove();
   }
   for(let i=0;i<dealerimages.length;i++){
    dealerimages[i].remove();
}
YOU['score']=0;
DEALER['score']=0;
document.querySelector('#your-blackjack-result').textContent=0;
document.querySelector('#Dealer-result').textContent=0;

document.querySelector('#your-blackjack-result').style.color='#ffffff'
document.querySelector('#Dealer-result').style.color='#ffffff'

document.querySelector("#blackjack-result").textContent="let's play again";
document.querySelector('#blackjack-result').style.color='#0000ff'

blackjackgame['turnsover']=true;
    }
}
function updatescore(card,activeplayer){
    if(card==='A'){
     // if adding 11 keps below 21 add, else add 1
     if(activeplayer['score']+blackjackgame['cardsmap'][card][1]<=21){
        activeplayer['score']+=blackjackgame['cardsmap'][card][1];
     }
     else{
         activeplayer['score']+=blackjackgame['cardsmap'][card][0];
     }
    }
    else{
        activeplayer['score']+=blackjackgame['cardsmap'][card];
    }
     
}
function showscore(activeplayer){
   if(activeplayer['score']>21){
       document.querySelector(activeplayer['scorespan']).textContent='BUST!';
       document.querySelector(activeplayer['scorespan']).style.color='red';
   }
   else{
document.querySelector(activeplayer['scorespan']).textContent=activeplayer['score'];
   }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerlogic(){
    blackjackgame['isstand']=true;
    while(DEALER['score']<16 && blackjackgame['isstand']===true){
    let card=randomcard();
    showcard(card,DEALER);
    updatescore(card,DEALER);
    showscore(DEALER);
    await sleep(1000);
    }
       blackjackgame['turnsover']=true;
       let winner=computewinner();
       showresult(winner);
   }
    

// compute winner and return who just won
// updates results table
function computewinner()
{
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            blackjackgame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score'] || (YOU['score']>21)){
            blackjackgame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score'])
        {
            blackjackgame['draws']++;
        }
        // condition:when user bust but dealer dosen't
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
           blackjackgame['losses']++;
            winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        blackjackgame['draws']++;
    }
    console.log('winner is ',winner);
    console.log(blackjackgame);
    return winner;
}
function showresult(winner){
    if(blackjackgame['turnsover']===true){
    let message,messagecolor;
    if(winner===YOU){
        document.querySelector("#wins").textContent=blackjackgame['wins'];
        message='You won!';
        messagecolor='green';
        winsound.play();
    }
    else if(winner===DEALER){
        document.querySelector("#losses").textContent=blackjackgame['losses'];
        message='You lost!';
        messagecolor='red';
        losssound.play();
    }
    else{
        document.querySelector("#draws").textContent=blackjackgame['draws'];
        message='You drew!';
        messagecolor='black';
    }
    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messagecolor;
} 
}