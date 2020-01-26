var canvas = document.getElementById("myCanvas");
var ctx= canvas.getContext("2d");

var scorePlayer1 = [];              // tableaux stockant le score des joueurs
var scorePlayer2 = [];
var scorep1 = document.getElementById("scorep1");
var scorep2 = document.getElementById("scorep2");

const LINE = 11;      // number of lines
const COLUMN = 15;    // number of columns
const SQUARE_LENGTH = 50 ; // size of one square of the board
const UP_ONE = 38;  DOWN_ONE= 40; LEFT_ONE = 37; RIGHT_ONE = 39; // directions keys for player One (arrows)
const UP_TWO = 90; DOWN_TWO = 83; LEFT_TWO = 81; RIGHT_TWO = 68; // directions keys for playerTwo (zqsd)
const KEY_P1_BOMB = 101;        // key to drop the bomb for player ONe (5)
const KEY_P2_BOMB= 32;          // key to drop the bomb for player  Two (espace)  
const DELAY = 13; 
const WIDTH = COLUMN*SQUARE_LENGTH;  // size of the board
const HEIGHT = LINE*SQUARE_LENGTH; // height of the board
var playerOneX = 0;             // starter position X of player one
var playerOneY = 0;             // starter position Y of player one
var playerTwoX = WIDTH - SQUARE_LENGTH;     // starter position X of player two
var playerTwoY = HEIGHT  - SQUARE_LENGTH;       // starter position Y of player two
var arrayBoard =[];
var widthChar = 50; //  size of the player ( adapt from the sprite)
var heightChar = 50; // height of the player ( adapt from the sprite(function DrawImage))
 
var numberBomb = [];    // array where all bombs dropped go in and leave at the end at the timerBomb
var clock = 180;
var startDecrease = 0;
var triforce = "triforce";
var bonusRandom = [14,15,"M","C"];
let bonusRate =0.35; 

let up = 1, down = 2, left = 3, right = 4, speed = 10;
let endGameCheck = true;
let niddleSecond = document.querySelector(".seconds");
var varLoadGame= false;
var varHowto = false;
var varEndGame= false;

let player2WinsImg = new Image; 
player2WinsImg.src = "view/frontend/Bomberman/img2/P2Win.png";
let player1WinsImg = new Image; 
player1WinsImg.src = "view/frontend/Bomberman/img2/P1WIN.png";
let tieGame = new Image;
tieGame.src= "view/frontend/Bomberman/img2/DRAW.png"

canvas.width= WIDTH;
canvas.height= HEIGHT;


var menuMusic = document.getElementById("menuMusic");
var deleteDiv = document.getElementById("delete")
var walkSound = document.getElementById("Walk")
var playerBonus1 = document.getElementById("star1")
var playerBonus2 = document.getElementById("star2")
var starSound = document.getElementById("star")
var bombExplode = document.getElementById("bombSound");
var SD= document.getElementById("SD");

let imgTriforce= document.createElement("img"); 
imgTriforce.id= "imgTRIFORCE";
imgTriforce.src = "view/frontend/Bomberman/img2/triforce1.png";
let drawholl = false;


function drawClock(){
    niddleSecond.style.transform= 'rotateZ('+ (clock*2) +'deg)';
}

function decreaseClock(){
    startDecrease++;
    if(startDecrease== 72){
        clock--;
    }
    if(startDecrease == 75){
        startDecrease = 0;
    }
}

function loadGame() { 
    let checkSuddenDeath= false;

    deleteDiv.innerHTML = "";
    menuMusic.pause();
    menuMusic.currentTime = 0;
    var gameMusic = document.getElementById("gameMusic");
    gameMusic.volume = 0.05;
    gameMusic.loop= true;
    gameMusic.play();

    canvas.removeEventListener("click",loadGame)
    class Player{           
        constructor(x,y,icon,keyright,keyleft,keydown,keyup,sx,sy,keyBomb){
        this.x = x;
        this.y = y;
        this.icon= icon;
        this.keyright = keyright; this.keyleft = keyleft; this.keydown = keydown; this.keyup = keyup; 
        this.sx = sx;
        this.sy = sy;
        this.keyBomb= keyBomb;
        this.bombRadius = 1;            
        this.nbBomb =1;                
        this.timerBomb = 0;            
        this.alive = true; 
        this.skull = false;
        this.skullTimer=0;
        this.bonusLife= false;
        this.bonusLifeTimer=0;
        this.frame = 0; //  S
        this.repeat = 0;
        this.movement = false;
        this.nextDirection = 0;
        };
        draw(){       // draw the player 
            var bonusPicked = document.getElementById("bonusPicked");   
            if (this.repeat < 6 && this.movement) { //  S
                ctx.drawImage(this.icon,this.sx,this.sy,widthChar,heightChar,this.x,this.y,50,50);
                this.frame++;
                if (this.frame == 1) {
                    this.sx = 50;
                }
                if (this.frame == 2 ) { // if the player has been arrived to the place exact of array, we set
                    this.sx = 0;
                    this.frame = 0;
                    this.repeat++;
                    if (this.repeat == 6) {
                        this.repeat = 0;
                        this.movement = false;
                        if([14,15,"C"].includes(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH])){
                            bonusPicked.volume=0.2;
                            bonusPicked.play(); 
                            if(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==14) {
                                arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH] = 0;
                                this.nbBomb ++
                            }
                            else if(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==15){
                                arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH] = 0;
                                this.bombRadius ++
                                console.log(this.bombRadius)
                            }
                            else if(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=="C") {
                                arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH] = 0;
                                this.bonusLife= true;
                            }
                        }
                        else if(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=="M") {
                            arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH] = 0;
                            this.skull=true; 
                        }
                        endGameCheck = true;
                    } else {
                        endGameCheck = false;
                        if (this.nextDirection == up) {
                            walkSound.volume=0.2;
                            walkSound.play();
                            this.y -= speed
                        }
                        else if (this.nextDirection  == down) {
                            this.y += speed
                            walkSound.volume=0.2;
                            walkSound.play();
                        }
                        else if (this.nextDirection  == left) {
                            this.x -= speed
                            walkSound.volume=0.2;
                            walkSound.play();
                        }
                        else if (this.nextDirection  == right) {
                            this.x += speed
                            walkSound.volume=0.2;
                            walkSound.play();
                        };
                        
                    }
                }
            } else {
                ctx.drawImage(this.icon,this.sx,this.sy,widthChar,heightChar,this.x,this.y,50,50);
            } 
           
        }  
        skullCooldown(){
            if (this.skull==true){
                this.skullTimer++
                this.sy = 200;                                                
                this.sx = -2;   
                var Malus= document.getElementById("Malus");
                Malus.volume=0.4;
                Malus.play();
                if (this.skullTimer >300){
                    this.sX = -2; 
                    this.sY = 0; 
                    this.skullTimer = 0; 
                    this.skull = false;
                }
            }            
        }
        bonusLifeRemove(playericon) {
            if(this.bonusLife== true){
                starSound.volume = 0.2;
                starSound.play();
                this.bonusLifeTimer++
                this.icon = playerBonus1
                if (this.bonusLifeTimer > 80) {
                    this.icon = playerBonus2
                }
                if (this.bonusLifeTimer > 160) {
                    this.icon = playerBonus1
                }
                if (this.bonusLifeTimer > 240) {
                    this.icon = playerBonus2
                }
                if (this.bonusLifeTimer > 320) {
                    this.icon = playerBonus1
                }
                if (this.bonusLifeTimer > 400) {
                    this.icon = playerBonus2
                }
                if (this.bonusLifeTimer > 480) {
                    this.icon = playerBonus1
                }
                if (this.bonusLifeTimer > 540) {
                    this.icon = playerBonus2
                }
                if(this.bonusLifeTimer>600){
                    this.icon = playericon
                    this.bonusLifeTimer = 0;
                    this.bonusLife= false;
                    starSound.pause();
                    starSound.currentTime = 0;
                }
            }
        } 
        deplace(e){     // method to move the player in each direction 
           
            if (!this.movement) {   //  S
                this.sx = 0;
                if (e.keyCode == this.keyup) {
                    this.sy = 100; 
                  } else if (e.keyCode == this.keydown) {
                    this.sy = 0;  
                  } else if (e.keyCode == this.keyleft) {
                    this.sy = 50; 
                  } else if (e.keyCode == this.keyright) {
                    this.sy = 150;  
                  }

                // MOVE TO THE RIGHT
                if(e.keyCode === this.keyright && this.x+ SQUARE_LENGTH < WIDTH  && !([1,2,3,4,5,11,12,13,16,17,18,"T"].includes(arrayBoard[this.y/SQUARE_LENGTH][(this.x+SQUARE_LENGTH)/SQUARE_LENGTH]) )){ 
                        this.movement = true;
                        this.nextDirection = right;  
                } 
                // MOVE TO THE LEFT
                else if (e.keyCode === this.keyleft && this.x && !([1,2,3,4,5,11,12,13,16,17,18,"T"].includes(arrayBoard[this.y/SQUARE_LENGTH][(this.x-SQUARE_LENGTH)/SQUARE_LENGTH]) ) ) {
                    this.movement = true;
                    this.nextDirection = left;
                }
                // MOVE DOWN
                else if (e.keyCode === this.keydown && this.y + SQUARE_LENGTH < HEIGHT  && !( [1,2,3,4,5,11,12,13,16,17,18,"T"].includes(arrayBoard[(this.y+SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]))) { 
                        this.movement = true;
                        this.nextDirection = down;  5
                }
                // MOVE UP
                else if (e.keyCode === this.keyup && this.y  &&  !([1,2,3,4,5,11,12,13,16,17,18,"T"].includes(arrayBoard[(this.y-SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]))) {
                        this.movement = true;
                        this.nextDirection = up;
                }
            // check if nbBomb is not 0 and if there isn't a bomb on the positionin that case, drop a bomb with the keyBomb of each player
                else if(e.keyCode == this.keyBomb && !([3,4,5,"T"].includes(arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]))  &&  this.nbBomb!=0 ){ 
                    varEndGame=false;
                    arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=3                        
                    this.nbBomb--;                                                             // decreases one bomb in nbBomb     
                    var bombCreated = new Bomb(this.x/SQUARE_LENGTH,this.y/SQUARE_LENGTH,this,this.bombRadius)  // creates a new Bomb, with parameters of the class Bomb
                    numberBomb.unshift(bombCreated) ;                       // puts a bomb in the array numberBomb 
                }   
            }    
        }
        
        endGame(){               // killing player method
             if (endGameCheck) {        
                if([6,"E2","E3","E4","E5","E6"].includes(arrayBoard[Math.round(player1.y/SQUARE_LENGTH)][Math.round(player1.x/SQUARE_LENGTH)]) && this.bonusLife==false && varEndGame==false) { // check if the player 1 position contains any explosion           
                    console.log("coucou")               
                    let imgTriforcep2= document.createElement("img"); 
                    imgTriforcep2.id= "imgTRIFORCEp2";
                    imgTriforcep2.src = "img2/triforce1.png"  

                    scorePlayer2.push(triforce);
                    player1.alive = false;
                        for ( triforce in scorePlayer2){
                            if(scorePlayer2.length==1){scorep2.appendChild(imgTriforcep2)}
                            else if(scorePlayer2.length==2){ document.getElementById("imgTRIFORCEp2").src= "img2/triforce2.png"}
                            else if(scorePlayer2.length==3){ document.getElementById("imgTRIFORCEp2").src = "img2/triforce3.png"}
                        }  
                }
                if ([6,"E2","E3","E4","E5","E6"].includes(arrayBoard[Math.round(player2.y/SQUARE_LENGTH)][Math.round(player2.x/SQUARE_LENGTH)]) && this.bonusLife==false && varEndGame==false)   {// check if the player 2 position contains any explosion
                    let imgTriforcep1= document.createElement("img"); 
                    imgTriforcep1.id= "imgTRIFORCEp1";
                    imgTriforcep1.src = "img2/triforce1.png"  

                    scorePlayer1.push(triforce);
                    player2.alive = false;
                    for ( triforce in scorePlayer1){   
                        if(scorePlayer1.length==1){scorep1.appendChild(imgTriforcep1)}
                        else if(scorePlayer1.length==2){ document.getElementById("imgTRIFORCEp1").src= "img2/triforce2.png"}
                        else if(scorePlayer1.length==3){ document.getElementById("imgTRIFORCEp1").src = "img2/triforce3.png"}
                    }  
                }
            }
        }  
        ifSuddenDeath(array,score){         
            if (endGameCheck && drawholl) {
                if(checkSuddenDeath==false && arrayBoard[Math.round(this.y/SQUARE_LENGTH)][Math.round(this.x/SQUARE_LENGTH)]=="T" ){
                    array.push(1);
                    checkSuddenDeath=true
                    this.alive = false;
                    for (triforce in array){
                        if(array.length==1){score.appendChild(imgTriforce); }                        
                        else if(array.length==2){ document.getElementById("imgTRIFORCE").src= "img2/triforce2.png"; }
                        else if(array.length==3){ document.getElementById("imgTRIFORCE").src = "img2/triforce3.png";}
                    }  
                }     
            }
        }
    }

    var player1= new Player(playerOneX,playerOneY,zelda1,RIGHT_ONE,LEFT_ONE,DOWN_ONE,UP_ONE,-2,0,KEY_P1_BOMB);    // creates a new player 1 with his own parameters
    var player2 = new Player(playerTwoX,playerTwoY,zelda2,RIGHT_TWO,LEFT_TWO,DOWN_TWO,UP_TWO,-2,0,KEY_P2_BOMB); // creates a new player 2 with his own parameters

    class Bomb {            // class of the Bomb
        constructor(bombX,bombY,bombOwner,bombRadius) {
            this.bombX = bombX;     // position X of the bomb(player.x/SQUARELENGTH)
            this.bombY = bombY;     // position Y of the bomb (player.y/SQUARELENGTH)
            this.player = bombOwner;    // references player Object, owner of the bomb
            this.bombRadius = bombRadius  // power of the bomb, given by the class Player above
            this.timerBomb= 0;
        }
        // animations of walls, bombs, and flames
        cooldown(){    
            this.timerBomb++;       // increases the timer of the bomb each time a bomb is dropped

            if (this.timerBomb>15 && this.timerBomb<33 ){ // draw 2 of the bomb
                arrayBoard[this.bombY][this.bombX]=4    
            }
            else if (this.timerBomb >33 && this.timerBomb<51 ) { // draw 3  of the bomb 
                arrayBoard[this.bombY][this.bombX]=5 
            }
            else if (this.timerBomb >51 && this.timerBomb<69 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4
            }
            else if (this.timerBomb >69 && this.timerBomb<87 ) { // draw 1  of the bomb 
                arrayBoard[this.bombY][this.bombX]=3 
            }
            else if (this.timerBomb >87 && this.timerBomb<105 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4
            }
            else if (this.timerBomb >105 && this.timerBomb<123 ) { // draw 3  of the bomb 
                arrayBoard[this.bombY][this.bombX]=5 
            }
            else if (this.timerBomb >123 && this.timerBomb<141 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4 
            }
            else if (this.timerBomb >141 && this.timerBomb<162 ) { // draw 1  of the bomb 
                arrayBoard[this.bombY][this.bombX]=3 
            }
            else if(this.timerBomb==165){                    // timing of the first draw of explosions and walls broken
                var grassAudio = document.getElementById("grassAudio");

                arrayBoard[this.bombY][this.bombX]=6; // draws the  explosion's center
                for ( let i=1; i<=this.bombRadius; i++) {                                    
                    if(arrayBoard[this.bombY][this.bombX-i]==0){            //  if there's nothing
                        arrayBoard[this.bombY][this.bombX-i]=6;
                        bombExplode.volume=0.4;
                        bombExplode.play();
                    }
                    else if([14,15,"M","C"].includes(arrayBoard[this.bombY][this.bombX-i]) && varEndGame==false){
                        arrayBoard[this.bombY][this.bombX-i]=0
                        arrayBoard[this.bombY][this.bombX-i]="B1"
                        break
                    }
                    else if(arrayBoard[this.bombY][this.bombX-i]==2 && varEndGame==false){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY][this.bombX-i]=11
                        grassAudio.volume= 1;
                        grassAudio.play();
                        break;
                    } 
                    
                    else {
                        break
                    }
                }
            // loop between 1 and the bomb's power  to test the right explosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]==0){    //  if there's nothing
                        arrayBoard[this.bombY][this.bombX+i]=6;
                        bombExplode.volume=0.4;
                        bombExplode.play();
                    }
                  else if([14,15,"M","C"].includes(arrayBoard[this.bombY][this.bombX+i]) && varEndGame==false){
                        arrayBoard[this.bombY][this.bombX+i]=0
                        arrayBoard[this.bombY][this.bombX+i]="B1"
                        break
                    }
                    else if(arrayBoard[this.bombY][this.bombX+i]==2 && varEndGame==false){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY][this.bombX+i]=11
                        grassAudio.volume= 1;
                        grassAudio.play();
                        break;
                    } 
                   
                    else {
                        break
                    }
                }
                // loop between 1 and the bomb's power  to test the lower explosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==0){  //  if there's nothing
                        arrayBoard[this.bombY+i][this.bombX]=6;
                        bombExplode.volume=0.4;
                        bombExplode.play();
                    }
                    else if(this.bombY+i <= LINE -1 && [14,15,"M","C"].includes(arrayBoard[this.bombY+i][this.bombX]) && varEndGame==false){
                        arrayBoard[this.bombY+i][this.bombX]=0
                        arrayBoard[this.bombY+i][this.bombX]="B1"
                        break
                    }
                    else if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==2 && varEndGame==false){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY+i][this.bombX]=11
                        grassAudio.volume= 1;
                        grassAudio.play();
                        break;
                    }
                   
                    else {
                        break;
                    }
                }
                // loop between 1 and the bomb's power  to test the upperexplosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==0){       //  if there's nothing
                        arrayBoard[this.bombY-i][this.bombX]=6;
                        bombExplode.volume=0.4;
                        bombExplode.play();
                    }
                   else if(this.bombY -i>= 0 && [14,15,"M","C"].includes(arrayBoard[this.bombY-i][this.bombX]) && varEndGame==false){
                        arrayBoard[this.bombY-i][this.bombX]=0
                        arrayBoard[this.bombY-i][this.bombX]="B1"
                       break;
                    } 
                    else if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==2 && varEndGame==false) {
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY-i][this.bombX]=11
                        grassAudio.volume= 1;
                        grassAudio.play();
                        break;
                    }  
                   
                    else {                       
                            break;
                    } 
                }
            }
            else if(this.timerBomb>165 && this.timerBomb<171 ){                   // next timer, repeats the same steps, with differents images 
                if(arrayBoard[this.bombY][this.bombX]==6){
                    arrayBoard[this.bombY][this.bombX]="E2";
                }          
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==11){    
                            arrayBoard[this.bombY][this.bombX-i]=12
                            break
                        }
                       else if(arrayBoard[this.bombY][this.bombX-i]=="B1"){
                        arrayBoard[this.bombY][this.bombX-i]=0
                            arrayBoard[this.bombY][this.bombX-i]="B2"
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]==6){
                            arrayBoard[this.bombY][this.bombX-i]="E2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==11){    
                            arrayBoard[this.bombY][this.bombX+i]=12
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX+i]=="B1"){
                            arrayBoard[this.bombY][this.bombX+i]=0
                            arrayBoard[this.bombY][this.bombX+i]="B2"
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]==6){
                            arrayBoard[this.bombY][this.bombX+i]="E2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==11){    
                            arrayBoard[this.bombY+i][this.bombX]=12
                            break
                        }
                       else if(arrayBoard[this.bombY+i][this.bombX]=="B1"){
                        arrayBoard[this.bombY+i][this.bombX]=0
                            arrayBoard[this.bombY+i][this.bombX]="B2"
                            break
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]==6){
                            arrayBoard[this.bombY+i][this.bombX]="E2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==11){    
                            arrayBoard[this.bombY-i][this.bombX]=12
                            break
                        }
                       else if(arrayBoard[this.bombY-i][this.bombX]=="B1"){
                            arrayBoard[this.bombY-i][this.bombX]=0
                            arrayBoard[this.bombY-i][this.bombX]="B2"
                            break
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]==6){
                            arrayBoard[this.bombY-i][this.bombX]="E2"
                        }
                    }
                }      
            }

            else if(this.timerBomb>171 && this.timerBomb<177 ){               // next timer, repeats the same steps, with differents images 
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E2"){
                    arrayBoard[this.bombY][this.bombX]="E3";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==12){    
                                arrayBoard[this.bombY][this.bombX-i]=13
                                break
                            }
                        else if(arrayBoard[this.bombY][this.bombX-i]=="B2"){
                            arrayBoard[this.bombY][this.bombX-i]=0
                            arrayBoard[this.bombY][this.bombX-i]="B3"
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="E2"){
                            arrayBoard[this.bombY][this.bombX-i]="E3"
                        }
                    }
              
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==12){    
                            arrayBoard[this.bombY][this.bombX+i]=13
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX+i]=="B2"){
                        arrayBoard[this.bombY][this.bombX+i]=0
                            arrayBoard[this.bombY][this.bombX+i]="B3"
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="E2"){
                            arrayBoard[this.bombY][this.bombX+i]="E3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==12){    
                            arrayBoard[this.bombY+i][this.bombX]=13
                            break
                        }
                        else if(arrayBoard[this.bombY+i][this.bombX]=="B2"){
                        arrayBoard[this.bombY+i][this.bombX]=0
                            arrayBoard[this.bombY+i][this.bombX]="B3"
                            break
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="E2"){
                            arrayBoard[this.bombY+i][this.bombX]="E3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==12){    
                            arrayBoard[this.bombY-i][this.bombX]=13
                            break
                        }
                        else if(arrayBoard[this.bombY-i][this.bombX]=="B2"){
                        arrayBoard[this.bombY-i][this.bombX]=0
                            arrayBoard[this.bombY-i][this.bombX]="B3"
                            break
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="E2"){
                            arrayBoard[this.bombY-i][this.bombX]="E3"
                        }
                    }
                }
            }

            else if(this.timerBomb>177 && this.timerBomb<186 ){            // next timer, repeats the same steps, with differents images 
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E3"){
                    arrayBoard[this.bombY][this.bombX]="E4";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==13){    
                            arrayBoard[this.bombY][this.bombX-i]=16
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX-i]=="B3"){
                            arrayBoard[this.bombY][this.bombX-i]=0;
                            arrayBoard[this.bombY][this.bombX-i]="B4";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="E3"){
                            arrayBoard[this.bombY][this.bombX-i]="E4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==13){    
                            arrayBoard[this.bombY][this.bombX+i]=16
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX+i]=="B3"){
                        arrayBoard[this.bombY][this.bombX+i]=0
                            arrayBoard[this.bombY][this.bombX+i]="B4";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="E3"){
                            arrayBoard[this.bombY][this.bombX+i]="E4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==13){    
                            arrayBoard[this.bombY+i][this.bombX]=16
                            break
                        }
                        else if(arrayBoard[this.bombY+i][this.bombX]=="B3"){
                            arrayBoard[this.bombY+i][this.bombX]=0
                            arrayBoard[this.bombY+i][this.bombX]="B4";
                            break
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="E3"){
                            arrayBoard[this.bombY+i][this.bombX]="E4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==13){    
                            arrayBoard[this.bombY-i][this.bombX]=16
                            break
                        }
                        else if(arrayBoard[this.bombY-i][this.bombX]=="B3"){
                            arrayBoard[this.bombY-i][this.bombX]=0;
                            arrayBoard[this.bombY-i][this.bombX]="B4";
                            break
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="E3"){
                            arrayBoard[this.bombY-i][this.bombX]="E4"
                        }
                    }
                }
            }
            else if(this.timerBomb>186 && this.timerBomb<192 ){             // next timer, repeats the same steps, with differents images  
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E4"){
                    arrayBoard[this.bombY][this.bombX]="E5";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==16){    
                            arrayBoard[this.bombY][this.bombX-i]=17
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX-i]=="B4"){
                            arrayBoard[this.bombY][this.bombX-i]=0;
                            arrayBoard[this.bombY][this.bombX-i]="B5";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="E4"){
                            arrayBoard[this.bombY][this.bombX-i]="E5"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==16){    
                            arrayBoard[this.bombY][this.bombX+i]=17
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX+i]=="B4"){
                            arrayBoard[this.bombY][this.bombX+i]=0;
                            arrayBoard[this.bombY][this.bombX+i]="B5";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="E4"){
                            arrayBoard[this.bombY][this.bombX+i]="E5"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==16){    
                            arrayBoard[this.bombY+i][this.bombX]=17
                            break
                        }
                        else if(arrayBoard[this.bombY+i][this.bombX]=="B4"){
                            arrayBoard[this.bombY+i][this.bombX]=0;
                            arrayBoard[this.bombY+i][this.bombX]="B5";
                            break
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="E4"){
                            arrayBoard[this.bombY+i][this.bombX]="E5"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==16){    
                            arrayBoard[this.bombY-i][this.bombX]=17
                            break
                        }
                        else if(arrayBoard[this.bombY-i][this.bombX]=="B4"){
                            arrayBoard[this.bombY-i][this.bombX]=0;
                            arrayBoard[this.bombY-i][this.bombX]="B5";
                            break
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="E4"){
                            arrayBoard[this.bombY-i][this.bombX]="E5"
                        }
                    }
                }
            }

            else if(this.timerBomb>192 && this.timerBomb<201) {       // next timer, repeats the same steps, with differents images 
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E5"){
                    arrayBoard[this.bombY][this.bombX]="E6";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==17){    
                            arrayBoard[this.bombY][this.bombX-i]=18
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX-i]=="B5"){
                            arrayBoard[this.bombY][this.bombX-i]=0;
                            arrayBoard[this.bombY][this.bombX-i]="B6";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="E5"){
                            arrayBoard[this.bombY][this.bombX-i]="E6"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==17){    
                            arrayBoard[this.bombY][this.bombX+i]=18
                            break
                        }
                        else if(arrayBoard[this.bombY][this.bombX+i]=="B5"){
                            arrayBoard[this.bombY][this.bombX+i]=0;
                            arrayBoard[this.bombY][this.bombX+i]="B6";
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="E5"){
                            arrayBoard[this.bombY][this.bombX+i]="E6"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==17){    
                            arrayBoard[this.bombY+i][this.bombX]=18
                            break
                        }
                        else if(arrayBoard[this.bombY+i][this.bombX]=="B5"){
                            arrayBoard[this.bombY+i][this.bombX]=0
                            arrayBoard[this.bombY+i][this.bombX]="B6";
                            break
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="E5"){
                            arrayBoard[this.bombY+i][this.bombX]="E6"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==17){    
                            arrayBoard[this.bombY-i][this.bombX]=18
                            break
                        }
                        else if(arrayBoard[this.bombY-i][this.bombX]=="B5"){
                            arrayBoard[this.bombY-i][this.bombX]=0;
                            arrayBoard[this.bombY-i][this.bombX]="B6";
                            break
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="E5"){
                            arrayBoard[this.bombY-i][this.bombX]="E6"
                        }
                    }
                }
            }
            else if(this.timerBomb == 201  ) { 
                // erase final of the broken walls(with a % of chance to make a bonus appear), reset of timerBomb; erases the bomb from the array, erase of explosions
                console.log(arrayBoard)
                this.timerBomb = 0
                this.player.nbBomb++;               // reincrease nbBomb
                numberBomb.pop();
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E6"){   // deletes the explosion's center
                    arrayBoard[this.bombY][this.bombX]=0;
                }                                                     
                // for the left position of the bomb( depends on the bombRadius)
                if(this.bombRadius>=1){     
                    for ( let i=1; i<=this.bombRadius; i++) {
                    let indexRandom = Math.floor(Math.random()*4);
                        if(arrayBoard[this.bombY][this.bombX-i]==18){
                            if (ifBonus()){   
                                
                                arrayBoard[this.bombY][this.bombX-i]=bonusRandom[indexRandom]; // % of chance to drop a bonus after breaking a wall(18 is the last draw of the breakable wall)
                               break
                            } else {
                                arrayBoard[this.bombY][this.bombX-i]= 0;  
                            }

                             // breaks the loop after bomb encounters a wall to break,
                        } 
                        else if ( arrayBoard[this.bombY][this.bombX-i]==1 ) {
                        break // breaks the loop after the bombRadius encounters a non-breakable wall
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]!=1 && arrayBoard[this.bombY][this.bombX-i]!=2 && arrayBoard[this.bombY][this.bombX-i]!="T" ) {
                            if(arrayBoard[this.bombY][this.bombX-i]=="B6" ) {  // check if the square contains a bonus
                                arrayBoard[this.bombY][this.bombX-i]=0;     // erases it and erases the flame
                                break       // breaks the loop so it erases only one bonus on the same line
                            }
                            else {
                                arrayBoard[this.bombY][this.bombX-i]=0;  // erases the flame
                            }
                        }
                    }
                }
                // same as above for the right position of the bomb
                if(this.bombRadius>=1){

                    for ( let i=1; i<=this.bombRadius; i++) {
                        let indexRandom = Math.floor(Math.random()*4);
                        if(arrayBoard[this.bombY][this.bombX+i]==18){  
                            if (ifBonus()){  
                                
                                arrayBoard[this.bombY][this.bombX+i] = bonusRandom[indexRandom];
                                break
                               
                            } else{
                                arrayBoard[this.bombY][this.bombX+i] = 0;
                            }
                        
                        } 
                        else if(arrayBoard[this.bombY][this.bombX+i]==1){
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]!=1 && arrayBoard[this.bombY][this.bombX+i]!=2 && arrayBoard[this.bombY][this.bombX+i]!="T"  ) {
                            if(arrayBoard[this.bombY][this.bombX+i]=="B6"){
                                arrayBoard[this.bombY][this.bombX+i]=0;
                                break
                            }
                            else {
                                arrayBoard[this.bombY][this.bombX+i]=0;
                            }    
                        }
                    }
                }
                //same as above for the lower position of the bomb
                if(this.bombRadius>=1){
                    for ( let i=1; i<=this.bombRadius; i++) {
                        let indexRandom = Math.floor(Math.random()*4);
                        if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==18){  
                            if(ifBonus()){  
                                arrayBoard[this.bombY+i][this.bombX] = bonusRandom[indexRandom];
                               break
                            } else{
                                arrayBoard[this.bombY+i][this.bombX] = 0; 
                            }
                            
                        }
                        else if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==1) {                            
                            break
                        }               
                        else if ( this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX] !=1  && arrayBoard[this.bombY+i][this.bombX] !=2  && arrayBoard[this.bombY+i][this.bombX] !="T"){
                            if(arrayBoard[this.bombY+i][this.bombX] =="B6"){
                                arrayBoard[this.bombY+i][this.bombX] = 0;
                                break
                            }
                            else {
                                arrayBoard[this.bombY+i][this.bombX] = 0
                            }
                        }
                    }
                }
                // same as above for the upper position of the bomb
                if(this.bombRadius>=1){
                    for ( let i=1; i<=this.bombRadius; i++) {
                        let indexRandom = Math.floor(Math.random()*4);
                        if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==18){ 
                            if (ifBonus()){  
                                arrayBoard[this.bombY-i][this.bombX] = bonusRandom[indexRandom];
                                break     
                            }else{
                                arrayBoard[this.bombY-i][this.bombX] = 0;
                            }
                            
                        }
                        else if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==1) {
                            break
                        }
                        else if ( this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX] !=1  && arrayBoard[this.bombY-i][this.bombX] !=2   && arrayBoard[this.bombY-i][this.bombX] !="T"){
                            if(arrayBoard[this.bombY-i][this.bombX]=="B6"){
                                arrayBoard[this.bombY-i][this.bombX] = 0;
                                break
                            }
                            else {
                                arrayBoard[this.bombY-i][this.bombX] = 0
                            }
                        }
                    }   
                }       
            }  
        } 
        
    }
    class SuddenDeath{
        constructor (positionX, positionY){
            this.positionX = positionX;
            this.positionY = positionY;
            this.lauchned = false; 
            this.dir = "right"
        }

        drawHole(){
            arrayBoard[this.positionY][this.positionX] = "T";

            if (this.dir == "right"){
                if (this.positionX+1 == COLUMN || arrayBoard[this.positionY][this.positionX+1] == "T" ){
                    this.dir = "down";  
                } else{
                    this.positionX++
                }
            } else if (this.dir == "left") {
                if(this.positionX-1 == -1|| arrayBoard[this.positionY][this.positionX-1] == "T"){
                    this.dir ="up"
                } else {
                    this.positionX--
                }    
            } else if (this.dir == "down"){
                
                if(this.positionY+1 == LINE  || arrayBoard[this.positionY+1][this.positionX] == "T"){
                   
                    this.dir = "left"
                } else {
                    this.positionY++
                } 
            } else if (this.dir == "up"){
                if(this.positionY-1 == -1 || arrayBoard[this.positionY-1][this.positionX] == "T"){
                    this.dir = "right"
                } else{
                    this.positionY--
                }
            }
        }
   
    }
    let hurryUp = new SuddenDeath(0,0);

    // forbide the draw of walls on player's starter position (left top corner with 4 squares, and right bottom corner with 4 squares)
    function corner(i,j) {
        if(i<2 && j<2){
            return false;
        }
        else if (i > (playerTwoY/SQUARE_LENGTH)-2 && j>(playerTwoX/SQUARE_LENGTH)-2) {
            return false;
        }
        else {
            return true;   
        }
    }
    // Draws breakable walls every odd line and column, else, draws a changeable random number of breakable walls on the board, except near the starter position of the player
    function createArray () {
        for (let i=0; i< LINE ;i++){
            arrayBoard[i]=[];
            for (let j=0; j < COLUMN; j++){
                if (i%2==1 && j%2==1){           
                arrayBoard[i].push(1);
                }   
                else if (Math.random()>0.2 && corner(i,j)) {   // changer le math random pour réduire le nombre de briques
                    arrayBoard[i].push(2);
                }
                else {
                    arrayBoard[i].push(0);  
                } 
            }   
        }
    }

    // every draw of the game, with references of each of them in the arrayBoard
    function createWall () {
        
        for (let i=0; i< LINE ;i++){
            for (let j=0; j < COLUMN; j++){
                if(arrayBoard[i][j]==0){
                    ctx.drawImage(grass,j*SQUARE_LENGTH,i*SQUARE_LENGTH,SQUARE_LENGTH,SQUARE_LENGTH);
                }
                else if (arrayBoard[i][j]==1){  
                    ctx.drawImage(murAll,j*SQUARE_LENGTH,i*SQUARE_LENGTH,SQUARE_LENGTH,SQUARE_LENGTH);
                }
                else if (arrayBoard[i][j]==2) { 
                    ctx.drawImage(newgrass,j*SQUARE_LENGTH,i*SQUARE_LENGTH,SQUARE_LENGTH,SQUARE_LENGTH);
                }
                else if(arrayBoard[i][j]==3 && varEndGame== false){
                ctx.drawImage(bombz1,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50);
                    }
                else if(arrayBoard[i][j]==4 && varEndGame== false){
                    ctx.drawImage(bombz2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==5 && varEndGame== false) {
                    ctx.drawImage(bombz3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==6 && varEndGame== false) {
                    ctx.drawImage(boom1,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E2" && varEndGame== false) {
                    ctx.drawImage(boom2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E3" && varEndGame== false) {
                    ctx.drawImage(boom3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E4" && varEndGame== false) {
                    ctx.drawImage(boom4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E5" && varEndGame== false) {
                    ctx.drawImage(boom5,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E6" && varEndGame== false) {
                    ctx.drawImage(boom6,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "B1"){
                    ctx.drawImage(break1, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                    console.table(arrayBoard)
                }
                else if (arrayBoard[i][j] == "B2"){
                    ctx.drawImage(break2, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "B3"){
                    ctx.drawImage(break3, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "B4"){
                    ctx.drawImage(break4, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "B5"){
                    ctx.drawImage(break5, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "B6"){
                    ctx.drawImage(break6, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==11) {
                    ctx.drawImage(bush2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==12) {
                    ctx.drawImage(bush3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==13) {
                    ctx.drawImage(bush4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==16) {
                    ctx.drawImage(bush5,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==17) {
                    ctx.drawImage(bush6,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==18) {
                    ctx.drawImage(bush7,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
               
                else if (arrayBoard[i][j]==14) {
                    ctx.drawImage(bonus1,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==15) {
                    ctx.drawImage(bonus2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="C") {
                    ctx.drawImage(bonus4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="M") {
                    ctx.drawImage(malus,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j] == "T"){
                    ctx.drawImage(hole, j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }   
            }
        }
    }
    document.onkeydown = function (e) { 
        player1.deplace(e);
        player2.deplace(e);
    }
    
    function drawGame() {                           // global funtion to draw everything, the board, players, walls, animations( method cooldown)
        
        createWall();
        if (!player1.alive && player2.alive){    
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            drawEndGame(player2WinsImg);            
           window.clearInterval(test);
           clock=180;
           SD.pause();
        }
        if (!player2.alive && player1.alive ){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            drawEndGame(player1WinsImg);
            window.clearInterval(test);
            clock=180;
            SD.pause();      
        }
        if(clock == 0 || (!player1.alive && !player2.alive)){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            ctx.drawImage(tieGame,0,0,WIDTH,HEIGHT);
            var gameTie= document.getElementById("gameTie");
            gameTie.volume=0.5;
            gameTie.play();
            canvas.addEventListener('click',loadGame);
            window.clearInterval(test);  
            clock=180;
            SD.pause();   
        }
        if(scorePlayer2.length==3 && scorePlayer1.length==3){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            winGame(noWinner);
            SD.pause();
        }
        else if(scorePlayer2.length==3 && !(scorePlayer1.length==3)){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            winGame(player2winall);
            SD.pause();
        }
        else if(scorePlayer1.length==3 && !(scorePlayer2.length==3)){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            player1.sy=230;
            player2.sy=230;
            winGame(player1winall);
            SD.pause();
        }
        player1.skullCooldown();
        player2.skullCooldown();
        player1.bonusLifeRemove(zelda1);
        player2.bonusLifeRemove(zelda2); 
        player1.draw();
        player2.draw();            
        drawClock();
        decreaseClock();  
        if (clock <= 60 && (startDecrease == 21 || startDecrease == 42 || startDecrease == 63)){
            gameMusic.pause();
            
            SD.volume=0.2;
            SD.play();
            drawholl = true;
            hurryUp.drawHole();
        } else {
            drawholl = false;
        }   
        for (let i=numberBomb.length-1  ; i>=0 ; i--) {
            if(!player1.alive || !player2.alive) {
                break
            }
            else if (drawholl && hurryUp.positionX == numberBomb[i].bombX && hurryUp.positionY == numberBomb[i].bombY){
                numberBomb.pop(); 
            }else {
                numberBomb[i].cooldown();  
            }
        }   
        player1.ifSuddenDeath(scorePlayer2,scorep2);
        player2.ifSuddenDeath(scorePlayer1,scorep1);  
    }
     createArray();
    let test = window.setInterval(drawGame,DELAY);     // interval to repeat the drawGame every 40 ms
}

function ifBonus(){
    if (Math.random() <= bonusRate){
        return true
    }else{
        return false
    }
} 

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function drawStartGame(){    

    let woodBtn = new Image; 
    woodBtn.src = "view/frontend/Bomberman/img2/woodbtn.png";  
    let howtoImg = new Image; 
    howtoImg.src = "view/frontend/Bomberman/img2/binds.png";

    woodBtn.onload = () => drawImg(); 
    function drawImg(){
        ctx.clearRect(0,0, WIDTH, HEIGHT); 
        class btn {
            constructor (x,y,width,height){
                this.x = x; 
                this.y = y; 
                this.width = width;
                this.height = height;
            }
        }
        let btnStart = new btn(60,420,175,50); 
        let btnHowto = new btn(60,490,175,50)

        ctx.drawImage(woodBtn,btnStart.x,btnStart.y, btnStart.width,btnStart.height);
        ctx.drawImage(woodBtn,btnHowto.x,btnHowto.y, btnHowto.width, btnHowto.height);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = " bold 20px Arial"
        ctx.fillText("Jouer!", 147, 450); 
        ctx.fillText("Comment jouer?", 147, 520);
    
        canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            if (isInside(mousePos,btnStart) && varLoadGame==false) {
                loadGame();
                varLoadGame=true
            }
            if (isInside(mousePos, btnHowto) && varHowto==false){
                ctx.drawImage(howtoImg,WIDTH/2-70,0, 447, 546); 
                varHowto=true
            }  
        }, false);

    }   
}
function winGame(winImg) {
    ctx.drawImage(winImg,0,0,WIDTH,HEIGHT);
    document.onclick = function(){
        location.reload();
    }
}

function drawEndGame(playerImg){     
    varEndGame= true
    ctx.drawImage(playerImg,0,0,WIDTH,HEIGHT);
    var gameOver= document.getElementById("gameOver");
    gameOver.volume=0.5;
    gameOver.play();
    canvas.addEventListener('click',loadGame);
}
drawStartGame();