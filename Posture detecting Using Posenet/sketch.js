let video;
let bodyPose;
let poses = [];
let skeleton;

function setup() {
  createCanvas(640, 480);

  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  
  bodyPose = ml5.bodyPose(video, modelReady);

  
  bodyPose.on('pose', gotPoses);

  
  skeleton = [
    [0, 1], [1, 3], [0, 2], [2, 4],
    [5, 7], [7, 9], [6, 8], [8, 10],
    [5, 6], [5, 11], [6, 12], [11, 12],
    [11, 13], [13, 15], [12, 14], [14, 16]
  ];
}

function modelReady() {
  console.log("BodyPose model loaded!");
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);

  for (let poseObj of poses) {
    let keypoints = poseObj.keypoints;

    
    for (let conn of skeleton) {
      let a = keypoints[conn[0]];
      let b = keypoints[conn[1]];
      if (a.confidence > 0.1 && b.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(a.x, a.y, b.x, b.y);
      }
    }

    
    for (let kp of keypoints) {
      if (kp.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(kp.x, kp.y, 10);
      }
    }
  }
}
