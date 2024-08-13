import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

class MovieItemDetails extends Component {
  state = {isLoading: true, movieItemDetails: {}, castDetails: []}

  componentDidMount() {
    this.getMovieDetails()
    this.getCastDetails()
  }

  getMovieDetails = async () => {
    this.setState({isLoading: true})
    const API_KEY = '4841f35a65dc0931b163ff28846b3196'
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const modifiedData = {
      id: data.id,
      title: data.title,
      posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      voteAverage: data.vote_average,
      releaseYear: data.release_date.split('-')[0],
      adult: data.adult,
      releaseDate: data.release_date,
      genres: data.genres.map(el => el.name).join(','),
      runtime: `${Math.floor(data.runtime / 60)}h ${
        data.runtime % 60 > 0 && `${data.runtime % 60}m`
      }`,
      tagline: data.tagline,
      overview: data.overview,
      backdropPath: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    }
    this.setState({isLoading: false, movieItemDetails: modifiedData})
    console.log(modifiedData)
  }

  getCastDetails = async () => {
    this.setState({isLoading: true})
    const API_KEY = '4841f35a65dc0931b163ff28846b3196'
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const modifiedData = data.cast.map(each => ({
      id: each.id,
      name: each.name,
      character: each.character,
      profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
    }))
    this.setState({isLoading: false, castDetails: modifiedData})
    console.log(modifiedData)
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMovieItemDetails = () => {
    const {movieItemDetails, castDetails} = this.state
    const {
      backdropPath,
      posterPath,
      title,
      voteAverage,
      releaseYear,
      adult,
      releaseDate,
      genres,
      tagline,
      overview,
      runtime,
    } = movieItemDetails

    return (
      <>
        <div className="movie-details-section">
          <div
            className="movie-detaile-bg"
            style={{backgroundImage: `url(${backdropPath})`}}
          />

          <img className="movie-details-img" src={posterPath} alt={title} />
          <div className="movie-details-info-div">
            <div className="title-div">
              <h1 className="title">{title}</h1>
              <p className="year">({releaseYear})</p>
            </div>
            <p>
              {adult ? (
                <span className="certification">A</span>
              ) : (
                <span className="certification">R</span>
              )}{' '}
              <span className="bullet">∙</span> {releaseDate} (IN) {genres}{' '}
              <span className="bullet">⋅</span> {runtime}
            </p>
            <h1>Rating: {voteAverage}</h1>
            <p className="tag-line">{tagline}</p>
            <h1>overview</h1>
            <p>{overview}</p>
          </div>
        </div>
        <div className="cast-details-section">
          <h1>Cast:</h1>
          <ul className="cast-list">
            {castDetails.map(el => {
              const {id, name, character, profilePath} = el
              return (
                <li className="cast-item" key={id}>
                  <img className="profile-img" src={profilePath} alt="name" />
                  <div className="cast-info">
                    <h2 className="cast-name">{name}</h2>
                    <p className="chr-name">{character}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="page-container">
        {isLoading === false
          ? this.renderMovieItemDetails()
          : this.renderLoadingView()}
      </div>
    )
  }
}

export default MovieItemDetails
