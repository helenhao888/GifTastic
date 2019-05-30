var topics=["rabbit","panda","dog","bird","cat","monkey","kangaroo","koala","giraffe",
"tiger","cougar","fox","wolf","chicken","pig","dinosaur","goose","duck",
"elephant","hippo"];

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

$(".btnClass").on("click",function(){
    
    console.log("click new", $(this).text());
    var name=$(this).text();
     // var queryUrl="https://api.giphy.com/v1/gifs/random?q="+name+"&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit=10";
   
    var queryUrl="https://api.giphy.com/v1/gifs/random?q=pig&api_key=lNqEhl3daOoRJqgVeyaSGERMrqqSJnrM";
    console.log("url",queryUrl);
      

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
      console.log("reponse",response);

    });

    })

$(".submitBtn").on("click",function(){

    var newBtn = $("<button>");
    newBtn.addClass("btnClass btn-primary");
    var newAnimal=$("#addAnimal").val().trim();
    newBtn.text(newAnimal);
    $(".buttonsBox").append(newBtn);
    $(".buttonsBox").show();
})    
})



