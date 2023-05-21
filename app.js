$(document).ready(function() {
  // console.log('Jquery is Working')
  fetchTasks()

  // FUNCION PARA BUSCAR TAREAS
  // Oculta el campo de resultados de busqueda
  $('#tasks-result').hide()
  $('#search').keyup(function(e) {
    // Valida no recibir un valor vacio del input
    if($('#search').val()) {
      let search = $(this).val()
      // Metodo AJAX de Jquery para hacer peticiones
      $.ajax({
        url: 'search.php',
        type: 'POST',
        // data: {search: search},
        data: {search},
        success: function(response) {
          // console.log(response)
          // Guarda en una variable llamada task el string que viene en la respuesta y lo convierte a JSON
          let task = JSON.parse(response)
          // console.log(task)
          let template = ''
          task.forEach(el => {
            // console.log(task)
            // Crea un elemento de lista, (con el nombre de la tarea) por cada recorrido
            template += `<li>
            ${el.name}
            </li>`
          })
          // Selecciona el elemento html e inserta las <li> elements
          $('#container').html(template)
          // Muestra el campo de resultados de busqueda
          $('#tasks-result').show()
        }    
      })
    }
  })

  // FUNCION PARA AGREGAR TAREAS
  $('#tasks-form').submit(function(e) {
    e.preventDefault()
    // console.log('submiting')
    const postData = {
      // captura y guarda en una estructura los valores que vienen de los input
      name: $('#name').val(),
      description: $('#description').val()
    }
    // console.log(postData)
    // Utiliza el metodo POST de Jquery para enviar el elemento postData a add.php
    $.post('add.php', postData, function(response) {
      // console.log(response)
      // Resetea el element fom
      $('#tasks-form').trigger('reset')
      // Ejecuta el metodo para mostrar todas las tareas
      fetchTasks()
    })
  })

  // FUNCION PARA MOSTRAR TAREAS
  function fetchTasks() {
    $.ajax({
      url: 'show.php',
      type: 'GET',
      success: function (response) {
        // console.log(response)
        let tasks = JSON.parse(response)
        let template = ''
        tasks.forEach(task => {
          template += `<tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>
              <button class="btn btn-danger">Delete</Button>
            </td>
          </tr>`
        })
        $('#tasks').html(template)
      }
    })
  }
})