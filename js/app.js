import * as UI from './interfaz.js';
import { API } from './api.js';

UI.formularioBuscar.addEventListener('submit', (e) =>{
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value

    if(artista === '' || cancion === '') {
        //Usuario deja campos vacíos, mostrar error 
        UI.divMensajes.innerHTML = "Error! The fields can't be empty. Please fill them up";
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = "";
            UI.divMensajes.classList.remove('error'); 
        }, 3000);
    }else{
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if(data.respuesta.lyrics) {
                    //La cancion existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                }else{
                    //La cancion no existe
                    UI.divMensajes.innerHTML = "Couldn't find the song. Please try first letter in capitals or look for typos.";
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.innerHTML = "";
                        UI.divMensajes.classList.remove('error'); 
                        UI.formularioBuscar.reset();
                    }, 4000);
                }
            })
    }

} )