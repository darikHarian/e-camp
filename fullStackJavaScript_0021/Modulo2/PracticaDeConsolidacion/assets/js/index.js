let digiSearch = document.querySelector('#botonBuscar')

digiSearch.addEventListener('click', (event) => {
    event.preventDefault()
    let selectName = document.querySelector('#formBuscar').value

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${selectName}`)
    .then(response => response.json())
    .then(info => {
        digiCard.innerHTML = ''
        digiCard.innerHTML = `
        <img src="${info[0].img}" alt="" class="card-img rounded-circle drop-shadow-white mx-auto p-5">
        `
    })
})