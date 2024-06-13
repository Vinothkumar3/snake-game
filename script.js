const gameBoard=document.getElementById("gameboard")
const context=gameBoard.getContext("2d");
const scoreVal=document.getElementById("scoremsg")
const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
const UNIT= 25;
let FoodX
let FoodY
let xVel=25
let yVel=0
let scores=0
let Active=true
let Started=false

let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT*1,y:0},
    {x:0,y:0} ]

window.addEventListener("keydown",keyPress)

StartGame()



function StartGame(){
context.fillStyle="#161618";
context.fillRect(0,0,WIDTH,HEIGHT)
CreateFood()
DisplayFood()
DrawSnake()

}

function ClearBoard(){
   context.fillStyle="#161618";
context.fillRect(0,0,WIDTH,HEIGHT)
}

function CreateFood(){
    FoodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    FoodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
        
}

function DisplayFood(){
    context.fillStyle="red";
    context.fillRect(FoodX,FoodY,UNIT,UNIT)
}

function DrawSnake(){
     context.fillStyle="white";
     context.strokeStyle="#161618"
     snake.forEach((snakes)=>{
       
    context.fillRect(snakes.x,snakes.y,UNIT,UNIT)
    context.strokeRect(snakes.x,snakes.y,UNIT,UNIT)
})
}

function moveSnake(){
let head={x:snake[0].x+xVel,
          y:snake[0].y+yVel
          }

     let add=snake.unshift(head)
        
     
     if(snake[0].x==FoodX && snake[0].y==FoodY){
        scores+=1
        scoreVal.textContent=scores
       CreateFood()
     }
     else{
     let pop=snake.pop()

     }

  } 
  
  
  
function Nexttick(){
    if(Active){
    setTimeout(() => {
        ClearBoard()
        DisplayFood()
        moveSnake() 
        DrawSnake()  
        checkGameOver()
        Nexttick()
    },500);
}
else{
    ClearBoard()
    context.font="bold 50px serif"
    context.fillStyle="white"
    context.textAlign="center"
    context.fillText("Game Over!",WIDTH/2,HEIGHT/2)
}
}

function keyPress(event){
if(!Started){
    Started=true
    Nexttick()
}
let LEFT=37;
let RIGHT=39;
let UP=38;
let Down=40;

    switch (true) {
        case (event.keyCode==LEFT && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0
            break;
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;    
            yVel=0
           break;
       
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;   
        case(event.keyCode==Down && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT
            break;
    }
}

 function checkGameOver(){
    
switch (true) {
    case (snake[0].x<0):
    case (snake[0].x>=WIDTH):
    case (snake[0].y<0):
    case (snake[0].y>=HEIGHT):
        Active=false
        break;


}
 }