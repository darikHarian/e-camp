// USÉ EL MÉTODO TRIM PARA IMPEDIR QUE SE INTRODUSCAN ESPACIOS EN BLANCO EN LOS <INPUT> AÚN NO FUNCIONA MUY BIEN
const input = document.querySelector(".form-control");
input.addEventListener("input", () => {
  input.value = input.value.trim();
});

function formCommunicate(){
    document.getElementById("communicate").setAttribute("class", "d-flex justify-content-center text-white")   
}

function formBooking(){
    document.getElementById("booking").setAttribute("class", "d-flex justify-content-center text-white mt-3")
}

let communicateMessage = document.getElementById("communicateForm")

communicateMessage.addEventListener("submit", function(event){
    event.preventDefault()
    let cname = document.getElementById("cname").value
    let cemail = document.getElementById("cemail").value
    let cphone = document.getElementById("cphone").value
    let csubject = document.getElementById("csubject").value

    if(cname === ""){
        alert('El campo "Nombre" es obligatorio')
    } else if (cemail === ""){
        alert('El campo "Email" es obligatorio')
    } else if (cphone === ""){
        alert('El campo "Teléfono" es obligatorio')
    } else if (csubject === ""){
        alert('El campo "Sujeto" es obligatorio')
    } else {
        alert(`Muchas gracias ${cname}, hemos recibido su ${csubject} y\nenviaremos una pronta respuesta al correo ${cemail}`)
        window.location.href = "redirect.html"
    }
})

let bookingMessage = document.getElementById("bookingForm")

bookingMessage.addEventListener("submit", function(event){
    event.preventDefault()

    let bname = $("#bname").val()
    let bemail = $("#bemail").val()
    let bphone = $("#bphone").val()
    let bdate = $("#bdate").val()
    let btime = $("#btime").val()
    let bassistants = $("#bassistants").val()

    if(bname === ""){
        alert('El campo "Nombre" es obligatorio')
    } else if (bemail === ""){
        alert('El campo "Email" es obligatorio')
    } else if (bphone === ""){
        alert('El campo "Teléfono" es obligatorio')
    } else if (bdate === ""){
        alert('El campo "Fecha" es obligatorio')
    } else if (btime === ""){
        alert('El campo "Hora" es obligatorio')
    } else if (bassistants === ""){
        alert('El campo "Asistentes" es obligatorio')
    } else {
        alert(`Estimado(a): ${bname}, le agradecemos por reservar con nosotros.\nHemos registrado ${bassistants} asistentes.\nSe ha enviado el código de confirmación al correo ${bemail}\n¡Gracias por preferirnos!`)
        
    window.location.href = "redirect.html"
    }
})