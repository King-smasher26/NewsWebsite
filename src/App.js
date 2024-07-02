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

  // async function fetchArticles(category = 'home') {
  //   try {
  //     const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`);
  //     setArticles(response.data.results);
  //     setNewsCategory(category.charAt(0).toUpperCase() + category.slice(1));
  //     setCurrentPage(1);
  //   } catch (error) {
  //     console.error('Error fetching articles:', error);
  //   }
  // }

  async function fetchArticles(category = 'home') {
    try {
      console.log('Fetching articles for category:', category);
      const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`);
      console.log('API Response:', response.data);
      
      if (response.data && Array.isArray(response.data.results)) {
        console.log('Number of articles:', response.data.results.length);
        setArticles(response.data.results);
        setNewsCategory(category.charAt(0).toUpperCase() + category.slice(1));
        setCurrentPage(1);
      } else {
        console.error('Invalid response structure for category:', category);
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
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
            <link rel="canonical" href="https://your-domain.com/" />
            <script type="application/ld+json">
              {`
                {
                  "@context": "http://schema.org",
                  "@type": "NewsArticle",
                  "headline": "New York Times Top Stories",
                  "description": "Latest news and top stories from the New York Times",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Your Website Name",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://your-domain.com/logo.png"
                    }
                  }
                }
              `}
            </script>
          </Helmet>
          <header>
  <nav>
    <div className="website-icon">
      <a href="/" title="New York Times Home">New York Times</a>
    </div>
    <div className="nav-right-side">
      <button className="fav-button" onClick={() => navigate('/favourites')} aria-label="View Favorites">
        Favorites
      </button>
      <DropdownButton id="category-dropdown" title="Select Category" aria-label="Select news category">
        {['Politics', 'Technology', 'Sports'].map(category => (
          <Dropdown.Item key={category.toLowerCase()} onClick={() => fetchArticles(category.toLowerCase())}>
            {category}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  </nav>
</header>
          <main>
            <h2 style={{color:"white"}}>{newsCategory} News</h2>
            <section aria-label="Search articles">
              <label htmlFor="search-input" className="sr-only">Search articles</label>
              <input 
                id="search-input"
                className='search-input' 
                placeholder='Search articles...' 
                type='text' 
                onChange={(e) => setSearch(e.target.value)}
              />
            </section>
            <section aria-label="Article List">
              <ArticleList search={search} articles={currentPosts} allArticles={articles} addToFavorites={addToFavorites} />
            </section>
          </main>
          <footer>
            <nav aria-label="Pagination">
              <Pagination 
                totalPosts={articles.length} 
                postsPerPage={postsPerPage} 
                setCurrentPage={setCurrentPage} 
                currentPage={currentPage} 
              />
            </nav>
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
            <nav aria-label="Main Navigation">
              <h1 className='website-icon'><a href='/' title="Return to Home">New York Times</a></h1>
            </nav>
          </header>
          <main>
            <h2 style={{color:"white"}}>Your Favorite Articles</h2>
            <FavoriteNews articles={favouriteItems} />
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App;