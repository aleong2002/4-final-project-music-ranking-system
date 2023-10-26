import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about";
import Title from "./title";
import HomepageFeed from "./HomepageFeed";
import ProfileReview from "./ProfileReview";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Nav from "./Nav";
import Post from "./Post";
import Settings from "./Settings";
import Song from "./Song";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={<HomepageFeed />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile-review" element={<ProfileReview />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />;
          <Route path="/post/:postId" element={<Post />} />;
          <Route path="/settings" element={<Settings />} />;
          <Route path="/song" element={<Song />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
