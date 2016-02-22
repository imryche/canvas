function draw(){
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var scaleFactor = backingScale(ctx);
    if (scaleFactor > 1) {
      var width = canvas.width;
      var height = canvas.height;
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      //update context for scaled canvas
      ctx.scale(scaleFactor, scaleFactor);
    }

    // left rectangles, rotate from canvas origin
    ctx.save();
    // blue rect
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(30, 30, 100, 100);
    ctx.rotate((Math.PI / 180) * 25);
    // grey rect
    ctx.fillStyle = '#4D4E53';
    ctx.fillRect(30, 30, 100, 100);
    ctx.restore();

    // right rectangles, rotate from rectangle center
    // draw blue rect
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(150, 30, 100, 100);
    ctx.translate(200, 80); // translate to rectangle center
                          // x = x + 0.5 * width
                          // y = y + 0.5 * height
    ctx.rotate((Math.PI / 180) * 25);
    ctx.translate(-200, -80);

    // draw grey rect
    ctx.fillStyle = "#4D4E53";
    ctx.fillRect(150, 30, 100, 100);

  } else {
    // canvas-unsupported code
    console.log('Sorry, your browser doesn\'t support canvas');
  }
}

function getRandomColor(){
  var rgb = [];
  var min = 0;
  var max = 255;
  for (var i=0; i<3; i++){
    var randInt = Math.round(Math.random() * (max - min) + min);
    rgb.push(randInt);
  }
  return 'rgb(' + rgb.join() + ')';
}

function getRandomPos(canvas, context){
  var scale = backingScale(context);
  var randX = Math.random() * (canvas.width - 0) + 0;
  var randY = Math.random() * (canvas.height - 0) + 0;
  return [Math.round(randX / scale), Math.round(randY / scale)];
}

function backingScale(context){
  if ('devicePixelRatio' in window) {
    if (window.devicePixelRatio > 1){
      return window.devicePixelRatio;
    }
  }
  return 1;
}
