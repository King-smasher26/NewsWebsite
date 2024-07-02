import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ArticleList from './Components/ArticleList';
import Pagination from './Components/Pagination';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FavoriteNews from './Components/FavouriteNews';
import { Helmet } from 'react-helmet';

function App() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [newsCategory, setNewsCategory] = useState('Headlines');
  const [search, setSearch] = useState('');
  const [favouriteItems, setFavouriteItems] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles(category = 'home') {
    try {
      const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`);
      setArticles(response.data.results);
      setNewsCategory(category.charAt(0).toUpperCase() + category.slice(1));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  function addToFavorites(item) {
    setFavouriteItems(prevItems => [...prevItems, item]);
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = articles.slice(firstPostIndex, lastPostIndex);

  return (
    <Routes>
      <Route path='/' element={
        <div className='App'>
          <Helmet>
            <title>New York Times Top Stories | {newsCategory}</title>
            <meta name="description" content={`Read the latest ${newsCategory} news from the New York Times. Stay informed with our curated selection of top stories.`} />
            <meta name="keywords" content={`New York Times, news, ${newsCategory.toLowerCase()}, top stories`} />
          </Helmet>
          <header>
            <nav>
              <h1 className='website-icon'><a href='/' title="New York Times Home">New York Times</a></h1>
              <div className='nav-right-side'>
                <button className='fav-button' onClick={() => navigate('/favourites')} aria-label="View Favorites">Favorites</button>
                <DropdownButton id="category-dropdown" title='Select Category'>
                  {['Politics', 'Technology', 'Sports'].map(category => (
                    <Dropdown.Item key={category.toLowerCase()} onClick={() => fetchArticles(category.toLowerCase())}>{category}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </nav>
          </header>
          <main>
            <input 
              className='search-input' 
              placeholder='Search articles...' 
              type='text' 
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search articles"
            />
            <ArticleList search={search} articles={currentPosts} allArticles={articles} addToFavorites={addToFavorites} />
          </main>
          <footer>
            <Pagination 
              totalPosts={articles.length} 
              postsPerPage={postsPerPage} 
              setCurrentPage={setCurrentPage} 
              currentPage={currentPage} 
            />
          </footer>
        </div>
      } />
      <Route path='/favourites' element={
        <div className='App'>
          <Helmet>
            <title>Favorite Articles | New York Times</title>
            <meta name="description" content="View your saved favorite articles from the New York Times." />
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <header>
            <nav>
              <h1 className='website-icon'><a href='/' title="Return to Home">New York Times</a></h1>
            </nav>
          </header>
          <main>
            <FavoriteNews articles={favouriteItems} />
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App;