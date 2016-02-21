function draw(){
  // Loop through all images
  for (var i = 0; i < document.images.length; i++) {
    if (document.images[i].getAttribute('id') != 'frame'){
      //Create canvas element
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', 132);
      canvas.setAttribute('height', 150);

      // Insert before the image
      document.images[i].parentNode.insertBefore(canvas, document.images[i]);

      ctx = canvas.getContext('2d');

      // Draw image to canvas
      ctx.drawImage(document.images[i], 15, 20);

      // Add a frame
      ctx.drawImage(document.getElementById('frame'), 0, 0);
    }
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
