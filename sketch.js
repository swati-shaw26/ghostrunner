var gameState= "play";
var tower,door,climber,invisibleblock,ghost;
var towerImg,doorImg,doorGroup,climberImg,climberGroup,
invisibleblockGroup,ghostImg;
var spookysound;

function preload(){
towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookysound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  spookysound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=3;
  
  ghost=createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleblockGroup=new Group();
  
}
function draw(){
  background(0);
  if(gameState==="play"){
  if(tower.y>500){
    tower.y=300;
  }  
    if(keyDown("space")){
      ghost.velocityY=-3;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if(keyDown("right")){
      ghost.x=ghost.x+2;
    }
    if(keyDown("left")){
      ghost.x=ghost.x-2;
    }
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
  spawnDoors();
  drawSprites();
  }
  if(gameState==="end"){
    stroke("lightblue");
    fill("yellow");
    textSize(30);
    text("Game Over",200,250);
  }
}
function spawnDoors(){
  if(frameCount%150===0){
    door=createSprite(250,-50);
    door.x=Math.round(random(300,500));
    door.addImage(doorImg);
    door.velocityY=3;
    
    climber=createSprite(250,14);
    climber.addImage(climberImg);
    climber.velocityY=3;
    climber.x=door.x;
    
    invisibleblock=createSprite(250,20,climber.width,2);
    invisibleblock.debug=true;
    invisibleblock.velocityY=3;
    invisibleblock.x=door.x;
    doorGroup.add(door);
    door.lifetime=700;
    climberGroup.add(climber);
    climber.lifetime=700;
    invisibleblockGroup.add(invisibleblock);
    invisibleblock.lifetime=700;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
  }
}