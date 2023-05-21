<?php

  // Incluye la coneccion a la base de datos
  include('database.php');

  // Comprueba que este recibiendo una propriedad 'name' desde el metodo POST
  if(isset($_POST['name'])) {
    // echo $_POST['name'];

    // Guarda en 'name' y 'description' los valores que vengan del metodo POST
    $name = $_POST['name'];
    $description = $_POST['description'];

    // Consulta a la base de datos
    $query = "INSERT INTO tasks (name, description) VALUES ('$name', '$description')";

    // Ejecucion de la consulta de la base de datos
    $result = mysqli_query($connection, $query);

    // Si algo ah ido mal y no se pudo hacer la consulta a la base de datos
    if(!$result) {
      die('Query Failed!');
    }
    // De lo contrario, la consulta a la db se realizo exitosamente, envia:
    echo 'task added successfully';
  }
?>