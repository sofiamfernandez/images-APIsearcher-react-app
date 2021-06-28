import React from 'react';
import './spinner.css';


const Spinner = () => {
    return ( 

            //Aquí copiamos la parte html del recurso y renombramos a ClassName
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
     );
}
 
export default Spinner;