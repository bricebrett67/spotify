import { useEffect, useState } from 'react'
import jQuery from 'jquery';
// import './App.css';
import { useParams } from 'react-router-dom'
import './tracks.css';
import Header from './Header';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const { albumId } = useParams();


  useEffect(() => {
    console.log(albumId);
    if (albumId !== undefined) {
      jQuery.ajax({
        url: 'http://127.0.0.1:8080/backend/Albums.php?albumId=' + albumId,
        method: 'GET',
      }).then(response => {
        // const alN = JSON.parse(response);
        // const alName = alN[0].album_name;
        // const res = [alName, alN];
        // setAlbums(res);
        const prout = JSON.parse(response)
        console.log(prout[0].album_name);
        setAlbums(JSON.parse(response));
      }).catch(error => {
        console.log(error);
      })
    }
  }, [albumId])

  
  return (
    <>
    <Header></Header>
    <div className="Tracks">
      <h3 className='album_name'>{albums[0] ? albums[0].album_name : 'nope'}</h3>
      <img className='album_image' src={albums[0] ? albums[0].album_cover : 'nope'} alt={albums[0] ? albums[0].album_name : 'nope'} />
      <p className='description'>{'Description : '}{albums[0] ? albums[0].album_description : 'nope'}</p>
      <p className='realease_date'>{'Release_date : '}{albums[0] ? albums[0].album_release : 'nope'}</p>

      {albums.map(album => {
        return <div className='background1' key={album.track_name}>
          <p className='text'>{album.track_name + ' - '}{Math.round(album.track_duration / 60) + 'min'}</p>
        </div>
      })}
    </div>
      </>
  );
}

export default Albums