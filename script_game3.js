var circles = [];

function setup() {
  createCanvas(640, 360);
  
  
  for (var i = 0; i < 20; i++){
    var circle = {
  
   x: random(width),
   y: random(height),
   r: random(10, 50)
  };
    var overlapping = false;
    
    for(var j = 0; j < circles.length; j++){
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y)
      if(d < circle.r + other.r){
        overlapping = true;
        break;
      }

    }
    if(!overlapping){
       circles.push(circle);
    }
    
   for ( i = 0; i < circles.length; i++){
     fill(100, 100);
     noStroke();
     ellipse(circles[i].x,circles[i].y,circles[i].r*2, circles[i].r*2)
   }
}
  
  
  
}
