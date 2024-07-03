let categories = ['all'];


function showcaseCategory(category){
    let showcaseCategory = document.getElementById(category);
    showcaseCategory.classList.replace("non-selected", "selected");
    showcaseCategory.setAttribute( "onClick", "javascript: hideCategory('" + category + "');" );
    categories[categories.length] = category;
    console.log(categories);
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
    console.log(categories);
}