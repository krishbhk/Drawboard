//jshint esversion:6
let canvas = document.getElementById('canvas');

canvas.width = 0.98*window.innerWidth;
canvas.height = window.innerHeight;

var io = io.connect("http://localhost:3000/");

let context = canvas.getContext('2d');

let x,y;
let mouseDown = false;

window.onmousedown = (e) => {
    context.moveTo(x, y);
    io.emit('down', {x,y});
    mouseDown = true;
};

window.onmouseup = (e) => {
    mouseDown = false;
};

window.onmousemove = (e) => {
    x = e.clientX;
    y = e.clientY;
    console.log(x,y);

    if(mouseDown) {
        io.emit('draw', {x,y});
        context.lineTo(x,y);
        context.stroke();
    }
};

io.on('onDraw', ({x,y})=>{
    context.lineTo(x,y);
    context.stroke();
});

io.on('onDown', ({x,y})=>{
    context.moveTo(x,y);
});