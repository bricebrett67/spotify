import './Header.css';
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'


const Header = () => {
    return (
        <div className='header'>
        <img src={logo} alt='Spotify Logo' className='img-logo' />
        <div className='header-right'>
          <Link to='/albums/allAlbum' id="select">Albums</Link>
          <Link to='/artists' id='select'>Artists</Link>
          <Link to='/genres' id="select">Genres</Link>
        </div>
      </div>
    );
}

export default Header