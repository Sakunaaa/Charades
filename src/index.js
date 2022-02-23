import {
    createCard
} from './categoryCard'

// 1. Przypisać do zmiennej element, do którego chcemy wrzucić nasze karty
// 2. Musimy pobrać kategorie do kart
// 3. Po udanym pobraniu, musimy wykorzystać pobrane dane, aby zapełnić nimi karty (createCard)
const categoriesElement = document.getElementById("categories")

fetch("http://localhost:3000/categories")    
.then(response => response.json())
.then((result) => {
        const categories = result.data
        for ( const category of categories) {
            const card = createCard(category.content, category.cover_src, category.description)
            categoriesElement.appendChild(card)
        } 
}).catch((error) => {
    console.log(error)
})
