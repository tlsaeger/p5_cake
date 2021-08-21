let img, video, mouthKeypoint, handpose, facemesh;
let facePredictions = [];
let handPredictions = [];
let faceModelLoadedIndi = false;
let handModelLoadedIndi = false;
let cakeMoverX = 0;
let score = 0
let cakeSpeed = 2;

let menu = true;

let mode = "cake";
let cakes = ['🎂','🥮','🍰','🧁','🥦','🥕','🍎','🌽'];
let selectedCake = cakes[0];


function setup() {
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

  // translate(width,0);
  // scale(-1.0,1.0);  
  background(255)
  image(video,0,0);
  if (faceModelLoadedIndi && handModelLoadedIndi){
    // drawFaceKeypoints();
    // drawHandKeypoints();
    drawMouth();
    drawHand();
  }
  textSize(48)
  cakeMoverX += cakeSpeed;
  if(cakeMoverX > width){
    newCake();
  }
  text(selectedCake,cakeMoverX, cakeMoverY)
  text(score,width/2, height/2 )

  speed();
  // if(menu){
  //   rect(0,0,width,height)
    
  // }

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