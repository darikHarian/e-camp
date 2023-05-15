let ingresoDinero = document.querySelector('#botonPresupuesto')                                     // Selecciono el botón con la id #botonPresupuesto
let ingresogastos = document.querySelector('#botonGastos')                                          // Selecciono el botón con la id #botonGastos
let sumaPresupuesto = 0                                                                             // Declaro la variable para acumular la suma de los ingresos de dinero
let stringSumaPresupuesto = ''                                                                      // Declaro la variable donde se agregará el valor final de la suma, convertido a String
let sumaGastos = 0                                                                                  // Declaro la variable para acumular la suma de los gastos
let stringInputValorGastos = ''                                                                     // Declaro la variable donde se agregará el valor de cada gasto convertido a String
let stringSumaGastos = ''                                                                           // Declaro la variable donde se agregará el valor final de los gastos convertido a String
let arrGastos = []                                                                                  // Declaro la variable del arreglo en donde guardaré los objetos creados por cada gasto ingresado
let valorTotalSaldo = 0                                                                             // Declaro la variable donde guardaré el total de presupuesto - saldo por cada actualización de estos
let stringValorTotalSaldo = ''                                                                      // Declaro la variable donde se agregará el valor final de la operacion de saldo convertida a String

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
    
    totalSaldo()                                                                                    // Llamo a la funcion totalSaldo para realizar las operaciones aritméticas
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
    sumaGastos += inputValorGastos                                                                  // Sumo a la variable el valor del input
    stringSumaGastos = sumaGastos                                                                   // Copio el valor en otra variable para convertirlo a string mientras el original se mantiene como number para realizar operaciones
    stringSumaGastos = period(stringSumaGastos)                                                     // Llamo a la funcion period para agregar los puntos cada 3 digitos a la cifra
    rtGastos.innerHTML = `
        <div class="">Gastos</div>
        <div class="fs-4">$${stringSumaGastos}</div>
    `                                                                                               // Escribo el resultado de la suma de los gastos en la etiqueta con id rtgastos
    tData.innerHTML = ''                                                                            // Borro todos los elementos dentro de la etiqueta con el id tData para llenarlo con datos nuevos
    let indice = 0                                                                                  // Declaro la variable indice para agregarla cuando llame a la funcion onclick
    arrGastos.forEach(function(gasto) {                                                             // Recorro el arreglo arrGastos con forEach
        stringInputValorGastos = gasto.valor
        stringInputValorGastos = period(stringInputValorGastos)
        tData.innerHTML += `
            <tr>
                <td>${gasto.concepto}</td>
                <td>$${stringInputValorGastos}</td>
                <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indice})"></span></td>
            </tr>
        `
        indice ++                                                                                   // Incremento por cada iteración el valor del indice en 1
    })

    totalSaldo()                                                                                    // Llamo a la funcion totalSaldo para realizar las operaciones aritméticas

    limpiarInput(textoGastos)                                                                       // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputTextoGastos
    limpiarInput(valorGastos)                                                                       // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputValorGastos
})

/* SECCION FUNCIONES */
function fcGastos(concepto, valor) {                                                                // Funcion constructora para crear un objeto con los elementos concepto y valor
    this.concepto = concepto
    this.valor = valor
}

function totalSaldo(){
    valorTotalSaldo = sumaPresupuesto - sumaGastos                                                  // Realizo las operaciones aritméticas dentro de la funcion totalSaldo
    valorTotalSaldo <= 0? valorTotalSaldo = 0:                                                      // Evaluo si el saldo es menor o igual a cero, el saldo que debe mostrar será cero
    stringValorTotalSaldo = valorTotalSaldo
    stringValorTotalSaldo = period(stringValorTotalSaldo)                                           // Convierto el valor a String y le agrego el punto cuando corresponda
    rtSaldo.innerHTML = `                                                                           
        <div class="">Saldo</div>
        <div class="fs-4">$${stringValorTotalSaldo}</div>
    `                                                                                               // Escribo en el elemento con id rtSaldo el resultado de la operación
}

function limpiarInput(elemento){                                                                    // Funcion para borrar lo escrito en los inputs luego de hacer click en el botón correspondiente
    elemento.value = ""
}

function period(number){                                                                            // Recibo el valor de la variable valorSumaPresupuesto a través del argumento number
    number = number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")             // Convierto a String la cifra y agrego los puntos
    return number                                                                                   // Retorno el valor de la variable
}

function eliminar(indice){
    eliminarElemento = arrGastos[indice]
    valorElemento = arrGastos[indice].valor
    sumaGastos -= valorElemento
    stringSumaGastos = sumaGastos
    stringSumaGastos = period(stringSumaGastos)
    rtGastos.innerHTML = `
        <div class="">Gastos</div>
        <div class="fs-4">$${stringSumaGastos}</div>
    `
    let nuevoArray = arrGastos.filter(objeto => objeto !== eliminarElemento)                        // Ocupo el método filter para generar un nuevo array sin el objeto seleccionado
    arrGastos = nuevoArray                                                                          // Copio al array original los nuevos datos
    tData.innerHTML = ''                                                                            // Borro todos los elementos dentro de la etiqueta con el id tData para llenarlo con datos nuevos
    let indiceElemento = 0                                                                          // Declaro el iterador en cero para asignarlo como argumento de la funcion onclick en el nuevo arreglo
    arrGastos.forEach(function(gasto) {                                                             // Recorro el arreglo arrGastos con forEach
        stringInputValorGastos = gasto.valor
        stringInputValorGastos = period(stringInputValorGastos)
        tData.innerHTML += `
            <tr>
                <td>${gasto.concepto}</td>
                <td>$${stringInputValorGastos}</td>
                <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indiceElemento})"></span></td>
            </tr>
        `
        indiceElemento ++
    })

    totalSaldo()
}