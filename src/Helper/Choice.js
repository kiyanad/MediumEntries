import React from 'react';
import '../PostCSS/Choice.css'


function Choice(props) {
  return(
    <div className='choiceContainer' id={props.pub.link} onClick={(e)=>{props.select(e); props.drop(e)}}>
      <h3 className="pub">
        {props.pub.name}
      </h3>
    </div>
  )
}

export default Choice
