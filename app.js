$(document).ready(function() {
  // console.log('Jquery is Working')
  fetchTasks()
  let edit = false

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
      description: $('#description').val(),
      id:$('#task-id').val()
    }
    // console.log(postData)

    let url = edit === false ? 'add.php' : 'update.php'

    // Utiliza el metodo POST de Jquery para enviar el elemento postData a la url dependiendo si lo agrega o actualiza
    $.post(url, postData, function(response) {
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
          template += `<tr task-id=${task.id}>
            <td>${task.id}</td>
            <td>
              <a href="#" class="task-item">${task.name}</a>
            </td>
            <td>${task.description}</td>
            <td>
              <button class="task-delete btn btn-danger">Delete</Button>
            </td>
          </tr>`
        })
        $('#tasks').html(template)
      }
    })
  }

  // escucha el evento 'click' para los elementos button class 'task-delete
  $(document).on('click', '.task-delete', function(e) {
    if(confirm('Are you sure you want to delete it?')) {
      // console.log('Task deleted')
      // console.log($(this))
      // Obtiene el elemento padre del elemento padre
      let element = $(this)[0].parentElement.parentElement
      // console.log(element)
      // Busca en element el elemento con el atributo 'task-id' para obtener el id
      let id = $(element).attr('task-id')
      // console.log(id)
      // Ejecuta el metodo post de Jquery para enviar el ide al modulo delete.php
      $.post('delete.php', {id}, function(response) {
        // console.log(response)
        fetchTasks()
      })
    }
  })
  
  // escucha el evento 'click' para los elementos <a> class 'task-item'
  $(document).on('click', '.task-item', function(e) {
    e.preventDefault()
    // console.log('Click task item')
    // Obtiene el elemento padre del elemento padre
    let element = $(this)[0].parentElement.parentElement
    // let id = element.getAttribute('task-id')
    // Busca en element el elemento con el atributo 'task-id' para obtener el id
    let id = $(element).attr('task-id')
    // console.log(id)

    // Envia el 'id' al modulo edit.php en el servidor
    $.post('select.php', {id}, function(response) {
      // console.log(response)
      const task = JSON.parse(response)
      $('#name').val(task.name)
      $('#description').val(task.description)
      $('#task-id').val(task.id)
      edit = true
    })
  })
})