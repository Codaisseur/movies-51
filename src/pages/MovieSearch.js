import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const MovieCard = (props) => {
  return (
    <div style={{ border: '2px solid black', margin: 20 }}>
      <h3>{props.title}</h3>
      <img src={props.imageUrl}/>
      <Link to={`/movies/${props.movieId}`}>Details</Link>
    </div>
  )
}

const MovieSearch = () => {
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState({ status: 'idle' })

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setSearchStatus({ status: 'searching' });

      const queryParam = encodeURIComponent(search)

      const response = await axios.get(`https://www.omdbapi.com/?s=${queryParam}&apikey=f97e167d`)
      console.log("error response", response)

      if (response.data.Error) {
        setSearchStatus({ status: 'error' })
      } else {
        setSearchStatus({ status: 'done', data: response.data.Search });
      }
    } catch (e) {
      console.log("error searching", e.message);
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>Search Term:</label>
        <input
          type="text"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {searchStatus.status === "error" && "Search failed!!"}
        {searchStatus.status === "searching" && "Loading...."}
        {searchStatus.status === "done" && 
          searchStatus.data.map(movie => 
            <MovieCard key={movie.imdbID} movieId={movie.imdbID} title={movie.Title} imageUrl={movie.Poster} />
            )       
        }
      </div>
    </div>
  );
}
 
export default MovieSearch;