// RETO ENCRIPTAR Y DESENCRIPTAR

const areaEncriptador = document.querySelector(".txt-encriptador");
areaEncriptador.focus()

const areaMensaje = document.querySelector(".txt-descubierto");

var matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]];

console.table(matrizCodigo);

function botonEncriptar(){
    const textoEncriptado = encriptar(areaEncriptador.value);
    if(validacion(areaEncriptador.value)){
        document.querySelector('.error').classList.remove('error-activo');
        document.querySelector('.alinear').classList.remove('alinear-activo');
        areaEncriptador.value = "";
        areaEncriptador.focus();
    }
    else{
        areaMensaje.value = textoEncriptado;
        areaEncriptador.value = "";
        closeZonaImagen();
        areaEncriptador.focus();
    }
}

function botonDesencriptar(){
    const textoEncriptado = desencriptar(areaEncriptador.value);
    areaMensaje.value = textoEncriptado;
    areaEncriptador.value = "";
    areaEncriptador.focus();
}

function encriptar(encriptacion){    
    //encriptacion = encriptacion.toLowerCase();
    for(let i = 0; i < matrizCodigo.length; i++){
        if(encriptacion.includes(matrizCodigo[i][0])){
            encriptacion = encriptacion.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    //console.log(validacion(encriptacion));
    }
    return encriptacion;
}

function desencriptar(_descubrir){
    _descubrir = _descubrir.toLowerCase();
    for(let i = 0; i < matrizCodigo.length; i++){
        if(_descubrir.includes(matrizCodigo[i][1])){
            _descubrir = _descubrir.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return _descubrir;
}


// RETO PARA UTILIZAR BOTONES QUE REALICEN LAS SIGUIENTES ACCIONES: COPIAR, PEGAR, LIMPIAR

// Boton copiar

let popup = document.getElementById("popup");

function closePopup(){
    popup.classList.remove("open-popup");
    areaEncriptador.focus();
}

document.querySelector('.boton-copiar').addEventListener('click', function() {
    let copyText = document.querySelector('.txt-descubierto').value;
    if(copyText == ""){
        closePopup();
    }
    else{
        navigator.clipboard.writeText(copyText)
        .then(()=>{
            //console.log('El texto ha sido copiado');
            popup.classList.add("open-popup");
            areaMensaje.value = "";
        })
        .catch(() => { console.error('Error al copiar')})
    }
})

// Boton pegar

document.querySelector('.boton-pegar').addEventListener('click', function() {
    navigator.clipboard.readText()
    .then(copyText => {
        document.querySelector('.txt-encriptador').value = copyText;
    })
})

// Boton limpiar

function botonLimpiar(){
    document.querySelector('.error').classList.remove('error-activo');
    document.querySelector('.alinear').classList.remove('alinear-activo');
    areaEncriptador.value = "";
    areaMensaje.value = "";
    openZonaImagen();
    areaEncriptador.focus();
}


// RETO NO SE ACEPTAN MAYUSCULAS, ACENTOS, NI CARACTERES ESPECIALES

const validarTxtEncrip = () => {
    if(validacion(areaEncriptador.value)){
        document.querySelector('.error').classList.add('error-activo');
        document.querySelector('.alinear').classList.add('alinear-activo');
    }
    else{
        document.querySelector('.error').classList.remove('error-activo');
        document.querySelector('.alinear').classList.remove('alinear-activo');
    }
}

areaEncriptador.addEventListener("keyup", validarTxtEncrip);

function tieneMayus(elMensaje){
    const mayus = /[A-Z]/;
    return mayus.test(elMensaje);
}

function tieneCaracEspec(elMensaje){
    const caracEspec = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return caracEspec.test(elMensaje);
}

function tieneAcentos(elMensaje){
    const acentos = /[\u00C0-\u00FF]/;
    return acentos.test(elMensaje);
}

function validacion(elMensaje){
    if(tieneMayus(elMensaje) || tieneCaracEspec(elMensaje) || tieneAcentos(elMensaje)) {
        return true;
    }
    else {
        return false;
    }
}


// ANIMACION

const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    console.log({ clientX, clientY});

    const { innerWidth, innerHeight } = window;
    const fractionX = clientX / innerWidth;
    const fractionY = clientY / innerHeight;

    console.log({ fractionX, fractionY });

    const pupilX = -20 + fractionX * 40;
    const pupilY = -20 + fractionY * 40;

    console.log({ pupilX, pupilY });

    document.querySelectorAll('.pupil')
    .forEach(el => {
        el.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    })
}

window.addEventListener('mousemove', handleMouseMove);

let zonaImagen = document.getElementById("zona-imagen");

function closeZonaImagen(){
    zonaImagen.classList.add("close-zona-imagen");
}

function openZonaImagen(){
    zonaImagen.classList.remove("close-zona-imagen");
}