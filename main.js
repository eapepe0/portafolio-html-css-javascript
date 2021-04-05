const grid = new Muuri('.grid',{
    layout:{
        rounding: false
    }    
});

window.addEventListener('load',() => {
    grid.refreshItems().layout();
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
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => { /* elegimos el id barra-busqueda y le agregamos un evento input */
        const busqueda = evento.target.value; /* por cada letra ingresada en la barra se almacena en la const busqueda */
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda)); /* se filtra cada letra que este en el dataset que seria data-etiquetas que incluya la busqueda */
    });
    /* LISTENER IMAGENES */
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
           document.querySelector('#overlay img').src = ruta;
           document.querySelector('#overlay .descripcion').innerHTML = descripcion;
     });
    });

    /* EVENT LISTENER CERRAR */
    document.querySelector('#btn-cerrar-popup').addEventListener('click',() =>{
        overlay.classList.remove('activo');
    });

       /* EVENT LISTENER overlay CERRAR */
       overlay.addEventListener('click',(evento) =>{
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});