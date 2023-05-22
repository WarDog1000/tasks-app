<?php
  // Incluye la coneccion a la base de datos
  include('database.php');

  // Si existe  del metodo post una propriedad 'id'
  if(isset($_POST['id'])) {

    // Guarda en una var 'id' el 'id' que recibe por el metodo post
    $id = $_POST['id'];
  
    // Consulta a la base de datos
    $query = "DELETE FROM tasks WHERE id = $id";

    // Ejecuta la consulta y la guarda en un var 'result
    $result = mysqli_query($connection, $query);

    // Si result no tiene nungun resultado
    if(!$result) {
      die('Query failed!');
    };
    // De lo contrario devuelve el resultado
    echo 'Task deleted succesfully!';
  };

?>