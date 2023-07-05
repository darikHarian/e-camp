import { genData } from './api.js'

export function genCard(currentGroup, character){
    const getCard = document.querySelector(`#gr${currentGroup}`)
    genData(character).then(character => {
        let name = character.name
        let height = character.height
        let weight = character.mass
        
        getCard.innerHTML += `
            <div class="card rounded-4 my-3 me-3">
                <div class="card-body text-center overflow-hidden">
                    <p class="card-title fw-semibold lh-1">
                        ${name}
                    </p>
                    <div class="card-text">
                        <p class="">Estatura: ${height}cm</p>
                        <p class="lh-1">Peso: ${weight}Kg</p>
                    </div>
                </div>
            </div>
        `
    })
    
}

export function* genCardsTop(currentGroup) {
    for (let character = 1; character <= 5; character++) {
        yield genCard(currentGroup, character)
    }
}

export function* genCardsMiddle(currentGroup) {
    for (let character = 6; character <= 10; character++) {
        const card = character
        yield genCard(currentGroup, character)
    }
}

export function* genCardsBottom(currentGroup) {
    for (let character = 11; character <= 15; character++) {
        yield genCard(currentGroup, character)
    }
}