import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import SearchedMovieContext from '../../context/SearchedMovieContext'

class Upcoming extends Component {
  state = {isLoading: true, moviesList: [], pageNo: 1}

  componentDidMount() {
    this.getUpcomingMovies()
    const {onchangesearchedMovie} = this.context
    onchangesearchedMovie('')
  }

  setPageNo = no => this.setState({pageNo: no}, this.getUpcomingMovies)

  getUpcomingMovies = async () => {
    const {pageNo} = this.state
    this.setState({isLoading: true})
    const API_KEY = '2f83ec84901bd7649571067e75f12a91'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const modifiedData = data.results.map(each => ({
      id: each.id,
      title: each.title,
      posterPath: each.poster_path,
      voteAverage: each.vote_average,
    }))
    this.setState({isLoading: false, moviesList: modifiedData})
    console.log(data)
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMovieList = () => {
    const {moviesList, pageNo} = this.state
    return (
      <>
        <ul className="movie-list">
          {moviesList.map(each => (
            <MovieItem movieDetails={each} key={each.id} />
          ))}
        </ul>
        <Pagination pageNo={pageNo} setPageNo={this.setPageNo} />
      </>
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

Upcoming.contextType = SearchedMovieContext
export default Upcoming
