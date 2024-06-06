
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
            document.getElementById('CurrentPlayer').innerHTML=player + "won !";
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
            document.getElementById('CurrentPlayer').innerHTML=player + "won !";
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
ChangePlayer();

function SquareClick(id){
    if(grid[Math.floor((id-1)/3)][(id-1)%3] == 0 && play==true){
        Elem = document.createElement("div");
        Elem.classList.add(player);
        document.getElementById("Square"+id).appendChild(Elem);
        grid[Math.floor((id-1)/3)][(id-1)%3]= player;
        WinConditionCheck();
        ChangePlayer();
    }
}