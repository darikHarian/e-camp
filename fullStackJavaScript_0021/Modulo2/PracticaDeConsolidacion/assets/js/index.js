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
            Nombre: ${info[0].name}
        `

        document.querySelector('#nivel').setAttribute("class", "d-block text-center text-white text-shadow-black drop-shadow-black rounded-pill mt-2 py-1 mx-auto")
        nivel.innerHTML = ''
        nivel.innerHTML = `
            Nivel: ${info[0].level}
        `
    })
    .catch(error => console.log(error));
})

window.onload = function() {
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(list => {
        for (let digimon of list) {
            digiThumb.innerHTML += `
                <li class="text-shadow-black drop-shadow-black text-center rounded-pill border-0 fs-1 my-1 mx-auto">
                    <a id="${digimon.name}" class="btn listButton text-white" href="#top">${digimon.name} <img class="rounded-circle" style="width:30px" src="${digimon.img}"></a>
                </li>
            ` 
        }       
    })
    .catch(error => console.log(error));
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
        .catch(error => console.log(error));
    }
})