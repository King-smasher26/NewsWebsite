import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
// import ArticleCard from './ArticleCard'
import ArticleList from './ArticleList'
const Mainpage = () => {
    const [articles,setArticles]=useState();
    const [currentPage,setCurrentPage]=useState(1);
    const [postsPerPage,setPostsPerPage]=useState(8);

    useEffect(()=>{
      apicall()
    },[])
    async function apicall(){
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=383f9faaa673424aa42873751fcef627');
        console.log(response.data.articles)
        setArticles(response.data.articles)
        console.log('api just called')
      }
      const lastPostIndex= currentPage*postsPerPage;
      const firstPostIndex= lastPostIndex-postsPerPage;
      // const currentPosts=articles.slice(firstPostIndex,lastPostIndex);
  return (
    <div className='app'>
      <div>NEWS</div>
      <ArticleList articles={articles}/>
    </div>
  )
}

export default Mainpage