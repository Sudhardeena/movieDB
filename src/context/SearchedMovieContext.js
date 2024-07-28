import React from 'react'

const SearchedMovieContext = React.createContext({
  searchedMovie: '',
  onchangesearchedMovie: () => {},
  searchedMoviesList: [],
  onchangesearchedMoviesList: () => {},
})

export default SearchedMovieContext
