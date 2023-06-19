import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',color:'blue',padding:'1rem',justifyContent:'center',alignItems:'center'}}>
      <h1>Movies</h1>
      <h2 style={{marginLeft:'2rem'}}>Favorites</h2>
      </div>
    )
  }
}
