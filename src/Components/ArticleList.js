import React from 'react'
import ArticleCard from './ArticleCard'
import './ArticleCard.css'
import './ArticleList.css'

const ArticleList = (props) => {
    return (
        <div className='content-wrapper'>
            {props.articles && props.articles
                .filter((obj) => {
                    if (props.search === '') {
                        return true;
                    }
                    return obj.title.toLowerCase().includes(props.search.toLowerCase());
                })
                .map((obj, index) => {
                    // Check if multimedia exists and has at least one item
                    const imgUrl = obj.multimedia && obj.multimedia.length > 0 ? obj.multimedia[0].url : '';

                    return (
                        <ArticleCard
                            key={index}
                            author={obj.byline}
                            content={obj.content}
                            description={obj.abstract}
                            source={obj.source}
                            title={obj.title}
                            url={obj.url}
                            date={obj.published_date}
                            img={imgUrl}
                            favouriteCart={props.favouriteCart}
                        />
                    );
                })
            }
        </div>
    );
}

export default ArticleList