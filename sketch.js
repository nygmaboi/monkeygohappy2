//creating variables
var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  //loading images
  backImage=loadImage("jungle.png");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

 bananaImage = loadImage("banana.png");
 obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  //making the variables
  ground = createSprite(400,350,1600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //ground.visible=false;
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  backgr.visible = false;
  
  monkey=createSprite(50, 318, 1, 1);
  monkey.addAnimation("bhagtahuabandar", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(220);
  
  //moving ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100) {
    backgr.x=backgr.width/2;
  }
  //destroy banana if it touches the monkey
  if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 2; }

  //make the monkey jump
  if(keyDown("space") ) {
    monkey.velocityY = -12; 
  }
  monkey.velocityY = monkey.velocityY + 0.8;                       monkey.collide(ground);

  //making money small when he touches the obstacle
  if(obstaclesGroup.isTouching(monkey)) {
    monkey.scale=0.08;
    //score=score-2;  
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  //calling the functions
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
}

//making functions
function spawnObstacles() {
  if(World.frameCount % 200 === 0) {
    var obstacle = createSprite(400,325,10,40);
    obstacle.addImage(obstacle_img);
    obstacle.velocityX = -6;    
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    obstacle.setCollider("circle",0,0,175);
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnBananas () {
  if (World.frameCount %60 === 0) {
    var banana = createSprite(400, 10, 40);
    banana.y = random(120, 180);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.05;
    banana.lifetime = 70;
    FoodGroup.add(banana);
  }
}  

