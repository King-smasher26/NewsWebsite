import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import './ArticleCard.css'
import './ArticleList.css'
import { json } from 'react-router-dom'
const ArticleList = (props) => {
    // console.log("props are",props.articles)    
    return (
        <div className='content-wrapper'>
            {
                props.articles&&props.articles.filter((obj)=>{
                    if(props.search==''){
                        return obj
                    }
                    else if(obj.title.toLowerCase().includes(props.search.toLowerCase())){
                        return obj
                    }
                }).map((obj,index)=>{
                    return <ArticleCard
                    key={index}
            author={obj.byline} 
            content={obj.content}
            description={obj.abstract}
            source={obj.source}
            title={obj.title}
            url={obj.url}
            date={obj.published_date}
            img={obj.multimedia[0].url}  
            favouriteCart={props.favouriteCart}
            />
                })
            }

    </div>
)
}

export default ArticleList