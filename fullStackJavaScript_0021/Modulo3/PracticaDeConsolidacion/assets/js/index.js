let ingresoDinero = document.querySelector('#botonPresupuesto')                                     // Selecciono la id #botonPresupuesto
let ingresogastos = document.querySelector('#botonGastos')                                          // Selecciono la id #botonGastos
let sumaPresupuesto = 0                                                                             // Declaro la variable para acumular la suma de los ingreso de dinero
let valorSumaPresupuesto = ''                                                                       // Declaro la variable donde se agregará el valor final de la suma, convertido a String
let sumaGastos = 0                                                                                  // Declaro la variable para acumular la suma de los gastos 

ingresoDinero.addEventListener('click', (noReload) => {                                             // Creo un evento click para estar a la escucha del boton de presupuesto
    noReload.preventDefault()                                                                       // Agrego un preventDefault para evitar que se recargue la página al evento Submit del boton

    let valorIngresoDinero = parseInt(document.querySelector('#valorPresupuesto').value)            // Creo la variable para guardar el valor del input de presupuesto parseado a Integer
    let input = document.querySelector('#valorPresupuesto')                                         // Selecciono el elemento completo del input
    sumaPresupuesto += valorIngresoDinero                                                           // Sumo a la variable sumaPresupuesto el valor del input, en este caso valorIngresoDinero
    valorSumaPresupuesto = sumaPresupuesto                                                          // Asigno el valor de la Suma a valorSuma para evitar errores de Parseo
    valorSumaPresupuesto = period(valorSumaPresupuesto)                                             // Llamo a la funcion period para agregar los puntos cada 3 digitos a la cifra
    rtPresupuesto.innerHTML = `                                                                     
        <div class="">Presupuesto</div>
        <div class="fs-4">$${valorSumaPresupuesto}</div>
    `                                                                                               // Escribo el resultado de la suma convertida a String y con punto al resumen de presupuesto
    limpiarInput(input)                                                                             // Llamo a la funcion limpiarInput para borrar lo escrito en el input después de hacer click en el boton Calcular
})

function limpiarInput(elemento){
    elemento.value = ""
}

function period(number){                                                                            // recibo el valor de la variable valorSumaPresupuesto a través del argumento number
    number = number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")             // Convierto a String la cifra y agrego los puntos
    return number                                                                                   // Retorno el valor de la variable
}