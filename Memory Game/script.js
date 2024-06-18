SCREEN_WIDTH = window.innerWidth;
SCREEN_HEIGHT = window.innerHeight;
MAX_CARD = 12
CARD_WIDTH = 60;
CARD_COUNT = 6;
SCORE_1 = 0;
SCORE_2 = 0;
FLIP = true;
R_FLIP = false;
let CARD_STATE = [];
let CARD_VALUE = [];
if(SCREEN_WIDTH > 800){
    CARD_WIDTH = 150;
    MAX_CARD = 18;
}else if(SCREEN_WIDTH > 500){
    CARD_WIDTH = 150;
    MAX_CARD = 16;
}else if(SCREEN_WIDTH > 360){
    CARD_WIDTH = 80;
    MAX_CARD = 14;
}
function inc(){
    if(CARD_COUNT + 2 <=MAX_CARD){
        CARD_COUNT+=2;
        document.getElementById('count').innerHTML=CARD_COUNT;
        document.getElementById('dec').classList.remove('disabled');
        if(CARD_COUNT+2 > MAX_CARD){
            document.getElementById('inc').classList.add('disabled');
        }
    }
}
function dec(){
    if(CARD_COUNT - 2 >= 6){
        CARD_COUNT-=2;
        document.getElementById('inc').classList.remove('disabled');
        document.getElementById('count').innerHTML=CARD_COUNT;
        if(CARD_COUNT-2 <6){
            document.getElementById('dec').classList.add('disabled');
        }
    }
}
function Reset(){
    let sum = 0;
    for (let i = 0; i < CARD_STATE.length; i++) {
    sum += CARD_STATE[i];
    }
    if(sum >=2){
        FLIP = false;
        setTimeout(function(){
            for(i=0;i<CARD_STATE.length;i++){
                if(CARD_STATE[i] == 1){
                    R_FLIP = true;
                    cardFlip(i+1);
                }
            }
            FLIP = true;
        },2000)
    }
}
function cardFlip(id){
    if(FLIP == false && R_FLIP == false){
        return;
    }
    R_FLIP = false;
    Card = document.getElementById('Card'+id);
    Card.style.setProperty('transform','rotateY(90deg)');
    if(CARD_STATE[id-1] == 0){
        console.log(CARD_STATE);
        (function(Card,id){
            setTimeout(function(){
                Card.style.setProperty('background-color','var(--MainColor)');
                Card.style.setProperty('transform','rotateY(0deg) scale(1.1)');
                document.getElementById('Card_Back' + id).style.setProperty('display','none');
                document.getElementById('Card_Image' + id).style.setProperty('display','block');
                setTimeout(function(){
                    Card.style.setProperty('transform','rotateY(0deg) scale(1)');
                },100);
            },100);
        })(Card,id);
        CARD_STATE[id-1] = 1;
    }else{
        (function(Card,id){
            setTimeout(function(){
                Card.style.setProperty('transform','rotateY(0deg) scale(1.1)');
                document.getElementById('Card_Back' + id).style.setProperty('display','block');
                document.getElementById('Card_Image' + id).style.setProperty('display','none');

                setTimeout(function(){
                    Card.style.setProperty('transform','rotateY(0deg) scale(1)');
                },100);
            },100);
        })(Card,id);
        CARD_STATE[id-1] = 0;
    }
    Reset();
}
function play(){
    document.getElementById('Beg').classList.add('hidden');
    document.getElementById('GRID').classList.remove('hidden');
    document.getElementById('SCORE').classList.remove('hidden');
    document.documentElement.style.setProperty('--cardWidth', CARD_WIDTH + 'px');
    let initialArray = [];
    for (let i = 1; i <= CARD_COUNT/2; i++) {
        initialArray.push(i);
    }
    CARD_VALUE = initialArray.flatMap(num => [num, num]);
    for (let i = CARD_VALUE.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [CARD_VALUE[i], CARD_VALUE[j]] = [CARD_VALUE[j], CARD_VALUE[i]];
    }
    setTimeout(function(){
        for(i=0;i<CARD_COUNT;i++){
            CARD_STATE.push(0);
            (function(i) {
                let cardDiv = document.createElement('div');
                cardDiv.className = 'card reveal';
                cardDiv.id = 'Card' + (i + 1);
                cardDiv.setAttribute('onclick', 'cardFlip(' + (i + 1) + ')');
                let BackImg = document.createElement('img');
                BackImg .src = 'assets/CardBack.png';
                BackImg .id = 'Card_Back' + (i+1);
                cardDiv.appendChild(BackImg );
                let cardImg = document.createElement('img');
                cardImg.src = 'assets/images/' + CARD_VALUE[i] +'.png';
                cardImg.style.display = 'none';
                cardImg.id = 'Card_Image' + (i+1);
                cardImg.setAttribute('cardVal',CARD_VALUE[i]);
                cardDiv.appendChild(cardImg);
                setTimeout(function() {
                    document.getElementById('GRID').appendChild(cardDiv);
                }, i * 50);
            })(i);
        }
    },300);
    
}
