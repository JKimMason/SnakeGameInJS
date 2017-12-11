const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


// Load images
let imageName = new Image();
imageName.src = "path/img.png";
let audioName = new Audio();
audioName.src = "path/audio.png";
audioName.ply();


// Draw images
ctx.drawImage(imageName, X, Y, Width, Height);
ctx.draw