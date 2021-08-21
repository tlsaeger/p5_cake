let img, video, mouthKeypoint;
let facePredictions = [];
let handPredictions = [];
let facemesh;
let handpose;
let faceModelLoadedIndi = false;
let handModelLoadedIndi = false;
let cakeMover = 0;
let winner = ""


function setup() {
createCanvas(1080,720)
video = createCapture(VIDEO);
video.size(640, 480)
handpose = ml5.handpose(video, handModelLoaded);
handpose.on('predict', results => {
  handPredictions = results;
})
video.hide();
}
function draw(){
  background(125)
  image(video,0,0);
  if (faceModelLoadedIndi && handModelLoadedIndi){
    // drawFaceKeypoints();
    drawHandKeypoints();
    drawMouth();
  }
  textSize(48)
  cakeMover += 1;
  text('🎂',cakeMover, height/2)
  text(winner,width/2, height/2 )
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
function drawHandKeypoints() {
  for (let i = 0; i < handPredictions.length; i += 1) {
    const prediction = handPredictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function drawMouth(){
  fill(255,0,0);
  ellipseMode(CENTER)
  for (let i = 0; i < facePredictions.length; i += 1) {
     const keypoint = facePredictions[i].scaledMesh;
  let mouthW = dist(keypoint[77][0], keypoint[77][1],keypoint[375][0], keypoint[375][1]);
  let mouthH = dist(keypoint[11][0], keypoint[11][1],keypoint[17][0], keypoint[17][1]);
  let mouthX = keypoint[77][0] + (mouthW /2)
  let mouthY = keypoint[11][1] + (mouthH /2)
  ellipse(mouthX,mouthY,mouthW, mouthH)
  console.log(keypoint[77][0], cakeMover)

  if(cakeMover == Math.floor(keypoint[77][0])){
    textSize(200)
    winner = "winnder winner, \n veggie dinner"
  }
}
}

// function keyPressed() {
//   if (keyCode === 80) {
//     saveCanvas("myCanvas", "jpg");
//   }
// }
