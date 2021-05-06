import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const [fullMovie, setFullMovie] = useState(null);
  const params = useParams()

  console.log("My router params in this page", params)

  useEffect(() => {

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${params.movieId}&apikey=f97e167d`);
        console.log(response.data)
        setFullMovie(response.data);
      } catch(e) {
        console.log(e);
      }
    }
    fetchMovie();
  }, [])

  if (!fullMovie) {
    return (
      <div>
        Loading....
      </div>
    )
  }

  return (
    <div>
      <h2>{fullMovie.Title}</h2>
      <img src={fullMovie.Poster} />
      <p>{fullMovie.Actors}</p>
    </div>
  );
}
 
export default MovieDetails;