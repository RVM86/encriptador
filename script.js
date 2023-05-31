// encriptar y desencriptar

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
        areaEncriptador.value = "";
    }
    else{
        areaMensaje.value = textoEncriptado;
        areaEncriptador.value = "";
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

// copiar, pegar, limpiar

document.querySelector('.boton-copiar').addEventListener('click', function() {
    let copyText = document.querySelector('.txt-descubierto').value;
    navigator.clipboard.writeText(copyText)
    .then(()=>{
        console.log('El texto ha sido copiado');
        alert('Mensaje en el portapapeles 👌');
        areaMensaje.value = "";
        areaEncriptador.focus();
    })
    .catch(() => { console.error('Error al copiar')})
})

document.querySelector('.boton-pegar').addEventListener('click', function() {
    navigator.clipboard.readText()
    .then(copyText => {
        document.querySelector('.txt-encriptador').value = copyText;
    })
})

function botonLimpiar(){
    areaEncriptador.value = "";
    areaMensaje.value = "";
    areaEncriptador.focus();
}

// solo minisculas, sin acentos, sin caracteres especiales

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

// imagen

const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    console.log({ clientX, clientY});

    const { innerWidth, innerHeight } = window;
    const fractionX = clientX / innerWidth;
    const fractionY = clientY / innerHeight;

    console.log({ fractionX, fractionY });

    const pupilX = -33 + fractionX * 66;
    const pupilY = -33 + fractionY * 66;

    console.log({ pupilX, pupilY });

    document.querySelectorAll('.pupil')
    .forEach(el => {
        el.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    })
}

window.addEventListener('mousemove', handleMouseMove);