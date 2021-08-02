var number1 = "";
var number2 = "";

Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 100
})

Webcam.attach("#camera");

function f_click(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = `<img id="captured_image" src="`+data_uri+`"/>`;
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7_lmby7c4/model.json', anything_is_possible);

function anything_is_possible(){
    console.log("2 + 2 = 5. I am smart ;]");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first gesture is " + number1;
    speak_data_2 = "And the second gesture is " + number2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predict(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById('prediction_name').innerHTML = results[0].label;
        document.getElementById('prediction_name_2').innerHTML = results[1].label;
        number1 = results[0].label;
        number2 = results[1].label;
        speak();
        if(results[0].label == "Nothing"){
            document.getElementById("update_gesture").innerHTML = "&#12644"
        }

        if(results[0].label == "Victory"){
            document.getElementById("update_gesture").innerHTML = "✌"
        }

        if(results[0].label == "Best"){
            document.getElementById("update_gesture").innerHTML = "👌"
        }

        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "👍"
        }
        
        if(results[1].label == "Nothing"){
            document.getElementById("update_gesture_2").innerHTML = "&#12644"
        }
        
        if(results[1].label == "Victory"){
            document.getElementById("update_gesture_2").innerHTML = "✌"
        }
        
        if(results[1].label == "Best"){
            document.getElementById("update_gesture_2").innerHTML = "👌"
        }

        if(results[1].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "👍"
        }
    }
}

