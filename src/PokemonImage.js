import React from 'react';

export default function PokemonImage({pokemonImage, pokemonNum, pokemonName}) {
    if (pokemonImage === null || pokemonImage.trim().length === 0)
    {
        return (
            <div className='picture'>
            </div>
        )
    }
        
    return (
        <div className='picture'>
            <p>#{pokemonNum}. <span>{pokemonName}</span> </p>
            <img src={ pokemonImage } alt=""/>
        </div>
    )
}

