const categories = ['all'];

let ol = document.getElementsByClassName("category");
const queryString = window.location.search;
const genre = new URLSearchParams(queryString).get("genre");
for(const li of ol){
    console.log(li);
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
console.log(genre);

//adding and deleting categories

function showcaseCategory(category){
    window.location = "?genre=" + category;
    
    

}

function hideCategory(category){
    let hideCategory = document.getElementById(category);
    hideCategory.classList.replace("selected", "non-selected");
    hideCategory.setAttribute( "onClick", "javascript: showcaseCategory('" + category + "');" );
    console.log(showcaseCategory);
    const modifiedCategories = [];
    let index = 0;
    for(i = 0; i < categories.length; i++){
        if(categories[i] != category){
            modifiedCategories[index++] = categories[i];
        }
    }
    categories = modifiedCategories;

}




