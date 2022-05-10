






//p5 camera below

let video;
let pc_canvas
let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 20;
let CapucheTrial;

let texturepic;

let detector;
let detections = [];
let keywordss;
let labels;

//handpose1
let handpose;
let predictions = [];


//story
// let keyword = "apple";
let option1;
let option2;
let sentence1;
let sentence2;
let storyTexts;
let allStoryLines = ["The Story is..."];

let fingerX;
let fingerY;

let picture;

let d;
let alphaColor;



// document.addEventListener("DOMContentLoaded", function(){

//   storyTexts.html(allStoryLines);
//   localStorage.setItem("AllStroyLines", allstoryLines);
//   document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");
  
// })


document.addEventListener("DOMContentLoaded", function(){

  // document.querySelector("#exportBtn").addEventListener("click", exporting);
  // console.log(allStoryLines);
  // let localStoragesee = localStorage.getItem("AllStoryLines");
  // console.log("this is local storage" + localStoragesee);
  // document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");
  


})



function preload() {
  texturepic = loadImage('texture.png');
  handpose = ml5.handpose(video, modelReadyHand);
  // detector = ml5.objectDetector('cocossd', modelReadyObject);
  CapucheTrial = loadFont('capuche_trial.otf');
}


//object detection
function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(pc_canvas, gotDetections);
  
}

function modelReadyObject() {
  detector.detect(pc_canvas, gotDetections);
}

function modelReadyHand() {
  console.log("Model ready!");
}



function setup() {
  //canvas & video setup
  // pc_canvas = createCanvas(960, 720, WEBGL);
  
  pc_canvas = createCanvas(960, 720);
  pc_canvas.parent('pc_camera');
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  background(0);
  

  // allStoryLines.push("hu");
  // print(allStoryLines);


  
  
  //Object Detector
  detector = ml5.objectDetector('cocossd', modelReadyObject);
  
  //Handpose
  handpose = ml5.handpose(video, modelReadyHand);
  handpose.on("predict", results => {
    predictions = results;
  });
  
  
  //sliders
  for (var i = 0; i < 6; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 400, 200);
    } else {
      sliderGroup[i] = createSlider(-400, 400, 0);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, height + h);
    sliderGroup[i].style('width', '80px');
  }

  //story
  start = createButton("generate story line");
  start.position(330, 0);
  start.mousePressed(optionButton);

  button = createButton('take a pic');
  button.position(0, 0);
  button.mousePressed(capture);
  
}


// function draw() { 
//   background(0,0,0);
  
//   //sliders
//   X = sliderGroup[0].value();
//   Y = sliderGroup[1].value();
//   Z = sliderGroup[2].value();
//   centerX = sliderGroup[3].value();
//   centerY = sliderGroup[4].value();
//   centerZ = sliderGroup[5].value();

// 	var x = map(mouseX, 0, width, -200, 200);
// 	var y = map(mouseY, 0, height, -200, 200);
// 	camera(0, 0, 500, x, y, 0, 0, 1, 0);
//   // camera(300, 100, 800, x, y, 0, 0, 1, 0);
//   // camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
//   // console.log("this is X:" + X);
//   // console.log("this is Y:" + Y);
//   // console.log("this is centerX:" + centerX);
//   // console.log("this is centerY:" + centerY);
//   // console.log("this is centerZ:" + centerZ);
  
//   stroke(255);
//   fill(255, 102, 94);

  
//   //Point Cloud
//   let gridSize = int(map(mouseX, 0,width, 15,50));
//   video.loadPixels();
//   // capture.loadPixels();
//   for (let y=0; y<video.height; y+=gridSize) {
//     for (let x=0; x<video.width; x+=gridSize) {
//       // for (let z=0; z<video.width; z+=gridSize){
      
//       // at the current position, get the red
//       // value (an approximation for brightness)
//       // and use it to create the diameter
//       let index = (y * video.width + x) * 4;
//       let r = video.pixels[index];
//       let dia = map(r, 0,255, gridSize,2);
      

    
    
//       push();
//       let d = dist(fingerX, fingerY, x, y);
//       let randomPos = random(0,300);
//       let randomNeg = random(-3,0);
//       let z= 0;
//       // console.log("fingerX" + fingerX);
//       // console.log("fingerY" + fingerY);
//       if (d<50){
//         translate(x+gridSize/2,y+gridSize/2, z+randomPos);
//       }
//       else{
//         translate(x+gridSize/2,y+gridSize/2, z);

//       }
//       noStroke();
//       // let vScale = 16;
//       // let px = floor(this.x / vScale);
//       // let py = floor(this.y / vScale);
//       // let col = video.get(x, y);
//       // console.log(col);
//       // fill(col[0], col[1], col[2]);
//       // fill(255,0,0);
//       texture(texturepic);
//       // shininess(20);
//       // ambientLight(50);
//       // specularColor(255, 0, 0);
//       // pointLight(255, 0, 0, 0, -50, 50);
//       // specularColor(0, 255, 0);
//       // pointLight(0, 255, 0, 0, 50, 50);
//       // specularMaterial(255);
//       sphere(dia);
//       pop();
//     // }
//   }
// }
    
    
//   // Object Detection
//   for (let i = 0; i < detections.length; i++) {
//     let object = detections[i];
//     stroke(0, 255, 0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x, object.y, object.width, object.height);
//     noStroke();
//     fill(255);
//     // textFont('CapucheTrial');
//     // textSize(24);
//     // text(object.label, object.x + 10, object.y + 24);
//     labels = object.label;
  

//     keywordss = select('#word');
//     keywordss.html(labels);
//     // console.log("this is keywordss: " + keywordss);

//   }
//   // console.log ("this is labels " +labels);
  
//   // Handpose
//     for (let i = 0; i < predictions.length; i += 1) {
//     const prediction = predictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(keypoint[0], keypoint[1], 10, 10);
//       fingerX = keypoint[0];
//       fingerY = keypoint[1];
//       // console.log("keypoint0: " + keypoint[0]);
//       // console.log("keypoint1: " + keypoint[1]);

//     }
//   }
  
// }

function draw(){
  show();
}

function capture(){
  picture = createCapture(VIDEO);
  picture.hide();
  texturepic = picture;
  // texturepic = createGraphics(width, height, [VIDEO]);
  console.log("hi");
}

function show(){
    // background(0,255,0,10);
    // alphaColor = createGraphics(width, height, WEBGL);
    background(0);
    //sliders
    X = sliderGroup[0].value();
    Y = sliderGroup[1].value();
    Z = sliderGroup[2].value();
    centerX = sliderGroup[3].value();
    centerY = sliderGroup[4].value();
    centerZ = sliderGroup[5].value();
  
    // var x = map(mouseX, 0, width, -200, 200);
    // var y = map(mouseY, 0, height, -200, 200);
    // camera(0, 0, 500, x, y, 0, 0, 1, 0);

    // camera(300, 100, 800, x, y, 0, 0, 1, 0);
    // camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
    // console.log("this is X:" + X);
    // console.log("this is Y:" + Y);
    // console.log("this is centerX:" + centerX);
    // console.log("this is centerY:" + centerY);
    // console.log("this is centerZ:" + centerZ);
    
    // stroke(255);
    // fill(255, 102, 94);
  
    
    //Point Cloud
    alphaColor = createGraphics(width, height, WEBGL);
    let gridSize = int(map(mouseX, 0,width, 15,50));
    video.loadPixels();
    // texturepic.loadPixels();
    // capture.loadPixels();
    for (let y=0; y<video.height; y+=gridSize) {
      for (let x=0; x<video.width; x+=gridSize) {
        // for (let z=0; z<video.width; z+=gridSize){
        
        // at the current position, get the red
        // value (an approximation for brightness)
        // and use it to create the diameter
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0,255, gridSize,2);
        
  
      
      
        push();
        if (fingerX >0 && fingerY >0){
        d = dist(fingerX, fingerY, x, y);
        }
        let randomPos = random(0,300);
        let randomNeg = random(-3,0);
        let z= 0;
        // console.log("fingerX" + fingerX);
        // console.log("fingerY" + fingerY);
        if (d<50){
          alphaColor.translate(x+gridSize/2,y+gridSize/2, z+randomPos);
        }
        else{
          alphaColor.translate(x+gridSize/2,y+gridSize/2, z);
  
        }

        alphaColor.noStroke();
        // let vScale = 16;
        // let px = floor(this.x / vScale);
        // let py = floor(this.y / vScale);
        // let col = video.get(x, y);
        // console.log(col);
        // fill(col[0], col[1], col[2]);
        // fill(255,0,0);
          // let col = texturepic.get(x,y);
          // fill(col[0], col[1], col[2]);
          // alphaColor.fill(255);
          alphaColor.texture(texturepic);
          alphaColor.rotateY(frameCount/60);
        // shininess(20);
        // ambientLight(50);
        // specularColor(255, 0, 0);
        // pointLight(255, 0, 0, 0, -50, 50);
        // specularColor(0, 255, 0);
        // pointLight(0, 255, 0, 0, 50, 50);
        // specularMaterial(255);
        
        alphaColor.sphere(dia);
        pop();
        image(alphaColor, 0, 0);
      // }
    }
  }
      
      
    // Object Detection
    for (let i = 0; i < detections.length; i++) {
      let object = detections[i];
      stroke(0, 255, 0);
      strokeWeight(4);
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill(255);
      // textFont('CapucheTrial');
      // textSize(24);
      // text(object.label, object.x + 10, object.y + 24);
      labels = object.label;
    
  
      keywordss = select('#word');
      keywordss.html(labels);
      // console.log("this is keywordss: " + keywordss);
  
    }
    // console.log ("this is labels " +labels);
    
    // Handpose
      for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint[0], keypoint[1], 10, 10);
        fingerX = keypoint[0];
        fingerY = keypoint[1];
        // console.log("keypoint0: " + keypoint[0]);
        // console.log("keypoint1: " + keypoint[1]);
  
      }
    }
    
  
}

//Generate Story
  function apiRequest(url) {
    // reference:    https://developers.google.com/books/docs/v1/using#PerformingSearch
    let http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send(null);
    return http.responseText;
  }
  
  function gotJSON(data) {
    //parse GOOGLE BOOKS API for description
    let array = JSON.parse(data).items[0];
    let info = array.volumeInfo;
    // let title = info.title;
  
    let sentence = info.description;
    return sentence;
  }

function optionButton() {
  // console.log(labels);
  
  matchingSentences = lookForWord(labels); //an array of sentences that contains keyword
  
  sentence1 = matchingSentences[0];
  // console.log(sentence1);
  option1 = createButton(sentence1);
  option1.position(330, 50);
  option1.mousePressed(story1);
  
  // sentence2 = matchingSentences[1];
  // option2 = createButton(sentence2);
  // option2.position(330, 150);
  // option2.mousePressed(story2);
  
}

function searchBooks(labels) {
  
  let url =
    "https://www.googleapis.com/books/v1/volumes?q=" + "intitle:" + labels; //google books api, look for books with the keyword in title
  return gotJSON(apiRequest(url)); // searchBooks(keyword) = gotJSON(apiRequest(url)), i.e book description
}

function lookForWord(labels) {
  let sentences = searchBooks(labels).match(/\(?[^\.\?\!]+[\.!\?]\)?/g); //get an array of sentences from the book description
  //the cunk of punctuations above is called regular expression, reference: https://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter;
  let matches = sentences.filter((s) => {
    // print(s.toLowerCase().includes(labels));
    return s.toLowerCase().includes(labels); // filter the array with only sentences with the labels
  });

  if (matches === null) {
    //if no sentence has the keyword
    console.log("No results");
    return;
  }

  // console.log(matches); // print matching sentences
  return matches;
}

function story1() {
  // background("white");
  allStoryLines.push(sentence1);
  // console.log(allStoryLines);
  // allStoryLines.push("hu");
  // print(allStoryLines);
  storyTexts = select('#storyText');
//   storyTexts.html(sentence1);
  storyTexts.html(allStoryLines);
  // console.log("allstorylines array: " + allStoryLines);
  let storyString = allStoryLines.toString();
  localStorage.setItem("AllStroyLines", storyString);
  // console.log(storyString);
  let presentLines = localStorage.getItem("AllStoryLines");
  // console.log("local storage: " + presentLines);
  // document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");
  
  // textSize(20);
  // fill("black");
  // ellipse(100,100,100,100);
  // text(sentence1, 100, 100);
  // console.log(sentence1);
  
}

function exporting(){
  // let storyString = allStoryLines.toString();
  localStorage.setItem("AllStoryLines", allStoryLines);
  let presentLines = localStorage.getItem("AllStoryLines");
  console.log(presentLines);
  // let presentLines = localStorage.getItem("AllStoryLines");
  // console.log(presentLines);
  // document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");

}

function importing(){
  // localStorage.setItem("AllStoryLines", allStoryLines);
  let presentLines = localStorage.getItem("AllStoryLines");
  console.log("presentLines: " + presentLines);
  document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");

}




