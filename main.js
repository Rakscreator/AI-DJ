music = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    // const fileInput = document.getElementById("file-upload__input");
    // fileInput.onchange = () => {
    //     const selectedFile = fileInput.files[0];
    //     console.log(selectedFile);
    // }
    music = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    document.getElementById("btnstop").style.display = "none";
    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotResults)
}
function draw(){
    image(video,0,0,600,450)

    fill("#ff0000")
    stroke("#ff0000")

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20)
        leftWristYinno = floor(Number(leftWristX))
        leftWristYinnodivided = leftWristYinno / 500;
        console.log("volume = "+leftWristYinnodivided);
        console.log("test");
        document.getElementById("vol_h3").innerHTML = "Volume : "+leftWristYinnodivided;
    }
    // if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20)
        if(rightWristY > 0 && rightWristY <= 100){
            song.rate(0.5);
            document.getElementById("speed_h3").innerHTML = "Speed : 0.5x"
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            song.rate(1.0);
            document.getElementById("speed_h3").innerHTML = "Speed : 1.0x"
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            song.rate(1.5);
            document.getElementById("speed_h3").innerHTML = "Speed : 1.5x"
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            song.rate(2.0);
            document.getElementById("speed_h3").innerHTML = "Speed : 2.0x"
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            song.rate(2.5);
            document.getElementById("speed_h3").innerHTML = "Speed : 2.5x"
        }
    // }
}
function playmusic(){
    music.play();
    document.getElementById("btnplay").style.display = "none";
    document.getElementById("btnstop").style.display = "block";
    music.rate(1);
    music.setVolume(1);
}
function stopmusic(){
    music.stop();
    document.getElementById("btnplay").style.display = "block";
    document.getElementById("btnstop").style.display = "none";
}
function modelloaded(){
    console.log("Posenet done😀");
}
function gotResults(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = "+scoreLeftWrist);
        console.log("score right wrist = "+scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X = "+rightWristX+"  right wrist Y = "+rightWristY );

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist X = "+leftWristX+"  left wrist Y = "+leftWristY );
    }
}
