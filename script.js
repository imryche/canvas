var img = new Image();

img.src = 'http://localhost:8000/rhino.png';
img.onload = function(){
  draw(this);
};

function draw(img){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  var invert = function(){
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var grayscale = function(){
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var invertBtn = document.getElementById('invertbtn');
  invertBtn.addEventListener('click', invert);
  var grayscaleBtn = document.getElementById('grayscalebtn');
  grayscaleBtn.addEventListener('click', grayscale);
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
