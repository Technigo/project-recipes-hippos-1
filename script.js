const API_KEY = "f8a490f34874ecd05c790250dd59f6e9",
  APP_ID = "9c4182eb",
  API_URL = "https://api.edamam.com/search?";

const filters = document.getElementById("filters");

let fast = "1-10";
let medium = "10-60";
let long = "60%2B";
const cookTimes = {
  fast: "1-10",
  medium: "10-60",
  long: "60%2B",
};
let selectedKey = "none";

// let filterTime = ["1-10", "10-60", "60%2B"];

const searchRecipes = () => {
  searchResults.innerHTML = "";
  selectedKey = getActiveSelection();
  let apicall;
  let searchQuery = document.getElementById("searchBar").value;
  let apicallDefault = `${API_URL}q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=10`;
  let apicallFiltered = `${API_URL}q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=10&time=${cookTimes[selectedKey]}`;
  if (selectedKey !== "none") {
    apicall = apicallFiltered;
  } else {
    apicall = apicallDefault;
  }
  fetch(apicall)
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
    })
    .catch((error) => console.log(error));
};

const drawResultItem = (resultData) => {
  searchResults.innerHTML += `
    <div class="search-results__item">
      <div class="title">${resultData.title}</div>
      <img class="image" src="${resultData.image}"></img>
      <div class="cook-time">${resultData.cookTime} min</div>
      <div class="links">
        <a href="${resultData.viewLink}">Read recipe</a>
        <a href="${resultData.sourceLink}">View source</a>      
      </div>
    </div>
  `;
};

//cooking time

// searchRecipes();

const getActiveSelection = () => {
  let activeSelection;
  filters.querySelectorAll("input").forEach((el) => {
    if (el.checked === true) {
      activeSelection = el.value;
    }
  });
  return activeSelection;
};

// filters.addEventListener("click", (event) => {
//   const target = event.target;
//   switch (target.id) {
//     case "fast":
//       selectedKey = "fast";
//       break;
//     case "medium":
//       selectedKey = "medium";
//       break;
//     case "long":
//       selectedKey = "long";
//       break;
//     case "none":
//       selectedKey = null;
//       break;
//   }
// });
