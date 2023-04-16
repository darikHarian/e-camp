// REQUERIMIENTOSs:

// Validar identidad (OK)

// Cliente debe tener: ID, Nombre, Password y saldo (OK)

// Al ingresar identificador y clave, revisar si existe alguna coincidencia, si no coincide mostrar mensaje de error (OK)

// Si los datos coinciden, ingresar a menu donde el usuario podrá decidir entre depósito, giro, ver saldo o salir. El menú se repite hasta que el usuario elije salir (OK)

// Si ingresa un número distinto al del menu, se envía un mensaje de error y se repite (OK)

// Si realiza giros o depósitos su saldo se debe modificar, los movimientos son permanentes durante la ejecución del programa (OK)

// Validar que el valor a girar sea menor al saldo disponible actual (OK)

let clientes = [
    {
        rut: 196547653,
        nombre: "Naruto Uzumaki",
        clave: "NarU70",
        saldo: 100000
    },

    {
        rut: 187474675,
        nombre: "Sasuke Uchiha",
        clave: "Amaterasu88",
        saldo: 500000
    },

    {
        rut: 196547652,
        nombre: "Sakura Haruno",
        clave: "Katsuyu09",
        saldo: 250000
    }
]

let usuario, rut, nombre, clave, saldo;
let ciclo = 0

// Se dejó un ciclo infinito para poder cambiar entre cuentas y verificar que los saldos se mantienen durante la ejecución del programa
do {
    alert("Bienvenido a Banca en Linea")
    inicio()
} while(ciclo < 1)


function inicio(){
    login(rut, clave)
    menu()
}

function login(rut, clave){
    loggedIn = false
    do {
        rut = prompt("Por favor indique su rut\nsin puntos ni guión y con dígito verificador")
        clave = prompt("Por favor ingrese su clave")

        if (rut === "" || clave === "" || rut === null || clave === null) {
            alert("¡Error!\nDebe ingresar sus datos para continuar")
        } else {
            for(let i = 0; i < clientes.length; i++) {
                if(rut == clientes[i].rut && clave == clientes[i].clave) {
                   usuario = clientes[i]
                   alert(`Bienvenido ${usuario.nombre}`)
                   loggedIn = true
                }
            }

            if(loggedIn === false) {
                alert("¡Usuario y/o contraseña incorrectos!\nIntente nuevamente")
            }           
        }
    } while (loggedIn === false)
}

function menu() {
    let finSesion = false

    do {
        let opciones = parseInt(prompt("Seleccione que desea hacer: \n1.- Ver saldo\n2.- Realizar giro\n3.- Realizar depósito\n4.- Salir"))

        switch (opciones) {
            case 1:
                alert(`Su saldo disponible es de: \$${usuario.saldo}`)
                break;
            case 2:
                giro()
                break;
            case 3:
                deposito()
                break;
            case 4:
                alert("¡Gracias por preferirnos!")
                finSesion = true
                break;
            default:
                alert("¡Ha ingresado una opción no valida!\nPor favor inténtelo nuevamente")
                break;
        }
    } while (finSesion === false)   
}

function giro() {
    let procederTransaccion = false

    do {
        let monto = parseInt(prompt(`Su saldo actual es de: \$${usuario.saldo}\nIngrese el monto que desea girar`))
        if(usuario.saldo < monto) {
            alert("¡Saldo insuficiente para realizar la transacción!\nInténtelo nuevamente")
        } else {
            procederTransaccion = true
            usuario.saldo -= monto
            alert(`¡Transacción realizada con éxito!\nSu nuevo saldo es: \$${usuario.saldo}`)
        }
    } while(procederTransaccion === false)   
}

function deposito() {
    let monto = parseInt(prompt(`Su saldo actual es de: \$${usuario.saldo}\nIngrese el monto que desea depositar`))
    usuario.saldo += monto
    alert(`¡Depósito realizado!\nSu nuevo saldo es de: \$${usuario.saldo}`)
}