import { useEffect, useState } from 'react'
import axios from 'axios'

const SongPostForm = ({setShowForm, addPostToList, songArtist, songTitle}) => {
  const [username, setUsername] = useState("");
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
        setUsername(res.data.user.username)
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  // create a state variable for each form field
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`http://localhost:3000/song/${songArtist}/${songTitle}/save`, {
        user: username,
        rating: rating,
        review: review,
      })
      .then(response => {
        addPostToList(response.data)
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

    // clear form
    setShowForm(false)
  }

  return (
    <form className="SongReviewForm" onSubmit={submitForm}>
      <input type="number" name="rating" min="1" max="10" value={rating} onChange={e => setRating(e.target.value)}/>
      <label htmlFor="rating"> /10</label>
      <br />
      <textarea
        placeholder="enter your review..."
        rows="10"
        onChange={e => setReview(e.target.value)}
        value={review}
      />
      <br />
      <input type="submit" disabled={!rating || !review} value="Post" />
    </form>
  )
}

export default SongPostForm
