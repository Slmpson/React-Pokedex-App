import React from "react";

export default function PokemonList({pokemonList, onViewPokemon}) {
    return (
        <div className="pokemon-list">
            {pokemonList.map((p, index) => (
                <div className="pokemon" key={index} onClick={() => onViewPokemon(p)} >{p.name}</div>
            ))}
        </div>
    )
}