import React from 'react';

const MovieList = (props) => { 
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
       {props.movies.map((movie, index)=> (
       <div className="image-container d-flex justify-content-start m-3" key={index}>
         <img src={movie.Poster} alt="movie" className="movie-poster"/>
         <div className="movie-details"><p>{movie.Title}</p> <p>{movie.Year}</p></div>
         <div onClick={()=>props.handlefavouritesClick(movie)} className="overlay d-flex align-items-center justify-content">
           <FavouriteComponent />
         </div>
       </div>
       ))}
    </>
  );
};


export default MovieList;