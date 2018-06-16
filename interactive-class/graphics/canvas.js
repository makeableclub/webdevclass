function drawLine(x, y, x2, y2) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function drawCircle() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(195, 300, 40, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawText(text) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    // ctx.fillText(text, 10, 50);
    ctx.strokeText(text, 10, 50);
}

function drawGradient() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(20, 100, 150, 80);
}
