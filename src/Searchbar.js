import React from "react";

export default function Searchbar({handleSubmit, handleChange }) {
    return (
        <>
            <div className="searchbar">
                <form onSubmit={handleSubmit}>
                    <label>
                       <input type="text" onChange={handleChange} placeholder="Search a pokemon" /> 
                    </label>
                </form>
            </div>
            
        </>
        
    )
}