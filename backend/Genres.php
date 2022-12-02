<?php

require_once('Db.php');

class Genres extends Db {

    static function getGenres() {
        $db = Db::dbConnect();
        $query = $db->prepare('SELECT id AS "genre_id", name AS "genre_name" FROM genres');
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = Genres::getGenres();

echo $data;