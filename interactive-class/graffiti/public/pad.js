'use strict';

(function() {

  var socket = io();
  socket.emit('name', 'pad');

  var canvas = document.getElementsByClassName('pad')[0];
  var context = canvas.getContext('2d');

  var current = {
    color: 'yellow'
  };

  // drawing button is toggled
  var isDrawingSelected = false;
  // mouse or touch is pressedDown
  var isPressedDown = false;

  // change drawing pen color
  var colors = document.getElementsByClassName('color');
  for (var i = 0; i < colors.length; i++){
     colors[i].addEventListener('click', onColorUpdate, false);
  }

  function onColorUpdate(e){
      current.color = e.target.className.split(' ')[1];
      console.log("color selected: " + current.color);
  }

  var buttons = document.getElementsByClassName('button');
  for (var i=0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', onSelectCommand, false);
  }

  function onSelectCommand(e) {
      var cmd = e.target.className.split(' ')[1];
      console.log("command selected: " + cmd);
      switch(cmd) {
          case "paint":
            isDrawingSelected = !isDrawingSelected;
            console.log("isDrawingSelected: " + isDrawingSelected);
            e.target.style.color = isDrawingSelected ? "blue" : "gray";
          break;

          case "write":
            var response = prompt("Text Input", "pls write sth");
            console.log("sending text: " + response);

            socket.emit('writing',{
                content: response
            });
            break;
            
          case "clear":
            socket.emit('clearing', {
                target: 'canvas'
            });
          break;

          default: break;
      }
  }

  // add event addEventListener
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchmove', throttle(onTouchMove, 10), false);
  canvas.addEventListener('touchend', onTouchEnd, false);

  function drawLine(x0, y0, x1, y1, color, isDrawing)
  {
      var w = canvas.width;
      var h = canvas.height;

      // we use "isDrawing" falg to differentiate "moving cursor" vs actually "drawing line"
      if (isDrawing) {
          socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
          });
      }
      else {
          socket.emit('moving', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h
          });
      }
  }


  // For touchscreen finger draw
  function onTouchStart(e){
    isPressedDown = true;
    current.x = e.touches[0].clientX;
    current.y = e.touches[0].clientY;
    e.preventDefault();
  }

  function onTouchMove(e){
    var drawing = isPressedDown & isDrawingSelected;
    drawLine(current.x, current.y, e.touches[0].clientX,e.touches[0].clientY, current.color, drawing);
    current.x = e.touches[0].clientX;
    current.y = e.touches[0].clientY;
    e.preventDefault();
  }

  function onTouchEnd(e){
    var drawing = isPressedDown & isDrawingSelected;
    drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, drawing);
    isPressedDown = false;
  }

  // for mouse draw
  function onMouseDown(e){
    isPressedDown = true;
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseMove(e){
    // if (!drawing) { return; }
    var drawing = isPressedDown & isDrawingSelected;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, drawing);
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseUp(e){
    // if (!drawing) { return; }
    var drawing = isPressedDown & isDrawingSelected;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, drawing);
    isPressedDown = false;
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  window.addEventListener('resize', onResize, false);
  onResize();

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('orientationchange', handleOrientation);

  function handleOrientation(event) {
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]
    console.log("beta=" + x + " gamma=" + y);
    // alert("changed orientation");
  }

  // document.body.requestFullscreen();
  document.ontouchmove = function(e){ e.preventDefault(); }

})();
