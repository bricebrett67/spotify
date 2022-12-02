import AllAlbums from './albums'
import Albums from './tracks'
import App from './App'
import Artists from './artists'
import ReactDOM from 'react-dom'
import React from 'react'
import Discography from './discography'
import Genres from './genres'
import GenreAlbums from './genreAlbums'


import {
  Routes, Route, BrowserRouter
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/albums/:allAlbum" element={<AllAlbums />} />
        <Route path="/artists/" element={<Artists />} />
        <Route path="/tracks/:albumId" element={<Albums />} />
        <Route path="/tracks/:albumId" element={<Albums />} />
        <Route path="/discography/:albumId" element={<Discography />} />
        <Route path="/genres/" element={<Genres />} />
        <Route path="/genreAlbums/:genreId" element={<GenreAlbums />} />

        {/* <Route path="/artist/:id" element={<Artists />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
