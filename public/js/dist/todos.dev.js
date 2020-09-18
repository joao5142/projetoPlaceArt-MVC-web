"use strict";

//  onclick="$('.register').hide();$('.login').fadeIn(2000);
$(document).ready(function () {
  //o container de escolha do wallpaper começa fechado
  $("#containerEscolhaImagem").hide(); //////////////////////pagina de perfil ///////////////////////////
  //wallpaper do perfil escolher padrao

  $("#adicionarSelecionada").on('click', function (e) {
    colocarWallpaperSelecionado();
  });

  function colocarWallpaperSelecionado() {
    var img = $("div.wallpaperSelecionado").parent().find('img')[0];
    var src = img.src;
    console.log(src);

    if (src.indexOf('5.png') != -1 || src.indexOf('6.png') != -1) {
      $("#wallpaper").css({
        'background-image': 'url(' + src + ')',
        'background-position': 'center',
        'background-size': 'contain'
      });
    } else {
      $("#wallpaper").css({
        'background-image': 'url(' + src + ')'
      });
    }

    $("#containerEscolhaImagem").hide();
    $('div.wallpaperSelecionado').removeClass('wallpaperSelecionado').addClass('divSelecionada');
    $("#adicionarSelecionada").css({
      'display': 'none'
    });
    $.ajax({//função para upload do wallpapper para o banco
    });
  } //wallpaper do perfil 


  $("#uploadWallpaper").change(function (e) {
    carregarWallpaperPerfil(e.target);
  });

  function carregarWallpaperPerfil(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var file = input.files[0];
        $("#wallpaper").css({
          'background-image': 'url(' + e.target.result + ')',
          'background-size': 'contain',
          'background-position': 'center'
        });
        $("#containerEscolhaImagem").hide();
      };

      reader.readAsDataURL(input.files[0]);
    }
  } // MDB Lightbox Init galeria do upload de imagem;


  $("#imgWallpaperPreview").on("click", function (e) {
    e.stopPropagation();
  });
  $('figure').on('click', function (e) {
    $("#adicionarSelecionada").css({
      'display': 'block'
    });

    if ($('div.wallpaperSelecionado').length != 0) {
      console.log($('div.wallpaperSelecionado'));
      $('div.wallpaperSelecionado').removeClass('wallpaperSelecionado').addClass('divSelecionada');
    }

    e.preventDefault(); // append('<div class="wallpaperSelecionado"></div>')

    $(this).find('div.divSelecionada').removeClass('divSelecionada').addClass('wallpaperSelecionado');
    var source = $(e.target).find('img').prevObject[0].src;
    $("#imgWallpaperPreview").attr('src', source);
    $("#visualizarImagem").fadeIn();
    $('html, body').css({
      overflow: 'hidden',
      height: '100%'
    });
    $("#adicionarSelecionada").css({
      'display': 'none'
    });
  }); // galeria do perfil

  $(function () {
    var selectedClass = "";
    $(".filter").click(function () {
      selectedClass = $(this).attr("data-rel");
      $("#gallery").fadeTo(100, 0.1);
      $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
      setTimeout(function () {
        $("." + selectedClass).fadeIn().addClass('animation');
        $("#gallery").fadeTo(300, 1);
      }, 300);
    });
  }); ///////////PAGINA DE LOGIN E REGISTRO/////////////

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
  }); ////////////////////////PAGINA TIMELINE///////////////////////////////
  //foto de perfil

  function updateProfilePic(input) {
    if (input.files && input.files[0]) {
      //colocando a imagem escolhida no perfil
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#userImg").attr('src', e.target.result); //chamada ajax para apresentar a imagem no servidor

        var formData = new FormData($("#uploadPic")[0]);
        $.ajax({
          type: 'post',
          url: '/miniframework/public/uploadpic',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          error: function error(_error2) {
            Swal.fire({
              title: 'Imagem Nao Alterada',
              text: _error2.statusText,
              icon: 'error',
              confirmButtonText: 'ok'
            });
          },
          success: function success(data) {
            console.log(data);
          }
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function (e) {
    updateProfilePic(e.target);
  });
  $("#fecharArquivoUpload").hide();
  $("#fecharArquivoUpload").on("click", function () {
    $("#fecharArquivoUpload").hide();
    $('#arquivoUpload').html('');
    $('#arquivoPostagemUpload').val('');
  }); //quando o formulario de postagem for submetido

  $("#formularioPostagem").on("submit", function (e) {
    e.preventDefault();
    var dados = $(e.target).serialize();
    console.log(dados);
    var input = $(e.target).find('input[type=file]')[0];
    console.log(input.files);
    formData = new FormData($(e.target)[0]);
    $.ajax({
      type: 'post',
      url: '/miniframework/public/criarpostagem',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      error: function error(_error3) {
        Swal.fire({
          title: 'Imagem Nao Alterada',
          text: _error3.statusText,
          icon: 'error',
          confirmButtonText: 'ok'
        });
      },
      success: function success(data) {
        console.log(data);
      }
    });
  }); //////////////////PAGINA QUEM SEGUIR///////////////////////
  //formulario de pesquisa  /pagina quemseguir

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
      error: function error(_error4) {
        console.log(_error4.responseText);
      }
    });
  });
}); ///////////////////////pagina perfil/////////////////////////
//fechar o previewde wallpaperperfil

function fecharPreviewImagem() {
  $("#visualizarImagem").fadeOut();
  $('html, body').css({
    overflow: 'auto',
    height: 'auto'
  });
} //////////////////CARREGAR VIDEOS E IMAGENS DA TIMELINE///////////////////////////
//carregar image, preview on timeline


function isImage(input) {
  var imagemSN = true;
  var img = input.value.split(".");
  var ext = "." + img.pop();

  if (!ext.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
    imagemSN = false;
  }

  return imagemSN;
}

function carregarArquivos(input) {
  if (!isImage(input)) {
    console.log('entrou em video');
    var file = input.files[0];
    var blobURL = URL.createObjectURL(file);
    $("#arquivoUpload").html('<video autoplay  class="img-fluid" width="70%" height="70%"> <source src="' + blobURL + '"> </video>');
    $("#fecharArquivoUpload").show();
  } else {
    console.log('entrou em imagem');

    if (input.files && input.files[0]) {
      $('#arquivoUpload').html('<img id="imageUploadPostagem" class="img-fluid"  width="70%" height="70%">');
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#imageUploadPostagem").attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
      $("#fecharArquivoUpload").show();
    }
  }
} //video controles


function videoplay(nomeElemento, nomeTagI) {
  console.log('estamos em video play : ' + nomeElemento);
  var video = document.getElementById(nomeElemento);

  if (video.paused) {
    video.play();
    $("#" + nomeTagI).removeClass("fas fa-play fa-2x");
    $("#" + nomeTagI).addClass("fas fa-pause fa-2x");
  } else {
    video.pause();
    $("#" + nomeTagI).removeClass("fas fa-pause fa-2x");
    $("#" + nomeTagI).addClass("fas fa-play fa-2x");
  }
}

function restart(nomeElemento) {
  var video = document.getElementById(nomeElemento);
  video.currentTime = 0;
}

function skip(value) {
  var video = document.getElementById("video");
  video.currentTime += value;
}

function volume(nomeElemento, nomeTagI) {
  var video = document.getElementById(nomeElemento);

  if (video.muted) {
    video.muted = false;
    $("#" + nomeTagI).removeClass("fas fa-volume-mute fa-lg");
    $("#" + nomeTagI).addClass("fas fa-volume-up fa-lg");
  } else {
    video.muted = true;
    $("#" + nomeTagI).removeClass("fas fa-volume-up fa-lg");
    $("#" + nomeTagI).addClass("fas fa-volume-mute fa-lg");
  }
} ////////////////PAGINA TIMELINE/////////////////////
//comentarios likes e compartilhar


var i = 0;

function curtir(tagI) {
  if (i == 0) {
    $('#' + tagI).css({
      color: 'red'
    });
    i++;
  } else {
    $('#' + tagI).css({
      color: 'black'
    });
    i = 0;
  }
}