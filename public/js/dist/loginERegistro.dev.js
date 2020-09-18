"use strict";

///////////PAGINA DE LOGIN E REGISTRO/////////////
$(document).ready(function () {
  $('#inscreverse').hide();
  $("#formRegistro").on('submit', function (e) {
    e.preventDefault();
    var dados = $(e.target).serialize();
    $.ajax({
      type: 'post',
      url: '/miniframework/public/registrar',
      data: dados,
      success: function success(data) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cadastro feito com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
        $(".register").hide();
        $(".login").fadeIn(2000);
      },
      error: function error(_error) {
        Swal.fire({
          title: 'Opps!',
          text: _error.statusText,
          icon: 'error',
          html: _error.statusText
        });
      }
    });
  });
});