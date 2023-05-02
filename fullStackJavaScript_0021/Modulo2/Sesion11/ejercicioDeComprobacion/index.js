let card = document.querySelector('button')

card.addEventListener('click', () => {

    fetch('https://geek-jokes.sameerkumar.website/api?format=json')
        .then(response => response.json())
        .then(info => {
            card(info)
        })

    function card(info) {
        cardContent.innerHTML = ""
        cardContent.innerHTML += `
            <p class="fs-4">
                ${info.joke}
            </p>
        `
    }  
})