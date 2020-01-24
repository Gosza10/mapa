<?php
require_once "connect.php";
//utworzenie połączenia z bazą danych PostgreSQL
$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
or die("Nie mogę nawiązać połączenia");
//utworzenie krótkiej nazwy zmiennej pobranej ze strony html
$q = $_REQUEST["term"];
//definicja zapytania do bazy danych
$query="select nazwa from grodziska.grodziska_84 where nazwa like initcap('".$q."%') order by nazwa";
//wykonanie zapytania do bazy danych
$result = pg_query($dbconn, $query);
//utworzenie łańcucha zawierającego zwrócony wynik
$result = pg_query($dbconn, $query);
while($row = pg_fetch_array($result)){
	$data[] = $row['nazwa'];
}
echo json_encode($data);
?>