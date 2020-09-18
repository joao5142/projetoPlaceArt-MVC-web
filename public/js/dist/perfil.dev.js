"use strict";

$(document).ready(function () {
  //////////////////////pagina de perfil ///////////////////////////
  //o container de escolha do wallpaper começa fechado
  $("#containerEscolhaImagem").hide(); //wallpaper do perfil -escolher padrao

  $("#adicionarSelecionada").on('click', function (e) {
    colocarWallpaperSelecionado();
  });

  function colocarWallpaperSelecionado() {
    var img = $("div.wallpaperSelecionado").parent().find('img')[0];
    var src = img.src;
    console.log(src);

    if (src.indexOf('5.png') != -1 || src.indexOf('6.png') != -1 || src.indexOf('2.png') != -1) {
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

    $("#containerEscolhaImagem").hide(); //esconde o container escolhaImagem

    $('div.wallpaperSelecionado').removeClass('wallpaperSelecionado').addClass('divSelecionada');
    $("#adicionarSelecionada").css({
      //legenda de adicionar selecionada é oculta
      'display': 'none'
    });
    $.ajax({
      type: 'post',
      url: '/miniframework/public/atualizarWallpaperPerfil',
      success: function success(data) {
        console.log(data);
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
      'display': 'block'
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
  });
});

function fecharPreviewImagem() {
  $("#visualizarImagem").fadeOut();
  $('html, body').css({
    overflow: 'auto',
    height: 'auto'
  });
}