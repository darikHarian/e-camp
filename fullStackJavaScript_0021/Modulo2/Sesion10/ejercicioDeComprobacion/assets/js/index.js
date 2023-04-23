// REQUERIMIENTOS

// Al pasar el mouse por el primer <div> "text1" se mostrará el segundo y al salir de él, se ocultará nuevamente (OK)

// Al hacer click en el <div> id "caja2" la imagen deberá agrandarse un 100% y al salir de ella, volver a su tamaño inicial (OK)

// Con el tercer <div> la letra se agrandará al hacer doble clic en él (OK)

// La imagen seleccionada para el trabajo es irrelevante (OK)

$(document).ready(function(){

    $("#text1").mouseenter(function(){
        $("#text2").show()
    })

    $("#text1").mouseleave(function(){
        $("#text2").hide()
    })

    $("#caja2").click(function(){
        $("img").css("width", "100%")
    })

    $("#caja2").mouseleave(function(){
        $("img").css("width", "20%")
    })

    $("#caja3").dblclick(function(){
        $(this).css("font-size", "30px")
    })
})