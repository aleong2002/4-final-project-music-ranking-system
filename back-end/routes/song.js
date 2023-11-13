const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();


//TODO: once database implemented, remove postArr and song
//TODO: in post /save, maybe change rating equation? currently disregards any individual ratings, so decimal points are kind of off
let postArr = []
let song = {
    rating: 5, 
    numReviews: 10,
    posts: postArr
}
router.post("/:songArtist/:songTitle/save", (req, res) =>{
    const newPost = {
        user: req.body.user, 
        rating: parseInt(req.body.rating), 
        review: req.body.review
    } 
    postArr = [newPost, ...postArr]
    song.numReviews++
    song.rating = ((song.rating * (song.numReviews-1) + newPost.rating)/song.numReviews).toFixed(1)
    res.json(newPost)
});

router.get("/:songArtist/:songTitle", (req, res) => {
    let token;
    //first get spotify token
    axios.get("http://localhost:3000/spotify/token")
    .then (response => {
        token = response.data.access_token
    })
    .catch(err => {
        console.log("Error fetching Spotify token:", err)
      })
    // then search for song with token
    .then (response => {
        axios.get(`https://api.spotify.com/v1/search?q=${req.params.songArtist}+${req.params.songTitle}&type=track&limit=1&offset=0`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
    // then send response with updated song object
        .then (response => {
            song.artist = response.data.tracks.items[0].artists[0].name
            song.title = response.data.tracks.items[0].name
            song.coverSrc = response.data.tracks.items[0].album.images[1].url
            res.json(song)
        })
    })
    .catch(err => {
        console.log("Error searching Spotify:", err)
      })
});

module.exports = router;