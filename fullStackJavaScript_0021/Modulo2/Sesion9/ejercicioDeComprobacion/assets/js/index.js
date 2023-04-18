// REQUERIMIENTOS

// Al pasar el mouse por el primer <div> "text1" se mostrará el segundo y al salir de él, se ocultará nuevamente (OK)

// Al hacer click en el <div> id "caja2" la imagen deberá agrandarse un 100% y al salir de ella, volver a su tamaño inicial (OK)

// Con el tercer <div> la letra se agrandará al hacer doble clic en él (OK)

// La imagen seleccionada para el trabajo es irrelevante (OK)

function showText(){
    document.getElementById('text2').style.display = "block"
}

function hideText(){
    document.getElementById('text2').style.display = "none"
}

function maxImage(){
    document.getElementById("img").setAttribute("width", "100%")
}

function minImage(){
    document.getElementById("img").setAttribute("width", "20%")
}

function maxText(){
    document.getElementById("caja3").style.fontSize = "30px"
}