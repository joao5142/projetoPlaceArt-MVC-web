$(document).ready(() => {
     
    
    //////////////////////pagina de perfil ///////////////////////////
    
      //quando  pressionar enter no comentar comentario
      $(document).on('keyup','.textSeuComentarComentario',(e)=>{
        // console.log($(e.target).parent()[0]);
        console.log('entrou em textSeuComentarComentario '+e.keyCode);
        
          if(e.keyCode=='13'){
              var valor=$(e.target).val();
              console.log('texto : '+valor);
              var formdata=new FormData($(e.target).closest('form')[0]);

              
              
              $.ajax({
                  url:'/miniframework/public/salvarcomentarComentario',
                  type:'post',
                  data:formdata,
                  cache: false,
                  contentType: false,
                  processData: false,
                  dataType:'json',
                  success:data=>{
                      console.log(data);
                    
                      var containerComentario= $(e.target).closest('#containerComentarComentarios');

                      //limpa o preview
                      $(e.target).closest('form').find('div.containerArquivoSeuComentario').html('');
                      $(e.target).closest('form').find('.containerArquivoSeuComentario').css({
                          'display':'none'
                      });


                       

                        //limpa o input
                        $(e.target).val('');

                        
                        var position= $(e.target).closest('#containerComentarComentarios').offset().top- 100;
                        $('html,body').animate({
                              scrollTop:position
                          }, 2000);

                          

                       



                  },
                  error:error=>{
                        console.log(error);

                  },
                  complete:function(){
                      
                    seuComentarComentarioAjax(e.target);
                 
                  }

              });


              

             
                
         }
   });

       //comentarios com o usuario pressionar enter

       $(document).on('keyup','.textSeuComentario',(e)=>{
            // console.log($(e.target).parent()[0]);
            console.log('entrou em testeSeuComentario: '+e.keyCode);
            
              if(e.keyCode=='13'){
                  var valor=$(e.target).val();
                  console.log('texto : '+valor);
                  var formdata=new FormData($(e.target).closest('form')[0]);

                  
                  
                  $.ajax({
                      url:'/miniframework/public/salvarcomentario',
                      type:'post',
                      data:formdata,
                      cache: false,
                      contentType: false,
                      processData: false,
                      dataType:'json',
                      success:data=>{
                          console.log(data);
                        
                          var containerComentario= $(e.target).closest('#containerComentarios');

                          $(e.target).closest('form').find('div.containerArquivoSeuComentario').html('');
                          $(e.target).closest('form').find('.containerArquivoSeuComentario').css({
                              'display':'none'
                          });
    

                           

                            
                            $(e.target).val('');

                            
                            var position= $(e.target).closest('#containerComentarios').offset().top- 100;
                            $('html,body').animate({
                                  scrollTop:position
                              }, 2000);

                             // carregarComentariosPostagemAjax();
 
                           
 


                      },
                      error:error=>{
                            console.log(error);

                      },
                      complete:function(){
                          
                        carregarSeuComentarioAjax(e.target);
                     
                      }

                  });


                  

                 
                    
             }
       });


    //o container de escolha do wallpaper começa fechado
 

    //wallpaper do perfil -escolher padrao
    $("#adicionarSelecionada").on('click', e => {
        colocarWallpaperSelecionado();
    });

    function pegarNomeImagem(src){
        if(src.indexOf('1.png') != -1){
              return '1.png';
        }else if(src.indexOf('2.png') != -1){
            return '2.png';
        }else if(src.indexOf('3.png') != -1){
            return '3.png';
        }else if(src.indexOf('4.png') != -1){
            return '4.png';
        }else if(src.indexOf('5.png') != -1){
            return '5.png';
        }else if(src.indexOf('6.png') != -1){
            return '6.png';
        }
        return '';
    }

    function colocarWallpaperSelecionado() {
        var img = $("div.wallpaperSelecionado").parent().find('img')[0];
        var src = img.src;

        console.log(img);
        console.log(src);
        var source= pegarNomeImagem(src);

        if ((src.indexOf('5.png') != -1) || (src.indexOf('6.png') != -1)||(src.indexOf('2.png') != -1)) {
            $("#wallpaper").css({
                'background-image': 'url(' + src + ')',
                'background-position': 'center',
                'background-size': 'contain'
            });
        } else {
            $("#wallpaper").css({
                'background-image': 'url(' + src + ')',
            });
        }
        $("#containerEscolhaImagem").hide(); //esconde o container escolhaImagem
        $('div.wallpaperSelecionado').removeClass('wallpaperSelecionado').addClass('divSelecionada');

        $("#adicionarSelecionada").css({ //legenda de adicionar selecionada é oculta
            'display': 'none',
        });

        $.ajax({
            type:'post',
            url:'/miniframework/public/atualizarWallpaperPerfil',
            data:'nomeImagem='+source,
            success:data=>{
                 console.log(data);
            },
            error:error=>{
                Swal.fire({
                    title: 'Opps!',
                    text: error.statusText,
                    icon: 'error',
                    html: error.statusText,
                });
            },
        });
    }

    //wallpaper do perfil 
    $("#uploadWallpaper").change((e) => {
        carregarWallpaperPerfil(e.target);
    });

    function carregarWallpaperPerfil(input) {
        if (input.files && input.files[0]) {
            var form=$(input).closest('form')[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                var file = input.files[0];

                var formData = new FormData(form);
                $("#wallpaper").css({
                    'background-image': 'url(' + e.target.result + ')',


                });

                $("#containerEscolhaImagem").hide();

                updateWallpaperPerfilUpload(formData); //função para salvar no banco

            }
            


            reader.readAsDataURL(input.files[0]);

        }
    }
    function updateWallpaperPerfilUpload(formData){
        $.ajax({
            type:'post',
            url:'/miniframework/public/atualizarWallpaperPerfil',
            data:formData,
            cache: false,
            contentType: false,
            processData: false,
            success:data=>{
                 console.log(data);
            },
            error:error=>{
                Swal.fire({
                    title: 'Opps!',
                    text: error.statusText,
                    icon: 'error',
                    html: error.statusText,
                });
            },
        });
    }


    // MDB Lightbox Init galeria do upload de imagem;
    $("#imgWallpaperPreview").on("click", function (e) {
        e.stopPropagation();
    });

    $('figure').on('click', function (e) {
        $("#adicionarSelecionada").css({
            'display': 'block',
        })

        if ($('div.wallpaperSelecionado').length != 0) {
            console.log($('div.wallpaperSelecionado'));
            $('div.wallpaperSelecionado').removeClass('wallpaperSelecionado').addClass('divSelecionada');

        }


        e.preventDefault();
        // append('<div class="wallpaperSelecionado"></div>')
        $(this).find('div.divSelecionada').removeClass('divSelecionada').addClass('wallpaperSelecionado');
        var source = $(e.target).find('img').prevObject[0].src;

        $("#imgWallpaperPreview").attr('src', source);

        $("#visualizarImagem").fadeIn();

        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });

        $("#adicionarSelecionada").css({
            'display': 'block',
        });



    });

    // galeria do perfil
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


    

    //função para carregar o as postagen de perfil
 /*
    $("#e").scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
					// ajax call get data from server and append to the div
					$.ajax({
						type: "post",
						url: "/miniframework/public/getPostagensPerfil",
						data:'offset='+offset,
                        dataType:'json',
                        async:false,
						 
						success: data=> {
                        
                            console.log('chegamos em carregar postagem ajax scroll no final');
							console.log(data);
						    offset+=10;
                         
                    
                            setTimeout(function(){carregarPostagemAjax(data)},1000);
							

						 
						},
						error: error=>{
                            console.log('chegamos em error postagem ajax');

                            setTimeout(function(){
                                $("div#errorPostagens").css({
                                    'visibility': 'visible'
                                });
                        }, 6000);
                        },
                        
                        beforeSend:function(){
                            
                                $("#loadingPostagens").css({
                                    'visibility': 'visible'
                                });
                         

                        },
                        complete:function(){
                            console.log('chesgamos em complete');
                            setTimeout(function(){
                                $("#loadingPostagens").css({
                                    'visibility': 'hidden'
                                });
                            }, 5000);

                           
                        }
					});
				}
            });
            
            */


});

function mostrarUploadWallpaper(){
    $("#containerEscolhaImagem").css({
        'display':'block'
    });
}

function fecharPreviewImagem() {
    $("#visualizarImagem").fadeOut();
    $('html, body').css({
        overflow: 'auto',
        height: 'auto'
    });
}

function addPostagens(id){
    console.log('id do usuario perfil = '+id);
    $.ajax({
        type: "post",
        url: "/miniframework/public/getPostagensPerfil",
        data:'offset=0&idUsuario='+id,
        dataType:'json',
        async:false,    
        success: data=> {
            setTimeout(function(){carregarPostagemPerfilAjax(data)},1000);
         
        },
        error: error=>{
            console.log('chegamos em error postagem ajax');

                setTimeout(function(){
                    $("div#errorPostagensPerfil").css({
                        'visibility': 'visible'
                    });
            }, 6000);
        },
        
        beforeSend:function(){
            
                $("#loadingPostagensPerfil").css({
                    'visibility': 'visible'
                });
         

        },
        complete:function(){
            console.log('chesgamos em complete');
            setTimeout(function(){
                $("#loadingPostagensPerfil").css({
                    'visibility': 'hidden'
                });
            }, 5000);

           
        }
    });
}

//função para carregar Postagem
function carregarPostagemPerfilAjax(postagens){
console.log('chegamos carregarPostagemAjax');
 postagens.forEach(function(postagem, chave){
   
     var totComentarios=0;
     var totCurtidaPostagem=0;
     var usuarioCurtiu=false;

     $.ajax({

         url:'/miniframework/public/getTotComentarios',
         type:'post',
         data:"idPostagem="+postagem.postagemId,
         dataType:'json',
         async:false,
         success:data=>{
             
           totComentarios=data;

             
         },
         error:error=>{
         
         }
 }).done(data=>{
     totComentarios=data;
 });

 $.ajax({

     url:'/miniframework/public/getTotCurtidas',
     type:'post',
     data:"idPostagem="+postagem.postagemId,
     async:false,
     dataType:'json',

 
     success:data=>{
         totCurtidaPostagem=data;

         
     },
     error:error=>{
     
     }
}).done(data=>{
 totCurtidaPostagem=data;
});


$.ajax({

 url:'/miniframework/public/verificacurtida',
 type:'post',
 data:"idPostagem="+postagem.postagemId,
 async:false,
 dataType:'json',


 success:data=>{
     usuarioCurtiu=data;    
 },
 error:error=>{
 
 }
}).done(data=>{
 usuarioCurtiu=data;    
});

var uid=0;
$.ajax({
 type: 'post',
 url: '/miniframework/public/getUsuarioId',
dataType:'json',
 async:false,
 success: data => {
      console.log(data);
      
 },
 error: error => {
     console.log(error);
 }

}).done(data=>{
uid=data;
});


console.log('id da postagem : '+postagem.postagemId+', totComentarios: '+totComentarios+" totcurtidas: "+totCurtidaPostagem+" verifica curtida: "+usuarioCurtiu);
    var verMaisComentario='';

    if(totComentarios>0){
     verMaisComentario=`
     <i class="fas fa-long-arrow-alt-right"></i>
     <a onclick="carregarComentariosAjax(this)" style="cursor:pointer;" >Carregar Comentarios</a>
     `;
    }

    var adicionais='';
    if(postagem.arquivo!=''){
        if(postagem.arquivo.indexOf('.mp4')!= -1){
             adicionais=`
             <video  id="video`+postagem.arquivo.replace('.mp4','')+`" class="img-fluid">
                         <source src="../public/img/uploads/postagens/`+postagem.arquivo+`"   type="video/mp4">
             </video>


             <i id="buttonVideoPlay`+postagem.arquivo.replace('.mp4','')+`" onclick="videoplay('video`+postagem.arquivo.replace('.mp4','')+`','buttonVideoPlay`+postagem.arquivo.replace('.mp4','')+`');" class="fas fa-play fa-2x buttonVideoPlay"></i>
             <i id="buttonVideoRestart`+postagem.arquivo.replace('.mp4','')+`" onclick="restart('video`+postagem.arquivo.replace('.mp4','')+`')" class="fas fa-undo-alt fa-lg buttonVideoRestart"></i>
             <i id="buttonVideoVolume`+postagem.arquivo.replace('.mp4','')+`" onclick="volume('video`+postagem.arquivo.replace('.mp4','')+`','buttonVideoVolume`+postagem.arquivo.replace('.mp4','')+`')" class="fas fa-volume-up fa-lg buttonVideoVolume"></i>

     `;
        }else{
           adicionais=`<img   src="../public/img/uploads/postagens/`+postagem.arquivo+`" style="margin:0px auto" class="img-fluid d-flex justify-content-center"`;

        }

    }

    var adicionalDeletar='';
    if(uid==postagem.usuarioId){
      adicionalDeletar=`
      <span onclick="excluirPost(`+postagem.postagemId+`)" style="position:absolute;right:0px; cursor:pointer"><i class="fas fa-trash"></i></span>
      `;
    }

     var estiloCor= (usuarioCurtiu) ? 'color:red':'color:black';

     var postagemElement = `
     <div class="postagemContainer row">
         <div class="col">
             

              <img style="cursor:pointer" onclick="location.href='/miniframework/public/perfil?idUsuario=`+postagem.usuarioId+`'"  class="imgPostagem" src="../public/img/user/`+postagem.picture+`"/>

             <p style="display:inline;" class="nomeUsuarioPostagem"><strong onclick="location.href='/miniframework/public/perfil?idUsuario=`+postagem.usuarioId+`'" style="cursor:pointer">`+postagem.name+`</strong><small> <span class="text text-muted">- `+postagem.data+`</span></small></p>
`+adicionalDeletar+`
             <p style="margin-top:14px">`+postagem.textoPostagem+`</p>

             <!-- //Postagens VIdeo/Foto -->
             <div class="containerVideoEImagem" style="position:relative">


                  `+adicionais+`

             </div>

             <br/>

             <!-- <form class="formRemoverPostagem">
             <div class="col d-flex justify-content-end">
                 <a href="/remover?id_remover=`+postagem.postagemId+`" class="btn btn-danger"><small>Remover</small></a>
             </div>
         </form> -->

             <!-- //comentarios likes e compartilhar -->
             <div class="row">
                 <div class="col">
                     <div id="postagemOutros">
                          
                         <div style="position: relative;">
                             <span  onclick="curtir('curtirPost`+postagem.postagemId+`','`+postagem.postagemId+`','`+usuarioCurtiu+`')">Curtir <i style="`+estiloCor+`" id="curtirPost`+postagem.postagemId+`"  class="far fa-heart"></i></span>
                             <span onclick="esconderMostrarContainer('comentarPost`+postagem.postagemId+`')" id="comentarPost`+postagem.postagemId+`">Cometarios <span>`+totComentarios+`</span><i class="far fa-comment-alt"></i></span>
                             <span id="compartilharPost`+postagem.postagemId+`?>">Compartilhar <i class="fas fa-share-alt"></i></span>

                             <span style="position:absolute;right:0px; cursor:none"><span id="totCurtidas`+postagem.postagemId+`"> `+totCurtidaPostagem+`</span> <i class="far fa-heart"></i></span>

                         </div>
                     </div>
                 </div>
             </div>
             <hr/>
             <!-- comentarios da postagem -->
             <div class="postagemComentarioId" id="postagemComentariosId`+postagem.postagemId+`">
                 <div id="containerComentarios" class="hideComentarios">
                     <input class="comentarioIdPostagem" hidden type="text" value="`+postagem.postagemId+`">
                     <div id="containerComentariosInner">

                     
                     </div>
         
                     <div class="verMaisComentarios">
                        `+verMaisComentario+`
                      </div>
                     
            
                     <div class="seuComentario">
                         <form action="/salvarcomentario" method="post">
                             <div class="containerArquivoSeuComentario">
         
                             </div>
                             <input id="textSeuComentario`+postagem.postagemId+`" class="textSeuComentario" type="text" placeholder="Escreva um comentário" name="textSeuComentario">
                             <div style="display: inline; color:#777;position:absolute;right:30px;">
                                 <input name="idPostagemComentario" type="text" value="`+postagem.postagemId+`" hidden>
                                 <input onchange="carregarArquivosComentario(this,'`+postagem.postagemId+`')" name="arquivoComentarioUpload" type="file" accept="image/*,video/*" class="arquivoComentarioUpload" id="arquivoComentarioUpload`+postagem.postagemId+`" hidden />
                                 <label style="cursor: pointer;" for="arquivoComentarioUpload`+postagem.postagemId+`"><i class="fas fa-images fa-1x"></i></label>
                             </div>
                         </form>
         
                     </div>
                 </div>             
            </div> 

         </div>




     </div>`;
     $("#postagemPerfil").append(postagemElement);
    /*
   

     var containerComentarios=$(e).parent().closest('#containerComentarComentarios');


     var totComentarios=containerComentarios.find('.comentarComentario').length;
     var idComentario=containerComentarios.find('.comentarComentarioIdComentario').val();

         $.ajax({

             url:'/miniframework/public/getComentarios',
             type:'post',
             data:"data="+comentario.horaComentario,
             async:false,
         
             success:data=>{
                 console.log(data);
                 dataStr=data;

                 
             },
             error:error=>{
             
             }
     }).done(data=>{
         dataStr=data;
     });
  */
  });




}

 


//adicionais


 //video controles
 function videoplay(nomeElemento, nomeTagI) {
    console.log('estamos em video play : ' + nomeElemento+' nome da tag i : '+nomeTagI);

    var video = document.getElementById(nomeElemento);


    console.log($("#" + nomeTagI));
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
}

////////////////PAGINA TIMELINE/////////////////////
//comentarios likes e compartilhar

function curtir(tagI,idPostagem,idUsuario) {
    console.log('tagI: '+tagI+" id da postagem: "+idPostagem);

  //requisição ajax apara pegar  se o usuarioCurtiu
 var curtiu=0;
    $.ajax({
     type:'post',
     url:'/miniframework/public/verificacurtida',
     data:'idPostagem='+idPostagem+'&idUsuario='+idUsuario,
     dataType:'json',
     success:data=>{
          console.log(data);
          
         
     },

 }).done(data=>{
     curtirEDescutir(tagI,idPostagem,data);
 });

   


}


function curtirEDescutir(tagI,idPostagem,curtiu){
 console.log('nome da tag i é ='+tagI+' id da postagem='+idPostagem+'curtiu='+curtir);

 if (!curtiu) { //se ele nao curtiu
     console.log('entrou em curtir');
     $('#' + tagI).css({
         color: 'red'
     })

     $.ajax({
       type:'post',
       url:'/miniframework/public/curtir',
       data:'idPostagem='+idPostagem,
       dataType:'json',
       success:data=>{
           console.log('o total de curtidas é '+data);
          

          console.log(data);

       },
       error:error=>{
          Swal.fire({
              title: 'nao foi possivel curtir a postagem',
              text: error.statusText,
              icon: 'error',
              confirmButtonText: 'ok'
          });
         
       }
     }).done(data=>{
         $("#totCurtidas"+idPostagem).html(data);
     });



  } else {
      console.log('entrou em descurtir');
     $('#' + tagI).css({
         color: 'black'
     })


     $.ajax({
      type:'post',
      url:'/miniframework/public/descurtir',
      data:'idPostagem='+idPostagem,
      dataType:'json',
      success:data=>{
     
          console.log(data);

      },
      error:error=>{
         Swal.fire({
             title: 'nao foi possivel curtir a postagem',
             text: error.statusText,
             icon: 'error',
             confirmButtonText: 'ok'
         });
        
      }
    }).done(data=>{
         $("#totCurtidas"+idPostagem).html(data);
    });
 }
}



 //função para mostrar o container ou esconder
 function esconderMostrarContainer(elemento){

    var  div= $("#"+elemento).closest('div.row').siblings('.postagemComentarioId').find('div#containerComentarios');
    console.log(div);
    console.log(div[0].classList[0]);

    if(div[0].classList[0]=='hideComentarios'){
        console.log('entrou em mostrar container');

        div.removeClass('hideComentarios');
        div.addClass('showComentarios');
    }else if(div[0].classList[0]='showComentarios'){
        console.log('entrou em escondercontainer');
        div.removeClass('showComentarios');
        div.addClass('hideComentarios');
    }

   }


 //esconder comentarios 
 function esconderComentariosAjax(e){
    var containerComentario=$(e).parent().closest('#containerComentarios');
   
    containerComentario.find(".comentariosPostagem").remove();

    containerComentario.find('.verMaisComentarios').html(`
    <i class="fas fa-long-arrow-alt-right"></i>
    <a onclick="carregarComentariosAjax(this)" style="cursor:pointer;" >Carregar Comentarios</a>              
    `);
    

    ('html,body').animate({
       scrollTop: $(containerComentario).offset().top
      }, 500);
 }
   //funçoes para carregar comentarios
    
   function carregarComentariosAjax(e){
    var totComentarios=totComentarios= $(e).parent().closest('#containerComentarios').find('.comentariosPostagem').length;
     
    var idPostagem=$(e).parent().closest('#containerComentarios').find('.comentarioIdPostagem').val();

                  
    console.log('existe '+totComentarios+'com a classe .comentariosPostagem,o id da postagem é : '+idPostagem);

    var containerC=$(e).parent().closest('#containerComentarios').find("#containerComentariosInner");
    $.ajax({
      url:'/miniframework/public/getComentarios',
      type:'post',
      data:"idPostagem="+idPostagem+"&totComentarios="+totComentarios,
      dataType:'json',
      success:data=>{
          console.log(data);
        carregarComentariosPostagemAjax(data,idPostagem,containerC);
        
        if(data.length==0){
            console.log("Vamos esconder os comentarios");
            $(e).parent().html(`
            <i class="fas fa-long-arrow-alt-left"></i>
            <a onclick="esconderComentariosAjax(this)" style="cursor:pointer" class="esconderComentarComentarios">Esconder Comentarios</a>`);
        }
          
      },
      error:error=>{
        console.log(error);

      }
  });
   
}
   
   //funcao para carregar via ajax os comentarios;
    
   function carregarComentariosPostagemAjax(comentariosList,idPostagem,containerComentarios){
   comentariosList.forEach(function(comentario, chave){
       console.log('estamos em carregarCOmentariosPostagemAjax');
        var dataStr= '';
        var totComentarComentarios=0;
       //transforma a date em anos dias mes
       $.ajax({

                url:'/miniframework/public/getDataString',
                type:'post',
                data:"data="+comentario.horaComentario,
                async:false,
            
                success:data=>{
                    console.log(data);
                     dataStr=data;

                    
                },
                error:error=>{
                
                }
        }).done(data=>{
            dataStr=data;
        });

        $.ajax({

            url:'/miniframework/public/getTotComentarComentarios',
            type:'post',
            data:"idComentario="+comentario.idComentario,
            dataType:'json',
            async:false,
        
            success:data=>{
                console.log('o total de do comentar comentarios é '+data);
                totComentarComentarios=data;

                
            },
            error:error=>{
            
            }
    }).done(data=>{
        totComentarComentarios=data;
    });


     
    
       console.log("dataStr="+dataStr);

       var adicionais='';
       if(comentario.arquivoComentario!=''){
           if(comentario.arquivoComentario.indexOf('.mp4')!= -1){
                adicionais=`
                <video  width="50%" height="50%" id="videoComentario`+comentario.arquivoComentario.replace('.mp4','')+`" style=""   class="img-fluid">
                      <source src="../public/img/uploads/comentarios/`+comentario.arquivoComentario+`"   type="video/mp4">
                </video>

                <i id="buttonVideoPlayComentario`+comentario.arquivoComentario.replace('.mp4','')+`" onclick="videoplay('videoComentario`+comentario.arquivoComentario.replace('.mp4','')+`','buttonVideoPlayComentario`+comentario.arquivoComentario.replace('.mp4','')+`');" class="fas fa-play fa-sm buttonVideoPlayComentario"></i>
                <i id="buttonVideoRestartComentario`+comentario.arquivoComentario.replace('.mp4','')+`" onclick="restart('videoComentario`+comentario.arquivoComentario.replace('.mp4','')+`')" class="fas fa-undo-alt fa-sm buttonVideoRestart"></i>
                <i id="buttonVideoVolumeComentario`+comentario.arquivoComentario.replace('.mp4','')+`" onclick="volume('videoComentario`+comentario.arquivoComentario.replace('.mp4','')+`','buttonVideoVolumeComentario`+comentario.arquivoComentario.replace('.mp4','')+`')" class="fas fa-volume-up fa-sm buttonVideoVolume"></i>
                `;
           }else{
              adicionais=`<img   width="50%" height="50%" src="../public/img/uploads/comentarios/`+comentario.arquivoComentario+`" style="margin:0px auto margin-top: 20px;" class="img-fluid">`;

           }

       }

       var adicionaisComentarComentarios='';

       if(totComentarComentarios>0){
        adicionaisComentarComentarios=`
            <i class="fas fa-long-arrow-alt-right"></i>
            <a onclick="comentariocomentarAjax(this)" style="cursor:pointer" class="verMaisComentarios">Ver mais Comentarios</a>
            `;
       }
     
       var comentarioElement=` 

          <div class="comentariosPostagem">
           <div class="comentariosContainer" style="position:relative; margin-bottom:15px;" >
               <img style=""  class="imgPostagem" src="../public/img/user/`+comentario.pictureUsuario+`">
               <p style="display:inline;" class="nomeUsuarioPostagem"><strong>`+comentario.nomeUsuario+`</strong></p>
                

              <!-- //comentario -->
               <div class="comentario">		
                   <p  class="textoComentario" >`+comentario.textoComentario+`</p>
                    <!-- foto ou video do comentario -->
                   <br/>
                  <div class="containerVideoEImagemComentarios" style="position:relative;" >
               
                         `+adicionais+`
                    </div>
                     

                   <div id="curtirResponderComentario">
                       <span onclick="curtirComentario">Curtir </span>
                       <span id="comentarComentario">Responder </span>
                       <span style="font-size: 13px;" id="comentarComentario">`+dataStr+`</span>
                       
                    </div>

                    <!-- //comentarios dos comentarios -->
                    <div id="containerComentarComentarios">
                        <input class="comentarComentarioIdComentario" value="`+comentario.idComentario+`" hidden/>
                       <div id="containerComentarComentariosInner" >
                    

                         </div>
                        

                         <div class="verEsconderComentarComentarios" style="margin-left: 10%; margin-top:5% ; font-size:14px">
                            `+ adicionaisComentarComentarios+`
                        </div>
                           
                

                        <div style="margin-left: 10%; margin-top:5% ; font-size:14px" class="seuComentario">
                                <form action="/salvarcomentario" method="post">
                                    <div class="containerArquivoSeuComentarComentario">

                                    </div>
                                    <input id="textSeuComentarComentario`+comentario.idComentario+`" class="textSeuComentarComentario" type="text" placeholder="Escreva um comentário" name="textSeuComentarComentario">
                                    <div style="display: inline; color:#777;position:absolute;right:30px;">
                                        <input name="idComentarComentario" type="text" value="`+comentario.idComentario+`" hidden>
                                        <input onchange="carregarArquivosComentario(this,'`+comentario.idComentario+`')" name="arquivoComentarioUpload" type="file" accept="image/*,video/*" class="arquivoComentarioUpload" id="arquivoComentarioUpload`+comentario.idComentario+`" hidden />
                                        <label style="cursor: pointer;" for="arquivoComentarioUpload`+comentario.idComentario+`"><i class="fas fa-images fa-1x"></i></label>
                                    </div>
                                </form>

                        </div>

                   </div>
                   <!--fim do comentarComentarios-->
               </div>
               
           </div>

      
            
        </div>`;



        $(containerComentarios).append(comentarioElement);

    });


      
   }
 


   //carregar comentarios dos comentarios 



   function comentariocomentarAjax(e){

    var containerComentarios=$(e).parent().closest('#containerComentarComentarios');


    var totComentarios=containerComentarios.find('.comentarComentario').length;
    var idComentario=containerComentarios.find('.comentarComentarioIdComentario').val();

    console.log('existe '+totComentarios+'com a classe comentarComentario,o id do comentario é : '+idComentario);

    $.ajax({
        url:'/miniframework/public/getComentarComentarios',
        type:'post',
        data:"idComentario="+idComentario+"&totComentarios="+totComentarios,
        dataType:'json',
        async:false,
        success:data=>{
            console.log(data);

            if(data.length==0){
                console.log("Vamos esconder os comentarios");
                $(e).parent().html(`
                <i class="fas fa-long-arrow-alt-left"></i>
                <a onclick="escondercomentariocomentarAjax(this)" style="cursor:pointer" class="esconderComentarComentarios">Esconder Comentarios</a>`);
            }else{
                console.log("Vamos mostrar");

            }
             
            carregarComentarComentarioAjax(e,data);

            ('html,body').animate({
                scrollTop: $(containerComentario).offset().top
            }, 500);
            
        },
        error:error=>{
            console.log(error);

        }
    }) 
   }

   //faz uma requisição ajax e pega o ultimo comentario inserido
   function seuComentarComentarioAjax(e){
        var idComentario=$(e).closest('#containerComentarComentarios').find('.comentarComentarioIdComentario').val();
        console.log('idComentario='+idComentario);
        console.log('entramos em seuCOmentarComentarioAjax');
                    
        $.ajax({
        url:'/miniframework/public/getSeuComentarComentario',
        type:'post',
        data:"idComentario="+idComentario,
        dataType:'json',
        success:data=>{
            console.log(data);
            carregarComentarComentarioAjax(e,data);
            
        },
        error:error=>{
            console.log(error);

        }
    });
}
  //funçaõ q renderiza os comentarios
   function carregarComentarComentarioAjax(e,arrayComentarios){
         var containerComentarios=$(e).parent().closest('#containerComentarComentarios').find("#containerComentarComentariosInner");

    
      

      arrayComentarios.forEach(function(comentario, chave){
        console.log(comentario);

        var dataStr= '';
       //transforma a date em anos dias mes
       $.ajax({

                url:'/miniframework/public/getDataString',
                type:'post',
                data:"data="+comentario.horaComentario,
                async:false,
            
                success:data=>{
                    console.log(data);
                     dataStr=data;

                    
                },
                error:error=>{
                
                }
        }).done(data=>{
            dataStr=data;
        });

         
         var adicionais='';
        
       if(comentario.arquivoComentario!=''){
           if(comentario.arquivoComentario.indexOf('.mp4')!= -1){
                adicionais=`
                <video  width="50%" height="50%" id="videoComentario<?php echo str_replace('.mp4','',$comentario['arquivoComentario']) ?>" style=""   class="img-fluid">
                      <source src="../public/img/uploads/comentarios/`+comentario.arquivoComentario+`"   type="video/mp4">
                </video>

                <i id="buttonVideoPlayComentario<?=str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>" onclick="videoplay('videoComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>','buttonVideoPlayComentario<?= str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>');" class="fas fa-play fa-sm buttonVideoPlayComentario"></i>
                <i id="buttonVideoRestartComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>" onclick="restart('videoComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>')" class="fas fa-undo-alt fa-sm buttonVideoRestart"></i>
                <i id="buttonVideoVolumeComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>" onclick="volume('videoComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`)?>','buttonVideoVolumeComentario<?php echo str_replace('.mp4','',`+comentario.arquivoComentario+`) ?>')" class="fas fa-volume-up fa-sm buttonVideoVolume"></i>
                `;
           }else{
              adicionais=`<img   width="50%" height="50%" src="../public/img/uploads/comentarios/`+comentario.arquivoComentario+`" style="margin:0px auto margin-top: 20px;" class="img-fluid">`;

           }

        }


       var comentarComentario=`
            <div  class="comentarComentario" style="margin-left: 10%; margin-top:5% ; font-size:14px">
                <img style="width: 32px; height:32px" class="imgPostagem" src="../public/img/user/`+comentario.pictureUsuario+`">
                <p style="display:inline-block; font-size:14px" class="nomeUsuarioPostagem"><strong>`+comentario.nomeUsuario+`</strong></p>
                
            <div class="comentario">
                    
                    <p style="margin-top: 4px;" class="textoComentarComentario">`+comentario.textoComentario+`</p>
                
                    <!-- foto ou video do comentario -->
                    <br />
                    <div class="containerVideoEImagemComentarios" style="position:relative;">
                         `+adicionais+`
                    </div>


                    <div id="curtirResponderComentario">
                        <span onclick="curtirComentarioC()">Curtir </span>
                        <span id="comentarComentario">Responder </span>
                        <span style="font-size: 13px;">`+dataStr+`</span>

                    </div>
                </div>

            </div>`;


            containerComentarios.append(comentarComentario);

         

        });
   }
   function carregarSeuComentarioAjax(e){
            var idPostagem=$(e).parent().closest('#containerComentarios').find('.comentarioIdPostagem').val();

                        
            $.ajax({
            url:'/miniframework/public/getSeuComentario',
            type:'post',
            data:"idPostagem="+idPostagem,
            dataType:'json',
            success:data=>{
                console.log(data);
                carregarComentariosPostagemAjax(data,idPostagem,$(e).parent().closest('#containerComentarios').find('#containerComentariosInner'));

                
            },
            error:error=>{
                console.log(error);

            }
        });
   }


  
   function seguirOuDeixarDeSeguir(idUsuarioSeguindo){
      var estaSeguindo=false;
    $.ajax({
        url:'/miniframework/public/verificaseguindo',
        type:'post',
        data:"idUsuarioSeguindo="+idUsuarioSeguindo,
        dataType:'json',
        async:false,
         success:data=>{
            console.log('estamos em verificaSeguindo');
            console.log(data);

            
        },
        error:error=>{
            console.log(error);

        }
    }).done(data=>{
        estaSeguindo=data;
    });

    console.log('estaseguindo = '+estaSeguindo);

    if(!estaSeguindo){
        $.ajax({
            url:'/miniframework/public/seguir',
            type:'post',
            data:"idUsuarioSeguindo="+idUsuarioSeguindo,
             success:data=>{
                    console.log(data);
                    $("#seguirDeixarSeguir").html(`Deixar de seguir`);

                        
                    $("#buttonSeguirDeixarSeguir").find('i').addClass("fa-user-minus");
                    $("#buttonSeguirDeixarSeguir").find('i').removeClass("fa-user-plus");


                    //mudar seguidores

                    $("#totSeguidores").html((parseInt($("#totSeguidores").html()))+1);
            },
            error:error=>{
                console.log(error);

            }
        });

    }else{
        $.ajax({
            url:'/miniframework/public/deixarseguir',
            type:'post',
            data:"idUsuarioSeguindo="+idUsuarioSeguindo,
             success:data=>{
                console.log(data);
                $("#seguirDeixarSeguir").html(`Seguir`);

                $("#buttonSeguirDeixarSeguir").find('i').removeClass("fa-user-minus");
                $("#buttonSeguirDeixarSeguir").find('i').addClass("fa-user-plus");
                
                $("#totSeguidores").html((parseInt($("#totSeguidores").html()))-1);

            },
            error:error=>{
                console.log(error);

            }
        });

    }
 }