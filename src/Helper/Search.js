import React, { Component } from 'react';
import '../SearchCSS/Search.css'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Choice from './Choice'

class Search extends Component {
  state = {value: ''};
// CHANGES SEARCH BAR COLOR IF ACTIVE
  highlight = () => {
    const box = document.querySelector(".box")
    if(box.value == ''){
    box.classList.toggle('active')
    }
    else{
      box.classList.toggle('active')
      box.classList.toggle('finished')
    }
  }

// SAVES THE TEXT INPUT TO STATE
 change = (e) => {
  this.setState({
    value: e.target.value
    })
  }

  render() {
    return (
      <div className="search1">
        <form className='form'>
          <label className="username">
            Username:
          </label>
          <img className='at' src='https://sitejerk.com/images/sign-transparent.png'/>
          <input className="box" type="text" name="name" onMouseEnter={this.highlight} onMouseLeave={this.highlight} onChange= {(e)=>{this.change(e)}}/>
          <br/>
          <div className="buttonContainer go">
            <div className='button1' onClick={(e) =>{this.props.searchUser(e, this.state.value)}}>
              <AwesomeButton type="secondary submit">
                Go
              </AwesomeButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
