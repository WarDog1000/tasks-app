$(function() {
  // console.log('Jquery is Working')
  $('#search').keyup(function(e) {
    let search = $(this).val()
    // Metodo AJAX de Jquery para hacer peticiones
    $.ajax({
      url: 'search.php',
      type: 'POST',
      data: {search: search},
      // data: {search},
      success: function(response) {
        console.log(response)
      }      
    })
  })
})