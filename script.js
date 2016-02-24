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

    ctx.fillRect(0, 0, 150, 150);
    ctx.translate(75, 75);

    // Create a circular clipping path
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
    ctx.clip();

    // Draw background
    var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');

    ctx.fillStyle = lingrad;
    ctx.fillRect(-75, -75, 150, 150);

    for (var j = 1; j < 50; j++){
      ctx.save();
      ctx.fillStyle = getRandomColor();
      ctx.translate(75 - Math.floor(Math.random() * 150),
        75 - Math.floor(Math.random() * 150));
      drawStar(ctx, Math.floor(Math.random() * 4) + 2);
      ctx.restore();
    }

  } else {
    // canvas-unsupported code
    console.log('Sorry, your browser doesn\'t support canvas');
  }
}

function drawStar(ctx, r){
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++){
    ctx.rotate(Math.PI / 5);
    if  (i % 2 === 0){
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
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
