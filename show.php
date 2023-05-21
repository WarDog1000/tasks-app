<?php
  // Incluye la coneccion a la base de datos
  include('database.php');

  // Crea una consulta
  $query = "SELECT * FROM tasks";

  // Ejecuta la consulta
  $result = mysqli_query($connection, $query);

  // Si no hay un resultado, termina el proceso
  if(!$result) {
    die("Query Failed".mysqli_error($connection));
  };
  // Caso contrario...
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'id' => $row['id']
    );
  };
  $jsonString = json_encode($json);
  echo $jsonString;
?>