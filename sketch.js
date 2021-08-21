let img, video, mouthKeypoint, handpose, facemesh;
let facePredictions = [];
let handPredictions = [];
let faceModelLoadedIndi = false;
let handModelLoadedIndi = false;
let cakeMoverX = 0;
let score = 0
let cakeSpeed = 2;

let win = false;
let menu = true;

let loader = "Loading…"
let startButton;

let mode = "cake";
let cakes = ['🎂','🥮','🍰','🧁','🥦','🥕','🥒','🌽'];
let selectedCake = cakes[0];


function setup() {
startButton = createButton("Start")
startButton.hide();
noStroke();
createCanvas(640,480)
video = createCapture(VIDEO);
video.size(640, 480)
handpose = ml5.handpose(video, handModelLoaded);
handpose.on('predict', results => {
handPredictions = results;
})
video.hide();
cakeMoverY = height/2;
}
function draw(){
  if(score > 19){
    win = true;
  }
  // translate(width,0);
  // scale(-1.0,1.0);  
  background(255)
  image(video,0,0);
  if (faceModelLoadedIndi && handModelLoadedIndi){
    // drawFaceKeypoints();
    // drawHandKeypoints();
    drawMouth();
    drawHand();
    if(menu){
    loader = "";
    startButton.show();
    startButton.position(20,280)
    startButton.mousePressed(startSketch)
    }
  }
  textSize(48)
  cakeMoverX += cakeSpeed;
  if(cakeMoverX > width){
    newCake();
  }
  text(selectedCake,cakeMoverX, cakeMoverY)
  push()
  fill('#E4EBFE');
  stroke('#1F36A3')
  strokeWeight(4)
  text(score,width-100, height-50 )
  pop();

  speed();
  if(menu){
    push()
    fill('rgb(225,235,255)');
    rect(0,0,width,height)
    fill(0);
    textAlign(LEFT);
    textSize(24)
    text("Processing turned 20, Hooray! 🎉", 20, 50)
    textSize(20)
    text("This means you need to eat a lot of cake. \nUse your mouth to get the cakes🎂, but avoid the veggies🥦. \nYou can use your hand to fend off those bad veggies. \n\nPlease allow your webcam to be used." , 20, 100)
    text(loader, 20, 280)
    textSize(16)
    text("Made with ❤️, p5.js & ml5.js by Tom-Lucas Säger | 🐦@t00may", 20, height - 40 )
    pop();
  }
  if(win){
    push()
    fill('rgba(225,235,255, 0.5)');
    rect(0,0,width,height)
    pop();
    push()
    fill(0)
    textSize(64)
    text("Happy Birthday,\nProcessing!",50,height/3 )
    pop();
  }

}
function startSketch(){
  cakeMoverX = 0;
  startButton.hide();
  menu = false;
  
  
}
function faceModelLoaded(){
  console.log("Face")
  faceModelLoadedIndi = true;
}
function handModelLoaded(){
  console.log("Hand")
  handModelLoadedIndi = true;
  facemesh = ml5.facemesh(video, faceModelLoaded);
  facemesh.on('predict', results => {
  facePredictions = results;
});
}

function speed(){
  if (score > 3){
    cakeSpeed = 2.5;
  }
  else if (score > 7){
    cakeSpeed = 3
  }
  else if(score > 11){
    cakeSpeed = 4
  }
  else if (score > 14){
    cakeSpeed = 6.5
  }
  else if (score > 18){
    cakeSpeed = 8 }
}

function drawMouth(){
  // fill(255,0,0);
  ellipseMode(CENTER)
  for (let i = 0; i < facePredictions.length; i += 1) {
     const keypoint = facePredictions[i].scaledMesh;
  // let mouthW = dist(keypoint[77][0], keypoint[77][1],keypoint[375][0], keypoint[375][1]);
  // let mouthH = dist(keypoint[11][0], keypoint[11][1],keypoint[17][0], keypoint[17][1]);
  // let mouthX = keypoint[77][0] + (mouthW /2)
  // let mouthY = keypoint[11][1] + (mouthH /2)
  // ellipse(mouthX,mouthY,mouthW, mouthH)
  
  if(cakeMoverX > Math.floor(keypoint[77][0]) && cakeMoverX < Math.floor(keypoint[375][0]) && cakeMoverY > Math.floor(keypoint[11][1]) && cakeMoverY < Math.floor(keypoint[17][1]) ){
    if(mode == "cake"){
      score++;
    }
    if(mode == "veggie"){
      score--;
    }
    newCake();
  }
}
}
function drawHand(){
  for (let i = 0; i < handPredictions.length; i += 1) {
    const prediction = handPredictions[i];
      const key = prediction.landmarks;
      if(key[17][0] < key[4][0]){
      if(cakeMoverX > key[17][0] && cakeMoverX < key[4][0] && cakeMoverY > key[12][1] && cakeMoverY < key[0][1] ){
        newCake();
      }
    }
    else if (key[17][0] > key[4][0]){
      if(cakeMoverX < key[17][0] && cakeMoverX > key[4][0] && cakeMoverY > key[12][1] && cakeMoverY < key[0][1] ){
        newCake();
      }
    }
  }
  }

function newCake(){
  cakeMoverX = 0;
  randCake = random(8) 
  randCake = Math.floor(randCake)
  selectedCake = cakes[randCake]
  cakeMoverY = (height / random(1.5,10)) +100

  if (randCake > 3 ){
    mode = "veggie"
  }
  else if (randCake <= 3){
    mode = "cake"
  }
}

// function drawFaceKeypoints() {
//   for (let i = 0; i < facePredictions.length; i += 1) {
//     const keypoints = facePredictions[i].scaledMesh;

//     // Draw facial keypoints.
//     for (let j = 0; j < keypoints.length; j += 1) {
//       const [x, y] = keypoints[j];

//       fill(0, 255, 0);
//       ellipse(x, y, 5, 5);
//     }
//   }
// }

// function drawHandKeypoints() {
//   for (let i = 0; i < handPredictions.length; i += 1) {
//     const prediction = handPredictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(keypoint[0], keypoint[1], 10, 10);
//       textSize(12);
//       text(j,keypoint[0], keypoint[1], )
//     }
//   }
// }