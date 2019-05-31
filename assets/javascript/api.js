var topics=["rabbit","panda","dog","bird","cat","monkey","kangaroo","koala","giraffe","tiger","cougar","fox","wolf","chicken","pig","dinosaur","goose","duck","elephant","hippo"];
//the extTopics is extened topics which includes the initial topics and the user added topics
var extTopics=topics;
var animalDupFlg=false;

$(document).ready(function(){

//create initial buttons from array topics
topics.forEach(createBtn);

//create  button from the each value in array topics
function createBtn(value){

    var btn=$("<button>");
    btn.addClass("btnClass btn-primary");
    btn.text(value);    
    $(".buttonsBox").append(btn);
}


//when one of the animal buttons is clicked, get the images and display them
$(".btnClass").on("click",function(){
    
    $(".main").empty();
    console.log("click new", $(this).text());
    var name=$(this).text();
    var queryUrl="https://api.giphy.com/v1/gifs/search?q="+name+"&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
      
         console.log("data",response.data);
        var results=response.data;
        for(var i=0;i<results.length;i++){
            var divBox=$("<div>").addClass("imgBox");
            var msgDiv=$("<div>");
            msgDiv.text("Rating: "+ response.data[i].rating);
            var imgStillUrl=response.data[i].images.fixed_height_small_still.url;
        
            var imgDiv=$("<img>");
            imgDiv.attr("src",imgStillUrl);
            imgDiv.attr("image-state","still");
            imgDiv.addClass("img");
            divBox.append(msgDiv,imgDiv);
            $(".main").append(divBox);
      }

    });
})

$(".submitBtn").on("click",function(){
 
    animalDupFlg=false;
    var newAnimal=$("#addAnimal").val().trim();

    if (newAnimal!=""){
        checkDupBtn(newAnimal);
        if(animalDupFlg){
            alert("The button of this animal has existed");
        }else{
            console.log("new butt div")
            var newBtn = $("<button>");
            newBtn.addClass("btnClass btn-primary");    
            newBtn.text(newAnimal);
            $(".buttonsBox").append(newBtn);            
            extTopics.push(newAnimal);
        }

        $("#addAnimal").val("");
    } else{
        alert ("empty input");
    }
})  

//When hit enter on the keyboard,prevents the page from reloading on form submit.
$("#addForm").submit(function(event){
    event.preventDefault();
})

function checkDupBtn(animal){

    if(extTopics.includes(animal)){
        animalDupFlg=true;
    }
}

})



