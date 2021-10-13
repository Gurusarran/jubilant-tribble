
var monkey , monkey_running, monkeyOut;
var obstacle, obstacleImage,backgr, backImage, restartimg;
var FoodGroup, obstacleGroup, ghost, ghostImage,ghostGroup, roto,rotoImage,rotoGroup;
var score=0;
var ground, invisible;
var survivalTime= 0;
var GameState;
var PLAY, END;



function preload(){
  
  
  monkey_running =            loadAnimation("d1.gif","d2.gif","d3.gif","d5.gif","d6.gif","d7.gif")
  
  
  obstacleImage = loadAnimation("pu1.png","pu2.png","pu3.png","pu4.png");
  rotoImage= loadImage("roto.png");
  ghostImage = loadAnimation("gho1.png","gho2.png");
  monkeyOut=loadAnimation("d15.gif");
  backImage=loadImage("pixsav.jpg");
  restartimg=loadImage("button.png");
  
 
}



function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale= 1.56;
  //backgr.x=backgr.width/2;
  backgr.velocityX= -5.5;
  
  PLAY= 1;
  GameState= PLAY;
  END= 0;
  
  FoodGroup= new  Group();
  obstacleGroup= new Group();
  rotoGroup= new Group();
  ghostGroup= new Group();
  
  monkey= createSprite(70,350,50,50);
  monkey.addAnimation("monkey",monkey_running);
 
  monkey.scale= 1.2;

  restart = createSprite(390,240);
  restart.addImage(restartimg);
  restart.scale= 0.3;

  restart.visible = false;
  
  ground= createSprite(400,383,1000,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  ground.visible= false;
  
  invisible= createSprite(250,385,1000,10)
  invisible.x= ground.width/2;
  invisible.velocityX= -4;
  invisible.visible= false;
  
  monkey.setCollider("circle",0,0,55);
  //monkey.debug= true;
  

  
}


function draw() {
  background(255);



  if(GameState===PLAY){
    
    backgr.velocityX = -(5 + 3* score/100)
    score = score + Math.round(getFrameRate()/60.4);
    
    
    
    if(ground.x<0){
     ground.x=ground.width/2; 
                  }
    
    if(backgr.x<0){
     backgr.x=backgr.width/1.5; 
                  }
    
    if(invisible.x<0){
      invisible.x= invisible.width/2;
                     }
    
    if(keyDown("space")&&monkey.isTouching(ground)){
      monkey.velocityY= -20;
    }

    monkey.velocityY= monkey.velocityY+ 0.75;
        
    
    Obstacle();
    rotor();
    ghost();
    
    
    
    if(monkey.isTouching(obstacleGroup) || monkey.isTouching(rotoGroup) || monkey.isTouching(ghostGroup)  ) {
      //monkey.scale=0.08;
      GameState=END;
     }
    
    
     }

     else if(GameState===END){
     
      restart.visible = true;
      monkey.changeAnimation("JAI SHRI RAMA!",monkeyOut);
      monkey.velocityY=0;
      ground.velocityX= 0; 
       
      invisible.velocityX= 0;
       backgr.velocityX=0;
       obstacleGroup.setVelocityXEach=0;
       rotoGroup.setVelocityXEach=0;
       ghostGroup.setVelocityXEach=0;
       

       obstacleGroup.setLifetimeEach(-1);
       rotoGroup.setLifetimeEach(-1);
       ghostGroup.setLifetimeEach(-1);
       
       
      }
  

  
   
    
    monkey.collide(invisible);

    
  
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
  
  drawSprites();
  
  if (GameState===END){
     stroke('purple');
      textSize(25);
      fill('purple');
      text("GAME OVER: Oops..Sorry,you lost :(  Better luck next time!", 90,120 );

      stroke('black');
      textSize(20);
      fill('black');
      text("Why am I still running?...", 30,265 );
  }


  stroke('red');
  textSize(20);
  fill('red');
  text("Distance: "+score+" feet",350,50 );

  
  if(score>0 && score<50){
    stroke('black');
textSize(20);
fill('black');
text("You're a young hero. Dodge monsters to go protect your village. Press SPACE to jump.",20,150);
}

if(score>50 && score<90){
    stroke('black');
textSize(30);
fill('black');
text("Good Start!",50,50);
}

if(score>100 && score<125){
  stroke('black');
textSize(30);
fill('black');
text("You're getting the hang of it!",350,100);
}

if(score>200 && score<250){
  stroke('black');
textSize(30);
fill('black');
text("Wow, awesome!",50,50);
}

if(score>300 && score<350){
  stroke('black');
textSize(30);
fill('black');
text("What? Unbelievable!",50,50);
}

if(score>400 && score<450){
  stroke('black');
textSize(30);
fill('black');
text("You're a professional!",350,100);
}



}

//function Food() {
  
  //if(frameCount % 80===0){
    //var banana= createSprite(500,10,10,20);
    //banana.addImage("banana",bananaImage);
    //banana.velocityX= -(5+2*score/100);
    //banana.y= Math.round(random(160,200));
    //banana.scale= 0.1;
    //FoodGroup.add(banana);
    //FoodGroup.setLifetimeEach(200);
    //banana.setCollider("rectangle",0,0,400,400);
    //monkey.depth= banana.depth+1;
    
    
                         //}
//}

function Obstacle() {
  if(frameCount% 250=== 0){
    var obstacle= createSprite(800,295,23,32);
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.velocityX= -(5+2*score/100);
    obstacle.scale= 0.60;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(150);
    //obstacle.debug= true;
    obstacle.setCollider("circle",-20,0,85);
    
                          }
}

function rotor() {
  if(frameCount% 550=== 0){
    var roto= createSprite(800,295,33,32);
    roto.addAnimation("obstacle",rotoImage);
    roto.velocityX= -(5+2*score/100);
    roto.scale= 0.30;
    rotoGroup.add(roto);
    rotoGroup.setLifetimeEach(150);
    //roto.debug= true;
    roto.setCollider("circle",0,0,130);
    
                          }
}

function ghost() {
  if(frameCount% 650=== 0){
    var ghost= createSprite(800,295,33,32);
    ghost.addAnimation("obstacle",ghostImage);
    ghost.velocityX= -(5+2*score/100);
    ghost.scale= 0.50;
    ghostGroup.add(ghost);
    ghostGroup.setLifetimeEach(150);
    //ghost.debug= true;
    ghost.setCollider("circle",0,0,90);
    
                          }
}

function reset(){
  GameState= PLAY;
  restart.visible= false;
  obstacleGroup.destroyEach();
  score=0;
  
  
}



