import './index.css'
import {Component} from 'react'
// import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import SearchedMovieContext from '../../context/SearchedMovieContext'

class SearchedMovies extends Component {
  state = {isLoading: false}

  // componentDidMount() {
  //   this.getSearchedMovies()
  // }

  // getSearchedMovies = async () => {
  //   this.setState({isLoading: true})
  //   const API_KEY = '2f83ec84901bd7649571067e75f12a91'
  //   const {searchedMovie} = this.context
  //   console.log()
  //   const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchedMovie}&page=1`
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   const modifiedData = data.results.map(each => ({
  //     id: each.id,
  //     title: each.title,
  //     posterPath: each.poster_path,
  //     voteAverage: each.vote_average,
  //   }))
  //   this.setState({isLoading: false, moviesList: modifiedData})
  //   console.log(data)
  // }

  // renderLoadingView = () => (
  //   <div className="loader-container">
  //     <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
  //   </div>
  // )

  renderMovieList = () => {
    // const {moviesList} = this.state
    const {searchedMoviesList} = this.context
    console.log(searchedMoviesList)
    return (
      <ul className="movie-list">
        {searchedMoviesList.map(each => (
          <MovieItem movieDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="page-container">
        {isLoading === false
          ? this.renderMovieList()
          : this.renderLoadingView()}
      </div>
    )
  }
}

SearchedMovies.contextType = SearchedMovieContext
export default SearchedMovies
