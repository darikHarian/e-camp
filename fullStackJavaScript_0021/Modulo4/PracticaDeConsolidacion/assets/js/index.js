const groups = [1, 2, 3]
const characters = [1, 2, 3, 4, 5]
// genCharacters(group).next()

for (const group of groups){
    const mouseEventGroup = document.querySelector(`#cardGroup${group}`)
    const mouseActionGroup = document.querySelector(`#gr${group}Chr1`)
    mouseEventGroup.addEventListener('mouseenter', () => {
        mouseActionGroup.style.visibility = 'visible'
        genCard(group, genCharacters())
    })
}

function genCard(group, character){
    console.log(`Funcion genCard - Grupo ${group} - Personaje ${character}`)
    const currentGroup = document.querySelector(`#gr${group}`)
    console.log(currentGroup)
}

function genCharacters(){
    for (const character of characters){
        console.log(`Funcion genCharacters - Personaje ${character}`)

    }
}

async function genData(id){ 
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const character = await response.json() 
    return character
}

// console.log(genData(10))