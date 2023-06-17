const groups = [1, 2, 3]
const characters = [1, 2, 3, 4, 5]

// AL PASAR EL MOUSE POR CADA CATEGORIA, SE MOSTRARÄ LA PRIMERA TARJETA CORRESPONDIENTE AL GRUPO SI ESTUVIERA OCULTA
for (const group of groups){
    const mouseEventGroup = document.querySelector(`#cardGroup${group}`)
    const mouseActionGroup = document.querySelector(`#gr${group}Chr1`)
    mouseEventGroup.addEventListener('mouseenter', () => {
        // mouseActionGroup.style.visibility = 'visible'
        currentGroup = group.toString()
        genCard(currentGroup)
        console.log(`Grupo actual: ${currentGroup} - Tpo de dato: ${typeof currentGroup}`)
        nextCard(currentGroup, genCharacters(currentGroup))
        
    })
}

function genCard(currentGroup){
    const currentCard = `gr${currentGroup}`
    console.log(`genCard - currentCard: ${currentCard}`)
    const getCard = document.querySelector(`#${currentCard}`)
    getCard.innerHTML = ``
    getCard.innerHTML = `
        <div id="gr${currentGroup}Chr1" class="card my-3 me-3">
            <div class="card-body text-center">
            <p class="card-title fw-semibold">
                Nombre
            </p>
            <p class="card-text">
                <p>Estatura</p>
                <p>Peso</p>
            </p>
            </div>
        </div>
    `
}

function nextCard(currentGroup){
    console.log(`Funcion nextCard - Grupo actual: ${currentGroup}`)
}

function genCharacters(currentGroup){
    for (const character of characters){
        console.log(`Funcion genCharacters: ${currentGroup} - ${character}`)
    }
}

async function genData(id){ 
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const character = await response.json() 
    return character
}

// console.log(genData(10))