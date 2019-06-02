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

//when one of the animal buttons is clicked, call the displayFunction
$(document).on("click", ".btnClass",displayFunction);

//Based on the click button, call the getImgFunction process
function displayFunction(){   
    $(".main").empty();
    console.log("click new", $(this).text());
    var topicName=$(this).text();
    getImgFunction(topicName);

    //create More link to allow user to get more images
    // var moreLink=$("<a>",{id:more,text:"More",href:'#',click:function(){getImgFunction();}});
    // var moreLink=$("<a>").text("More");
    // moreLink.attr("href","javascript:getImgFunction(topicName);");
    // console.log("morelink",moreLink);
    // $(".main").append(moreLink);

}

//API call to get the images and other information about the topic and display them
function getImgFunction(name){

    var queryUrl="https://api.giphy.com/v1/gifs/search?q="+name+"&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
      
         console.log("data",response.data);
        var results=response.data;
        //from the resonse data, create image tag and other information's tag 
        for(var i=0;i<results.length;i++){
            var divBox=$("<div>").addClass("imgBox");
            var msgDiv=$("<div>").text("Rating: "+ response.data[i].rating);
            var imgStillUrl=response.data[i].images.fixed_height_small_still.url;
            var imgAnimateUrl=response.data[i].images.fixed_height_small.url;
            var imgDiv=$("<img>");
            imgDiv.attr({src:imgStillUrl,imageState:"still"});
            imgDiv.attr("data-animate",imgAnimateUrl);
            imgDiv.attr("data-still",imgStillUrl).addClass("img");
            divBox.append(msgDiv,imgDiv);
            $(".main").append(divBox);
        }
        
        

    });
}
//When the subbmit button is clicked, add new button for the input animal
 $("#addSubmit").on("click",function(event){
    event.preventDefault();
    animalDupFlg=false;
    //get the user input animal 
    var newAnimal=$("#addAnimal").val().trim();
    //if the user input animal is not space and not duplicate with the existing 
    //topics, add new animal button
    if (newAnimal!=""){
        checkDupBtn(newAnimal);
        if(animalDupFlg){
            alert("The button of this animal has existed");
        }else{            
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

$(document).on("click",".img",imgSwitchFunc);

function imgSwitchFunc(){
   
    if($(this).attr("imageState")==="still"){
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("imageState","animate");
    } else{
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("imageState","still");
    }

}

//Check duplicate topics process
function checkDupBtn(animal){

    if(extTopics.includes(animal)){
        animalDupFlg=true;
    }
}

})



