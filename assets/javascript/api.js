var topics=["rabbit","panda","dog","bird","cat","monkey","kangaroo","koala","giraffe","tiger","cougar","fox","wolf","chicken","pig","dinosaur","goose","duck","elephant","hippo"];
//the extTopics is extened topics which includes the initial topics and the user added topics
var extTopics=topics;
var animalDupFlg=false;
var topicName="";
var offsetNum=0;
const limitNum=10;
//Favorite Array is an object array. The structure of object includes title, rating,image url,still image url and animate image url
var favoriteArr=[];
var images=[];
var titleFav,ratingFav,imgFav,stillFav,animateFav;

$(document).ready(function(){

initialFun();

function initialFun(){    
    //initialize variables
    topicName="";
    offsetNum=0;
    //create initial buttons from array topics
    topics.forEach(createBtn);  

    //get the favorites from localstorage and store in favorite Array    
    if (localStorage.getItem("favorite")!= null){
        favoriteArr=JSON.parse(localStorage.getItem("favorite"));
    }    
    
}

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
    topicName=$(this).text();
    getImgFunction(topicName);

}


//API call to get the images and other information about the topic and display them
function getImgFunction(inputName){
    
    var queryUrl="https://api.giphy.com/v1/gifs/search?q="+inputName+"&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit="+limitNum+"&offset="+offsetNum;   
// use AJAX to get the data from GIPHY 
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
      
        var results=response.data;

        //from the resonse data, create image tag and other information's tag 
        for(var i=0;i<results.length;i++){

            var divBox=$("<div>").addClass("imgBox col-lg-3 col-md-3 col-sm-4 col-4");
            var titleDiv=$("<div>").text("Title: " + results[i].title);
            titleDiv.addClass("title");
            var msgDiv=$("<div>").text("Rating: "+ results[i].rating);
            msgDiv.addClass("rating");
            var imgStillUrl=results[i].images.fixed_height_small_still.url;
            var imgAnimateUrl=results[i].images.fixed_height_small.url;
            var imgDiv=$("<img>");
            imgDiv.attr({src:imgStillUrl,imageState:"still"});
            imgDiv.attr({"data-animate":imgAnimateUrl,"fav-status":false});
            imgDiv.attr("data-still",imgStillUrl).addClass("img");
            var favoriteDiv=$("<i>").addClass("fa fa-heart addFavorite");
            favoriteDiv.attr("fav-status","no");
            divBox.append(titleDiv,msgDiv,favoriteDiv,imgDiv);
            $(".main").append(divBox);
            offsetNum++;
           
        }        
        //create More link to allow user to get more images
        var moreLink=$("<a>").text("More"); 
        moreLink.attr('href','#');
        moreLink.attr('id','more');
        $(".main").append(moreLink);  
    });
}

//When user click the more link tag , call function getImgMore to call get more images
$(document).on("click","#more",getImgMore);

//Call the getImgFunction with the topicName to get more images with the same topic
function getImgMore(){
   
    $("#more").remove();
    getImgFunction(topicName);

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
        //empty the addAnimal text
        $("#addAnimal").val("");
    } else{
        alert ("empty input");
    }
})  

//when image is clicked , call imgSwitchFunc to switch still and animate image
$(document).on("click",".img",imgSwitchFunc);

//when user clicks on image, switch it from still to animate or animate to still image
function imgSwitchFunc(){
   
    if($(this).attr("imageState")==="still"){
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("imageState","animate");
    } else{
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("imageState","still");
    }

}

//when addFavorite is clicked, call function favFunction
$(document).on("click",".addFavorite",favFunction);

//add the favorite image's info to local Storage or delete it from local strorage
function favFunction(){
    
    var favFlg=$(this).attr("fav-status");
    var favorites=$(this);
    
    titleFav=favorites.siblings(".title").text();
    ratingFav=favorites.siblings(".rating").text();
    imgFav=favorites.siblings(".img").attr("src");
    stillFav=favorites.siblings(".img").attr("data-still");
    animateFav=favorites.siblings(".img").attr("data-animate");

    if(favFlg==="yes"){
        //when the favorite tag is unselected, call the delete favorite function
        deleteFavFunction();
        favorites.attr("fav-status","no");
        favorites.css("color","white");
    }else{
         // add the favorite picture to favoriteArr
        favoriteArr.push({title:titleFav,rating:ratingFav,url:imgFav,still:stillFav,animate:animateFav});    
        //change favorite tag's status and color
        favorites.attr("fav-status","yes");
        favorites.css("color","red");
        //save the favorite array to the local storage
        localStorage.setItem("favorite",JSON.stringify(favoriteArr));
    }
}

//delete  favorite image process
function deleteFavFunction(){

     //If local storage has the data with key 'favorite', check if it exists, delete it 
     if (localStorage.getItem("favorite")!= null){
        //get the favorites from localstorage and store in favorite Array    
        favoriteArr=JSON.parse(localStorage.getItem("favorite"));   
        
        var indexFav=favoriteArr.findIndex(x => x.title===titleFav && x.still===stillFav);   
        if (indexFav!=-1)   {
          //delete this picture from favorite array 
           favoriteArr.splice(indexFav,1);           
           //update local storage 
           localStorage.setItem("favorite",JSON.stringify(favoriteArr));
        }      
    }

}

//when click on my Favorite, get them from local storage and display them
$(".myFavorite").on("click",function(){
    
    $(".main").empty();
    var getFav=JSON.parse(localStorage.getItem("favorite"));  
    //if can get the data from local storage, display all the favorite images
    if (getFav != null){
        for (var j=0;j<getFav.length;j++){
            //create the image, title, rating tags
            var divBox=$("<div>").addClass("imgBox col-lg-3 col-md-3 col-sm-4 col-4");
            var titleDiv=$("<div>").text("Title: " + getFav[j].title).addClass("title");
            var msgDiv=$("<div>").text("Rating: "+ getFav[j].rating).addClass("rating");
            var imgStillUrl=getFav[j].still;
            var imgAnimateUrl=getFav[j].animate;
            var imgDiv=$("<img>");
            imgDiv.attr({src:imgStillUrl,imageState:"still",'data-animate':imgAnimateUrl,'data-still':imgStillUrl});          
            imgDiv.addClass("img");        
            divBox.append(titleDiv,msgDiv,imgDiv);
            $(".main").append(divBox);
        }
    } 
})


//Check duplicate topics process
function checkDupBtn(animal){

    if(extTopics.includes(animal)){
        animalDupFlg=true;
    }
}

})



