let ingresoDinero = document.querySelector('#botonPresupuesto')                                     // Selecciono el botón con la id #botonPresupuesto
let ingresogastos = document.querySelector('#botonGastos')                                          // Selecciono el botón con la id #botonGastos
let sumaPresupuesto = 0                                                                             // Declaro la variable para acumular la suma de los ingresos de dinero
let sumaGastos = 0                                                                                  // Declaro la variable para acumular la suma de los gastos
let stringInputValorGastos = ''                                                                     // Declaro la variable donde se agregará el valor de cada gasto convertido a String
let stringSumaGastos = ''                                                                           // Declaro la variable donde se agregará el valor final de los gastos convertido a String
let arrGastos = []                                                                                  // Declaro la variable del arreglo en donde guardaré los objetos creados por cada gasto ingresado                                                                   

/* SECCION PRESUPUESTO */
ingresoDinero.addEventListener('click', (noReload) => {                                             // Creo un evento click para estar a la escucha del boton de presupuesto
    noReload.preventDefault()                                                                       // Agrego un preventDefault para evitar que se recargue la página al evento Submit del boton
    let stringSumaPresupuesto = ''                                                                  // Declaro la variable donde se agregará el valor final de la suma, convertido a String
    let valorIngresoDinero = parseInt(document.querySelector('#valorPresupuesto').value)            // Creo la variable para guardar el valor del input de presupuesto parseado a Integer
    let inputPresupuesto = document.querySelector('#valorPresupuesto')                              // Creo la variable con la etiqueta de id valorPresupuesto para posteriormente borrar lo ingresado en el input
    if(isNaN(valorIngresoDinero) || valorIngresoDinero <= 0){                                       // Evaluo si valorIngresoDinero es un NaN o es menor o igual a cero, si se cumplen cualquiera de esas dos sentencias
    }else{                                                                                          //  el código no hace nada y si no se sigue ejecutando el código normalmente
        sumaPresupuesto += valorIngresoDinero                                                       // Hago la sumatoria de la variable sumaPresupuesto con el valor de la variable valorIngresoDinero
        stringSumaPresupuesto = sumaPresupuesto                                                     // Copio el valor en otra variable para convertirlo a string mientras el original se mantiene como number para realizar operaciones
        stringSumaPresupuesto = period(stringSumaPresupuesto)                                       // Parseo el valor de la variable a String para asignarle el punto cada 3 digitos con la función period()
        rtPresupuesto.innerHTML = `                                                                     
            <div class="">Presupuesto</div>
            <div class="fs-4">$${stringSumaPresupuesto}</div>
        `                                                                                           // Escribo el resultado del ingreso de dinero en la etiqueta con id rtPresupuesto
        totalSaldo()                                                                                // Llamo a la función totalSaldo para calcular lo que queda de dinero
    }
    limpiarInput(inputPresupuesto)                                                                  // Llamo a la funcion limpiarInput para borrar lo escrito en el input después de hacer click en el boton Calcular
})

/* SECCION GASTOS */
ingresogastos.addEventListener('click', (noReload) => {                                             // Creo un evento click para estar a la escucha del boton gastos
    noReload.preventDefault()                                                                       // Agrego un preventDefault para evitar que se recargue la página al evento Submit del boton
    let regex = /^\s*$/                                                                             // Declaro un regex para validar que no se ingresen espacios en blanco o no se ingrese nada
    let inputTextoGastos = document.querySelector('#textoGasto').value                              // Creo la variable para guardar el valor del input del texto de gastos
    let inputValorGastos = parseInt(document.querySelector('#valorGasto').value)                    // Creo la variable para guardar el valor del input de gastos parseado a Integer
    let textoGastos = document.querySelector('#textoGasto')                                         // Creo la variable con la etiqueta de id textoGasto para posteriormente borrar lo ingresado en el input
    let valorGastos = document.querySelector('#valorGasto')                                         // Creo la variable con la etiqueta de id valorGasto para posteriormente borrar lo ingresado en el input
    if(regex.test(inputTextoGastos)){                                                               // Valido con un if y el regex si hay espacios en blanco o no se ha ingresado algún texto
    }else if(isNaN(inputValorGastos) || inputValorGastos <= 0){                                     // Valido si el valor ingresado es un NaN o es menor o igual a cero, si no se cumplen las condiciones se sigue con la ejecución
    }else{
        let gasto = new fcGastos(inputTextoGastos, inputValorGastos)                                // Creo un nuevo objeto mediante la funcion constructora fcGastos
        arrGastos.push(gasto)                                                                       // Agrego los objetos creados al array arrGastos
        sumaGastos += inputValorGastos                                                              // Sumo a la variable el valor del input
        stringSumaGastos = sumaGastos                                                               // Copio el valor en otra variable para convertirlo a string mientras el original se mantiene como number para realizar operaciones
        stringSumaGastos = period(stringSumaGastos)                                                 // Llamo a la funcion period para agregar los puntos cada 3 digitos a la cifra
        rtGastos.innerHTML = `
            <div class="">Gastos</div>
            <div class="fs-4">$${stringSumaGastos}</div>
        `                                                                                           // Escribo el resultado de la suma de los gastos en la etiqueta con id rtgastos
        tData.innerHTML = ''                                                                        // Borro todos los elementos dentro de la etiqueta con el id tData para llenarlo con datos nuevos
        let indice = 0                                                                              // Declaro la variable indice para agregarla cuando llame a la funcion onclick
        arrGastos.forEach(function(gasto) {                                                         // Recorro el arreglo arrGastos con forEach
            stringInputValorGastos = gasto.valor                                                    // Copio el valor del objeto en la variable stringInputValorGastos
            stringInputValorGastos = period(stringInputValorGastos)                                // Llamo a la funcion period para agregar los puntos cada 3 digitos a la cifra
            tData.innerHTML += `
                <tr>
                    <td>${gasto.concepto}</td>
                    <td>$${stringInputValorGastos}</td>
                    <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indice})"></span></td>
                </tr>
            `                                                                                       // Dibujo en la tabla los valores de cada objeto junto con el ícono para posteriormente eliminmar los datos
            indice ++                                                                               // Incremento por cada iteración el valor del indice en 1
        })
        totalSaldo()                                                                                // Llamo a la funcion totalSaldo para realizar las operaciones aritméticas y dibujar en el resumen el saldo
    }                                                                                
    limpiarInput(textoGastos)                                                                       // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputTextoGastos
    limpiarInput(valorGastos)                                                                       // Llamo a la funcion limpiarInput para borrar lo escrito en la variable inputValorGastos
})

/* SECCION FUNCIONES */
function fcGastos(concepto, valor) {                                                                // Funcion constructora para crear un objeto con los elementos concepto y valor
    this.concepto = concepto
    this.valor = valor
}

function totalSaldo(){
    let valorTotalSaldo = 0                                                                         // Declaro la variable donde guardaré el total de presupuesto - saldo por cada actualización de estos
    let stringValorTotalSaldo = ''                                                                  // Declaro la variable donde se guardará el valor total convertido a String
    valorTotalSaldo = sumaPresupuesto - sumaGastos                                                  // Realizo las operaciones aritméticas dentro de la funcion totalSaldo
    if(valorTotalSaldo <= 0){
        valorTotalSaldo = 0                                                                         // Mientras valorTotalSaldo sea menor o igual a cero, se dibujará en la página principal un cero
    }                                                                   
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
    number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");                               // Convierto a String la cifra y agrego los puntos
    return number                                                                                   // Retorno el valor de la variable
}

function eliminar(indice){                                                                          // Creo la función eliminar para eliminar el elemento seleccionado de la lista dentro de la tabla
    eliminarElemento = arrGastos[indice]                                                            // Selecciono el objeto a eliminar y lo almaceno en una variable
    valorElemento = arrGastos[indice].valor                                                         // Guardo el valor del objeto seleccionado en una variable para realizar las operaciones aritméticas
    sumaGastos -= valorElemento                                                                     // Resto a la suma de gastos el valor del elemento seleccionado para no incluirlo en los gastos
    stringSumaGastos = sumaGastos                                                                   // Copio el valor en la variable stringSumaGastos
    stringSumaGastos = period(stringSumaGastos)                                                     // Convierto el valor a String y le agrego el punto cuando corresponda
    rtGastos.innerHTML = `
        <div class="">Gastos</div>
        <div class="fs-4">$${stringSumaGastos}</div>
    `                                                                                               // Dibujo en el resumen el valor actualizado de gastos
    let nuevoArray = arrGastos.filter(objeto => objeto !== eliminarElemento)                        // Ocupo el método filter para generar un nuevo array sin el objeto seleccionado
    arrGastos = nuevoArray                                                                          // Copio al array original los nuevos datos
    tData.innerHTML = ''                                                                            // Borro todos los elementos dentro de la etiqueta con el id tData para llenarlo con datos nuevos
    let indiceElemento = 0                                                                          // Declaro el iterador en cero para asignarlo como argumento de la funcion onclick en el nuevo arreglo
    arrGastos.forEach(function(gasto) {                                                             // Recorro el arreglo arrGastos con forEach
        stringInputValorGastos = gasto.valor                                                        // Copio el valor del objeto en la variable stringInputValorGastos
        stringInputValorGastos = period(stringInputValorGastos)                                     // Convierto el valor a String y le agrego el punto cuando corresponda
        tData.innerHTML += `
            <tr>
                <td>${gasto.concepto}</td>
                <td>$${stringInputValorGastos}</td>
                <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indiceElemento})"></span></td>
            </tr>
        `                                                                                           // Dibujo en la tabla los nuevos valores eliminando el objeto seleccionado de la lista
        indiceElemento ++                                                                           // Incremento el valor del indice en 1 con cada iteracion
    })
    totalSaldo()                                                                                    // Llamo a la funcion totalSaldo para realizar las operaciones aritméticas y dibujar en el resumen el saldo
}