/* eslint-disable no-unreachable */
import React, { useState, useRef, useEffect } from "react";
import Contato from "./components/Contato";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  //states
  const [contato, setContato] = useState({ id: "", name: "", phone: "" });
  const [listaContatos, setListacontatos] = useState([]);

  //useRef
  const inputName = useRef();
  const inputPhone = useRef();

  function definirNome(event) {
    setContato({ ...contato, name: event.target.value });
  }

  function definirPhone(event) {
    setContato({ ...contato, phone: event.target.value });
  }

  function addContato() {
    //validação de campo
    if (contato.name === "" || contato.phone === "") {
      return alert("Um dos campo incompleto");
    }

    //verificar se existe contato
    let contatoExiste = listaContatos.find(
      (ctt) => ctt.name === contato.name && ctt.phone === contato.phone
    );
    if (typeof contatoExiste !== "undefined") {
      return alert("Campo existente");
    } else {
      //adicionar o contato
      setListacontatos([...listaContatos, { ...contato, id: uuidv4() }]);
      return "contato Slavo";
    }
    //limpar campo
    setContato({ name: "", phone: "" });
    // focus  no input name
    inputName.current.focus();
  }
  function enterSalvar(event) {
    if (event.code === "Enter") {
      addContato();
    }
  }

  //carregar a lista de contatos do localStorage
  useEffect(() => {
    if (localStorage.getItem("meus_contatos") !== null) {
      setListacontatos(JSON.parse(localStorage.getItem("meus_contatos")));
    }
  }, []);

  //persistencia do state
  //atualizar a lista de contatos no localStorage
  useEffect(() => {
    localStorage.setItem("meus_contatos", JSON.stringify(listaContatos));
  }, [listaContatos]);

  function limparLista() {
    setListacontatos([]);
  }

  function removerContato(id) {
    let tmp = listaContatos.filter((ctt) => ctt.id !== id);
    setListacontatos(tmp);
  }
  function editarContato(id, novoContato){
    const contatoEditado  = setContato.find((contato)=>{
      return contato.id === id;
    });
    console.log(contatoEditado)
    contatoEditado.content = novoContato;
  }

  return (
    
    <>
      <div className="container-xxl">
        <div className="row">
          <div className="col text-center">
            <h3 className="text-center"><FontAwesomeIcon icon={faPhone}/> Lista de Contato</h3>
          </div>
        </div>
      </div>

      <div className="container-fluid formulario">
        <div className="row">
          <div className="col p-4">
            <div className="row justify-content-center">
              <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Nome:</label>
                  <input
                    type="text"
                    ref={inputName}
                    className="form-control"
                    onChange={definirNome}
                    value={contato.name}
                  />
                
                
                  <label className="form-label">Numero:</label>
                  <input
                    type="text"
                    ref={inputPhone}
                    className="form-control"
                    onKeyUp={enterSalvar}
                    onChange={definirPhone}
                    value={contato.phone}
                  />
                </div>
                <div className="botoes">
                  <div className="row">

                    <div className="col ">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={addContato}
                      >
                        Adicionar<FontAwesomeIcon icon={faCirclePlus} className="ms-2"/>
                      </button>
                    </div>
              
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={limparLista}
                      >
                        Apagar Lista<FontAwesomeIcon icon={faTrash} className="ms-2"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
     </div>

      <div className="container  list">
        <div className="row">
            <ul>
            {listaContatos.map((ctt) => {
              return (
                <Contato
                  key={ctt.id}
                  id={ctt.id}
                  name={ctt.name}
                  phone={ctt.phone}
                  remover={removerContato}
                />
              );
            })}
          </ul>  
        </div>
      </div>
     
   </>
  );
}
