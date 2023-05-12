let ingresoDinero = document.querySelector('#botonPresupuesto')
let sumaPresupuesto = 0

ingresoDinero.addEventListener('click', (noReload) => {
    noReload.preventDefault()

    let valorIngresoDinero = parseInt(document.querySelector('#valorPresupuesto').value)
    sumaPresupuesto += valorIngresoDinero
    rtPresupuesto.innerHTML = `
        <div class="">Presupuesto</div>
        <div class="fs-4">$${sumaPresupuesto}</div>
    `
    function limpiarInput(){
        
    }
})

// texto.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")