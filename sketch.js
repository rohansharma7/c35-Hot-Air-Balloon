var balloon, balloonImage;
var backgroundImage;
var database;
var balloonposition, position;

function preload()
{
  balloonImage = loadImage("Hot Air Ballon-02.png");

  backgroundImage = loadImage("Hot Air Ballon-01.png")
}

function setup() 
{
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImage);
  balloon.scale = 0.5;

var balloonPosition = database.ref('balloon.height');
balloonPosition.on("value", readPosition, showError);


}

function draw() 
{
  background(backgroundImage);  

  text("**Use arrow keys to move Hot Air Balloon!", 150,30);

  if(keyDown(LEFT_ARROW))
  {
    balloon.x = balloon.x - 10;
}
else if(keyDown(RIGHT_ARROW))
{
   balloon.x = balloon.x + 10;
}
else if(keyDown(UP_ARROW))
{
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale - 0.01;
}
else if(keyDown(DOWN_ARROW))
{
   updateHeight(0,10);
   balloon.addAnimation("hotAirBalloon", balloonImage3);
   balloon.scale = balloon.scale + 0.01;
}

  drawSprites();
}

function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x': updateHeight.x + x,
    'y': updateHeight.y + y
  })
}

function readHeight(data)
{
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
  console.log("Error in writing to the database");
}