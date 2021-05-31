

//ASIGNAT A VARIABLES CONSTANTES LOS OBJETOS HTML CON EL ID
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const edad = document.getElementById("edad");
const botonImc = document.getElementById("btn-calcular");
const botonMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu")
const showResultados = document.getElementsByClassName("show-resultado-imc-container");

let menuAbierto = false;

botonMenu.addEventListener('click', ()=>{
    if(menuAbierto){
        menu.classList.remove("menu-on")
        menu.classList.add('menu-off')
        menuAbierto = false;
    }else{
        menu.classList.remove("menu-off")
        menu.classList.add('menu-on')
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
                for(div of showResultados) {
                    div.innerHTML = "";
                    div.classList.remove('show-resultado-imc-item');
                }
                showResultados[pos].innerHTML = `
                <p class="show-resultado-imc-item-text">Tu IMC</p>
                <p class="show-resultado-imc-item-text"><b>${imc}</b></p>
                <div class="show-resultado-imc-item-indicator"></div>
                `;
                showResultados[pos].classList.add('show-resultado-imc-item');
            }else{
                alert("Verifique los datos ingresados");
            }

        } else {
            alert("Verifique los datos ingresados");
        }
    } else alert("Ingrese todos los datos solicitados");

});


//APLICANDO LA FUNCION FLECHAS CUNADO EL USUARIO HACE CLICK EN EL OBJETO BOTON

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