import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import List from './Component/List';
import Favourites from './Component/Favourites';
import {BrowserRouter,Route,Routes,Switch } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
          <Routes>
              <Route path="/" element ={<List/>}/>
            <Route path="/fav" element ={<Favourites/>}/>
        </Routes>
        {/*<Banner/>*/}
    </BrowserRouter>
  );
}

export default App;
