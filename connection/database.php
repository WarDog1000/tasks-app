<?php
// guarda en la variable coneccion lo que vanga de la coneccion con mysql
$connection = mysqli_connect(
  'localhost',
  'root',
  '',
  'tasks-app'
);

// comprueba que existe lam coneccion con la base de datos
if($connection) {
  // echo 'Database is connected successfully';
};

?>