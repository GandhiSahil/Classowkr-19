var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  ghost= createSprite(200,200,50,50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale=0.3
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup=new Group()
  climbersGroup= new Group()
  invisibleBlockGroup= new Group()
  
  ghost.debug=true
  
}

function draw() {
  background(200);
  if (gameState==="play"){

  
  
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("left_arrow")){
     ghost.x=ghost.x-3
    }
    if (keyDown("right_arrow")){
    ghost.x=ghost.x+3
    }
    if (keyDown("space")){
      ghost.velocityY=-10
     }
     ghost.velocityY=ghost.velocityY+0.8
     if (climbersGroup.isTouching(ghost)){
       ghost.velocityY=0

     }
     if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
       ghost.destroy()
       gameState="end"
     }
     spawn()
    drawSprites();
}
if (gameState==="end"){
  text("gameOver", 220, 250)
}
}

function spawn(){
  if (frameCount%250===0){
    var door=createSprite(200,-50)
    var climbers=createSprite(200,10)
    var invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climbers.width
    invisibleBlock.height=2
    door.x=Math.round(random(120,400))
    climbers.x=door.x
    invisibleBlock.x=door.x

    door.addImage(doorImg)
    climbers.addImage(climberImg)

    door.velocityY=1
    climbers.velocityY=1
    invisibleBlock.velocityY=1
    ghost.depth=door.depth
    ghost.depth+=1
    
    door.debug=true
    climbers.debug=true
    invisibleBlock.debug=true

    door.lifetime=800
    climbers.lifetime=800
    invisibleBlock.lifetime=800
    doorsGroup.add(door)
    climbersGroup.add(climbers)
    invisibleBlockGroup.add(invisibleBlock)
  }
}
