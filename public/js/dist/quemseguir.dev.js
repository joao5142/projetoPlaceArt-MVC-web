"use strict";

$(document).ready(function () {
  var offset = 0;
  $("#pesquisarPor,#pesquisarPorTimeline").keyup(function (e) {
    console.log('esntrou no ajax');
    var dados = $(e.target).closest('form').serialize();
    var attr = e.target.getAttribute('id');
    console.log("Nome id : " + attr);

    if (attr == "pesquisarPorTimeline") {
      $("#pesquisaLateral").css({
        'display': 'block'
      });
    }

    if ($("#formPesquisarPor").val() == "" || $("#pesquisarPorTimeline").val() == "") {
      $(".serchContainerMenu").remove();
      ;

      if (attr == "pesquisarPorTimeline") {
        $("#pesquisaLateral").hide();
      }
    }

    $.ajax({
      type: 'post',
      url: '/miniframework/public/pesquisarpor',
      data: dados,
      dataType: 'json',
      success: function success(data) {
        console.log(data); //coloco os usuarios achados na div

        for (var i = 0; i <= 3; i++) {
          var conteudo = "\n\t\t\t\t\t\t\t\t\t<div class=\"row serchContainerMenu mb-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + (attr == "pesquisarPorTimeline" ? 'col' : 'col-md-8') + " searchContainer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"../public/img/user/" + data[i].picture + "\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>" + data[i].name + "</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"col-md-4 d-flex justify-content-end\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t";
          $("#containerPesquisa,#containerPesquisaLateral").prepend(conteudo);
        }
      },
      error: function error(_error) {
        console.log(_error.responseText);
      }
    });
  });
});