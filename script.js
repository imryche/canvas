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

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.save();
        ctx.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ', 255';
        ctx.translate(10 + j * 50, 10 + i * 50);
        ctx.fillRect(0, 0, 25, 25);
        ctx.restore();
      }
    }

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
