import React from 'react'
import "./style.css"
function Results(props){
    return(
        <div className="result">
           
            <div className="currency">₹{props.currency} =  </div>     
            <div className="number">{props.number} nos</div>
        </div>
     
    )
}
export default Results