//State Names
var Play = 1;
var End = 0;
var GameState = Play;




var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
  //create monkey
  monkey = createSprite(80,315,200,2)
  monkey.addAnimation("running",monkey_running);
  monkey.scale =0.1
  
  //ground creation and moving ground
  
  ground= createSprite(400,350,800,10)
  ground.velocityX=-5;
  ground.x=ground.width/2;
  ground.shapeColor="lime"
  //creation of score
  score = 0;
  
  //create groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  
  
  //collider
  //monkey.setCollider("rectangle",0,0,200,200);
  

  
}


function draw() {
  background("pink")
 

  console.log(GameState)
  
  
  
  
  
  
  
 if(GameState===Play){
   createObstacle();
   createFoods();
   
   
   monkey.velocityY=monkey.velocityY+0.8
   fill("indigo")
   text("Banana:"+score, 150,20)
   
   if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score+=1
  }
   //jumps
   
   if(keyDown("space")&& monkey.y>310){
     monkey.velocityY= -17
  }
   if(ground.x<0){
     ground.x=ground.width/2
  }
   
   if(obstacleGroup.isTouching(monkey)){
     GameState = End;
   
   }
   
   
   
 }
  else if(GameState===End){
    monkey.velocityX=0
    monkey.visible=false;
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1);
    fill("indigo")
    text("You score is " + score,200,200)
    text("to restart game press spacebar",200,300);
    if(keyDown("space")){
      reset()
  }
}
  
  
   
  
  monkey.collide(ground);
  
  drawSprites()
  
}
function reset(){
  GameState = Play;
  FoodGroup.destroyEach()
  obstacleGroup.destroyEach()
  score=0
  monkey.visible=true;
}


//obstacle creation and addition


function createObstacle(){
  if(frameCount%140===0){
    //creating the obstacle and image
    var obstacle=createSprite(400,310,20,20);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    
    
    //assign lifetime
    obstacle.lifetime=100;
    
    //velocity for obstacle
    obstacle.velocityX=-2*(score+5)
    
    //assigning to groups
    obstacleGroup.add(obstacle);
     }
}
//create food
function createFoods(){
  if (frameCount%100===0){
    //banana creatiion and look
    var banana = createSprite(400,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    //assign lifetime
    banana.lifetime=100;
    
    //banana velocity
    banana.velocityX=-4;
    
    //assigning groups
    FoodGroup.add(banana)
    
  }
}




