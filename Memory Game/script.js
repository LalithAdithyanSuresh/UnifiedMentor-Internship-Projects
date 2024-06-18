SCREEN_WIDTH = window.innerWidth;
SCREEN_HEIGHT = window.innerHeight;
MAX_CARD = 12
CARD_WIDTH = 60;
CARD_COUNT = 6;
SCORE_1 = 0;
SCORE_2 = 0;
C_PLAYER = 1;
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
function SetPlayer(num){
    if(num==1){
        document.body.style.setProperty('background-color','rgb(249, 168, 168)');
        document.getElementById('score1').style.setProperty('border','2px solid gold');
        document.getElementById('score1').style.setProperty('transform','scale(1.3)');
        document.getElementById('score2').style.setProperty('transform','scale(1)');
        document.getElementById('score2').style.setProperty('border','none');

    }else{
        document.body.style.setProperty('background-color','rgb(200, 209, 247)');
        document.getElementById('score2').style.setProperty('border','2px solid gold');
        document.getElementById('score2').style.setProperty('transform','scale(1.3)');
        document.getElementById('score1').style.setProperty('transform','scale(1)');
        document.getElementById('score1').style.setProperty('border','none');

    }
}
function CheckWIN(){
    first = -1;
    cardIndex = -1;
    for(i=0;i<CARD_STATE.length;i++){
        if(CARD_STATE[i] == 1){
            if(first == -1){
                cardIndex = i;
                first = CARD_VALUE[i];
            }else{
                if(CARD_VALUE[i] == first){
                    console.log('WINNER');
                    document.getElementById('Card'+(i+1)).style.setProperty('background-color','gold');
                    document.getElementById('Card'+(cardIndex+1)).style.setProperty('background-color','gold');
                    if(C_PLAYER == 1){
                        SCORE_1 += 1;
                        document.getElementById('score1').innerHTML =  SCORE_1;
                    }else{
                        SCORE_2 += 1;
                        document.getElementById('score2').innerHTML =  SCORE_2;
                    }
                    return 1;
                }
                else{
                    return 0;
                }
            }
        }
    }
}
function Reset(){
    let sum = 0;
    for (let i = 0; i < CARD_STATE.length; i++) {
    sum += CARD_STATE[i];
    }
    if(sum >=2){
        opt = CheckWIN();
        FLIP = false;
        setTimeout(function(){
            for(i=0;i<CARD_STATE.length;i++){
                (function(i){
                    if(CARD_STATE[i] == 1){
                        R_FLIP = true;
                        if(opt == 1){
                            CARD_STATE[i] =0;
                            console.log('REMOVING CARDS');
                            document.getElementById('Card'+(i+1)).onclick = 'pass';
                            document.getElementById('Card'+(i+1)).classList.remove('reveal');
                            setTimeout(function(){
                                document.getElementById('Card'+(i+1)).style.setProperty('opacity','0.5');
                            },50);
                        }else{
                            cardFlip(i+1);
                        }
                    }
                })(i);
            }
            FLIP = true;
            if(C_PLAYER ==1){
                C_PLAYER = 2;
            }else{
                C_PLAYER = 1;
            }
            console.log(C_PLAYER);
            SetPlayer(C_PLAYER);
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
                BackImg.src = 'assets/CardBack.png';
                BackImg.classList.add('cardBACK');
                BackImg.id = 'Card_Back' + (i+1);
                cardDiv.appendChild(BackImg );
                let cardImg = document.createElement('img');
                cardImg.src = 'assets/images/' + CARD_VALUE[i] +'.png';
                cardImg.style.display = 'none';
                cardImg.id = 'Card_Image' + (i+1);
                cardImg.classList.add('cardIMAGE');
                cardImg.setAttribute('cardVal',CARD_VALUE[i]);
                cardDiv.appendChild(cardImg);
                setTimeout(function() {
                    document.getElementById('GRID').appendChild(cardDiv);
                }, i * 50);
            })(i);
        }
    },300);
    SetPlayer(1);
}
