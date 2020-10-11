var PLAY=1
var END=0
var gameState = PLAY;
var monkey , running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground,survivalTime;
var gameOver, restart,monkey_collided;

function preload(){
  
   monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
    createCanvas(400,600);
monkey= createSprite(50,330,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided)
  monkey.scale=0.1;
  
  ground = createSprite(200,380,800,40);
  ground.x = ground.width /2;
  ground.velocityX = -6
  
 
  gameOver = createSprite(180,160);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(180,200);
  restart.addImage(restartImg); 
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
  survivalTime=0;
}


function draw() {
background(600, 200);
   if (gameState===PLAY){
     
     gameOver.visible = false;
  restart.visible = false;
    
    ground.velocityX = -6;
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    spawnfood();
    spawnObstacles();
           
      
   if(monkey.isTouching(FoodGroup)) {
     FoodGroup.destroyEach();
       score=score+1
      
    }
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
     monkey.changeAnimation("collided",monkey_collided);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
     
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
      reset();
    }
    
                  }
  drawSprites();

  
   var survivalTime=0;
       
       stroke("white");
       textSize(20);
       fill("black")
       text("score"+ score,300,30);
       
       stroke("black");
       textSize(20);
       fill("black");
       survivalTime=Math.ceil(frameCount/frameRate())
       text("survivalTime"+ survivalTime,250,50);
    }
function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,340,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    obstacle.setCollider("circle",0,0,260);
    //obstacle.debug=true;
    //generate random obstacles
    var rand = Math.round(random(80,120));
    obstacle.addImage(obstacleImage);
              
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
 monkey.changeAnimation("running",monkey_running);

  
  score = 0;
  survivalTime=0;
}




