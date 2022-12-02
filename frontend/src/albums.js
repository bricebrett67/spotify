import { useEffect, useState } from 'react'
import jQuery from 'jquery';
import { Link } from 'react-router-dom'
import './albums.css';
import Header from './Header';

function AllAlbums() {
  const [albums, setAlbums] = useState([]);
  // const { albumId } = useParams();

  useEffect(() => {
    // console.log(albumId);
    // (albumId !== undefined) {
      jQuery.ajax({
        url: 'http://127.0.0.1:8080/backend/Albums.php?allAlbum',
        method: 'GET',
      }).then(response => {
        console.log(JSON.parse(response));
        setAlbums(JSON.parse(response));
      }).catch(error => {
        console.log(error);
      })
    // }
  }, [])

  return (
    <>
      <Header></Header>
    <div className="Albums">
      {albums.map(album => {
        return <div className="background" key={album.album_name}>
          <p className='albumName'>{album.album_name}</p>
          <p className='artistsName'>{album.artist_name}</p>
          <p className='imageAlbum'><Link to={'../tracks/'+album.album_id}><img src={album.album_cover} alt={album.album_name} /></Link></p>
        </div>
      })}
    </div>
      </>
  );
}

export default AllAlbums