import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import './ArticleCard.css'
import './ArticleList.css'
import './FavouriteNews.css'
const FavoriteNews = (props) => {
    // const [articles,setArticles]=useState(props.articles)
    // const articles = props.articles;
    console.log("props are",props.articles)    
    const [items,setItems]=useState([]);
    useEffect(()=>{
        setItems(JSON.parse(localStorage.getItem('fav')))
    },[])
    return (
        <>
        {/* <div className='fav-heading'>Favourite News</div> */}
        {items.length!=0?
        <div className='content-wrapper'>
        {items.map(obj=>{
            return <ArticleCard
            author={obj.author} 
            content={obj.content}
            description={obj.description}
            source={obj.source}
            title={obj.title}
            url={obj.url}
            date={obj.date}
            img={obj.img}     
            fav='checked'
            />
        })}

    </div>:<div style={{color:'white'}}>no favourites</div>
    }
        </>
)
}

export default FavoriteNews