import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieItemDetails from './components/MovieItemDetails'
import Navbar from './components/Navbar'
import SearchedMovies from './components/SearchedMovies'
import SearchedMovieContext from './context/SearchedMovieContext'

// write your code here
// const apiKey = '2f83ec84901bd7649571067e75f12a91'
class App extends Component {
  state = {searchedMovie: '', searchedMoviesList: []}

  onchangesearchedMovie = searchedInput =>
    this.setState({searchedMovie: searchedInput})

  onchangesearchedMoviesList = passedSearchedMoviesList =>
    this.setState({searchedMoviesList: passedSearchedMoviesList})

  render() {
    const {searchedMovie, searchedMoviesList} = this.state
    return (
      <SearchedMovieContext.Provider
        value={{
          searchedMovie,
          onchangesearchedMovie: this.onchangesearchedMovie,
          searchedMoviesList,
          onchangesearchedMoviesList: this.onchangesearchedMoviesList,
        }}
      >
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/movies/:id" component={MovieItemDetails} />
            <Route exact path="/searched-movies" component={SearchedMovies} />
          </Switch>
        </div>
      </SearchedMovieContext.Provider>
    )
  }
}

export default App
