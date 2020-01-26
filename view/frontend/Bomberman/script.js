var canvas = document.getElementById("myCanvas");
var ctx= canvas.getContext("2d");

var scorePlayer1 = [];              // tableaux stockant le score des joueurs
var scorePlayer2 = [];
  
const LINE = 11;      // number of lines
const COLUMN = 15;    // number of columns
const SQUARE_LENGTH = 50 ; // size of one square of the board
const UP_ONE = 38;  DOWN_ONE= 40; LEFT_ONE = 37; RIGHT_ONE = 39; // directions keys for player One (arrows)
const UP_TWO = 90; DOWN_TWO = 83; LEFT_TWO = 81; RIGHT_TWO = 68; // directions keys for playerTwo (zqsd)
const KEY_P1_BOMB = 101;        // key to drop the bomb for player ONe (5)
const KEY_P2_BOMB= 32;          // key to drop the bomb for player  Two (espace)  
const DELAY = 40; 
const WIDTH = COLUMN*SQUARE_LENGTH;  // size of the board
const HEIGHT = LINE*SQUARE_LENGTH; // height of the board
var playerOneX = 0;             // starter position X of player one
var playerOneY = 0;             // starter position Y of player one
var playerTwoX = WIDTH - SQUARE_LENGTH;     // starter position X of player two
var playerTwoY = HEIGHT  - SQUARE_LENGTH;       // starter position Y of player two
var arrayBoard =[];
var widthChar = 30; //  size of the player ( adapt from the sprite)
var heightChar = 39; // height of the player ( adapt from the sprite(function DrawImage))
var bonusRandom = [0,0,0,0,14,15]; // array changeable with bonus bomb(14) and bonus power (15)
var numberBomb = [];    // array where all bombs dropped go in and leave at the end at the timerBomb

canvas.width= WIDTH;
canvas.height= HEIGHT;

ctx.font = '35px serif';
ctx.fillText("click to play",300,250);              //
canvas.addEventListener("click",loadGame);



function loadGame() {
    canvas.removeEventListener("click",loadGame);
    class Player{              // General class to create players, with their parameters
        constructor(x,y,icon,keyright,keyleft,keydown,keyup,sx,sy,keyBomb){
        this.x = x;
        this.y = y;
        this.icon= icon;
        this.keyright = keyright; this.keyleft = keyleft; this.keydown = keydown; this.keyup = keyup; 
        this.sx = sx;
        this.sy = sy;
        this.keyBomb= keyBomb;
        this.bombRadius = 1;            // power of the bomb, start from 1 and increases each time u take the bonus 
        this.nbBomb =1;                 // number of bombs u can drop at the start, increases each time u take the bonus
        this.timerBomb = 0;             // timer of the bomb, starts at 0, increased in the cooldown method of the class Bomb
        
        };
        draw(){       // draw the player 
            ctx.drawImage(this.icon,this.sx,this.sy,widthChar,heightChar,this.x,this.y,45,47);
         }
        deplace(e){     // method to move the player in each direction

                if (e.keyCode === this.keyright && arrayBoard[this.y/SQUARE_LENGTH][(this.x+SQUARE_LENGTH)/SQUARE_LENGTH]==14) {
                    this.x += SQUARE_LENGTH;                     
                    this.sy = 37;                                                   // allows to walk on a bonus bomb and erase it, increases the number of bombs u can drop
                    this.sx = -7;                               
                    arrayBoard[this.y/SQUARE_LENGTH][(this.x)/SQUARE_LENGTH]=0;
                    this.nbBomb ++
                }
                else if (e.keyCode === this.keyright && arrayBoard[this.y/SQUARE_LENGTH][(this.x+SQUARE_LENGTH)/SQUARE_LENGTH]==15) {
                    this.x += SQUARE_LENGTH;                     
                    this.sy = 37;                                                    // allows to walk on a bonus power and erase it, increases the power of the bomb
                    this.sx = -7;                               
                    arrayBoard[this.y/SQUARE_LENGTH][(this.x)/SQUARE_LENGTH]=0;
                    this.bombRadius ++
                }
                else  if(e.keyCode === this.keyright && this.x+ SQUARE_LENGTH < WIDTH  && !([1,2,3,4,5,11,12,13,16,17,18].includes(arrayBoard[this.y/SQUARE_LENGTH][(this.x+SQUARE_LENGTH)/SQUARE_LENGTH]) )){                      
                        this.x += SQUARE_LENGTH;                              // check if the next square on the right contains a wall(breakable or not), and a bomb
                        this.sy = 37;                                     // if not, allows to move to the next square
                        this.sx = -7;
                } 
                else if(e.keyCode === this.keyleft && arrayBoard[this.y/SQUARE_LENGTH][(this.x - SQUARE_LENGTH)/SQUARE_LENGTH]==14) {
                    this.x-= SQUARE_LENGTH;
                    this.sx = -7 ;
                    this.sy=118;                                                                 // allows to walk on a bonus bomb and erase it, increases this.nbBomb
                    arrayBoard[this.y/SQUARE_LENGTH][(this.x)/SQUARE_LENGTH]=0
                    this.nbBomb ++
                }
                else if(e.keyCode === this.keyleft && arrayBoard[this.y/SQUARE_LENGTH][(this.x - SQUARE_LENGTH)/SQUARE_LENGTH]==15) {
                    this.x-= SQUARE_LENGTH;
                    this.sx = -7 ;
                    this.sy=118;                                                                // allows to walk on a bonus power and erase it, increases the power of the bomb
                    arrayBoard[this.y/SQUARE_LENGTH][(this.x)/SQUARE_LENGTH]=0
                    this.bombRadius ++
                }
                else if (e.keyCode === this.keyleft && this.x && !([1,2,3,4,5,11,12,13,16,17,18].includes(arrayBoard[this.y/SQUARE_LENGTH][(this.x-SQUARE_LENGTH)/SQUARE_LENGTH]) ) ) {
                    this.x-= SQUARE_LENGTH;                         // check if the previous square on the left contains a wall(breakable or not), and a bomb
                    this.sy = 37;                                     // if not, allows to move to the next square
                    this.sx = -7 ;      
                    this.sy=118;
                }
                else if(e.keyCode === this.keydown && this.y + SQUARE_LENGTH < HEIGHT && arrayBoard[(this.y + SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==14) {
                    this.y += SQUARE_LENGTH ;
                    this.sy= 76;
                    this.sx = -7;                                                            // allows to walk on a bonus bomb and erase it, increases this.nbBomb
                    arrayBoard[(this.y)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=0
                    this.nbBomb ++
                }
                else if(e.keyCode === this.keydown && this.y + SQUARE_LENGTH < HEIGHT && arrayBoard[(this.y + SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==15) {
                    this.y += SQUARE_LENGTH ;
                    this.sy= 76;
                    this.sx = -7;                                                           // allows to walk on a bonus power and erase it, increases the power of the bomb
                    arrayBoard[(this.y)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=0
                    this.bombRadius ++
                }
                else if (e.keyCode === this.keydown && this.y + SQUARE_LENGTH < HEIGHT  && !( [1,2,3,4,5,11,12,13,16,17,18].includes(arrayBoard[(this.y+SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]))) { 
                    this.y += SQUARE_LENGTH ;                                // check if the lower square  contains a wall(breakable or not), and a bomb
                                  // if not, allows to move to the next square
                    this.sy= 76;
                    this.sx = -7;   
                }
                else if(e.keyCode === this.keyup && this.y && arrayBoard[(this.y - SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==14){
                    this.y -= SQUARE_LENGTH ;
                    this.sy = -4;                                                                // allows to walk on a bonus bomb and erase it, increases this.nbBomb
                    this.sx= -7 ;
                    arrayBoard[(this.y)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=0;
                    this.nbBomb ++
                }
                else if(e.keyCode === this.keyup && this.y && arrayBoard[(this.y - SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]==15){
                    this.y -= SQUARE_LENGTH ;
                    this.sy = -4;                                                              // allows to walk on a bonus power and erase it, increases the power of the bomb
                    this.sx= -7 ;
                    arrayBoard[(this.y)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=0;
                    this.bombRadius ++
                }
                else if (e.keyCode === this.keyup && this.y  &&  !([1,2,3,4,5,11,12,13,16,17,18].includes(arrayBoard[(this.y-SQUARE_LENGTH)/SQUARE_LENGTH][this.x/SQUARE_LENGTH]))) {
                    this.y -= SQUARE_LENGTH ;                            // check if the upper square contains a wall(breakable or not), and a bomb
                    this.sy = 37;                                     // if not, allows to move to the next square
                    this.sy = -4;
                    this.sx= -7 ;
                }

               // check if nbBomb is not 0 and if there isn't a bomb on the positionin that case, drop a bomb with the keyBomb of each player
                else if(e.keyCode == this.keyBomb && arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]!=3 &&  this.nbBomb!=0){ 
                    arrayBoard[this.y/SQUARE_LENGTH][this.x/SQUARE_LENGTH]=3                        
                    this.nbBomb--;                                                             // decreases one bomb in nbBomb     
                    var bombCreated = new Bomb(this.x/SQUARE_LENGTH,this.y/SQUARE_LENGTH,this,this.bombRadius)  // creates a new Bomb, with parameters of the class Bomb
                    numberBomb.unshift(bombCreated) ;                       // puts a bomb in the array numberBomb 
                }   
                    
        };
        endGame(){               // killing player method

                if([6,"E2","E3","E4",7,"L2","L3","L4",8,"R2","R3","R4",9,"D2","D3","D4",10,"U2","U3","U4","H","H2","H3","H4","V","V2","V3","V4"].includes(arrayBoard[player1.y/SQUARE_LENGTH][player1.x/SQUARE_LENGTH])) { // check if the player 1 position contains any explosion
                    scorePlayer2.push(1);
                    alert("Player 2 Wins")  
                    location.reload();   
                }
                if ([6,"E2","E3","E4",7,"L2","L3","L4",8,"R2","R3","R4",9,"D2","D3","D4",10,"U2","U3","U4","H","H2","H3","H4","V","V2","V3","V4"].includes(arrayBoard[player2.y/SQUARE_LENGTH][player2.x/SQUARE_LENGTH]))   {// check if the player 2 position contains any explosion
                   scorePlayer1.push(1)
                    alert("Player 1 Wins")    
                    location.reload();          
                }
            }       
    }
    
  
    var player1= new Player(playerOneX,playerOneY,imagePlayer,RIGHT_ONE,LEFT_ONE,DOWN_ONE,UP_ONE,-7,76,KEY_P1_BOMB);    // creates a new player 1 with his own parameters
    var player2 = new Player(playerTwoX,playerTwoY,imagePlayer2,RIGHT_TWO,LEFT_TWO,DOWN_TWO,UP_TWO,-7,76,KEY_P2_BOMB); // creates a new player 2 with his own parameters

  
    
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

            if (this.timerBomb>5 && this.timerBomb<11 ){ // draw 2 of the bomb
                arrayBoard[this.bombY][this.bombX]=4    
            }
            else if (this.timerBomb >11 && this.timerBomb<17 ) { // draw 3  of the bomb 
                arrayBoard[this.bombY][this.bombX]=5 
            }
            else if (this.timerBomb >17 && this.timerBomb<23 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4
            }
            else if (this.timerBomb >23 && this.timerBomb<29 ) { // draw 1  of the bomb 
                arrayBoard[this.bombY][this.bombX]=3 
            }
            else if (this.timerBomb >29 && this.timerBomb<35 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4
            }
            else if (this.timerBomb >35 && this.timerBomb<41 ) { // draw 3  of the bomb 
                arrayBoard[this.bombY][this.bombX]=5 
            }
            else if (this.timerBomb >41 && this.timerBomb<47 ) { // draw 2  of the bomb 
                arrayBoard[this.bombY][this.bombX]=4 
            }
            else if (this.timerBomb >47 && this.timerBomb<54 ) { // draw 1  of the bomb 
                arrayBoard[this.bombY][this.bombX]=3 
            }
            else if(this.timerBomb==55){                    // timing of the first draw of explosions and walls broken
               
                arrayBoard[this.bombY][this.bombX]=6; // draws the  explosion's center

                // loop between 1 and the bomb's power  to test the left explosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {                                    
                    if(arrayBoard[this.bombY][this.bombX-i]==0){            //  if there's nothing
                            if(i == this.bombRadius){                      
                            // if i equals the bomb's power, puts the end of the flame
                                arrayBoard[this.bombY][this.bombX-this.bombRadius]=7
                            }else{
                                //if not, puts an horizontal flame
                                arrayBoard[this.bombY][this.bombX-i]="H";
                            }
                    }else if(arrayBoard[this.bombY][this.bombX-i]==2){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY][this.bombX-i]=11
                        break;
                    } 
                    else {
                        break
                    }
                }
             // loop between 1 and the bomb's power  to test the right explosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]==0){    //  if there's nothing
                            if(i == this.bombRadius){
                                // if i equals the bomb's power, puts the end of the flame
                                arrayBoard[this.bombY][this.bombX+this.bombRadius]=8
                            }else{
                                 //if not, puts an horizontal flame
                                arrayBoard[this.bombY][this.bombX+i]="H";
                            }
                    }else if(arrayBoard[this.bombY][this.bombX+i]==2){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY][this.bombX+i]=11
                        break;
                    } 
                    else {
                        break
                    }
                }
                // loop between 1 and the bomb's power  to test the lower explosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==0){  //  if there's nothing
                            if(i == this.bombRadius){
                                // if i equals the bomb's power, puts the end of the flame
                                arrayBoard[this.bombY+this.bombRadius][this.bombX]=9
                            }else{
                               //if not, puts an vertical flame
                                arrayBoard[this.bombY+i][this.bombX]="V";
                            }
                    }else if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==2){
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY+i][this.bombX]=11
                        break;
                    }
                    else {
                        break;
                    }
                }
                // loop between 1 and the bomb's power  to test the upperexplosion (if there's a breakable wall  to erase, if not creates a flame )
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==0){       //  if there's nothing
                            if(i == this.bombRadius){
                                // if i equals the bomb's power, puts the end of the flame
                                arrayBoard[this.bombY-this.bombRadius][this.bombX]=10
                            }else{
                                //if not, puts an vertical flame
                                arrayBoard[this.bombY-i][this.bombX]="V";
                            }
                    }else if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==2) {
                        // if there's a wall to break, draw the next draw of the broken wall
                        arrayBoard[this.bombY-i][this.bombX]=11
                        break;
                    }   
                    else {
                            break;
                    } 
                }
            }
            else if(this.timerBomb>55 && this.timerBomb<57 ){                   // next timer, repeats the same steps, with differents images 
                         // callback of the game over
                if(arrayBoard[this.bombY][this.bombX]==6){
                    arrayBoard[this.bombY][this.bombX]="E2";
                }
              
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==11){    
                            arrayBoard[this.bombY][this.bombX-i]=12
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX-this.bombRadius]==7){
                            arrayBoard[this.bombY][this.bombX-this.bombRadius]="L2"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="H"){
                            arrayBoard[this.bombY][this.bombX-i]="H2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==11){    
                            arrayBoard[this.bombY][this.bombX+i]=12
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX+this.bombRadius]==8){
                            arrayBoard[this.bombY][this.bombX+this.bombRadius]="R2"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="H"){
                            arrayBoard[this.bombY][this.bombX+i]="H2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==11){    
                            arrayBoard[this.bombY+i][this.bombX]=12
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY+this.bombRadius][this.bombX]==9){
                            arrayBoard[this.bombY+this.bombRadius][this.bombX]="D2"
                            
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="V"){
                            arrayBoard[this.bombY+i][this.bombX]="V2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==11){    
                            arrayBoard[this.bombY-i][this.bombX]=12
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY-this.bombRadius][this.bombX]==10){
                            arrayBoard[this.bombY-this.bombRadius][this.bombX]="U2"
                            
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="V"){
                            arrayBoard[this.bombY-i][this.bombX]="V2"
                        }
                    }
                }      
            }

            else if(this.timerBomb>57 && this.timerBomb<59 ){               // next timer, repeats the same steps, with differents images 
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
                      else  if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX-this.bombRadius]=="L2"){
                            arrayBoard[this.bombY][this.bombX-this.bombRadius]="L3"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="H2"){
                            arrayBoard[this.bombY][this.bombX-i]="H3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==12){    
                            arrayBoard[this.bombY][this.bombX+i]=13
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX+this.bombRadius]=="R2"){
                            arrayBoard[this.bombY][this.bombX+this.bombRadius]="R3"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="H2"){
                            arrayBoard[this.bombY][this.bombX+i]="H3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==12){    
                            arrayBoard[this.bombY+i][this.bombX]=13
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY+this.bombRadius][this.bombX]=="D2"){
                            arrayBoard[this.bombY+this.bombRadius][this.bombX]="D3"
                            
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="V2"){
                            arrayBoard[this.bombY+i][this.bombX]="V3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==12){    
                            arrayBoard[this.bombY-i][this.bombX]=13
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY-this.bombRadius][this.bombX]=="U2"){
                            arrayBoard[this.bombY-this.bombRadius][this.bombX]="U3"
                            
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="V2"){
                            arrayBoard[this.bombY-i][this.bombX]="V3"
                        }
                    }
                }
            }

            else if(this.timerBomb>59 && this.timerBomb<62 ){            // next timer, repeats the same steps, with differents images 
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
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX-this.bombRadius]=="L3"){
                            arrayBoard[this.bombY][this.bombX-this.bombRadius]="L4"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="H3"){
                            arrayBoard[this.bombY][this.bombX-i]="H4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==13){    
                            arrayBoard[this.bombY][this.bombX+i]=16
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX+this.bombRadius]=="R3"){
                            arrayBoard[this.bombY][this.bombX+this.bombRadius]="R4"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="H3"){
                            arrayBoard[this.bombY][this.bombX+i]="H4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==13){    
                            arrayBoard[this.bombY+i][this.bombX]=16
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY+this.bombRadius][this.bombX]=="D3"){
                            arrayBoard[this.bombY+this.bombRadius][this.bombX]="D4"
                            
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="V3"){
                            arrayBoard[this.bombY+i][this.bombX]="V4"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==13){    
                            arrayBoard[this.bombY-i][this.bombX]=16
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY-this.bombRadius][this.bombX]=="U3"){
                            arrayBoard[this.bombY-this.bombRadius][this.bombX]="U4"
                            
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="V3"){
                            arrayBoard[this.bombY-i][this.bombX]="V4"
                        }
                    }
                }
            }
            else if(this.timerBomb>62 && this.timerBomb<64 ){             // next timer, repeats the same steps, with differents images  
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E4"){
                    arrayBoard[this.bombY][this.bombX]="E3";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==16){    
                            arrayBoard[this.bombY][this.bombX-i]=17
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX-this.bombRadius]=="L4"){
                            arrayBoard[this.bombY][this.bombX-this.bombRadius]="L3"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="H4"){
                            arrayBoard[this.bombY][this.bombX-i]="H3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==16){    
                            arrayBoard[this.bombY][this.bombX+i]=17
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX+this.bombRadius]=="R4"){
                            arrayBoard[this.bombY][this.bombX+this.bombRadius]="R3"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="H4"){
                            arrayBoard[this.bombY][this.bombX+i]="H3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==16){    
                            arrayBoard[this.bombY+i][this.bombX]=17
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY+this.bombRadius][this.bombX]=="D4"){
                            arrayBoard[this.bombY+this.bombRadius][this.bombX]="D3"
                            
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="V4"){
                            arrayBoard[this.bombY+i][this.bombX]="V3"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==16){    
                            arrayBoard[this.bombY-i][this.bombX]=17
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY-this.bombRadius][this.bombX]=="U4"){
                            arrayBoard[this.bombY-this.bombRadius][this.bombX]="U3"
                            
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="V4"){
                            arrayBoard[this.bombY-i][this.bombX]="V3"
                        }
                    }
                }
            }

            else if(this.timerBomb>64 && this.timerBomb<67) {       // next timer, repeats the same steps, with differents images 
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E3"){
                    arrayBoard[this.bombY][this.bombX]="E2";
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX-i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX-i]==17){    
                            arrayBoard[this.bombY][this.bombX-i]=18
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX-this.bombRadius]=="L3"){
                            arrayBoard[this.bombY][this.bombX-this.bombRadius]="L2"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]=="H3"){
                            arrayBoard[this.bombY][this.bombX-i]="H2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(arrayBoard[this.bombY][this.bombX+i]!=1) {
                        if(arrayBoard[this.bombY][this.bombX+i]==17){    
                            arrayBoard[this.bombY][this.bombX+i]=18
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY][this.bombX+this.bombRadius]=="R3"){
                            arrayBoard[this.bombY][this.bombX+this.bombRadius]="R2"
                            
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]=="H3"){
                            arrayBoard[this.bombY][this.bombX+i]="H2"
                        }
                    }
                }
                 for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY+i][this.bombX]==17){    
                            arrayBoard[this.bombY+i][this.bombX]=18
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY+this.bombRadius][this.bombX]=="D3"){
                            arrayBoard[this.bombY+this.bombRadius][this.bombX]="D2"
                            
                        }
                        else if (arrayBoard[this.bombY+i][this.bombX]=="V3"){
                            arrayBoard[this.bombY+i][this.bombX]="V2"
                        }
                    }
                }
                for ( let i=1; i<=this.bombRadius; i++) {
                    if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]!=1) {
                        if(arrayBoard[this.bombY-i][this.bombX]==17){    
                            arrayBoard[this.bombY-i][this.bombX]=18
                            break
                        }
                        else if(i==this.bombRadius && arrayBoard[this.bombY-this.bombRadius][this.bombX]=="U3"){
                            arrayBoard[this.bombY-this.bombRadius][this.bombX]="U2"
                            
                        }
                        else if (arrayBoard[this.bombY-i][this.bombX]=="V3"){
                            arrayBoard[this.bombY-i][this.bombX]="V2"
                        }
                    }
                }
            }
            else if(this.timerBomb == 67  ) { 
                // erase final of the broken walls(with a % of chance to make a bonus appear), reset of timerBomb; erases the bomb from the array, erase of explosions
                
                this.timerBomb = 0
                this.player.nbBomb++;               // reincrease nbBomb
                numberBomb.pop();
                this.player.endGame();
                if(arrayBoard[this.bombY][this.bombX]=="E2"){   // deletes the explosion's center
                    arrayBoard[this.bombY][this.bombX]=0;
                }                                                     
                // for the left position of the bomb( depends on the bombRadius)
                if(this.bombRadius>=1){     
                    for ( let i=1; i<=this.bombRadius; i++) {
                        if(arrayBoard[this.bombY][this.bombX-i]==18){    
                            arrayBoard[this.bombY][this.bombX-i]=bonusRandom[Math.floor(Math.random()*bonusRandom.length)]; // % of chance to drop a bonus after breaking a wall(18 is the last draw of the breakable wall)
                            break; // breaks the loop after bomb encounters a wall to break,
                        } 
                        else if ( arrayBoard[this.bombY][this.bombX-i]==1 ) {
                          break // breaks the loop after the bombRadius encounters a non-breakable wall
                        }
                        else if (arrayBoard[this.bombY][this.bombX-i]!=1 && arrayBoard[this.bombY][this.bombX-i]!=2 ) {
                            if(arrayBoard[this.bombY][this.bombX-i]==14 || arrayBoard[this.bombY][this.bombX-i]==15 ) {  // check if the square contains a bonus
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
                        if(arrayBoard[this.bombY][this.bombX+i]==18){    
                            arrayBoard[this.bombY][this.bombX+i] = bonusRandom[Math.floor(Math.random()*bonusRandom.length)];
                           break
                        } 
                        else if(arrayBoard[this.bombY][this.bombX+i]==1){
                            break
                        }
                        else if (arrayBoard[this.bombY][this.bombX+i]!=1 && arrayBoard[this.bombY][this.bombX+i]!=2 ) {
                            if(arrayBoard[this.bombY][this.bombX+i]==14 || arrayBoard[this.bombY][this.bombX+i]==15){
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
                        if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==18){    
                            arrayBoard[this.bombY+i][this.bombX] = bonusRandom[Math.floor(Math.random()*bonusRandom.length)];
                            break
                        }
                        else if(this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX]==1) {
                            break
                        }               
                        else if ( this.bombY+i <= LINE -1 && arrayBoard[this.bombY+i][this.bombX] !=1  && arrayBoard[this.bombY+i][this.bombX] !=2){
                            if(arrayBoard[this.bombY+i][this.bombX] ==14  || arrayBoard[this.bombY+i][this.bombX]==15){
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
                        if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==18){    
                            arrayBoard[this.bombY-i][this.bombX] = bonusRandom[Math.floor(Math.random()*bonusRandom.length)];
                            break
                        }
                        else if(this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX]==1) {
                            break
                        }
                        else if ( this.bombY -i>= 0 && arrayBoard[this.bombY-i][this.bombX] !=1  && arrayBoard[this.bombY-i][this.bombX] !=2){
                            if(arrayBoard[this.bombY-i][this.bombX]==14 || arrayBoard[this.bombY-i][this.bombX]==15){
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
                if (i%2==1 && j%2==1){  
                    ctx.drawImage(wall,j*SQUARE_LENGTH,i*SQUARE_LENGTH,SQUARE_LENGTH,SQUARE_LENGTH);
                }
                else if (arrayBoard[i][j]==2) { 
                    ctx.drawImage(imgBrick,j*SQUARE_LENGTH,i*SQUARE_LENGTH,SQUARE_LENGTH,SQUARE_LENGTH);
                }
                else if(arrayBoard[i][j]==3 ){
                   ctx.drawImage(bomb1,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50);
                    }
                else if(arrayBoard[i][j]==4 ){
                        ctx.drawImage(bomb2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==5) {
                    ctx.drawImage(bomb3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==6) {
                    ctx.drawImage(explode,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E2") {
                    ctx.drawImage(explode2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E3") {
                    ctx.drawImage(explode3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="E4") {
                    ctx.drawImage(explode4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==7) {
                    ctx.drawImage(endLeft,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="L2") {
                    ctx.drawImage(endLeft2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="L3") {
                    ctx.drawImage(endLeft3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="L4") {
                    ctx.drawImage(endLeft4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==8) {
                    ctx.drawImage(endRight,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="R2") {
                    ctx.drawImage(endRight2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="R3") {
                    ctx.drawImage(endRight3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="R4") {
                    ctx.drawImage(endRight4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==9) {
                    ctx.drawImage(endDown,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="D2") {
                    ctx.drawImage(endDown2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="D3") {
                    ctx.drawImage(endDown3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="D4") {
                    ctx.drawImage(endDown4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==10) {
                    ctx.drawImage(endUp,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="U2") {
                    ctx.drawImage(endUp2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="U3") {
                    ctx.drawImage(endUp3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="U4") {
                    ctx.drawImage(endUp4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==11) {
                    ctx.drawImage(wall1,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==12) {
                    ctx.drawImage(wall2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==13) {
                    ctx.drawImage(wall3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==16) {
                    ctx.drawImage(wall4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==17) {
                    ctx.drawImage(wall5,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==18) {
                    ctx.drawImage(wall6,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==14) {
                    ctx.drawImage(bombblue,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]==15) {
                    ctx.drawImage(flammeblue,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="H") {
                    ctx.drawImage(flammeHorizontalExtend,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="H2") {
                    ctx.drawImage(flammeHorizontalExtend2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="H3") {
                    ctx.drawImage(flammeHorizontalExtend3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="H4") {
                    ctx.drawImage(flammeHorizontalExtend4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="V") {
                    ctx.drawImage(flammeVerticalExtend,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="V2") {
                    ctx.drawImage(flammeVerticalExtend2,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="V3") {
                    ctx.drawImage(flammeVerticalExtend3,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
                else if (arrayBoard[i][j]=="V4") {
                    ctx.drawImage(flammeVerticalExtend4,j*SQUARE_LENGTH,i*SQUARE_LENGTH,50,50)
                }
            }
        }
    }
    document.onkeydown = function (e) { 
        player1.deplace(e);
        player2.deplace(e);
       }
    
    function drawGame() {                   // global funtion to draw everything, the board, players, walls, animations( method cooldown)
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.drawImage(background,0,0,WIDTH,HEIGHT);  
        createWall();
        player1.draw();
        player2.draw();
        for (element of numberBomb) {
            element.cooldown();             // each bomb in the array numberBomb calls the method cooldown(references the timer, and all animations)
        }    
    }
    createArray();
    
    window.setInterval(drawGame,DELAY);     // interval to repeat the drawGame every 40 ms
}

// function gameOver() {

// }