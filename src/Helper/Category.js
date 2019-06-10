import React from 'react';
import '../PostCSS/HiddenContainer.css'


function Category(props) {
  return(
    <div className='catContainer'>
      <div className="checkbox" id={props.name} onClick={(e) =>{
        props.checked(e)
        props.filter(e)}
      }/>
      <p className="checkName">
        {props.name}
      </p>
    </div>
  )
}

export default Category
