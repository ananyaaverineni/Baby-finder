image1=""
status1=""
object=[]
function setup(){ 
canvas=createCanvas(800,600);
canvas.position(400,190)
video=createCapture(VIDEO)
video.size(800,600)
video.hide()
objectDetector=ml5.objectDetector("cocossd",modelloaded)
document.getElementById("status").innerHTML="status:dectecting baby"
}
function modelloaded(){
console.log("model is loaded") 
status1=true;
}
function preload(){
image1=loadImage("traffic.jpg")
}
function gotresult(error,result){
if(error)
{console.log(error)}
else{
console.log(result)

object=result;    
}
}
function draw (){
image(video,0,0,800,600)   
if(status1!=""){
objectDetector.detect(video,gotresult)   
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML="status:Baby found"
    document.getElementById("number_of_objects").innerHTML="baby's found:"+object.length
    objectname=object[i].label
    objectx=object[i].x
    objecty=object[i].y
    objectwidth=object[i].width
    objectheight=object[i].height
    objectconfidence=floor(object[i].confidence*100)
    console.log(objectx+"-"+objecty)
    fill("red")
    textSize(20)
    text(objectname + " " + objectconfidence+"%",objectx,objecty)
    noFill()
    stroke("red")
    rect(objectx,objecty,objectwidth,objectheight) 
}   
}
}
