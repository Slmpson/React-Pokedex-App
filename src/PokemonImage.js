import React from 'react';

export default function PokemonImage({pokemonImage}) {
    if (pokemonImage === null || pokemonImage.trim().length === 0)
    {
        return (
            <div className='picture'>
            </div>
        )
    }
        
    return (
        <div className='picture'>
            <img src={ pokemonImage } alt="No Image Found"/>
        </div>
    )
}

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg