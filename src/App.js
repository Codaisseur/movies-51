import logo from './logo.svg';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MovieSearch from './pages/MovieSearch';
import MovieDetails from './pages/MovieDetails';


const NavBar = () => {
  return (
    <div style={{ marginBottom: 30 }}>
      <NavLink to="/" style={{ marginRight: 30 }}>Home</NavLink>
      <NavLink to="/discover">Discover Movies</NavLink>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/movies/:movieId" component={MovieDetails} />
        <Route path="/discover" component={MovieSearch} />        
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
