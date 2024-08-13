import './index.css'
import {Link, withRouter} from 'react-router-dom'
import SearchedMovieContext from '../../context/SearchedMovieContext'

const Navbar = props => (
  <SearchedMovieContext.Consumer>
    {value => {
      const {
        searchedMovie,
        onchangesearchedMovie,
        onchangesearchedMoviesList,
      } = value
      const changeSearchedInput = event =>
        onchangesearchedMovie(event.target.value)

      const redirectToSearchMoviesPage = async () => {
        const API_KEY = '2f83ec84901bd7649571067e75f12a91'
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchedMovie}&page=1`
        const response = await fetch(url)
        const data = await response.json()
        const modifiedData = data.results.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
          voteAverage: each.vote_average,
        }))

        // }

        onchangesearchedMoviesList(modifiedData)
        const {history} = props
        history.replace('/searched-movies')
      }

      return (
        <div className="navbar">
          <Link className="link" to="/">
            <h1 className="logo">movieDB</h1>
          </Link>
          <div className="tabs">
            <Link className="link tab-link" to="/">
              <button className="nav-btn" type="button">
                <h1 className="tab">Popular</h1>
              </button>
            </Link>
            <Link className="link tab-link" to="/top-rated">
              <button className="nav-btn" type="button">
                <h1 className="tab">Top Rated</h1>
              </button>
            </Link>
            <Link className="link tab-link" to="/upcoming">
              <button className="nav-btn" type="button">
                <h1 className="tab">Upcoming</h1>
              </button>
            </Link>
          </div>
          <div className="search-input-container">
            <input
              id="searchInput"
              className="search-input"
              type="text"
              placeholder="Search"
              onChange={changeSearchedInput}
              value={searchedMovie}
            />

            <button
              className="search-btn"
              type="button"
              onClick={redirectToSearchMoviesPage}
            >
              Search
            </button>
          </div>
        </div>
      )
    }}
  </SearchedMovieContext.Consumer>
)

export default withRouter(Navbar)
