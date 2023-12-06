const redlineSync = require('readline-sync');

const numeroRandom = () => {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}

const adivinarNumero = () =>{

    console.log("----COMIENZA EL JUEGO----");

    let numAleatorio = numeroRandom();

    let numUsuario = redlineSync.question("Ingrese un numero: ");

    //console.log("numero aleatorio: " + numAleatorio); //por si quieren probarlo sin tener que adivinar todos

    while (numAleatorio!=numUsuario) {

        if (numUsuario>numAleatorio) {
            console.log("El numero secreto es mas bajo");
            numUsuario = redlineSync.question("Ingrese un numero: ");

        } else if (numUsuario<numAleatorio) {
            console.log("El numero secreto es mas alto");
            numUsuario = redlineSync.question("Ingrese un numero: ");

        }
    }

    if (numUsuario==numAleatorio){
        console.log("EL NUMERO ES EL CORRECTO!!");
        console.log("numero aleatorio: " + numAleatorio);
        console.log("numero elegido: " + numUsuario);
        console.log("----FINALIZA EL JUEGO----");

    }

}

adivinarNumero();