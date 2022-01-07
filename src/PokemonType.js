import React from "react";

export default function PokemonType({pokemonType, pokemonNum, pokemonName}) {
    console.log(pokemonType)
    return (
        <div className='picture'>
        <p>#{pokemonNum}. <span>{pokemonName}</span> </p>
        
        <div className="type-container">
            <p>Type:</p>
            {pokemonType.map((type, index) => (          
                <p key={index} >{type.name} </p>
        ))}
        </div>
        
    </div>
    )
}

