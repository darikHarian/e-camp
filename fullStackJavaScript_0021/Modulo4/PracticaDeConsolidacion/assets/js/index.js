import { genCard, genCardsTop, genCardsMiddle, genCardsBottom } from "./gen.js"

const groups = [1, 2, 3]

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
        const currentGroup = group.toString()
        const card = genCards.next().value
    })
}