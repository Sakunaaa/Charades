export function createCard(name, image, text) {
    const label = document.createElement("label")
    label.classList.add("label")
    const card = document.createElement("section")
    card.classList.add("card") 
    card.style.backgroundImage = `url(${image})`
    console.log(image)
    const cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    const title = document.createElement("h2")
    const titleText = document.createTextNode(name)
    title.classList.add("card-title")
    const cardBody = document.createElement("p")
    const cardBodyText = document.createTextNode(text)
    cardBody.classList.add("card-body")
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("value", name)
    checkbox.classList.add("checkbox")

label.appendChild(card)
    card.appendChild(cardContent)
    cardContent.appendChild(title)
    title.appendChild(titleText)
    cardContent.appendChild(cardBody)
    cardBody.appendChild(cardBodyText)
    cardContent.appendChild(checkbox)

    return label
} 