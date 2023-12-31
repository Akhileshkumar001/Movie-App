import React, { Component } from 'react'
import {movies} from './getMovies'

export default class Banner extends Component {
  render() {
    //let movie= movies.results[111111111111];
   // console.log(movies.results[0]);
   let movie=movies.results[0];
    return (
      <>
      {movie == ""? (
      <div className="spinner-border text-danger" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      ): (
      <div className="card banner-card">
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt="..."/>
         {/* <div class="card-body"> */}
          <h5 className="card-title banner-title">{movie.title}</h5>
          <p className="card-text banner-textf ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {/*<a href="#" class="btn btn-primary">Go somewhere</a>*/}
         </div>
     // </div> 
      )}
      </>
    );
  }
}
