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
  // DISPLAYS DROP DOWN MENU FOR PUBLICATION
  dropDown = () => {
    const dropDiv = document.querySelector('.dropInner')
    dropDiv.classList.toggle('drop')
  }
  render() {
    const val = this.state.value
    const publications = [
      {name:'FreeCodeCamp.org',
        link: 'free-code-camp'},
      {name:'TheMission.org',
        link: 'the-mission'},
      {name:'Hacker Noon',
        link: 'hacker-daily'},
      {name:'The Economist',
        link: 'the-economist'},
      {name:'Personal Growth',
        link: 'personal-growth'},
      {name:'The Startup',
        link: 'swlh'},
      {name:'Startup Grind',
        link: 'startup-grind'},
      {name:'The Washington Post',
        link: 'thewashingtonpost'},
      {name:'The Coinbase Blog',
        link: 'the-mission'},
      {name:'Google Design',
          link: 'google-design'},
      ]
    const choosen = publications.map(pub => <Choice pub={pub} select={this.props.select} drop={this.dropDown}/>)

    return (
      <div className="search">
        <form className='form2'>
          <label className="username username2">
            Publication:
          </label>
          <input className="box box2" type="text" name="name" onMouseEnter={this.highlight} onMouseLeave={this.highlight} onChange= {(e)=>{this.change(e)}}/>
          <br/>
          <div className="dropped">
            <p className="popular">
              Popular Publications:
            </p>
            <div className="dropDown">
              <img className="downCarrot" src='https://www.shareicon.net/data/512x512/2015/10/29/663870_arrows_512x512.png' onClick={this.dropDown} />
              <div className="dropInner">
                {choosen}
              </div>
            </div>
          </div>
          < br/>
          <div className="buttonContainer buttonContainer2">
            <div className='button1' onClick={(e) =>{this.props.searchPublication(e, this.state.value)}}>
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
