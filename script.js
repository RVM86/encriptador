//encriptar y desencriptar

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
    areaMensaje.value = textoEncriptado;
    areaEncriptador.value = "";
    areaEncriptador.focus();
}

function botonDesencriptar(){
    const textoEncriptado = desencriptar(areaEncriptador.value);
    areaMensaje.value = textoEncriptado;
    areaEncriptador.value = "";
    areaEncriptador.focus();
}

function encriptar(encriptacion){    
    encriptacion = encriptacion.toLowerCase();
    for(let i = 0; i < matrizCodigo.length; i++){
        if(encriptacion.includes(matrizCodigo[i][0])){
            encriptacion = encriptacion.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
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