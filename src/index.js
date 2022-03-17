import { createCard } from "./categoryCard";

// ToDo:
// Na czas kiedy jest wykonywany request zeby był loading
// Napraw karty gościu
// Timer

// clearInterval(countDown)

const categoriesElement = document.getElementById("categories");
const button = document.getElementById("play-btn");

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
        const selectedCards = document.getElementsByClassName("selected-card");
        console.log(selectedCards);
        if (selectedCards.length !== 0) {
          button.removeAttribute("disabled");
        }
        if (card.classList.contains("selected-card")) {
          card.classList.remove("selected-card");
          if (selectedCards.length === 0) {
            button.setAttribute("disabled", "true");
          }
        } else {
          card.classList.add("selected-card");
          button.removeAttribute("disabled");
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

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
const clue = document.getElementById("clue");
const rollBtn = document.getElementById("roll-btn");
const timer = document.getElementById("timer")

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
      let timeLimit = 300000;
      const minute = 60000;
      const second = 1000;
      const countDown = setInterval(() => {
        timeLimit -= 1000;
        const minutes = Math.floor(timeLimit / minute);
        const seconds = (timeLimit % minute) / second;

        const time = `0${minutes}:${seconds}`;
        timer.textContent = time

        if (timeLimit === 0) {
          clearInterval(countDown)
        }
        // uzyj minutes i seconds, zeby zaktualizowac tekst
      }, 1000) 
    });
  // TUTAJ BEDZIE TIMER
};

rollBtn.addEventListener("click", (event) => {
  getRandomWord();
});

categoriesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getRandomWord();
});

// const tablica = [{checked: true/false, value: string}]

// const card = document.getElementsByClassName("card")
// checked: checkbox.checked
