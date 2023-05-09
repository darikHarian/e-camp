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

window.onload = function() {
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(list => {
        for (let digimon of list) {
            digiThumb.innerHTML += `
                <li>
                    <button class="text-white text-shadow-black drop-shadow-black rounded-pill border-0 fs-1 my-1">${digimon.name} <img class="rounded-circle mb-1" style="width:30px" src="${digimon.img}"></button
                </li>
            ` 
        }       
    })
}