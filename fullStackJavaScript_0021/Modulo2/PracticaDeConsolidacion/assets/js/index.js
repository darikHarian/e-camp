let digiSearch = document.querySelector('#botonBuscar')

digiSearch.addEventListener('click', (event) => {
    event.preventDefault()
    let selectName = document.querySelector('#formBuscar').value

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${selectName}`)
    .then(response => response.json())
    .then(info => {
        digiCard.innerHTML = ''
        digiCard.innerHTML = `
            <img src="${info[0].img}" alt="" class="card-img rounded-circle drop-shadow-black mx-auto p-5">
        `
        document.querySelector('#nombre').setAttribute("class", "d-block text-center text-white text-shadow-black drop-shadow-black rounded-pill mt-3 py-1 mx-auto")
        nombre.innerHTML = ''
        nombre.innerHTML = `
            <h3 class="pt-1">Nombre: ${info[0].name}</h3>
        `

        document.querySelector('#nivel').setAttribute("class", "d-block text-center text-white text-shadow-black drop-shadow-black rounded-pill mt-2 py-1 mx-auto")
        nivel.innerHTML = ''
        nivel.innerHTML = `
            <h3 class="pt-1">Nivel: ${info[0].level}</h3>
        `
    })
})

window.onload = function() {
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(list => {
        i = 1
        for (let digimon of list) {
            digiThumb.innerHTML += `
                <li>
                    <a id="${digimon.name}" href="#search" class="btn listButton text-white text-shadow-black drop-shadow-black rounded-pill border-0 fs-1 my-1">${digimon.name} <img class="rounded-circle mb-1" style="width:30px" src="${digimon.img}"></a>
                </li>
            ` 
        }       
    })
}

let digiList = document.querySelector("#digiThumb")

digiList.addEventListener("click", digimon => {
    if (digimon.target && digimon.target.nodeName === "A") {
        let digimonSelected = digimon.target.id
        
        fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimonSelected}`)
        .then(response => response.json())
        .then(info => {
            digiCard.innerHTML = ''
            digiCard.innerHTML = `
                <img src="${info[0].img}" alt="" class="card-img rounded-circle drop-shadow-black mx-auto p-5">
            `
            document.querySelector('#nombre').setAttribute("class", "d-block text-center text-white text-shadow-black drop-shadow-black rounded-pill mt-3 py-1 mx-auto")
            nombre.innerHTML = ''
            nombre.innerHTML = `
                <h3 class="pt-1">Nombre: ${info[0].name}</h3>
            `

            document.querySelector('#nivel').setAttribute("class", "d-block text-center text-white text-shadow-black drop-shadow-black rounded-pill mt-2 py-1 mx-auto")
            nivel.innerHTML = ''
            nivel.innerHTML = `
                <h3 class="pt-1">Nivel: ${info[0].level}</h3>
            `
        })
    }
})