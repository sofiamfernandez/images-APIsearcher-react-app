import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({guardarBusqueda, guardarCargando}) => {
    const [termino, guardarTermino] = useState(''); //string vacío
    const [error, guardarError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //validar
        //El método trim( ) elimina los espacios en blanco en ambos extremos del string. Los espacios en blanco en este contexto, son todos los caracteres sin contenido (espacio, tabulación, etc.) y todos los caracteres de nuevas lineas
        if(termino.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        guardarCargando(true);
        setTimeout(() => { 

            //Elimina el spinner
            guardarCargando(false)
    

           //enviar el termino de busqueda hacia el componente prinicipal
           guardarBusqueda(termino);

        }, 2000);
    }



    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: fútbol o café"
                        onChange={ e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-secondary btn-block"
                        placeholder="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agregar un término de búsqueda" /> : null}
        </form>
     );
}
Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired,
}
 
export default Formulario;