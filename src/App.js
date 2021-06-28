import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import Spinner from './components/Spinner';


function App() {

 //state de la app

 const [ busqueda, guardarBusqueda ] = useState('');
 const [ imagenes, guardarImagenes ] = useState([]);

 //states para paginación 
 const [ paginaactual, guardarPaginaActual] = useState(1);
 const [ totalpaginas, guardarTotalPaginas ] = useState(1);

   //vamos a hacer que el spinner aparezca solo cuando lo precisemos 
 const [ cargando, guardarCargando ] = useState (false);

 useEffect(() => {

const consultarApi = async() => {
   if(busqueda === '') return;

   const imagenesPorPagina = 28;
   const key = '18027453-ce44abcd28c6727518786ceb6';
   const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
   const respuesta = await fetch(url);
   const resultado = await respuesta.json();

   guardarImagenes(resultado.hits);

   //calcular total de paginas para paginador
   //La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
   const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
   guardarTotalPaginas(calcularTotalPaginas);

   //Mover la pantalla hacia arriba

   const jumbotron = document.querySelector('.jumbotron');
   jumbotron.scrollIntoView({ behavior: 'smooth'});
 }
   consultarApi(); 
  //  guardarPaginaActual(1);

 }, [busqueda, paginaactual]);
 
 useEffect (() =>{
  guardarPaginaActual(1);
},[busqueda]);


 //Definir la página anterior
 const paginaAnterior = () => {
   const nuevaPaginaActual = paginaactual - 1;
   if(nuevaPaginaActual === 0) return; //porque no podemos ir a la página menos 1, menos 2
   guardarPaginaActual(nuevaPaginaActual);
 }

 //Definir la página siguiente
 const paginaSiguiente = () => {
   const nuevaPaginaActual = paginaactual +1;

   if(nuevaPaginaActual > totalpaginas ) return;

   guardarPaginaActual(nuevaPaginaActual);
 }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario  
         guardarBusqueda = {guardarBusqueda}
         guardarCargando={guardarCargando}
        />
        
      </div>
      <div className="row justify-content-center">
          {cargando ? <Spinner /> : null }
          { !cargando ?
          <ListadoImagenes
            imagenes={imagenes}
           /> : null
          }
      </div>
      <div className="row justify-content-center">
          {(paginaactual === 1) ? null : (
          <button 
            type="button"
            className="btn btn-info mr-1 my-4"
            onClick={paginaAnterior}
          > &laquo; Anterior</button>
          )}

          {(paginaactual === totalpaginas) ? null : (
              
          <button 
            type="button"
            className="btn btn-info mr-1 my-4"
            onClick={paginaSiguiente}
          > Siguiente &raquo;</button>
          )} 
      
      </div>

    </div>
  );
}

export default App;
