import { createCard } from "./categoryCard";

// ToDo:
// 3. Zaznaczona wersja karty
// 5. Przycisk graj będzie wyłączony, jak nie będzie zaznaczonych kategorii
// w przypadku elementow ktore neiistneija od poczatku musimy stworzyc eventlistnera na calym documencie, 
// a następnie sprawdzic czy classList zawiera label 
// przykład: index.js w todo, linijka 88 
const categoriesElement = document.getElementById("categories");

fetch("http://localhost:3000/categories")
  .then((response) => response.json())
  .then((result) => {
    const categories = result.data;
    for (const category of categories) {
      const card = createCard(
        category.content,
        category.cover_src,
        category.description
      );
      categoriesElement.appendChild(card);
    }
  })
  .catch((error) => {
    console.log(error);
  });

const button = document.getElementById("play-btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById('modal-content');

button.addEventListener("click", () => {
  modal.showModal();
});

document.addEventListener(
  'click',
  (e) => {
    const withinModalBoundaries = e.composedPath().includes(modalContent);
    const withinButtonBoundaries = e.composedPath().includes(button);
    const isModalOpen = modal.open;

    if (!withinModalBoundaries && isModalOpen && !withinButtonBoundaries) {
      modal.close();
    }
  },
  false,
);

const categoriesForm = document.getElementById("categories");

categoriesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElements = [];
  for (let i = 0; i < categoriesForm.elements.length - 1; i++) {
    const checkbox = categoriesForm.elements[i];
    formElements.push({ value: checkbox.value, checked: checkbox.checked });
  }
});

// const tablica = [{checked: true/false, value: string}]

// const card = document.getElementsByClassName("card")

// card.addEventListener("click", () => {
//   console.log(card)
//   if (card.classList.contains("selected-card")) {
//     card.classList.remove("selected-card")
//   } else {
//     card.classList.add("selected-card")
//   }
// })