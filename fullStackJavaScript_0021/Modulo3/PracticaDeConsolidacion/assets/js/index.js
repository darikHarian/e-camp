let ingresoDinero = document.querySelector('#botonPresupuesto')                                     // Selecciono la id #botonPresupuesto
let ingresogastos = document.querySelector('#botonGastos')                                          // Selecciono la id #botonGastos
let sumaPresupuesto = 0                                                                             // Declaro la variable para acumular la suma de los ingreso de dinero
let stringSumaPresupuesto = ''                                                                      // Declaro la variable donde se agregará el valor final de la suma, convertido a String
let sumaGastos = 0 
let stringInputValorGastos = ''
let stringSumaGastos = ''                                                                           // Declaro la variable para acumular la suma de los gastos 
let arrGastos = []
let valorTotalSaldo = 0

/* SECCION PRESUPUESTO */
ingresoDinero.addEventListener('click', (noReload) => {                                             // Creo un evento click para estar a la escucha del boton de presupuesto
    noReload.preventDefault()                                                                       // Agrego un preventDefault para evitar que se recargue la página al evento Submit del boton

    let valorIngresoDinero = parseInt(document.querySelector('#valorPresupuesto').value)            // Creo la variable para guardar el valor del input de presupuesto parseado a Integer
    let inputPresupuesto = document.querySelector('#valorPresupuesto')                              // Selecciono el elemento completo del input
    sumaPresupuesto += valorIngresoDinero                                                           // Sumo a la variable sumaPresupuesto el valor del input, en este caso valorIngresoDinero
    stringSumaPresupuesto = sumaPresupuesto                                                         // Asigno el valor de la Suma a valorSuma para evitar errores de Parseo
    stringSumaPresupuesto = period(stringSumaPresupuesto)                                           // Llamo a la funcion period para agregar los puntos cada 3 digitos a la cifra
    rtPresupuesto.innerHTML = `                                                                     
        <div class="">Presupuesto</div>
        <div class="fs-4">$${stringSumaPresupuesto}</div>
    `                                                                                               // Escribo el resultado de la suma convertida a String y con punto al resumen de presupuesto

    totalSaldo()
    limpiarInput(inputPresupuesto)                                                                  // Llamo a la funcion limpiarInput para borrar lo escrito en el input después de hacer click en el boton Calcular
})

/* SECCION GASTOS */
ingresogastos.addEventListener('click', (noReload) => {
    noReload.preventDefault()
    let inputTextoGastos = document.querySelector('#textoGasto').value
    let inputValorGastos = parseInt(document.querySelector('#valorGasto').value)                    // Creo la variable para guardar el valor del input de gastos parseado a Integer
    let textoGastos = document.querySelector('#textoGasto')
    let valorGastos = document.querySelector('#valorGasto')
    let gasto = new fcGastos(inputTextoGastos, inputValorGastos)                                    // Creo un nuevo objeto mediante la funcion constructora fcGastos
    arrGastos.push(gasto)                                                                           // Agrego los objetos creados al array arrGastos
    sumaGastos += inputValorGastos
    stringSumaGastos = sumaGastos
    stringSumaGastos = period(stringSumaGastos)
    rtGastos.innerHTML = `
        <div class="">Gastos</div>
        <div class="fs-4">$${stringSumaGastos}</div>
    `
    tData.innerHTML = ''                                                                            // Borro todos los elementos dentro de la etiqueta con el id tData para llenarlo con datos nuevos
    arrGastos.forEach(function(gasto) {
        stringInputValorGastos = gasto.valor
        stringInputValorGastos = period(stringInputValorGastos)
        tData.innerHTML += `
            <tr>
                <td>${gasto.concepto}</td>
                <td>$${stringInputValorGastos}</td>
                <td><span class="bi bi-trash-fill text-danger"></span></td>
            </tr>
        `
    })

    totalSaldo()

    limpiarInput(textoGastos)                                                                       // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputTextoGastos
    limpiarInput(valorGastos)                                                                    // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputValorGastos
})

/* SECCION FUNCIONES */
function fcGastos(concepto, valor) {                                                                // Funcion constructora para crear un objeto con los elementos concepto y valor
    this.concepto = concepto
    this.valor = valor
}

function totalSaldo(){
    valorTotalSaldo = sumaPresupuesto - sumaGastos
    valorTotalSaldo = period(valorTotalSaldo)
    rtSaldo.innerHTML = `
    <div class="">Saldo</div>
    <div class="fs-4">$${valorTotalSaldo}</div>
`
}

function limpiarInput(elemento){                                                                    // Funcion para borrar lo escrito en los inputs luego de hacer click en el botón correspondiente
    elemento.value = ""
}

function period(number){                                                                            // Recibo el valor de la variable valorSumaPresupuesto a través del argumento number
    number = number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")             // Convierto a String la cifra y agrego los puntos
    return number                                                                                   // Retorno el valor de la variable
}