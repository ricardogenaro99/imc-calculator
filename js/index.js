//ASIGNAT A VARIABLES CONSTANTES LOS OBJETOS HTML CON EL ID
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const edad = document.getElementById("edad");
const botonWebCalculator = document.getElementById("btn-web-calculator");
const botonWebImc = document.getElementById("btn-web-imc");
const webCalculator = document.getElementById("web-calculator");
const webImc = document.getElementById("web-imc");
const botonImc = document.getElementById("btn-calcular");
const botonMenu = document.getElementById("btn-menu");
const botonHombre = document.getElementById("button-man");
const botonMujer = document.getElementById("button-woman");
const menu = document.getElementById("menu")
const showResultados = document.getElementsByClassName("show-resultado-imc-container");
const mensajeResultado = document.getElementById("resultado-description")
let generoSeleccionado;
let menuAbierto = false;
let mensaje = "";
let db = [];

//USO DE OBJETOS PARA EL INTERVALO DE IMC HOMBRE Y MUJER

let intervalImc = [[0.0, 18.4, "con bajo peso"], [18.5, 24.9, "saludable"], [25, 29.9, "con sobrepeso"], [30, 34.9, "con obesidad I"], [35, 39.9, "con obesidad II"], [40, Infinity, "con obesidad III"]]

const llenarDb = (genero, edad, altura, peso, imc) => {
    db.push([genero, edad, altura, peso, imc]);
    console.log(db);
}


//EVENLISTENER EN LOS BOTONES MENU Y CALCULAR IMC

botonWebCalculator.addEventListener('click', () => {
    webCalculator.classList.remove('page-off');
    webImc.classList.add('page-off');
})

botonWebImc.addEventListener('click', () => {
    webImc.classList.remove('page-off');
    webCalculator.classList.add('page-off');
})

botonHombre.addEventListener('click', () => {
    botonHombre.classList.add('button-genero-active');
    botonMujer.classList.remove('button-genero-active');
    generoSeleccionado = "Hombre";
})

botonMujer.addEventListener('click', () => {
    botonMujer.classList.add('button-genero-active');
    botonHombre.classList.remove('button-genero-active');
    generoSeleccionado = "Mujer";
})

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
        imc = imc.toFixed(1);
        if (!isNaN(imc)) {
            let pos = posDiv(imc);
            if (pos != -1) {
                limpiarDivs();
                llenarDb(generoSeleccionado, edad.value, altura.value, peso.value, imc)

                mensaje = `<i class="fas fa-spinner loading-activo" id="loading"></i>`;

                asignarLoading(mensaje)

                setTimeout(function () {
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
                            <p class="resultado-description-text">${minmaxPeso(altura.value)[0]}kg - ${minmaxPeso(altura.value)[1]}kg</p>
                        </div>
    
                        <div class="resultado-description-item">${mensajeCovid(pos)}</div> 
                    `
                    asignarMensaje("success", "error", mensaje)
                }, 2000);


            } else {
                mensaje = `<p class="resultado-description-text"> Verifique los datos ingresados</p>`
                asignarMensaje("error", "success", mensaje)
            }

        } else {
            limpiarDivs();
            mensaje = `<p class="resultado-description-text">Verifique los datos ingresados</p>`
            asignarMensaje("error", "success", mensaje)
        }
    } else {
        limpiarDivs();
        mensaje = `<p class="resultado-description-text"> Rellene todo los campos requeridos</p>`
        asignarMensaje("error", "success", mensaje)
    };

});


//APLICANDO LA FUNCION FLECHAS CUNADO EL USUARIO HACE CLICK EN EL OBJETO BOTON

const limpiarDivs = () => {
    for (div of showResultados) {
        div.innerHTML = "";
        div.classList.remove('show-resultado-imc-item');
    }
}

const asignarMensaje = (add, remove, mensaje) => {
    mensajeResultado.innerHTML = mensaje;
    mensajeResultado.classList.add(`resultado-description-${add}`)
    mensajeResultado.classList.remove(`resultado-description-${remove}`)
    mensajeResultado.classList.remove(`resultado-description-loading`)
}

const asignarLoading = (mensaje) => {
    mensajeResultado.innerHTML = mensaje;
    mensajeResultado.classList.add(`resultado-description-loading`)
    mensajeResultado.classList.remove(`resultado-description-error`)
    mensajeResultado.classList.remove(`resultado-description-success`)
}


const valido = () => {
    if (String(altura.value).trim().length != 0 && String(peso.value).trim().length != 0 && String(edad.value).trim().length != 0 && (botonHombre.matches('.button-genero-active') || botonMujer.matches('.button-genero-active'))) {
        return true;
    } else {
        return false;
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

const minmaxPeso = (altura) => {
    let minPeso = intervalImc[1][0] * Math.pow(altura / 100, 2);
    let maxPeso = intervalImc[1][1] * Math.pow(altura / 100, 2);
    return [minPeso.toFixed(1), maxPeso.toFixed(1)]
}

let prefijosCovid = {
    0: "muy",
    1: "muy poco",
    2: "algo",
    3: "muy",
    4: "demasiado",
    5: "potencialmente"
}

const mensajeCovid = (n) => {
    let mensaje = `Debido a que te encuentras ${intervalImc[n][2]} estas ${prefijosCovid[n]} propenso a tener COVID segun tu IMC.`;

    return mensaje
}