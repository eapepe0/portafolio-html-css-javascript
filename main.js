/* 
    CARGAMOS MUURI PARA MANEJAR LAS IMAGENES Y FORMAR UN GRID 
*/
const grid = new Muuri('.grid',{
    layout:{
        rounding: false
    }    
});
/* 
    AGREGAMOS UN LISTENER AL CARGAR LA PAGINA 
*/
window.addEventListener('load',() => {
    grid.refreshItems().layout(); /* al cargar se refrescan los items del layout */
    document.getElementById('grid').classList.add('imagenes-cargadas'); /* cuando carga todas las imagenes recien las muestra */
    const enlaces = document.querySelectorAll('#categorias a'); /* ponemos en una constante  los links con el id categorias */
    enlaces.forEach((elemento) => { /* un for por cada elemento */
         elemento.addEventListener('click',(evento) => { /* le agregamos un evento de click a cada elemento */
            evento.preventDefault(); /* prevenimos que se muestre los links como default coloreado subrayado etc */
            enlaces.forEach((enlace) => enlace.classList.remove('activo')); /* en cada enlace se le saca el id activo que hace que el link activo tenga negrita , es para resetear */
            evento.target.classList.add('activo'); /* a cada link que se clickea se le agrega la class activo */

            const categoria = evento.target.innerHTML; /* sacamos el texto que tiene cada categoria , Naturaleza , Animales Etc... */
            
            categoria === 'Todos' ? grid.filter('[data-categoria]'):grid.filter(`[data-categoria="${categoria}"]`); 
/*             si la categoria es igual a todos , se filtra por data-categoria(se muestran todos los resultados)
            de lo contrario se filtra segun la categoria elegida */

        });
    });
    /* 
        FILTRAR BARRA BUSQUEDA 
    */
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => { /* elegimos el id barra-busqueda y le agregamos un evento input */
        const busqueda = evento.target.value; /* por cada letra ingresada en la barra se almacena en la const busqueda */
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda)); /* se filtra cada letra que este en el dataset que seria data-etiquetas que incluya la busqueda */
    });
    /* 
        LISTENER IMAGENES
     */
    const overlay = document.getElementById('overlay'); /* obtengo el overlay */
    document.querySelectorAll('.grid .item img').forEach( (elemento) => { /* busco adentro de la clase grid en el item todas las img */
        elemento.addEventListener('click', () => { /* a cada una le agrego un evento click */
            const ruta = elemento.getAttribute('src'); /* saco de cada elemento img la src */
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion; /* saco la descripcion de la imagen el padre y a su vez el padre busco en el dataset la descripcion */
            overlay.classList.add('activo'); /* le agrego al overlay la clase activo */
           document.querySelector('#overlay img').src = ruta; /* le cargo al overlay la ruta de la imagen que se hizo click */
           document.querySelector('#overlay .descripcion').innerHTML = descripcion; /* le cargo al overlay la descripcion */
     });
    });

    /*
        EVENT LISTENER CERRAR
    */

    document.querySelector('#btn-cerrar-popup').addEventListener('click',() =>{ /* genero un evento click en el boton cerrar popup */
        overlay.classList.remove('activo'); /* le remuevo la clase activo */
    });

    /* 
       EVENT LISTENER overlay CERRAR
    */
       overlay.addEventListener('click',(evento) =>{ /* genero un event listener click en el overlay */
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''; /* si el id clickeado es "overlay" remuevo la clase activo de lo contrario no hago nada */
    });
});