import React from 'react'
import './DetailedArticle.css'
import ArticleCard from './ArticleCard';
const DetailedArticle = ({viewArticle}) => {
  const mydate= new Date(viewArticle.date).toLocaleDateString();
  // console.log('props recieved',viewArticle)
  return (
    <div className='detailed-card'>

<div class="article-container">
        <h1 class="article-title">{viewArticle.title}</h1>
        <p class="article-author"><span style={{color:'black'}}>Author -</span> {viewArticle.author.slice(3)}</p>
        <p class="article-date"><span style={{color:'black'}}>Published on:</span> {mydate}</p>
        <img src={viewArticle.img} alt="Article Image" class="article-image"/>
        <p class="article-description">{viewArticle.content}<a target='_blank' href={viewArticle.url}>read more...</a></p>
        {/* <a href="source-link" class="article-source">Read Full Article</a> */}
    </div>
    </div>

  )
}

export default DetailedArticle