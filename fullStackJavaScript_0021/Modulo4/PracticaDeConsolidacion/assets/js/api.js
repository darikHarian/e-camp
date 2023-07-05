import { genCardsTop, genCardsMiddle, genCardsBottom } from "./gen.js"

export async function genData(id){ 
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const character = await response.json() 
    return character
}