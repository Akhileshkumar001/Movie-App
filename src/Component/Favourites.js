import React, { Component } from 'react'
import axios from 'axios'
import { movies } from './getMovies';

export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
        movies:[],
        genre:[],
        currGenre:"All Genre",
        CurrText:"",
        }
    }    
    async componentDidMount(){  
        //let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`);
        let results = JSON.parse(localStorage.getItem("movies"))
        let genreId={ 28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",}
    let genreArr=[];
    results.map((movieObj)=>{
        if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
            genreArr.push(genreId[movieObj.genre_ids[0]]);
        }
    });
    genreArr.unshift("All Genre")
    console.log(genreArr);
    this.setState({
      movies: [...results],
      genre : [...genreArr]
    });  
    }
    handleCurreGenre=(genre)=>{
        this.setState({
            currGenre:genre
        });
    }
    handleText=(e)=> {
        this.setState({
            CurrText:e.target.value
        })
    }
    sortPopularityAsc = ()=>{
        let allMovies=this.state.movies;
        allMovies.sort((objA,objB)=>{
            return objA.popularity-objB.popularity;
        });
        this.setState({
            movies:[...allMovies]
        });
    }
    sortPopularityDsc = ()=>{
        let AllMovies=this.state.movies;
        AllMovies.sort((objA,objB)=>{
            return objB.popularity-objA.popularity;
        });
        this.setState({
            movies:[...AllMovies]
        });
    }
    sortRatingAsc= ()=>{
        let allMovies=this.state.movies;
        allMovies.sort((objA,objB)=>{
            return objA.vote_average-objB.vote_average;
        });
        this.setState({
            movies:[...allMovies]
        });
    }
    sortRatingDsc= ()=>{
        let allMovies=this.state.movies;
        allMovies.sort((objA,objB)=>{
            return objB.vote_average-objA.vote_average;
        });
        this.setState({
            movies:[...allMovies]
        });
    }
handleDelete=(id)=>{
  let newMovies =this.state.movies.filter((movieObj)=>{
    return movieObj.id!=id;
  })
  this.setState({
    movies:[...newMovies]
  })
  localStorage.setItem("movies",JSON.stringify(newMovies))
}
  render() {
    let genreId={ 28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",}
    let filtereMovies=this.state.movies;
    if(this.state.CurrText === ""){
        filtereMovies=this.state.movies;    
    }
    else{
        filtereMovies=filtereMovies.filter((movieObj)=>{
            let moviesName=movieObj.original_title.toLowerCase();
           return moviesName.includes(this.state.CurrText);//[t,o,p, ,g,u,n, ,m,a,v,e,r,i,c,k]
        })
    }
    if(this.state.currGenre!="All Genre"){
        filtereMovies=filtereMovies.filter((movieObj) => genreId[movieObj.genre_ids[0]]==this.state.currGenre)
    }
    else filtereMovies=this.state.movies;
    return (
        <div class="row">
        <div class="col-3 favourites-list" >
            
            <ul class="list-group">
                {this.state.genre.map((genre)=>(
                    this.state.currGenre == genre ?
                    <li class="list-group-item active" aria-current="true">{genre}</li>:
                <li class="list-group-item" aria-current="true" onClick={()=>this.handleCurreGenre(genre)}>{genre}</li>
                ))}
            </ul>
            
        </div>
        <div class="col fovourites_table" >
            <div class="row">
                <input type='text'className='col-5' placeholder='Search' value={this.state.CurrText} onChange={this.handleText}></input>
                <input type='Number'className='col' placeholder='5'></input>
            </div>
       <div class="row">
            <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">
                        
                        <i class="fa-solid fa-sort-up" onClick={this.sortPopularityAsc}/> 
                            Popularity
                        <i class="fa-solid fa-sort-down" onClick={this.sortPopularityDsc}/>
                    </th>
                    <th scope="col">
                       <i class="fa-solid fa-sort-up" onClick={this.sortRatingAsc}/>
                          Rating
                        <i class="fa-solid fa-sort-down"onClick={this.sortRatingDsc}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filtereMovies.map((movieObj)=>(
                <tr>
                    <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:"8rem"}}/>{movieObj.original_title}</td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average }</td>
                    <td>
                    <button className='btn btn-outline-danger' onClick={()=>this.handleDelete(movieObj.id)}>Delete</button>
                    </td>
                </tr>
                    ))
                }
            </tbody>
           </table>
         </div>
        </div>
          
      </div>
    )
  }
}
