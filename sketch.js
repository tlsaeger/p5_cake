let img, video;
let facePredictions = [];
let handPredictions = [];
let facemesh;
let handpose;
let faceModelLoadedIndi = false;
let handModelLoadedIndi = false;
let cakeMover = 0;

function setup() {
createCanvas(1080,720)
video = createCapture(VIDEO);
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
    drawFaceKeypoints();
    drawHandKeypoints();
  }
  textSize(48)
  cakeMover += 0.1;
  text('🎂',cakeMover, height/2)
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

function drawFaceKeypoints() {
  for (let i = 0; i < facePredictions.length; i += 1) {
    const keypoints = facePredictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}
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

// function keyPressed() {
//   if (keyCode === 80) {
//     saveCanvas("myCanvas", "jpg");
//   }
// }
