<?php
require_once "connect.php";
//utworzenie połączenia z bazą danych PostgreSQL
$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
or die("Nie mogę nawiązać połączenia");
//utworzenie krótkiej nazwy zmiennej pobranej ze strony html
//definicja zapytania do bazy danych
$q = $_REQUEST<?php
require_once "connect.php";
//utworzenie połączenia z bazą danych PostgreSQL
$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
or die("Nie mogę nawiązać połączenia");
//utworzenie krótkiej nazwy zmiennej pobranej ze strony html
//definicja zapytania do bazy danych
$q = $_REQUEST["term"];
$query="select distinct typ from blok_2.drogi_gmina where typ like '".$q."%'";
//wykonanie zapytania do bazy danych
$result = pg_query($dbconn, $query);
//utworzenie łańcucha zawierającego zwrócony wynik
while($row = pg_fetch_array($result)){
$data[] = $row['typ'];
}
//wyświetlenie tablicy
echo json_encode($data);
?>["term"];
$query="select distinct typ from blok_2.drogi_gmina where typ like '".$q."%'";
//wykonanie zapytania do bazy danych
$result = pg_query($dbconn, $query);
//utworzenie łańcucha zawierającego zwrócony wynik
while($row = pg_fetch_array($result)){
$data[] = $row['typ'];
}
//wyświetlenie tablicy
echo json_encode($data);
?>