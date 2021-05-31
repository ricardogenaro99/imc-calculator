

//ASIGNAT A VARIABLES CONSTANTES LOS OBJETOS HTML CON EL ID
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const edad = document.getElementById("edad");
const botonImc = document.getElementById("btn-calcular");
const botonMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu")
const showResultados = document.getElementsByClassName("show-resultado-imc-container");
const mensajeResultado = document.getElementById("resultado-description")
let menuAbierto = false;
let mensaje = "";

//EVENLISTENER EN LOS BOTONES MENU Y CALCULAR IMC
botonMenu.addEventListener('click', () => {
    if (menuAbierto) {
        menu.classList.remove("nav-menu-container-on")
        menu.classList.add('nav-menu-container-off')
        setTimeout(() => {
            botonMenu.classList.add("fa-bars")
            botonMenu.classList.remove("fa-times")
        }, 380);
        menuAbierto = false;
    } else {
        menu.classList.remove("nav-menu-container-off")
        menu.classList.add('nav-menu-container-on')


        setTimeout(() => {
            botonMenu.classList.remove("fa-bars")
            botonMenu.classList.add("fa-times")
        }, 380);
        menuAbierto = true;
    }
});

botonImc.addEventListener('click', (e) => {
    if (valido()) {
        let imc = peso.value / Math.pow(altura.value / 100, 2);
        imc = imc.toFixed(2);
        if (!isNaN(imc)) {
            let pos = posDiv(imc);
            if (pos != -1) {
                for (div of showResultados) {
                    div.innerHTML = "";
                    div.classList.remove('show-resultado-imc-item');
                }
                showResultados[pos].innerHTML = `
                <p class="show-resultado-imc-item-text">Tu IMC</p>
                <p class="show-resultado-imc-item-text"><b>${imc}</b></p>
                <div class="show-resultado-imc-item-indicator"></div>
                `;
                showResultados[pos].classList.add('show-resultado-imc-item');

                mensaje = `
                    <div class="resultado-description-item">
                        <p class="resultado-description-text ">Tu IMC personal</p>
                        <p class="resultado-description-text">${imc}</p>
                    </div>

                    <div class="resultado-description-item">
                        <p class="resultado-description-text ">Tu peso actual</p>
                        <p class="resultado-description-text">${peso.value}</p>
                    </div>

                    <div class="resultado-description-item">
                        <p class="resultado-description-text">Tu rando de peso ideal</p>
                        <p class="resultado-description-text">50.8kg - 58.4kg</p>
                    </div>

                    <div class="resultado-description-item">Debe cuidarse de covid crack</div> 
                `
                asignarMensaje("success", "error", mensaje)
            } else {
                mensaje = `<p class="resultado-description-text"> Verifique los datos ingresados</p>`
                asignarMensaje("error", "success", mensaje)
            }

        } else {
            mensaje = `<p class="resultado-description-text"> Verifique los datos ingresados</p>`
            asignarMensaje("error", "success", mensaje)
        }
    } else {
        mensaje = `<p class="resultado-description-text"> Ingrese los datos</p>`
        asignarMensaje("error", "success", mensaje)
    };

});


//APLICANDO LA FUNCION FLECHAS CUNADO EL USUARIO HACE CLICK EN EL OBJETO BOTON

const asignarMensaje = (add, remove, mensaje) => {
    mensajeResultado.innerHTML = mensaje;
    mensajeResultado.classList.add(`resultado-description-${add}`)
    mensajeResultado.classList.remove(`resultado-description-${remove}`)
}

const valido = () => {
    if (String(altura.value).trim().length == 0 || String(peso.value).trim().length == 0 || String(edad.value).trim().length == 0) {
        return false;
    } else {
        return true;
    }
};

const posDiv = (n) => {
    if (n >= 0 && n < 18.5) return 0;
    else if (n >= 18.5 && n < 25) return 1;
    else if (n >= 25 && n < 30) return 2;
    else if (n >= 30 && n < 35) return 3;
    else if (n >= 35 && n < 40) return 4;
    else if (n >= 40) return 5;
    else return -1;
};