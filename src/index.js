import { createCard } from "./categoryCard";

// ToDo:
// 1. Dodać zamykanie modala
// 3. Zaznaczona wersja karty
// 4. Console.log kategorii, po kliknięciu w "Graj"
// 5. Przycisk graj będzie wyłączony, jak nie będzie zaznaczonych kategorii
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
// const modalContent = document.getElementById('modal-content');

button.addEventListener("click", () => {
  modal.showModal();
});

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
