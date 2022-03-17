import { createCard } from "./categoryCard";

// ToDo:
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
        category.description,
        category.id
      );
      categoriesElement.appendChild(card);
    }

    document.addEventListener("click", (event) => {
      const className = event.target.className;
      if (className.includes("card")) {
        const card = event.target;
        if (card.classList.contains("selected-card")) {
          card.classList.remove("selected-card");
        } else {
          card.classList.add("selected-card");
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

const button = document.getElementById("play-btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

button.addEventListener("click", () => {
  modal.showModal();
});

document.addEventListener(
  "click",
  (e) => {
    const withinModalBoundaries = e.composedPath().includes(modalContent);
    const withinButtonBoundaries = e.composedPath().includes(button);
    const isModalOpen = modal.open;

    if (!withinModalBoundaries && isModalOpen && !withinButtonBoundaries) {
      modal.close();
    }
  },
  false
);

const categoriesForm = document.getElementById("categories");
const clue = document.getElementById("clue")
const rollBtn = document.getElementById("roll-btn")

const getRandomWord = () => {
  const formElements = [];
  for (let i = 0; i < categoriesForm.elements.length - 1; i++) {
    const checkbox = categoriesForm.elements[i];
    if (checkbox.checked) {
      formElements.push(checkbox.value);
    }
  }
  fetch("http://localhost:3000/random-word", {
    method: "POST",
    body: JSON.stringify({ categoryIds: formElements }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      clue.textContent = result.data.content;
    });
}

rollBtn.addEventListener("click", (event) => {
  getRandomWord()
})

categoriesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getRandomWord()
});

// const tablica = [{checked: true/false, value: string}]

// const card = document.getElementsByClassName("card")
// checked: checkbox.checked
