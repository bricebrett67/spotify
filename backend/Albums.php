<?php

require_once('Db.php');

class Albums extends Db {
    static function getTracks($albumId) {
        $db = Db::dbConnect();
        $query = $db->prepare('SELECT DISTINCT al.cover_small as "album_cover", al.description as "album_description", al.name as "album_name", al.release_date as "album_release", g.name as "genre", tr.name as "track_name", tr.track_no as "track_no", tr.duration as "track_duration", tr.mp3 as "track_mp3", ar.name as "artist_name" 
        FROM albums al INNER JOIN artists ar ON ar.id = al.artist_id 
        INNER JOIN tracks tr ON tr.album_id = al.id 
        INNER JOIN genres_albums gl ON gl.album_id = al.id 
        INNER JOIN genres g ON g.id = gl.genre_id WHERE al.id = :album_id');
        $query->execute(array('album_id' => $albumId));
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        $resLength = count($results) / 2;
        $result = array_splice($results, $resLength);
        return json_encode($result);
    }

    static function getAlbums($artistId) {
        $db = Db::dbConnect();
        $query = $db->prepare("SELECT al.id AS 'album_id', al.artist_id AS 'artistId', al.name AS 'album_name', al.description AS 'album_description', al.cover AS 'album_cover', al.release_date AS 'album_release', ar.name AS 'artist_name', ar.photo AS 'artist_photo' FROM albums al INNER JOIN artists ar ON al.artist_id = ar.id WHERE ar.id = :artistId");
        $query->execute(array('artistId' => $artistId));
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    static function getAllAlbums() {
        $db = Db::dbConnect();
        $query = $db->prepare("SELECT al.id AS 'album_id', al.name AS 'album_name', al.description AS 'album_description', al.cover AS 'album_cover', ar.name AS 'artist_name' FROM albums al INNER JOIN artists ar ON al.artist_id = ar.id");
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    static function getAlbumsByGenre($genreId) {
        $db = Db::dbConnect();
        $query = $db->prepare('SELECT al.id AS "album_id", al.cover_small as "album_cover", al.description as "album_description", al.name as "album_name", al.release_date as "album_release", g.name as "genre", ar.name as "artist_name" FROM albums al INNER JOIN genres_albums gl ON gl.album_id = al.id INNER JOIN genres g ON g.id = gl.genre_id INNER JOIN artists ar ON ar.id = al.artist_id WHERE gl.genre_id = :genreId');
        $query->execute(array('genreId' => $genreId));
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_GET['albumId'])) {
    $data = Albums::getTracks($_GET['albumId']);
} elseif (isset($_GET['artistId'])) {
    $data = Albums::getAlbums($_GET['artistId']);
} elseif (isset($_GET['allAlbum'])) {
    $data = Albums::getAllAlbums();
} elseif (isset($_GET['genreId'])) {
    $data = Albums::getAlbumsByGenre($_GET['genreId']);
}

echo $data;