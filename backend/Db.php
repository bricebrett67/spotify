<?php

class Db {
    protected static function dbConnect() {
        $db = new PDO('mysql:host=localhost;dbname=spotify;charset=utf8', 'brice.brettinger', 'Jumeaux67070815');
        return $db;
    }
}