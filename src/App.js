import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites'
 
const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('Avengers');

  const getMovieRequest = useCallback(
    () => {  
      return fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=1357bedf`, {
        method: "GET"
      }).then((res) => res.json()).then((response) => {
        if (response.Response === 'True') setMovies(response.Search);
      });    
    }, [searchValue]
  )

 
   useEffect(() => {
     getMovieRequest(searchValue);
   }, [searchValue, getMovieRequest]);

   useEffect(()=>{
     const movieFavourite = JSON.parse(localStorage.getItem('react-movie-app-favourites')
     );

     if (movieFavourite !== null) setFavourites(movieFavourite);

   }, [])

   const saveToLocalStorage = (items) => {
     localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
   }

   const addFavouriteMovie = (movie) => {
     const newFavouriteList = [...favourites, movie];
     setFavourites(newFavouriteList);
     saveToLocalStorage(newFavouriteList);
   };

   const removeFavouriteMovie = (movie) => {
     const newFavouriteList = favourites.filter(
       (favourite) => favourite.Title !== movie.Title
     );

     setFavourites(newFavouriteList);
     saveToLocalStorage(newFavouriteList);
   };

  return (
     <div className='container-fluid movie-app'>
       <div className="row d-flex align-items-center mt-4 mb-4">
         <MovieListHeading heading='Movies' />
         <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} getMovieRequest={getMovieRequest}/>
       </div>
    <div className="row"> 
  <MovieList movies={movies} handlefavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}
   /> 
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
         <MovieListHeading heading='Favourites' />
       </div>
       <div className="row"> 
  <MovieList movies={favourites} handlefavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} /> 
    </div>
  </div> 
  );
};

export default App;
