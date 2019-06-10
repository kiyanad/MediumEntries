import React, { Component } from 'react';
// CSS
import '../PostCSS/Userpost.css'
import '../PostCSS/PostContainer.css'
import '../PostCSS/HiddenContainer.css'

// HELPERS
import Category from '../Helper/Category'
import Post from '../Helper/Post'

// LIBRARIES
import { AwesomeButton } from "react-awesome-button";


class UserPost extends Component {
  state = {
    filter: false
  }
// SHOWS THE CATEGORIES
  show = () => {
    const container = document.querySelector(".hiddenContainer")
      container.classList.toggle('show')
// CHANGES THE ARROW ICON AFTER HALF A SECOND
    setTimeout(() => {
      if(container.classList.contains('show')){
          document.querySelector(".expand").classList.toggle('reverse')
        }
        else {
          document.querySelector(".expand").classList.toggle('reverse')
        }
      }, 500);
  }

// CHANGES FILTER CHECKBOX COLOR
  filter = (e) => {
      this.setState({
        filter:true
      })
    const checks = Array.from(document.querySelectorAll(".checkbox"))
    checks.map(box => box.style.background = 'white')
    e.target.style.background='yellow'
  }

  unFilter = (e) => {
      this.setState({
        filter:false
      })
    const checks = Array.from(document.querySelectorAll(".checkbox"))
    checks.map(box => box.style.background = 'white')
  }

  render(){
    const catArray = this.props.categories.map(category => <Category name={category} checked={this.props.checked} filter={this.filter} />)
    const posts = this.props.allposts.map(post => <Post post={post}/>)
    var filPosts = null
    if(this.props.filtered !== undefined){
    var filPosts = this.props.filtered.map(post => <Post post={post}/>)
      }

    return(
      <div className="outside">
        <div className="header">
          <div className="userNContaner">
            <div className="nContainer-inner">
              <p className="a">
                @
              </p>
              <h1 className="userN swipe">
                {this.props.publication?
                <div>
                  {this.props.pub}
                </div>:
                <div>
                  {this.props.user}'s
                </div>}
              </h1>
            </div>
            <h1 className="postname">
              Posts
            </h1>
          </div>
          <div className="goBack" onClick={this.props.goBack}>
            <AwesomeButton type="secondary submit">
              Back
            </AwesomeButton>
          </div>
          {this.state.filter?
          <p className="clear" onClick={this.unFilter}>
            Clear Filter
          </p>:
          null}
        </div>
        <div className="myPostContainer">
          <div className="filterContainer">
            <div className="categoriesContainer">
              <p className="filterBy">
                Filter By:
              </p>
              <h5 className="cat">
                Category
              </h5>
            </div>
            <div className="hiddenContainer">
              {catArray}
            </div>
            <img className="expand" src='https://s3.amazonaws.com/arc-wordpress-client-uploads/wweek/wp-content/uploads/2019/02/19155110/arrow-prev-24.png' onMouseEnter={this.show}/>
          </div>
          <div className="entries">
            <h4 className="numberOf">
              {this.state.filter?
              <p className="number">
                {this.props.filtered.length}
              </p>:
              <p className="number">
                {this.props.allposts.length}
              </p>}
              Entires Found
            </h4>
            {this.state.filter?
              <div>
                {filPosts}
              </div>:
              <div>
                {posts}
              </div>}
          </div>
        </div>
      </div>
    )
  }
}

export default UserPost
