import React, { Component } from 'react'
import {movies} from './getMovies';
import axios from 'axios'


export default class List extends Component {
  constructor(){
  super();
    this.state={
      hover:"",
      parr: [1],
      currPage:1,
      movies:[],
    };
  }
  handleEnter=(id)=>{
    this.setState({
      hover:id
    })
  };
  handleLeave=()=>{
    this.setState({
      hover: '',
    })
  };
  changeMovies =async()=>{
    let res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`
    );
    this.setState({
      movies:[...res.data.results]
    })
  }
  handleNext=()=>{
    let tempArr=[];
    let i=1;
    for(;i<=this.state.parr.length+1;i++){
      tempArr.push(i);
    }
    this.setState({
      parr:[...tempArr],
      currPage:this.state.currPage+1
    },this.changeMovies);
  };

    handlePrev=() => {
      if(this.state.currPage != 1){
        this.setState({
        currPage:this.state.currPage-1
      },this.changeMovies)
    }
  };
  handlePageNo=(pageNum)=>{
    this.setState({
      currPage:pageNum,
    },this.changeMovies);
  }
  async componentDidMount(){
    console.log("componentDIdMot");
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`);
    console.log(res.data);
    this.setState({
      movies:[...res.data.results]
    })
  }

  render() {
    let movie= movies.results;
   
    return (
      <>
      {
       this.state.movies.length == 0 ?(
       <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
       </div>
    ):(
      <div>
       <h3 className="text-center">
          <strong>Trending</strong>
       </h3>
       <div className="movies-list">
        {this.state.movies.map((movieObj)=>(
          <div className="card movies-card"
            onMouseEnter={()=>this.handleEnter(movieObj.id)}
            onMouseleave={this.handleLeave}
            >
          <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top banner-img" alt="..." style={{height:"40vh",width:"20vw"}}  />
           {/* <div class="card-body"> */}
            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
            {/*<p className="card-text banner-textf ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
            <div className="button-wrapper">
              {this.state.hover == movieObj.id && (
              <a href="#" class="btn btn-primary movie-button">add to favourites</a>
              )}
           </div>
          </div>
        ))}
        </div>
        <div className='Pagination'>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" onClick={this.handlePrev}>
              Previous
            </a>
          </li>
          {
            this.state.parr.map((pageNum) =>(
              <li class="page-item">
            <a class="page-link" onClick={()=>{this.handlePageNo(pageNum)}}>
              {pageNum}
            </a>
          </li>
            ))
          }  
          <li class="page-item">
            <a class="page-link" onClick={this.handleNext}>
              Next
            </a>
          </li>
        </ul> 
      </nav>
    </div>
    </div>
     )}
      </>
    );
  }
}
