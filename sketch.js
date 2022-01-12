var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gamestate = "play"

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
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  spookySound.loop()
}

function draw() {
  background(0);
  if (gamestate== "play"){
    
    if(tower.y > 400){
      tower.y = 300
    }

    //making movement
    if (keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }    
    if(keyDown("space")){
      ghost.velocityY = -5
    }
    

    //adding gravity to trex
    ghost.velocityY = ghost.velocityY+1

    spawn()

    //making ghost collide
    ghost.collide(climbersGroup)

    if(ghost.isTouching(invisibleBlockGroup)||ghost.y > 600){
      ghost.destroy();
      gamestate = "end"
    }

    drawSprites()

  }
  if(gamestate == "end"){
    fill("white")
    textSize (40)
    text ("Game Over",200,250)
  }


}

function spawn(){
  if(frameCount%200==0){
    door = createSprite(200,-50)
    door.x = Math.round(random(100,500))
    door.addImage(doorImg)
    door.velocityY = 5
    door.lifetime = 600
    //fixing depth
    ghost.depth = door.depth + 1
    doorsGroup.add(door)

    //making climber
    climber = createSprite(200,10)
    climber.x = door.x
    climber.addImage(climberImg)
    climber.velocityY = 5
    climber.lifetime = 600
    climbersGroup.add(climber)

    //invisible block
    invisibleBlock = createSprite(door.x,20,climber.width,5)
    invisibleBlock.velocityY = 5
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)
    
  }

}
