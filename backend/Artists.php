<?php

require_once('Db.php');

class Artists extends Db {

    static function getArtists() {
        $db = Db::dbConnect();
        $query = $db->prepare('SELECT id AS "artist_id", name AS "artist_name", description AS "artist_description", bio AS "artist_bio", photo AS "artist_photo" FROM artists ORDER BY name ASC');
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    // static function 
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = Artists::getArtists();

echo $data;