const URL = "https://api.chucknorris.io/jokes/categories";
let container;
let reset;
let input;
let joke;
let optionsCategories = [];
let selectedList = [];
let inputSelected = [];

window.onload = () => {
    container = document.getElementsByClassName("container__list")[0];
    getCategories().then(respuesta => printButton(respuesta));
    reset = document.getElementsByClassName("container__input__reset")[0];
    reset.addEventListener("click", () => clean());
    input = document.getElementsByClassName("container__input__new-joke")[0];
    input.addEventListener("click", () => {
        sendInputSelected().then(resp => printNewJoke(resp.value));
    });
    joke = document.getElementsByClassName("joke")[0];
}


const getCategories = async () => {
    const response = await fetch(URL);
    const formatDatas = await response.json();
    return formatDatas;   
}

const printButton = (categories) => {
    container.innerHTML = '';
    categories.forEach(element => {
        container.innerHTML = container.innerHTML + `<button class="categories__button--not-selected">${element}</button>`;
    });

    categories.forEach((element, i) => {
        optionsCategories[i] = {
            categorie: document.getElementsByClassName("categories__button--not-selected")[i],
            selected: false
        }
        optionsCategories[i].categorie.addEventListener("click", () => categoriesSelected(element, i));
    });
}

const categoriesSelected = (categorie, i) => {
    if (!optionsCategories[i].selected){
        optionsCategories[i].selected = true;
        optionsCategories[i].categorie.classList.remove("categories__button--not-selected");
        optionsCategories[i].categorie.classList.add("categories__button--selected");
        createInputSelected();
    }else{
        optionsCategories[i].selected = false;
        optionsCategories[i].categorie.classList.remove("categories__button--selected");
        optionsCategories[i].categorie.classList.add("categories__button--not-selected");
        createInputSelected();
    }
}

const clean = () => {
    optionsCategories.forEach(element => {
        if(element.selected){
            element.selected = false;
            element.categorie.classList.remove("categories__button--selected");
            element.categorie.classList.add("categories__button--not-selected");
        }
    });
    inputSelected = [];
}

const createInputSelected = () => {
    inputSelected = [];
    optionsCategories.forEach(element => {
        if (element.selected){
            inputSelected.push(element.categorie.textContent);
        }
    });
}

const sendInputSelected = async () => {
    const url = (inputSelected.length === 0) ? "https://api.chucknorris.io/jokes/random" : "https://api.chucknorris.io/jokes/random?category=" + inputSelected.join(',');
    const response = await fetch(url);
    const formatDatas = await response.json();
    return formatDatas;
}

const printNewJoke = (newJoke) => {
    joke.textContent = newJoke;
}