import React from 'react';
import '../PostCSS/Posts.css'

function Post(props) {

    const newDate = new Date(props.post.pubDate)
    const dateString = newDate.toDateString()
    const categories = props.post.categories.join(', ');

  return(
    <div className='entryContainer'>
      <h1 className='postName'>
        {props.post.title}
      </h1>
      <img className="thumbnail" src={props.post.thumbnail} />
      <h5 className="date">
        Date Posted: {dateString}
      </h5>
      <h5 className="date">
        Categories: {categories}
      </h5>
      < a className="link" href={props.post.link}>
        Check it out on Medium!
      </a>
    </div>
  )
}

export default Post
