var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fish, fishImg
var ocean, invisibleGround, oceanImage;

var sharkGroup

var score;
var gameOverImg,restartImg
var gameOver, restart


function preload(){
  
  oceanImage=loadImage("ocean.png")
  
  fishImg=loadImage("fish-removebg-preview.png")
  sharkImg=loadImage("shark-removebg-preview.png")

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(600, 200);

  sharkGroup = new Group()
  var message = "This is a message";
 console.log(message)

 

  ocean = createSprite(200,180,400,20);
  ocean.addImage("ocean",oceanImage);
  ocean.x = ocean.width /2;

  fish = createSprite(50,160,20,50)
  fish.addImage("fish", fishImg)
    fish.scale=0.07

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  fish.setCollider("rectangle",0,0,fish.width,fish.height);
  
  score = 0;
  

}

function draw(){
background(180);



if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;
  
  ocean.velocityX = -(4 + 3* score/100)
 
  score = score + Math.round(getFrameRate()/60);
  
  
  
  if (ocean.x < 0){
    ocean.x = ocean.width/2;
  }
  
  
  if(keyDown("space")&& fish.y >= 100) {
      fish.velocityY = -12;
  }
  

  fish.velocityY = fish.velocityY + 0.8


  


  spawnShark();
  
  if(sharkGroup.isTouching(fish)){
      gameState = END;
   
    
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
 

 

 
 
  ocean.velocityX = 0;
  fish.velocityY = 0
  
 
  
sharkGroup.setLifetimeEach(-1);

 
 sharkGroup.setVelocityXEach(0);
  

 if(mousePressedOver(restart)) {
  reset();
}
}



fish.collide(invisibleGround);




drawSprites();
fill("black")
textSize(18)
text("Score: "+ score, 500,50);

}


function reset(){
  
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
sharkGroup.destroyEach();
 score=0;
 }

function spawnShark(){

  if (frameCount % 60 === 0){
   
    var shark = createSprite(600,165,10,40);
    shark.addImage(sharkImg)
    shark.velocityX = -(6 + score/100);

    shark.scale = 0.2;
    shark.y = Math.round(random(50,180))
    shark.lifetime = 300;
    sharkGroup.add(shark)
  }
}






















