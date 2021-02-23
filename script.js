const API_KEY = "f8a490f34874ecd05c790250dd59f6e9",
  APP_ID = "9c4182eb",
  API_URL = "https://api.edamam.com/search?";

// const fast = "1-10"
// const medium = "10-60"
// const long = "60%2B"


let filterTime = ["1-10", "10-60", "60%2B"];
  //  filterTime.forEach(element ) 

const searchRecipes = () => {
  let searchQuery = document.getElementById("searchBar").value
  fetch(`${API_URL}q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=10&time=${filterTime}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.hits.forEach((hit) => {
        drawResultItem({
          title: hit.recipe.label,
          image: hit.recipe.image,
          cookTime: hit.recipe.totalTime,
          viewLink: hit.recipe.shareAs,
          sourceLink: hit.recipe.url,
        });
      });
    });
    

};

const drawResultItem = (resultData) => {
  searchResults.innerHTML += `
        <div class="title">${resultData.title}</div>
        <img class="image" src="${resultData.image}"></img>
        <div class="cook-time">${resultData.cookTime}</div>
        <a href="${resultData.viewLink}">Read recipe</a>
        <a href="${resultData.sourceLink}">View source</a>
    `;
};

//cooking time



searchRecipes();
