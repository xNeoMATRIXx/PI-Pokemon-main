import React from "react";
import "./CardPokemon.css";

function CardPokemon({ name, types, image }) {
  return (
    <div className="stylesCard">
      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={image} alt="imagen" className="img" width="120px" height="120px"/>
      <ul className="typeStyle">
        {
        types.length ? 
        types.map((type,index) =>{
          return (
            <li className="type" key={index}>{type}
            </li>
          )
        }):
        <li className="text">No existe el tipo</li>
        }
        {/* <li className="type"> */}
            {/* {
              types.length ?
              typeof types[0] === 'string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
              types[0].name.slice(1)   
               { 
               typeof types[1] === 'string' ? " - " + types[1]   :  types[1]?.name
               } */}

        {/* </li> */}
      </ul>
    </div>
  );
}

export default CardPokemon