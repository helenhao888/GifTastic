var topics=["rabbit","panda","dog","bird","cat","monkey","kangaroo","koala","giraffe","tiger","cougar","fox","wolf","chicken","pig","dinosaur","goose","duck","elephant","hippo"];
//the extTopics is extened topics which includes the initial topics and the user added topics
var extTopics=topics;
var animalDupFlg=false;
var topicName="";
var offsetNum=0;
const limitNum=10;
//Favorite Array is an object array. The structure of object includes title, rating and image url
var favoriteArr=[];
var images=[];
// var images={title:"",rating:"",url:"",stillImage:"",animateImage:""};

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
    topicName=$(this).text();
    getImgFunction(topicName);

    // //create More link to allow user to get more images
    // var moreLink=$("<a>").text("More"); 
    // moreLink.attr({href:"#",onclick:function(){getImgFunction(topicName);return false},id:"more"});
    
    // $(".main").append(moreLink);
  

}


// $(document).on("click","#more",getImgFunction(topicName));


//API call to get the images and other information about the topic and display them
function getImgFunction(inputName){

    console.log("call image func",inputName);
    var queryUrl="https://api.giphy.com/v1/gifs/search?q="+inputName+"&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit="+limitNum+"&offset="+offsetNum;
   

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
      
         console.log("data",response.data);
        var results=response.data;

        //from the resonse data, create image tag and other information's tag 
       

        for(var i=0;i<results.length;i++){
            var title= results[i].title;
            var rating=results[i].rating;
            var url= results[i].images.fixed_height_small_still.url;
            var stillImage=results[i].images.fixed_height_small_still.url;
            var animateImage=results[i].images.fixed_height_small.url;
            
            // images.push({title:title,rating:rating,url:url,still:stillImage,animate:animateImage});
            
            // createImgBoxFunc(images);
            
            var divBox=$("<div>").addClass("imgBox");
            var titleDiv=$("<div>").text("Title: " + results[i].title);
            titleDiv.addClass("title");
            var msgDiv=$("<div>").text("Rating: "+ results[i].rating);
            msgDiv.addClass("rating");
            var imgStillUrl=results[i].images.fixed_height_small_still.url;
            var imgAnimateUrl=results[i].images.fixed_height_small.url;
            var imgDiv=$("<img>");
            imgDiv.attr({src:imgStillUrl,imageState:"still"});
            imgDiv.attr("data-animate",imgAnimateUrl);
            imgDiv.attr("data-still",imgStillUrl).addClass("img");
            var favoriteDiv=$("<i>").addClass("fa fa-heart addFavorite");
            divBox.append(titleDiv,msgDiv,favoriteDiv,imgDiv);
            $(".main").append(divBox);
            // offsetNum++;
            // console.log("offset",offsetNum);
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

$(document).on("click",".addFavorite",addFavFunction);

function addFavFunction(){
    var titleFav=$(this).siblings(".title").text();
    var ratingFav=$(this).siblings(".rating").text();
    var imgFav=$(this).siblings(".img").attr("src");
    var stillFav=$(this).siblings(".img").attr("data-still");
    var animateFav=$(this).siblings(".img").attr("data-animate");
    // add the favoritee picture to favoriteArr
    favoriteArr.push({title:titleFav,rating:ratingFav,url:imgFav,still:stillFav,animate:animateFav});
    console.log("arr",favoriteArr);

    localStorage.setItem("favorite",JSON.stringify(favoriteArr));
}

$(".myFavorite").on("click",function(){
    console.log("my favorite");
    var getFav=JSON.parse(localStorage.getItem("favorite"));
    console.log("getfav",getFav);
    $(".main").empty();
    // createImgBoxFunc(getFav);
    for (var j=0;j<getFav.length;j++){
        var divBox=$("<div>").addClass("imgBox");
        var titleDiv=$("<div>").text("Title: " + getFav[j].title);
        titleDiv.addClass("title");
        var msgDiv=$("<div>").text("Rating: "+ getFav[j].rating);
        msgDiv.addClass("rating");
        var imgStillUrl=getFav[j].still;
        var imgAnimateUrl=getFav[j].animate;
        var imgDiv=$("<img>");
        imgDiv.attr({src:imgStillUrl,imageState:"still"});
        imgDiv.attr("data-animate",imgAnimateUrl);
        imgDiv.attr("data-still",imgStillUrl).addClass("img");        
        divBox.append(titleDiv,msgDiv,imgDiv);
        $(".main").append(divBox);
    }
})

function createImgBoxFunc(input){

    
        
        
        var divBox=$("<div>").addClass("imgBox");
        var titleDiv=$("<div>").text("Title: " + input.title);
        titleDiv.addClass("title");
        var msgDiv=$("<div>").text("Rating: "+ input.rating);
        msgDiv.addClass("rating");
        var imgStillUrl=input.stillImage;
        var imgAnimateUrl=input.animateImage;
        var imgDiv=$("<img>");
        imgDiv.attr({src:imgStillUrl,imageState:"still"});
        imgDiv.attr("data-animate",imgAnimateUrl);
        imgDiv.attr("data-still",imgStillUrl).addClass("img");
        var favoriteDiv=$("<i>").addClass("fa fa-heart addFavorite");
        divBox.append(titleDiv,msgDiv,favoriteDiv,imgDiv);
        $(".main").append(divBox);
        // offsetNum++;
        // console.log("offset",offsetNum);
    
}

//Check duplicate topics process
function checkDupBtn(animal){

    if(extTopics.includes(animal)){
        animalDupFlg=true;
    }
}

})



