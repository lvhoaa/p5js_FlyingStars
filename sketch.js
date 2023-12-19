// HI, this is the project Flying Star to stimulate flying stars in the sky
// You can click in the screen to create a star. Then this star will fly in random direction. If it hits the wall/boundary, it will bounce back in another direction 

let stars = []; // list of stars 
  function preload(){
    bgimg = loadImage('night.jpeg')
  }
  function setup() {
    createCanvas(500,400);
  }

  function draw() {
    background(bgimg);
    for (let i = 0; i < stars.length; i++) {
      stars[i].move();
      stars[i].checkBoundary();
      stars[i].display();
    }
  }

  function mousePressed() {
    stars.push(new Star(mouseX, mouseY));
  }

  class Star {
    constructor(x,y) {
      this.x=x;
      this.y=y;
      this.radius=9; 
      this.speed=5; // change to 100 to see real speed of stars :D 
      this.angle=random(TWO_PI); // random direction
    }

    move() {
      this.x+=this.speed*cos(this.angle);
      this.y += this.speed*sin(this.angle);
    }
    
    // bounce back every time it reaches the boundary 
    checkBoundary() {
      if (this.x-this.radius< 0||this.x+this.radius > width){
        this.angle= random( PI,TWO_PI);
      }
      if (this.y-this.radius< 0||this.y+this.radius>height) {
        this.angle= random(-PI/2, PI/2);
      }
    }

    display() {
      fill(255,255,0); //yellow
      noStroke();
      drawStar(this.x,this.y,this.radius,this.radius*2,5); 
    }
  }

  function drawStar(x, y, r1, r2, n) {
    let angle =TWO_PI/n;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI/ 2; a<TWO_PI-PI/2; a+=angle) {
      let sx= x+cos(a)*r2;
      let sy = y + sin(a)*r2;
      vertex(sx, sy);
      sx = x + cos(a+halfAngle)* r1;
      sy = y + sin(a+ halfAngle)*r1;
      vertex(sx,sy);
    }
    endShape(CLOSE);
  }