# ✺✺✺POITORY✺✺✺
<!-- 1-2 sentence description of assignment. Nice to include a screenshot or .gif of the site in action. -->
![image is not loaded, please try again](assets/point-cloud-img.png)
This is an online tool for the 21st century mixed media creatives (artists, designers, writers, and more types of creator) to resolve their creativity blocks by reimagining and remixing their current space and time. As creatives, we have always imagine the world going forward with a new vision, but how do we break the habit of looking to the front and start by applying the same vision to the present in order to bridge our way to reach that ultimate future? Stories, stories are the answer.

**Click here for...**

>[💻 Website](https://junebee66.github.io/AR-Point-Cloud-World-Building-Camera/)<br /> 
[⏯ Video Demo](https://youtu.be/gyd9dNDEOlQ)<br />
[🎥 Concept Video](https://youtu.be/0F6T9y7oQ-8)

## **🫱 How to Use?**
![video is not loaded, please try again](assets/point-cloud-feature.png)
### **🛑 DISCLAIMER 🛑**
This project is still in progress stage. Most functions work, but it might take up to 30 second to 1 minute to load in the very beginning for the handpose, object detection, and 3D camera library. Thank you for your patience!

### **⭐️ Website Functionality**
>This camera converts the captured video from the user’s webcam into 3D point clouds. The user can interact (pushing/pulling) the points to create new meshes. As the user is creating, the camera will continuously scan the mesh user created to try to recognize what object it visually looks like. The detected object name will be searched into Google Books API and start generating new storyline. The final story paragraph can later be exported as .txt file for user's future usage. 

**1️⃣ Camera Settings**
> Make sure the camera consent button is checked to enable the point cloud camera start miorring web camera image into digital point cloud.

**2️⃣ Remix Point Cloud**
> The user can use their hands to move the points (in canvas) around to remix the current environment image data.

**3️⃣ Drawing Angle**
> By using the “switch camera” function and camera sliders, user can adjust to their desired camera view to start drawing

**4️⃣ Story Keywords**
> While the user draws in the canvas with their hand, the keyword box will show the object detection result of what the drawing looks like.

**5️⃣ Generate Storylines**
> When the user sees a desired object in the keyword box, the user can hit on the “generate story line” button to generate two stroyline options. By clicking on the storyline options, the storyine option clicked will be added to the story paragraph on the left. 

**6️⃣ Exporting Story**
>When finish the story, the user can click on load story to save the current story paragraph, and then click on “export story” to save as text file.



## **💡About**
![image is not loaded, please try again](assets/point-cloud-manual.png)

#### **⭐️ Point Cloud Canvas**
_-Still in developing stage-_

>This is a point cloud generated mirroring the current/ updating web camera image. The user can use their hands to move the points around to trigger the object recognition feature to redefine the points generated. 

>The green dots are the position of the user’s fingers mirorring in this 3D space.

#### **⭐️ Keyword Box**
>The object detection function (by Tensorflow) will identify the remix point cloud made by user (in the black canvas on the right) as any similiar looking object and display the resulted keyword here. 

#### **⭐️ Switch Camera**
>Clicking on this button will swith to a random camera view and erase the images that were cerated. It is like a reset button.

#### **⭐️ Generate Story Lines**
>Once the user sees the object he/she/they want to add into the story, the user should click on “Generate Story Line” button to generate two storyline options from the Google Books API. Clicking on the storyline buttons will add the lines to the paragraph.

#### **⭐️ Load Story**
>Once the user are satisfy with the story generated on the left column of the page, the user should first click on the “load story” to save the current storylines. 

#### **⭐️ Export Story**
>After loading the story lines (display on the left column of page), user will click on this button to export the storylines created into the next page. The user can later save the story as a text file for future usage.

#### **⭐️ Camera Consent**
>When the checkbox is checked, this website will access the image data from user’s webcam. When uncheck, camera will not be turned on. 

#### **⭐️ Camera Sliders**
>The sliders control the 3D camera persepctive on (x, y, z, centerX, centerY, centerZ, upX, upY ).


## **✍🏻Process & Documentation**
![alt text](assets/point-cloud-sketch.png)

**1. WebGL p5.js function**</br>
Originally, I was inspired by this [3D webcam point cloud](https://github.com/FollowTheDarkside/threejs-webcam-particle-visualizer) created by Hirasawa. He made the image captured in the webcam camera to convert into 3d data points that contains position data. I tried using his code and applied the handpose library onto it. However, since the original code is created by the three.js library, and handpose library is by P5, the communication between the code is not very smooth. Therefore, I thought about coding my own point cloud camera using the WebGL function. I made every pixel capture from the web camera into spheres. In the end, there will be a grid of sphere in the digital 3D space. 


    function setup() {
        pc_canvas = createCanvas(960, 900, WEBGL);
        pc_canvas = createCanvas(960, 720);
        pc_canvas.parent('pc_camera');
        video = createCapture(VIDEO);
        video.size(width, height);
        video.hide();
        background(0);
    }

    function defaultTexture(){
        push();
            for (let y=0; y<video.height; y+=gridSize) {
            for (let x=0; x<video.width; x+=gridSize) {
        
            // at the current position, get the red
            // value (an approximation for brightness)
            // and use it to create the diameter
            let index = (y * video.width + x) * 4;
            let r = video.pixels[index];
            let dia = map(r, 0,255, gridSize,2);
        push();
            texture(texturepic);
            sphere(dia);
        pop();
    
        }
        }
        pop();
    }

**2. [Handpose Library](https://learn.ml5js.org/#/reference/handpose)**</br>

Later, I incorporate the [handpose library](https://learn.ml5js.org/#/reference/handpose) to have user’s finger pose pusing the sphere in the z-axis. Therefore the new mesh created by the user will be in 3D form from all perspectives. I use dist() to calculate the distance between user’s finger tips and the sphere. When the distance between finger tips and the sphere is less than 50, the sphere’s z axis will be added a random number between 0-300.

    
    function draw(){
        let gridSize = int(map(mouseX, 0,width, 15,50));
        
        if (fingerX >0 && fingerY >0){
                    d = dist(fingerX, fingerY, x, y);
                }

                let randomPos = random(0,300);
                let z= 0;

                if (d<50){
                    translate(x+gridSize/2,y+gridSize/2, z+randomPos);
                }
                if (d<20){
                    translate(x+gridSize/2,y+gridSize/2, z+randomPosP);
                }
                else{
                    translate(x+gridSize/2,y+gridSize/2, z);
                }

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


**3. Object Detection**</br>

In the beginning, I thought about using the original [Tensorflow object detection API - COCO (Common Objects in Context)](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) dataset- but setting up the pip was too complex and will only be in plain javascript language that wasn’t entirely compatible with my p5 WebGL and handpose library. Soon, I found out that the p5 ml library has a more accessible [object detection language](https://learn.ml5js.org/#/reference/object-detector), so I decided to code everything in the P5 language.

The object detection was originally set up recognizing the web camera, but I change it to recognize the canvas, so it can identify what the user has created.

    function setup(){
        detector = ml5.objectDetector('cocossd', modelReadyObject);
    }
    

    function modelReadyObject() {
        detector.detect(pc_canvas, gotDetections);
        console.log("object ready!")
    }

    function gotDetections(error, results) {
        if (error) {
            console.error(error);
        }
        detections = results;
        detector.detect(pc_canvas, gotDetections);
        
    }

    function draw(){
        for (let i = 0; i < detections.length; i++) {
            let object = detections[i];
            
            stroke(0, 255, 0);
            strokeWeight(4);
            noFill();
            // rect(object.x, object.y, object.width, object.height);

            labels = object.label;
            console.log("object label: " + labels)
            
        
            keywordss = select('#word');
            keywordss.html(labels);
    }
    }


**4. Google Books API**</br>
The detected object name will be feed into the [Google Books API](https://developers.google.com/books) to search for the books with the title that contains the detected object name. It will then be displayed in the keyword box. I wrote a system to display the descriptions of book into single sentences. In the code, it searches for the punctuation in the sentences and split them to put into an array. Therefore only single sentences will be displayed as storylines instead of the whole description paragraphs.
    
    function apiRequest(url) {
        let http = new XMLHttpRequest();
        http.open("GET", url, false);
        http.send(null);
        return http.responseText;
    }
    
    function gotJSON(data) {
        //parse GOOGLE BOOKS API for description
        let array = JSON.parse(data).items[0];
        let info = array.volumeInfo;
        let sentence = info.description;
        return sentence;
    }

    function optionButton() {
        matchingSentences = lookForWord(labels); //an array of sentences that contains keyword
    
        sentence1 = matchingSentences[0];
        option1 = createButton(sentence1);
        option1.mousePressed(story1);
        option1.parent('lineOption1');
    
        sentence2 = matchingSentences[1];
        option2 = createButton(sentence2);
        option2.mousePressed(story2);
        option2.parent('lineOption2');
  
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
    }

    function story1() {
        allStoryLines.push(sentence1);
        storyTexts = select('#storyText');
        storyTexts.html(allStoryLines);
        let storyString = allStoryLines.toString();
        localStorage.setItem("AllStroyLines", storyString);
        let presentLines = localStorage.getItem("AllStoryLines");
    }

**5. Local Storage**</br>
Local storage is the requirement for the finals this semester. I wrote the code to store story paragraph the user accumulated (by selecting storylines along the way) as a long array and be presented in the last page to export the story as a .txt file.

    function exporting(){
        localStorage.setItem("AllStoryLines", allStoryLines);
        let presentLines = localStorage.getItem("AllStoryLines");
    }

    function importing(){
        let presentLines = localStorage.getItem("AllStoryLines");
        console.log("presentLines: " + presentLines);
        document.getElementById("exportStory").innerHTML = localStorage.getItem("AllStoryLines");
    }







## **🛑Challenges & Struggles**
![alt text](assets/point-cloud-user-flow.png)
This has been so far the most troublesome code I have ever written and was the only one that actually still works in the end.</br>
The major problem I faced:
- Loading Handpose And Object Detection Model Together
- Sphere Color
- 3D Camera Angle
- Overall Code Performance (speed)

**Loading Handpose And Object Detection Model Together**
I spent the majority of the time trying to figure out what libraries I should use and which ones are compatible to each other. I decided to code everything in p5.js languages using ml5 libraries. However, I was stuck for almost two days to try to load both the handpose and object detection library together without them interfering each other’s code. I went to different tutors in the week, but no one seem to find the problem until I found out that it was the library linking problem in my html code. Handpose library uses the lastest tag

    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" type="text/javascript"></script>

when object detection works on 

    <script src="https://unpkg.com/ml5@0.5.0/dist/ml5.min.js"></script>

these different versions don’t understand each other’s varible and function names. 

Most of the object detection examples online were all written in the 0.5.0 version, so I don’t know how to update it to the “lastest” version. I read through the [ml5 library github]([https://github.com/ml5js/ml5-library](https://github.com/ml5js/ml5-library)) and finally made it working at the end.

**Sphere Color** </br>
Another major problem that I encountered and still couldn’t find a way to fix is how the pixel array works. In my original design, I would like to can all the point cloud sphere be colored as webcam colors, so right when user sees the grid sphere, they understand they are looking at themselves which also presents the idea of mixing the existing reality. However, in order to do that the code has go through the pixel array one by one to assign the color in every frame (because the camera keeps updating the pixel data). This really slows down my camera performance and will actually break the code instantly due to the large amount of calculations that was going on. Therefore, in the end, I was only able to assign every ball to an uploaded image texture,

    function draw(){

        texture(texturepic);
        sphere(dia);

    }

instead of assigning colors

    col = video.get(x,y);
    fill(col[0], col[1], col[2]);

**3D Camera Angle**</br>
Originally, I wrote the code to have the user mouse controlling the canvas mouse, but soon I discovered it will strongly effect the way the canvas looks when the user is only leaving the canvas to click on the buttons on the side.

    var x = map(mouseX, 0, width, -200, 200);
    var y = map(mouseY, 0, height, -200, 200);
    camera(0, 0, 500, x, y, 0, 0, 1, 0);


Therefore, I wrote the code to have the user to control the camera angles with sliders, but it was a very slow process for the user to adjust to their desired view. 

    for (var i = 0; i < 6; i++) {
        if (i === 2) {
        sliderGroup[i] = createSlider(100, 400, 200);
        } else {
        sliderGroup[i] = createSlider(-400, 400, 0);
        }
        h = map(i, 0, 6, 5, 85);
        // sliderGroup[i].position(10, height + h);
        sliderGroup[i].style('width', '80px');
        sliderGroup[i].parent('cameraSliders');
        // sliderGroup[1].parent('cameraSliders');
        // sliderGroup[2].parent('cameraSliders');
    }

In the end, I set up a set of code to have user pressing on the button to randomly generate a camera angle that is static and within the range of lookin from the side

    for (let i = 0; i < 5; i++) {
    cameras[i] = createCamera();
  
    // Randomly set the position the camera
    // is looking at using setPosition()
    randomX = floor(random(0, 300));
    randomY = floor(random(0, 300));
    randomZ = floor(random(0, 300));
    randomCX = floor(random(-10, 10));
    randomCY = floor(random(-1, 10));
    randomCZ = floor(random(0, 100));

    // camera(-279, -288, 9, 4, 96, 0, 0, 1, 0);
  
    // cameras[i].setPosition(randomX, randomY, randomZ);
    cameras[i].lookAt(random(0, 300), random(0, 150), random(450, 600));
  }




## **☁️ Future Development Envision**
![alt text](assets/point-cloud-manual.png)
- The Website UI is still currently not up to date to this deisgn
- I will try write a code to load the libraries consecutively so the website performace will not lag as much as it does right now.

## **References**
[Handpose](https://learn.ml5js.org/#/reference/handpose) by ml5</br>
[Object Detection](https://learn.ml5js.org/#/reference/object-detector) by ml5</br>
[WebGL](https://p5js.org/reference/#/p5/WEBGL) by p5.js</br>[Google Books API](https://developers.google.com/books) by Google</br>


