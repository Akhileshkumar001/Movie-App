import React, { Component } from 'react'
import axios from 'axios'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
        movies:[]
        }
    }    
    async componentDidMount(){  
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`);
    console.log(res.data);
    this.setState({
      movies:[...res.data.results]
    })  
    
     }
  render() {
    return (
        <div class="row">
        <div class="col-3" >
            
            <ul class="list-group">
                <li class="list-group-item active">All Genere</li>
                <li class="list-group-item">Fantasy</li>
                <li class="list-group-item">Action</li>
                <li class="list-group-item">Hrror</li>
                
            </ul>
            
        </div>
        <div class="col-sm" >
            <div class="row">
                <input type='text'className='col' placeholder='Search'></input>
                <input type='Number'className='col' placeholder='5'></input>
            </div>
       <div class="row">
            <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.movies.map((movieObj)=>(
                <tr>
                    <th scope="row">{movieObj.original_title}</th>
                    <td>{movieObj.original_title}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                    ))
                }
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
           </table>
         </div>
        </div>
      </div>
    )
  }
}
