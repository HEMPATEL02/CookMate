const title = document.querySelector('.title');
const info = document.querySelector('.info');
const img = document.querySelector('.img');
const ingredientsOutput = document.querySelector('.ingredients');
const videoContainer = document.querySelector('.video');
const input = document.querySelector('.input');
const form = document.querySelector('form');
const magnifier = document.querySelector('.magnifier');

const fetchMealData = async (val) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    const { meals } = await res.json();
    return meals;
};

const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions, strYoutube } = meal;

    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    const ingredients = [];
    for (let i = 1; i <= 10; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    ingredientsOutput.innerHTML = `<span>${ingredients.map((ing) => `<li class="ing">${ing}</li>`).join("")}</span>`;

    if (strYoutube) {
        const videoId = strYoutube.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        videoContainer.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        videoContainer.innerHTML = "";
    }
};

const showAlert = () => {
    alert('Meal not found :(');
};

const searchMeal = async (e) => {
    e.preventDefault();
    const val = input.value.trim() || "burger";
    const meals = await fetchMealData(val);
    if (!meals) {
        showAlert();
        return;
    }
    showMealInfo(meals[0]);
};

window.addEventListener("DOMContentLoaded", async () => {
    const meals = await fetchMealData("burger");
    if (meals && meals.length > 0) {
        showMealInfo(meals[0]);
    }
});

form.addEventListener('submit', searchMeal);
magnifier.addEventListener('click', searchMeal);
