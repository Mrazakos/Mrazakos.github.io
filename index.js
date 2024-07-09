

let ol = document.getElementsByClassName("category");
const queryString = window.location.search;
const genre = new URLSearchParams(queryString).get("genre");
for(const li of ol){

    if(li.id == genre){
        if(!li.classList.contains("selected")){
            li.classList.replace("non-selected", "selected");
        }
    } else{
        if(!li.classList.contains("non-selected")){
            li.classList.replace( "selected", "non-selected");
        }
    }
}


//adding and deleting categories

function showcaseCategory(category){
    window.location = "?genre=" + category;
}



