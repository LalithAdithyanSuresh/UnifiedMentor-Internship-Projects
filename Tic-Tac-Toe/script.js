
let grid = [[0,0,0],[0,0,0],[0,0,0]];
let player = 'O';
play = true;

function WinConditionCheck(){
    for(i=0;i<3;i++){
        f=1;
        for(j=0;j<3;j++){
            if(grid[i][j] != player){
                f=0;
            }
        }
        if(f==1){
            play = false;
            document.getElementById('MainText').innerHTML="WINNER : ";
            for(a=0;a<3;a++){
                document.getElementById("Square"+(3*i + a+1)).classList.add('win');
                document.getElementById("RestartBtn").classList.add('RestartBtnAnim');
            }
        }
    }
    for(i=0;i<3;i++){
        f=1;
        for(j=0;j<3;j++){
            if(grid[j][i] != player){
                f=0;
            }
        }
        if(f==1){
            play = false;
            document.getElementById('MainText').innerHTML="WINNER : ";
            for(a=0;a<3;a++){
                document.getElementById("Square"+(i+1 + a*3)).classList.add('win');
                document.getElementById("RestartBtn").classList.add('RestartBtnAnim');
            }
        }
    }
    f=1;
    for(i=0;i<3;i++){
        if(grid[i][i] != player){
            f=0;
        }
    }
    if(f==1){
        play = false;
        document.getElementById('MainText').innerHTML="WINNER : ";
        for(a=0;a<3;a++){
            document.getElementById("Square"+(1 + 4*a)).classList.add('win');
            document.getElementById("RestartBtn").classList.add('RestartBtnAnim');
        }
    }
    f=1;
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            if(i+j ==2){
                if(grid[j][i] != player){
                    f=0;
                }
            }
        }
    }
    if(f==1){
        play = false;
        document.getElementById('MainText').innerHTML="WINNER : ";
        for(a=0;a<3;a++){
            document.getElementById("Square"+(3 + a*2)).classList.add('win');
            document.getElementById("RestartBtn").classList.add('RestartBtnAnim');
        }
    }
    
}

function ChangePlayer(){
    if(player == "X"){
        player = "O";
        Elem = document.createElement("div");
        Elem.classList.add(player);
        document.getElementById("CP").innerHTML="";
        document.getElementById("CP").appendChild(Elem);
    }else{
        player = "X";
        Elem = document.createElement("div");
        Elem.classList.add(player);
        document.getElementById("CP").innerHTML="";
        document.getElementById("CP").appendChild(Elem);
    }
}

function SquareClick(id){
    if(grid[Math.floor((id-1)/3)][(id-1)%3] == 0 && play==true){
        Elem = document.createElement("div");
        Elem.classList.add(player);
        document.getElementById("Square"+id).appendChild(Elem);
        grid[Math.floor((id-1)/3)][(id-1)%3]= player;
        WinConditionCheck();
        if(play==true){
            ChangePlayer();
        }
    }
}


ChangePlayer();