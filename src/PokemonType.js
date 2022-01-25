import React from "react";

export default function PokemonType({pokemonType, pokemonNum, pokemonName}) {
    // console.log(pokemonType)
    return (
        <div className='picture'>
        <p>#{pokemonNum}. <span>{pokemonName}</span> </p>
        
        <div className="type-container">
            <p><strong>Type:</strong></p>
            {pokemonType.map((type, index) => (          
                <p className="pokemonType" key={index}>{type.type.name} </p>
        ))}
        </div>
        
    </div>
    )
}

