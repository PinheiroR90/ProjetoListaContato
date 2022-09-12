import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import '../index.css';

export default function Contato(props){

    return(
      <>

      <div className="container">
        <div className="row linha">
          <div className="col "><h5><FontAwesomeIcon icon={faUser} className="me-2"/> {props.name}</h5> </div>
          <div className="col "><h5><FontAwesomeIcon icon={faPhone} className="me-2" />({props.phone})</h5></div>
          <div className="col "> <button type="button" className="btn btn-outline-danger btn-remover" onClick={()=>{props.remover(props.id) }}><FontAwesomeIcon icon={faTrash}/> </button></div>
        </div>
      </div>
       
      </> 
    );   
}