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
}

function botonDesencriptar(){
    const textoEncriptado = desencriptar(areaEncriptador.value);
    areaMensaje.value = textoEncriptado;
    areaEncriptador.value = "";
}

function botonCopiar(){
    const textoCopiado = copyToClipboard(areaMensaje.value);
    areaMensaje.value = "";
}

function botonPegar(){
    
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

const copiar = document.querySelector("#copy");
const pegar = document.querySelector("#paste");
console.log(copiar);
console.log(pegar);

if(copiar) {
    copiar.addEventListener('click', () => {
        const txt = copiar.previousElementSibling.innerText;
        copyToClipboard(txt);
    })
}

function copyToClipboard(txt) {
    navigator.clipboard.writeText(txt)
    .then(() => {
        console.log(`${txt} se copio exitosamente`)
    })
    .catch((e) => { console.error(`Error al copiar: ${e}`)})
}