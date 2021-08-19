var catcher,apple,orangeL,redL,fruitbowl;
var catcherImg,carrotImg,orangeImg,redImg,fruitbowlImg;
var score = 0;
var bg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var appleGroup, orangeLGroup, redLGroup, fruitsGroup;
var gameOver, gameOverImg;

function preload(){
  catcherImg = loadImage("catcher.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png");
  gameOverImg = loadImage("gameover.png");
  fruitbowlImg = loadImage("fruit bowl.png");
  bg = loadImage("Fruitsu BG.jpg");
}


function setup(){
  createCanvas(1000,550);

  //creating boy running
  catcher = createSprite(160,540,20,20);
  catcher.scale =0.6;
  catcher.addImage(catcherImg);

  catcher.debug = false;
  
  appleGroup = new Group();
  orangeLGroup = new Group();
  redLGroup = new Group();
  fruitsGroup = new Group();
  
  gameOver = createSprite(500,275);
  gameOver.addImage(gameOverImg);
  
}

function draw() {
  background(bg);
  fill("white");
  textSize(24);
  text("Score: "+ score, 800,30);
  if(gameState == PLAY){
    gameOver.visible = false;
    if(appleGroup.isTouching(catcher) || orangeLGroup.isTouching(catcher) || fruitsGroup.isTouching(catcher)){
      score = score + 5;
      appleGroup.destroyEach();
      orangeLGroup.destroyEach();
      fruitsGroup.destroyEach();
    }
    
    if(keyDown(RIGHT_ARROW)){
      catcher.x = catcher.x + (18+score/2);
    }
    if(keyDown(LEFT_ARROW)){
      catcher.x = catcher.x - (18+score/2);
    }
  
    edges= createEdgeSprites();
    catcher.collide(edges);
    
    var select_sprites = Math.round(random(1,4));
    
    if (frameCount % 25 == 0) {
      if (select_sprites == 1) {
        createApples();
      } 
      else if (select_sprites == 2) {
        createOrange();
      }
      else if (select_sprites == 3) {
        createfruits();
      }
      else {
        createRed();
      }
    }
    if(redLGroup.isTouching(catcher)){
      gameOver.visible = true;
      redLGroup.setVelocityYEach(0);
      orangeLGroup.setVelocityYEach(0);
      redLGroup.setLifetimeEach(-1);
      orangeLGroup.setLifetimeEach(-1);
      gameState = END;
    }
  }
  drawSprites();
}

function createApples() {
  apple = createSprite(random(1000, 550),40, 10, 10);
  apple.addImage(appleImg);
  apple.scale=0.07;
  apple.velocityY = (8+(score/5));
  apple.lifetime = 150;
  appleGroup.add(apple);
}

function createfruits() {
  fruits = createSprite(random(1000, 550),40, 10, 10);
  fruits.addImage(fruitbowlImg);
  fruits.scale=0.09;
  fruits.velocityY = (8+(score/5));
  fruits.lifetime = 150;
  fruitsGroup.add(fruits);
}

function createOrange() {
  orangeL = createSprite(random(50, 750),40, 10, 10);
  orangeL.addImage(orangeImg);
  orangeL.scale=0.08;
  orangeL.velocityY = (7+(score/4));
  orangeL.lifetime = 150;
  orangeLGroup.add(orangeL);
}

function createRed() {
  redL = createSprite(random(50, 750),40, 10, 10);
  redL.addImage(redImg);
  redL.scale=0.06;
  redL.velocityY = (7+(score/4));
  redL.lifetime = 150;
  redLGroup.add(redL);
}
