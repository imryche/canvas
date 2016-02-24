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

    var sin = Math.sin(Math.PI / 24);
    var cos = Math.cos(Math.PI / 24);
    ctx.translate(100, 100);
    var c = 0;
    ctx.globalAlpha = 1;


    for (var i = 0; i < 48; i++) {
      c = Math.floor(255 / 24 * i);
      ctx.fillStyle = 'rgb(' + c + ',' + c + ',' + c + ')';
      ctx.fillStyle = getRandomColor();
      ctx.globalAlpha -= ctx.globalAlpha / 24;
      ctx.fillRect(0, 0, 100, 10);
      ctx.transform(cos, sin, -sin, cos, 0, 0);
    }

    ctx.setTransform(-1, 0, 0, 1, 100, 100);
    ctx.fillStyle = 'rgba(255, 128, 255, 0.5)'
    ctx.fillRect(0, 50, 100, 100);
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
