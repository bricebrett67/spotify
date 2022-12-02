import { useEffect, useState } from 'react'
import jQuery from 'jquery';
import './App.css';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function Discography() {
  const [albums, setDiscography] = useState([]);
  const { albumId } = useParams();

  useEffect(() => {
      console.log(albumId);
      if (albumId !== undefined) {
      jQuery.ajax({
        url: 'http://127.0.0.1:8080/backend/Albums.php?artistId=' + albumId,
        method: 'GET',
      }).then(response => {
        console.log(response);
        setDiscography(JSON.parse(response));
      }).catch(error => {
        console.log(error);
      })
    }
  }, [albumId])

  return (
    <div className="Albums">
      {albums.map(album => {
        return <div key={album.album_name}>
          <p>{album.album_name}</p>
          {/* <p>{album.artist_name}</p> */}
          <Link to={'../tracks/'+album.album_id}><img src={album.album_cover} alt={album.album_name} /></Link>
        </div>
      })}
    </div>
  );
}

export default Discography