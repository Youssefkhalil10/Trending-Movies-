import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MoviesDetails() {

  let param = useParams()
  const [movie, setMovie] = useState({})
  const [isloading, setIsloading] = useState(true)

  let apikey = '630978b75934f69b95eec607fd0c9c00'

  
  async function getMovieDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=${apikey}`)
    setMovie(data);
    setIsloading()
  }

  useEffect(()=>{
    getMovieDetails()
  },[param.id])

  
  return (
    <div>
      <div className="container mt-5">
        <h2 className='text-center mb-4'>{movie.title}</h2>
    
        {isloading ?
        <h2 className='text-center'> <i className='fas fa-spinner fa-spin'></i></h2>
        :
        <div className="d-flex align-items-center gap-5">

          

          <div className=" flex-shrink-0 ">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className='img-fluid rounded shadow ' alt={movie.title} 
                style={{ maxWidth:'300px', height:'auto', cursor: "pointer" }}/>
          </div>

          <div className="flex-grow-1 ">

          <h5>
            <strong>Release Date: </strong> {movie.release_date}
          </h5>
          <h5>
            <strong>Rating: </strong> ⭐ {movie.vote_average} / 10
          </h5>
          <h5 className='mt-3'>
            <strong>OverView: </strong> {movie.overview}
          </h5>
          <h5 className='mt-3'>
            <strong>Production Country : </strong>
            {movie.origin_country}
          </h5>
          
          </div>
          
        </div>
      }
        
        
      

        
      </div>
    </div>
  )
}
