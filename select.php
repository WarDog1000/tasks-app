<?php

// Importa la coneccion a la base de datos
  include('connection/database.php');

  // Se guarda en una var 'id' el id que recibe desde el metodo post
  $id = $_POST['id'];

  // Guarda una consulta a la base de datos
  $query = "SELECT * FROM tasks WHERE id = $id";

  //Ejecuta el query
  $result = mysqli_query($connection, $query);

  if(!$result) {
    die('Query failed!');
  };

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    // Convierte el dato de la tabla en un .json
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'id' => $row['id']
    );
  };
  $jsonString = json_encode($json[0]);

  echo $jsonString;

?>