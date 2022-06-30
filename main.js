song="";
song2="";
leftx=0;
lefty=0;
rightx=0;
righty=0;

scoreleft=0;
scoreright=0;
song1status= "";
song2status= "";


function preload()
{
    song= loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet( video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
  console.log( 'PoseNet is initialized');
}


function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    song1status= song.isPlaying();
    song2status= song2.isPlaying();

    if(scoreleft > 0.2)
    {
        circle(leftx,lefty,20);
        song1.stop();
        if(song2status == false)
        {
            song.play();
            document.getElementById("song").innerHTML= " playing song  - " +  song;
        }
    }
    
}



function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreleft=results[0].pose.keypoints[9].score;
        scoreright=results[0].pose.keypoints[10].score;
        console.log(" Score left= " + scoreleft + "Score right = " + scoreright);

        leftx= results[0].pose.leftWrist.x;
        lefty= results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftx + "Left Wrist Y = " + lefty);

        rightx= results[0].pose.rightWrist.x;
        righty= results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightx + "Right Wrist Y = " + righty);

    }
}












