import './index.css'
import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, posterPath, voteAverage, title} = movieDetails
  const imgUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <li className="movie-item">
      <img className="movie-img" src={imgUrl} alt={title} />
      <div className="movie-info">
        <h1 className="movie-title">{title}</h1>
        <p className="rating">rating: {voteAverage}</p>
      </div>
      <Link className="link movie-link" to={`/movies/${id}`}>
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieItem
