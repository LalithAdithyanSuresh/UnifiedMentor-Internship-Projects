SCREEN_WIDTH = window.innerWidth;
SCREEN_HEIGHT = window.innerHeight;
MAX_CARD = 12
CARD_WIDTH = 60;
CARD_COUNT = 6;
SCORE_1 = 0;
SCORE_2 = 0;
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
function cardFlip(id){
    Card = document.getElementById('Card'+id);
    Card.style.setProperty('transform','rotateY(90deg)');
    setTimeout(function(){
        Card.style.setProperty('background-color','var(--MainColor)');
        Card.style.setProperty('transform','rotateY(0deg) scale(1.1)');
        setTimeout(function(){
            Card.style.setProperty('transform','rotateY(0deg) scale(1)');
        },100);
    },100);
}
function play(){
    document.getElementById('Beg').classList.add('hidden');
    document.getElementById('GRID').classList.remove('hidden');
    document.getElementById('SCORE').classList.remove('hidden');
    document.documentElement.style.setProperty('--cardWidth', CARD_WIDTH + 'px');
    setTimeout(function(){
        for(i=0;i<CARD_COUNT;i++){
            (function(i) {
                let cardDiv = document.createElement('div');
                cardDiv.className = 'card reveal';
                cardDiv.id = 'Card' + (i + 1);
                cardDiv.setAttribute('onclick', 'cardFlip(' + (i + 1) + ')');
                let cardImg = document.createElement('img');
                cardImg.src = 'assets/CardBack.png';
                cardImg.id = 'Card'
                cardDiv.appendChild(cardImg);
                
                setTimeout(function() {
                    document.getElementById('GRID').appendChild(cardDiv);
                }, i * 50);
            })(i);
        }
    },300);

}
