import { useEffect, useState } from 'react'
import jQuery from 'jquery';
// import './App.css';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './artists.css'
import Header from './Header'

function Artists() {
    const [artists, setArtists] = useState([]);
    //   const { albumId } = useParams();

    useEffect(() => {
        // console.log(albumId);
        // if (albumId !== undefined) {
        jQuery.ajax({
            url: 'http://127.0.0.1:8080/backend/Artists.php',
            method: 'GET',
        }).then(response => {
            console.log(JSON.parse(response));
            setArtists(JSON.parse(response));
        }).catch(error => {
            console.log(error);
        })
        // }
    }, [])

    return (
        <>
            <Header></Header>
            <div className="Artists">
                {artists.map(artist => {
                    return <div className="background" key={artist.artist_name}>
                        <p className='artistName'>{artist.artist_name}</p>
                        <div className='Artist'>
                        <p className='descriptionArtist'>{artist.artist_description}</p>
                        <Link to={'../discography/' + artist.artist_id}><img src={artist.artist_photo} alt={artist.artist_photo} /></Link>
                        </div>
                    </div>
                })}
            </div>
        </>
    );
}

export default Artists