import './App.css';
import logo from './pokedex-logo.png'
import { useState } from 'react'
import React from "react"
import { Formulario } from './components/Formulario';
import { Contenedor } from './components/Contenedor'
import {firebase} from './firebase'

const App = ({categorias = []}) => {
  const [categoriasBusqueda, setCategoriasBusqueda] = useState(categorias);
  const [lista, setLista] = useState([])

  React.useEffect(()=>{
    const obtenerDatos = async () =>{
        try{
            const db = firebase.firestore()
            const data = await db.collection('apppoke').get()
            const array = data.docs.map(item =>(
                {
                    id:item.id, ...item.data()
                }
            ))
            setLista(array)

        }catch(error){
            console.log(error)
        }
    }
    obtenerDatos()
}, [lista])

  return (
    <div className="App">
        <img src={logo} alt='poke' className='poke'/>
        <hr className='hr'/>
        <Formulario setCategoriasBusqueda={setCategoriasBusqueda}/>
        <ol>
        {
            lista.map(item => (
                <Contenedor
                    key = {item.id} 
                    valorBusqueda={item}
                />
            ))
        }
    </ol>
    </div>
  );
}

export default App;
