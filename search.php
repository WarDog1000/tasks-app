<?php
// Abre la coneccion con la base de datos
  include('database.php');

  // Recibe el metodo POST con el valor de search y lo guarda en una variable del mismo nombre
  $search = $_POST['search'];

  if(!empty($search)) {
    // Consulta a la base de datos
    $query = "SELECT * FROM tasks WHERE name LIKE '$search%'";
    // Garda en resultado, la consulta y la coneccion con la base de datos
    $result = mysqli_query($connection, $query);
    // Si no obtengo ningun resultado
    if(!$result) {
      // Termina el proceso
      die('Query error '.mysqli_error($connection));
    };

    $json = array();
    // Utiliza un bucle while para iterar sobre los resultados de una consulta realizada a una base de datos utilizando la extensión MySQLi.
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description']
      );
    };

    // Convierte el array json en un formato json
    $jsonString = json_encode($json);

    // Devuelve jsonString
    echo $jsonString;
  }
?>