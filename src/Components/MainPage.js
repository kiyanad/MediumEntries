import React, { Component } from 'react';

// CSS
import '../SearchCSS/Intro.css'
import '../SearchCSS/Cloud.css'
import '../SearchCSS/Search.css'

// COMPONENTS
import UserPost from './UserPost'

// HELPERS
import Search from '../Helper/Search'
import Search2 from '../Helper/Search2'

// LIBRARIES
import { Wave } from 'react-animated-text';
import { AwesomeButton } from "react-awesome-button";




class MainPage extends Component {
  state = {
    allposts: [],
    lastpost: [],
    dats: '',
    found: true,
    nopost: false,
    changeUser: true,
    changePage: false
  }

// FETCH TO GET ENTRIES BASED ON USERNAME
  search = (e, value) => {
    e.preventDefault()
      // FETCH FOR MEDIUM BLOG POST
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${value}`)
      .then((res) => res.json())
      .then((data) => {
        const res = data.items
        // CHECKS IF THERE IS A RESPONSE (IF USER EXIST)
        if(res !== undefined){
          const posts = res.filter(item => item.categories.length > 0)
          // CHECKS IF USER HAS POSTS
          if(posts[0] !== undefined){
            const date = posts[0].pubDate
            // CHECKS IF FIRST POST HAVE DATE AND FORMATS
            if(date !== undefined){
              const newDate = new Date(date)
              if(newDate !== undefined){
                const stringDate = newDate.toDateString()
                const categories = []
                posts.map(post => {categories.push(post.categories)})
                const combinedCategories = categories.reduce((a, b) => a.concat(b))  // ['1', '3', '4', '2']
                const uniqueCategories = Array.from(new Set(combinedCategories));
                debugger

                this.setState({
                  allposts: posts,
                  user: value,
                  categories: uniqueCategories,
                  found: true,
                  nopost: false,
                  changePage: true
                })
              }
            }
          }
          // IF USER DOES NOT EXIST
          else{
            this.setState({
              found: true,
              nopost: true
            })
          }
        }
        else{
          debugger
        this.setState({
          found: false,
          nopost: false
        })
      }
    })
  }

  // FETCH TO GET ENTRIES BASED ON PUBLICATION

  searchPublication = (e, value) => {
    e.preventDefault()
      // FETCH FOR MEDIUM BLOG POST
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${this.state.choosenPub}`)
      .then((res) => res.json())
      .then((data) => {
        const res = data.items
        // CHECKS IF THERE IS A RESPONSE (IF PUBLICATION EXIST)
        if(res !== undefined){
          const posts = res.filter(item => item.categories.length > 0)
          // CHECKS IF PUBLICATION HAS POSTS
          if(posts[0] !== undefined){
            const date = posts[0].pubDate
            // CHECKS IF FIRST POST HAVE DATE AND FORMATS
            if(date !== undefined){
              const newDate = new Date(date)
              if(newDate !== undefined){
                const stringDate = newDate.toDateString()
                const categories = []
                posts.map(post => {categories.push(post.categories)})
                const combinedCategories = categories.reduce((a, b) => a.concat(b))  // ['1', '3', '4', '2']
                const uniqueCategories = Array.from(new Set(combinedCategories));
                debugger

                this.setState({
                  allposts: posts,
                  user: value,
                  categories: uniqueCategories,
                  found: true,
                  nopost: false,
                  changePage: true
                })
              }
            }
          }
          // IF PUBLICATION DOES NOT EXIST
          else{
            this.setState({
              found: true,
              nopost: true
            })
          }
        }
        else{
          debugger
        this.setState({
          found: false,
          nopost: false
        })
      }
    })
  }

// FLITERS POST IF CATEGORY SELECTED
  checked = (e) => {
    const filteredPost = this.state.allposts.filter(post => post.categories.includes(e.target.id))
    this.setState({
      filteredPosts: filteredPost
    })
  }
// GOES BACK TO SEARCH
  goBack = () => {
    this.setState({
      allposts: [],
      lastpost: [],
      dats: '',
      found: true,
      nopost: false,
      changeUser: true,
      changePage: false,
      userPage: true,
      publication:false
    })
  }
// CHANGES SEARCH TO PUBLICATION
  publication = () => {
    this.setState({
      userPage: false,
      publication:true,
      found: true,
      nopost: false,
    })
  }
  // CHANGES SEARCH TO User
    backToUser = () => {
      this.setState({
        userPage: true,
        publication:false,
        found: true,
        nopost: false,
      })
    }
// SELECT FROM POPULAR PUBLICATIONS
  selectPub = (e) => {
    document.querySelector(".box").value = e.target.parentElement.id
    this.setState({
      choosenPub: e.target.parentElement.id,
      pub: e.target.innerText
    })
  }

  render(){
    return (
      <div className="main">
        {this.state.changePage?
        <UserPost allposts={this.state.allposts} filtered={this.state.filteredPosts} checked={this.checked} goBack={this.goBack} user={this.state.user} pub={this.state.pub} publication={this.state.publication} categories={this.state.categories} />:
        <div className="container">
          <h2 className= "intro embossed">
            <Wave text="Whats on their mind?" speed={8} delay={1} />
          </h2>
          <h4 className="intro-desc">
            (An application that allows you to see any Users or Publications Medium entries!)
          </h4>
          <div className='choices'>
            <div className='byUser' onClick={this.backToUser}>
              <AwesomeButton type="secondary submit">
                By UserName
              </AwesomeButton>
            </div>
            <div className='byPublication' onClick={this.publication}>
              <AwesomeButton type="secondary submit">
                By Publication
              </AwesomeButton>
            </div>
          </div>
          <div className="cloudContainer">
            <div className="cloud">
              {this.state.nopost?
                <div className="notFound">
                  Sorry no post found for the User
                </div>:
                <div>
                {this.state.found?
                  null:
                  <div className="notFound">
                    Sorry User not found...
                  </div>}
                </div>}
                <div className="searchContainer">
                  {this.state.publication?
                  <Search2 searchPublication={this.searchPublication} select={this.selectPub}/>:
                  <Search searchUser={this.search} />}
                </div>
              </div>
              <div className="bubbleContainer">
                <div className="small1"/>
                <div className="small2"/>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}
export default MainPage;
