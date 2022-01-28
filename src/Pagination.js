import React from "react";

export default function Pagination({gotoNextPage, gotoPrevPage}){
    return (
        <>
            <div>
                {gotoPrevPage && <button onClick={gotoPrevPage}><i className="fas fa-arrow-left"></i>Previous</button>}    
            </div>
            <div>
                {gotoNextPage && <button onClick={gotoNextPage}>Next <i className="fas fa-arrow-right"></i></button>} 
            </div>
        </>
        
    )
}