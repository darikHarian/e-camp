export function iterator() {
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
}