import React from "react";

export default function PokemonType({ pokemonType, pokemonNum, pokemonName }) {
    console.log(pokemonType);
    return (
        <div className='picture'>
            <p>#{pokemonNum}. <span>{pokemonName}</span> </p>

            <div className="type-container">
                <p><strong>Type:</strong></p>
                {pokemonType.map((type, index) => (
                    <>
                        <div className="pokemon-types-container">
                            <img src={type.imagePath} className="pokemon-type-img" alt="" />
                            <p className="pokemonType" style={{ color: type.colour }} key={index}> {type.name}</p>
                        </div>

                    </>

                ))}
            </div>

        </div>
    )
}
