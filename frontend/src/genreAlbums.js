import { useEffect, useState } from 'react'
import jQuery from 'jquery';
// import './App.css';
import { useParams } from 'react-router-dom'
import './tracks';
import { Link } from 'react-router-dom'
import './genreAlbums.css';
import Header from './Header';

function GenreAlbums() {
  const [albums, setAlbums] = useState([]);
  const { genreId } = useParams();


  useEffect(() => {
    console.log(genreId);
    if (genreId !== undefined) {
      jQuery.ajax({
        url: 'http://127.0.0.1:8080/backend/Albums.php?genreId=' + genreId,
        method: 'GET',
      }).then(response => {
        // const alN = JSON.parse(response);
        // const alName = alN[0].album_name;
        // const res = [alName, alN];
        // setAlbums(res);

        // const prout = JSON.parse(response)
        // console.log(prout[0].album_name);
        setAlbums(JSON.parse(response));
      }).catch(error => {
        console.log(error);
      })
    }
  }, [genreId])

  
  return (
    <>
    <Header></Header>
    <div className="GenreAlbums">
      {/* <h3>{albums[0] ? albums[0].album_name : 'nope'}</h3>
      <img src={albums[0] ? albums[0].album_cover : 'nope'} alt={albums[0] ? albums[0].album_name : 'nope'} />
    <p>{'Description : '}{albums[0] ? albums[0].album_description : 'nope'}</p> */}
      <h3>{albums[0] ? albums[0].genre : 'nope'}</h3>

      {albums.map(album => {
        return <div className='genreAlbumDiv' key={album.album_name}>
          <p className='albumName'>{album.album_name}</p>
          <Link to={'../tracks/'+album.album_id}><img src={album.album_cover} alt={album.album_name} /></Link>
        </div>
      })}
    </div>
      </>
  );
}

export default GenreAlbums