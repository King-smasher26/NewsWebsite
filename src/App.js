import './App.css';
import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
// import Mainpage from './Components/Mainpage';
import ArticleList from './Components/ArticleList';
import Pagination from './Components/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FavoriteNews from './Components/FavouriteNews';
function App() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  // const [currentPosts,setCurrentPosts]=useState()
  useEffect(() => {
    apicall()

  }, [])
  async function apicall() {
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`);
    // console.log("new api response ",response)
    // console.log("new api response images",response.data.results[0].multimedia[0].url)


    // console.log(response.data.results)
    setArticles(response.data.results)
    // console.log('api just called')
  }
  async function newcategory(e) {
    // console.log('value of category is', e.target.id)
    const query = e.target.id;
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${query}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`);
    // console.log(response.data.results)
    setArticles(response.data.results)
    setNewsCategory(e.target.id)
    setCurrentPage(1);
    // console.log('api just called')
  }
  const [favouriteItems, setFavouriteItems] = useState([]);
  function favouriteCart(item) {
    setFavouriteItems(oldarray => [...oldarray, item])
    // console.log("item added ", item)
  }
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = articles.slice(firstPostIndex, lastPostIndex);
  const [newsCategory, setNewsCategory] = useState('HEADLINES');
  const [search, setSearch] = useState('')
  return (
    <Routes>
      <Route path='/' element={
        <div className='App'>
          <nav>

            <div className='website-icon' ><a href='/'>NewYork Times</a></div>
            <div className='nav-right-side'>

              <button className='fav-button' onClick={() => { navigate('/favourites') }}>FAVOURITES</button>
              <DropdownButton id="dropdown-basic-button" title='select category'>
                <Dropdown.Item id='politics' onClick={(e) => { newcategory(e) }}>POLITICS</Dropdown.Item>
                <Dropdown.Item id='Technology' onClick={(e) => { newcategory(e) }}>TECHNOLOGY</Dropdown.Item>
                <Dropdown.Item id='sports' onClick={(e) => { newcategory(e) }}>SPORTS</Dropdown.Item>
              </DropdownButton>
            </div>
          </nav>
          <input className='search-input' placeholder='Search...' type='text' onChange={(e) => setSearch(e.target.value)} />
          <ArticleList search={search} articles={currentPosts} allArticles={articles} />
          <footer>
            <Pagination totalPosts={articles.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </footer>
        </div>
      } />
      <Route path='/favourites' element={
        <div className='App'>
          <nav>

            <div className='website-icon' ><a href='/'>NewYork Times</a></div>
          </nav>

          <FavoriteNews articles={favouriteItems} />
        </div>
      } />
    </Routes>
  )
}

export default App;
