const groups = [1, 2, 3]
const characters = [1, 2, 3, 4, 5]

for (const group of groups){
    const mouseEventGroup = document.querySelector(`#cardGroup${group}`)

    let genCards
    if (group == 1) {
        genCards = genCardsTop(group)
    } else if (group == 2) {
        genCards = genCardsMiddle(group)
    } else {
        genCards = genCardsBottom(group)
    }

    mouseEventGroup.addEventListener('mouseenter', () => {
        currentGroup = group.toString()
        const card = genCards.next().value
    })
}

function genCard(currentGroup, character){
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

function* genCardsTop(currentGroup) {
    for (const character of characters) {
        yield genCard(currentGroup, character)
    }
}

function* genCardsMiddle(currentGroup) {
    for (let character = 6; character <= 10; character++) {
        const card = character
        yield genCard(currentGroup, character)
    }
}

function* genCardsBottom(currentGroup) {
    for (let character = 11; character <= 15; character++) {
        yield genCard(currentGroup, character)
    }
}

async function genData(id){ 
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const character = await response.json() 
    return character
}