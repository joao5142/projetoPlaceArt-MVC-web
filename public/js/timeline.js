 
       $(document).ready(() => {
     
        //funcao para subir a rolagem
        $('.denunciarPostagem').hover( function(){$(this).parent().find('p').css({opacity:'1'})}, function(){$(this).parent().find('p').css({opacity:'0'})} );

        $("#back-to-top").css("display", "none");

        $(window).scroll(function() {
            if($(this).scrollTop() == 0){
                 $("#back-to-top").css("display", "none");
            } else {
                 $("#back-to-top").css("display", "block");
            }
        });

        $(window).scroll(function() {
            console.log($(window).scrollTop());
            console.log($('body').height());
            if ($(window).scrollTop() < $('body').height()) {
                $("#seusAmigos").css("display", "none");
                $("#seusAmigos").css("z-index", "-10");
            } else {
                $("#seusAmigos").css("display", "block");
                $("#seusAmigos").css("z-index", "10");

            }
        });

 
        $("#back-to-top").click(function() {
            $("html, body").animate({scrollTop: 0}, 800);
        });
                        
   
      //quando digitar enter 
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
            event.preventDefault();
            return false;
            }
        });

       function updateProfilePic(input) {
           if (input.files && input.files[0]) {
               //colocando a imagem escolhida no perfil
               var reader = new FileReader();
               reader.onload = function (e) {
                   $("#userImg").attr('src', e.target.result);

                   //chamada ajax para apresentar a imagem no servidor
                   var formData = new FormData($("#uploadPic")[0]);

                   $.ajax({
                       type: 'post',
                       url: '/miniframework/public/uploadpic',
                       data: formData,
                       cache: false,
                       contentType: false,
                       processData: false,
                       error: error => {
                           Swal.fire({
                               title: 'Imagem Nao Alterada',
                               text: error.statusText,
                               icon: 'error',
                               confirmButtonText: 'ok'
                           });
                       },
                       success: data => {
                           console.log(data);
                       }

                   });

               }
               reader.readAsDataURL(input.files[0]);
           }
       }

       $("#imgInp").change((e) => {
           updateProfilePic(e.target);
       });

       $("#fecharArquivoUpload").hide();

       $("#fecharArquivoUpload").on("click", () => {
           $("#fecharArquivoUpload").hide();

           $('#arquivoUpload').html('');
           $('#arquivoPostagemUpload').val('');

       });

       //quando o formulario de postagem for submetido
       $("#formularioPostagem").on("submit", e => {
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
               error: error => {
                   Swal.fire({
                       title: 'nao foi possivel criar a postagem',
                       text: error.statusText,
                       icon: 'error',
                       confirmButtonText: 'ok'
                   });
               },
               success: data => {
                   console.log(data);
                   location.href="/miniframework/public/timeline";
               }

           });

       });

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

     
       let offset = 10;
       $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    //ver qual butão esta clicado 
                    var route='';
                    if($("#botaoVendas").hasClass('botaoAtivo')){
                         route='getVendasPostagem';
                    }else{
                        route='timeline2'
                    }
					// ajax call get data from server and append to the div
					$.ajax({
						type: "post",
						url: "/miniframework/public/"+route,
						data:'offset='+offset,
                        dataType:'json',
                        async:false,
						 
						success: data=> {
                        
                            console.log('chegamos em carregar postagem ajax scroll no final');
                            console.log(data);
                           
						    offset+=data.length;
                         
                    
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
   });
   //fim do document.ready
   function socialPostagens(){
        $.ajax({
            type:'post',  
            url:'/miniframework/public/timeline2',
            data:'offset='+0,
            dataType:'json',
            success:data=>{
                console.log(data);
                $('.postagemContainer').remove();
                carregarPostagemAjax(data);

            },
            error:error=>{

            },
            
        }); 
        console.log($("#botaoSocial"));

        $("#botaoSocial").addClass('botaoAtivo');
        $("#botaoVendas").removeClass('botaoAtivo');
   }
   function vendasPostagens(){
       $.ajax({
        type:'post',  
        url:'/miniframework/public/getVendasPostagem',
        data:'offset='+0,
        dataType:'json',
        success:data=>{
             console.log(data);
             $('.postagemContainer').remove();
             carregarPostagemAjax(data);

        },
        error:error=>{

        },
          
       });

       $("#botaoVendas").addClass('botaoAtivo');
        $("#botaoSocial").removeClass('botaoAtivo');
 



   }
   function excluirPost(id){
       console.log('o id é '+id);
       const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        cancelButton: 'btn btn-danger ml-4',
          confirmButton: 'btn btn-success mr-4'
          
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza?',
        text: "Se deletar nao será possivel recuperar posteriormente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim! ',
        cancelButtonText: 'Cancelar! ',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
            $.ajax({
                type:'post',  
                url:'/miniframework/public/deletarpostagem',
                data:'idPostagem='+id,
                dataType:'json',
                success:data=>{
                     console.log(data);

                     swalWithBootstrapButtons.fire(
                        'Deletado!',
                        'Sua Postagem foi Deletada',
                        'success'
                      )
                      location.href='/miniframework/public/timeline';
                   
                },
                error:error=>{
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Error ao deletar Postagem ): Tente Novamente'+error,
                        'error'
                      )
                },
                  
               });

          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) 
        {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Sua postagem nao foi deletada :)',
            'error'
          )
        }
      })



   }



   function carregarPostagemAjax(postagens){
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
        $("#postagem").append(postagemElement);
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

   function comentariosAjax(containerInserir,postagemId){
         
         
          var comentario=`      
        <div class="comentariosPostagem">
            <div class="comentariosContainer" style="position:relative; margin-bottom:15px;">
                <img style="" class="imgPostagem" src="../public/img/user/<?= $comentario['pictureUsuario'] ?>">
                <p style="display:inline;" class="nomeUsuarioPostagem"><strong><?= $comentario['nomeUsuario'] ?></strong></p>


                <!-- //comentario -->
                <div class="comentario">

                    <p style="margin-top: 4px;" class="textoComentario"><?= $comentario['textoComentario'] ?></p>
                    <!-- foto ou video do comentario -->
                    <br />
                    <div class="containerVideoEImagemComentarios" style="position:relative;">

                        <?php if (isset($comentario['arquivoComentario']) && $comentario['arquivoComentario'] != '') { ?>

                            <?php if (strpos($comentario['arquivoComentario'], '.mp4') != 0) { ?>
                                <video width="50%" height="50%" id="videoComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>" style="" class="img-fluid">
                                    <source src="../public/img/uploads/comentarios/<?= $comentario['arquivoComentario'] ?>" type="video/mp4">
                                </video>

                                <i id="buttonVideoPlayComentario<?= str_replace('.mp4', '', $comentario['arquivoComentario']) ?>" onclick="videoplay('videoComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>','buttonVideoPlayComentario<?= str_replace('.mp4', '', $comentario['arquivoComentario']) ?>');" class="fas fa-play fa-sm buttonVideoPlayComentario"></i>
                                <i id="buttonVideoRestartComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>" onclick="restart('videoComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>')" class="fas fa-undo-alt fa-sm buttonVideoRestart"></i>
                                <i id="buttonVideoVolumeComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>" onclick="volume('videoComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>','buttonVideoVolumeComentario<?php echo str_replace('.mp4', '', $comentario['arquivoComentario']) ?>')" class="fas fa-volume-up fa-sm buttonVideoVolume"></i>



                            <?php } else { ?>

                                <img width="50%" height="50%" src="../public/img/uploads/comentarios/<?= $comentario['arquivoComentario'] ?>" style="margin:0px auto margin-top: 20px;" class="img-fluid">

                            <?php } ?>


                        <?php } ?>
                    </div>


                    <div id="curtirResponderComentario">
                        <span onclick="curtirComentario">Curtir </span>
                        <span id="comentarComentario">Responder </span>
                        <span style="font-size: 13px;"><?= $comentarios->timing(strtotime($comentario['horaComentario'])) ?></span>

                    </div>

                    <!-- //comentarios dos comentarios -->
                    <div id="containerComentarComentarios">
                        <input class="comentarComentarioIdComentario" value="<?=$comentario['id']?>" hidden/>
                       <div id="containerComentarComentariosInner" >
                    <?php foreach ($comentariosDosComentarios->getAll($comentario['id']) as $key => $comentC) { ?>
                         
                        <div  class="comentarComentario" style="margin-left: 10%; margin-top:5% ; font-size:14px">

                               <img style="width: 32px; height:32px" class="imgPostagem" src="../public/img/user/<?= $comentC['pictureUsuario'] ?>">
                                <p style="display:inline-block; font-size:14px" class="nomeUsuarioPostagem"><strong><?= $comentC['nomeUsuario'] ?></strong></p>
                                
                            <div class="comentario">
                                    
                                    <p style="margin-top: 4px;" class="textoComentarComentario"><?= $comentC['textoComentario'] ?></p>
                                
                                    <!-- foto ou video do comentario -->
                                    <br />
                                    <div class="containerVideoEImagemComentarios" style="position:relative;">

                                        <?php if (isset($comentC['arquivoComentario']) && $comentC['arquivoComentario'] != '') { ?>

                                            <?php if (strpos($comentC['arquivoComentario'], '.mp4') != 0) { ?>
                                                <video width="50%" height="50%" id="videoComentarioC<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>" style="" class="img-fluid">
                                                    <source src="../public/img/uploads/comentarios/<?= $comentC['arquivoComentario'] ?>" type="video/mp4">
                                                </video>

                                                <i id="buttonVideoPlayComentario<?= str_replace('.mp4', '', $comentC['arquivoComentario']) ?>" onclick="videoplay('videoComentarioC<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>','buttonVideoPlayComentario<?= str_replace('.mp4', '', $comentC['arquivoComentario']) ?>');" class="fas fa-play fa-sm buttonVideoPlayComentario"></i>
                                                <i id="buttonVideoRestartComentario<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>" onclick="restart('videoComentarioC<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>')" class="fas fa-undo-alt fa-sm buttonVideoRestart"></i>
                                                <i id="buttonVideoVolumeComentario<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>" onclick="volume('videoComentarioC<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>','buttonVideoVolumeComentario<?php echo str_replace('.mp4', '', $comentC['arquivoComentario']) ?>')" class="fas fa-volume-up fa-sm buttonVideoVolume"></i>



                                            <?php } else { ?>

                                                <img width="50%" height="50%" src="../public/img/uploads/comentarios/<?= $comentC['arquivoComentario'] ?>" style="margin:0px auto margin-top: 20px;" class="img-fluid">

                                            <?php } ?>


                                        <?php } ?>
                                    </div>


                                    <div id="curtirResponderComentario">
                                        <span onclick="curtirComentarioC()">Curtir </span>
                                        <span id="comentarComentario">Responder </span>
                                        <span style="font-size: 13px;"><?= $comentarios->timing(strtotime($comentC['horaComentario'])) ?></span>

                                    </div>
                                </div>
                            </div>

                        <?php }?>

                         </div>
                        

                        <div class="verEsconderComentarios" style="margin-left: 10%; margin-top:5% ; font-size:14px">
                                 <?php  if($comentariosDosComentarios->getTotComentarios($comentario['id']) >0){   ?>
                                      <a onclick="comentariocomentarAjax(this)" style="cursor:pointer;color: #1da1f2;text-decoration: underline;" class="verMaisComentarios">Ver mais Comentarios</a>
                                 <?php }?>
                            </div>

                        <div style="margin-left: 10%; margin-top:5% ; font-size:14px" class="seuComentario">
                                <form action="/salvarcomentario" method="post">
                                    <div class="containerArquivoSeuComentarComentario">

                                    </div>
                                    <input id="textSeuComentarComentario<?= $comentario['id']?>" class="textSeuComentarComentario" type="text" placeholder="Escreva um comentário" name="textSeuComentarComentario">
                                    <div style="display: inline; color:#777;position:absolute;right:30px;">
                                        <input name="idComentarComentario" type="text" value="<?= $comentario['id'] ?>" hidden>
                                        <input onchange="carregarArquivosComentario(this,'<?= $comentario['id'] ?>')" name="arquivoComentarioUpload" type="file" accept="image/*,video/*" class="arquivoComentarioUpload" id="arquivoComentarioUpload<?= $comentario['id'] ?>" hidden />
                                        <label style="cursor: pointer;" for="arquivoComentarioUpload<?= $comentario['id'] ?>"><i class="fas fa-images fa-1x"></i></label>
                                    </div>
                                </form>

                        </div>

                   </div>


                </div>

            </div>
        </div>

        `  ;
    
   }

   function escondercomentariocomentarAjax(e){
       var containerComentario=$(e).parent().closest('#containerComentarComentarios');
      
       containerComentario.find(".comentarComentario").remove();

       containerComentario.find('.verEsconderComentarComentarios').html(`<i class="fas fa-long-arrow-alt-right"></i>
       <a onclick="comentariocomentarAjax(this)" style="cursor:pointer;" class="verMaisComentarios">Ver mais Comentarios</a>`);
       

       ('html,body').animate({
          scrollTop: $(containerComentario).offset().top
         }, 500);
    }

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

    

   //faz a requisição ajax e passa pra função responsavel por redenrizar na tela
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
                        <span style="cursor:pointer" class="block" id="comentarComentario" onclick="mostrarResponder(`+comentario.idComentario+`)">Responder </span>
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

 var usuarioCurtiu;
    $.ajax({
        type:'post',
        url:'/miniframework/public/verificacurtidacomentario',
        data:'idComentario='+comentario.idComentario+'&idUsuario='+0,
        dataType:'json',
        async:false,
        success:data=>{
             console.log(data);
             usuarioCurtiu=data;
        },


     
    }).done(data=>{
        usuarioCurtiu=data;
    });

     var estiloCor=(usuarioCurtiu) ? 'color:#3E8AF4':'color:black';
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
      var usuarioCurtiuComentario=0;
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
                     

                   <div id="curtirResponderComentario" style="position:relative">
                       <span style="`+estiloCor+`" onclick="curtirComentario('curtirComentario`+comentario.idComentario+`','`+comentario.idComentario+`','`+usuarioCurtiuComentario+`')"   id="curtirComentario`+comentario.idComentario+`">Curtir </span>
                       <span style="cursor:pointer" class="block" id="comentarComentario" onclick="mostrarResponder(`+comentario.idComentario+`)">Responder </span>
                       <span style="font-size: 13px;" id="comentarComentario">`+dataStr+`</span>

                       <span style="position:absolute; top:0px ;right:0px" class=""><span>`+totComentarComentarios+` </span><i class="far fa-comment-alt"></i></span>

                       
                    </div>

                    <!-- //comentarios dos comentarios -->
                    <div id="containerComentarComentarios">
                        <input class="comentarComentarioIdComentario" value="`+comentario.idComentario+`" hidden/>
                       <div id="containerComentarComentariosInner" >
                    

                         </div>
                        

                         <div class="verEsconderComentarComentarios" style="margin-left: 10%; margin-top:5% ; font-size:14px">
                            `+ adicionaisComentarComentarios+`
                        </div>
                           
                

                        <div id="containerSeuComentario`+comentario.idComentario+`" style="display:none;margin-left: 10%; margin-top:5% ; font-size:14px" class="seuComentario">
                                <form   action="/salvarcomentario" method="post">
                                    <div class="containerArquivoSeuComentarComentario">

                                    </div>
                                    <input  id="textSeuComentarComentario`+comentario.idComentario+`" class="textSeuComentarComentario" type="text" placeholder="Escreva um comentário" name="textSeuComentarComentario">
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
   function mostrarResponder(ele){
    if($("#containerSeuComentario"+ele).hasClass('none')){
        $("#containerSeuComentario"+ele).css({
            display:'block',
        });
        $("#containerSeuComentario"+ele).removeClass('none');
        $("#containerSeuComentario"+ele).addClass('block');
    }else{
        $("#containerSeuComentario"+ele).removeClass('block');
        $("#containerSeuComentario"+ele).addClass('none');

        $("#containerSeuComentario"+ele).css({
            display:'none',
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

 
   //carregar seu Comentario na timeline apos salvar 
/*
   function carregarComentarioTimeline(textoComentario,arquivoComentario,arquivoname,elemento,nome,picture){
        console.log(arquivoComentario);
      var adicionais='';
         if(arquivoname!=''){
              if(arquivoname.indexOf('.mp4')!= -1){
                adicionais = `  <video style="margin-top: 20px;" autoplay  class="img-fluid">
                                        <source src="`+arquivoComentario+`"   type="video/mp4">
                                 </video>
                                `;
              }else{
                adicionais =` <img width="50%" height="50%" src="`+arquivoComentario+`" style="margin:0px auto margin-top: 20px;" class="img-fluid">
                `;
             }
              
         }

        var comentario=`
         <div class="comentariosContainer" style="position:relative; margin-bottom:15px;" >
                <img style=""  class="imgPostagem" src="../public/img/user/`+picture+`">
                <p style="display:inline;" class="nomeUsuarioPostagem"><strong>`+nome+`</strong></p>
                

                <!-- //comentario -->
                <div class="comentario">		
                    <p  class="textoComentario" >`+textoComentario+`</p>
                    <!-- foto ou video do comentario -->
                    <div>`+adicionais+`
                
                    </div>

                    <div id="curtirResponderComentario">
                        <span onclick="curtirComentario">Curtir </span>
                        <span id="comentarComentario">Responder </span>
                        <span style="font-size: 13px;" id="comentarComentario">agora mesmo</span>
                    </div>
                </div>
         
     </div>`;

     $(elemento).prepend(comentario);
   }

   */

   //////////////////CARREGAR VIDEOS E IMAGENS DA TIMELINE///////////////////////////
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

   function carregarArquivosPostagem(input) {

       if (!isImage(input)) {
           console.log('entrou em video');
           let file = input.files[0];
           let blobURL = URL.createObjectURL(file);

           $("#arquivoUpload").html('<video autoplay  class="img-fluid" width="70%" height="70%"> <source src="' + blobURL + '"> </video>')
           $("#fecharArquivoUpload").show();
       } else {
           console.log('entrou em imagem');

           if (input.files && input.files[0]) {
               $('#arquivoUpload').html('<img id="imageUploadPostagem" class="img-fluid"  width="70%" height="70%">');

               var reader = new FileReader();
               reader.onload = function (e) {
                   $("#imageUploadPostagem").attr('src', e.target.result);

               }
               reader.readAsDataURL(input.files[0]);
               $("#fecharArquivoUpload").show();

           }

       }

   }
   function carregarArquivosComentario(input,idPost) {
    $(input).closest('form').find('.containerArquivoSeuComentario').css({
        'display':'block'
    });

    if (!isImage(input)) {
        console.log('entrou em video');
        let file = input.files[0];
        let blobURL = URL.createObjectURL(file);

        $(input).closest('form').find('div.containerArquivoSeuComentario').html('<video autoplay  class="img-fluid arquivoSeuComentario" > <source src="' + blobURL + '"> </video>')
       
    } else {
        console.log('entrou em imagem');

        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                /*
                console.log(input);
                console.log('valor do src '+e.target.result);
                */
               
                $(input).closest('form').find('.containerArquivoSeuComentario').html('<img src="'+e.target.result+'" class="img-fluid arquivoSeuComentario" />');
                
            }
            reader.readAsDataURL(input.files[0]);
            

        }

    }

}


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

   //curtir e descurtir comentarios
function curtirComentario(tag,idComentario,idUsuario) {
    console.log('tagI: '+tag+" id do comentario: "+idComentario);

  //requisição ajax apara pegar  se o usuarioCurtiu
 var curtiu=0;
    $.ajax({
     type:'post',
     url:'/miniframework/public/verificacurtidacomentario',
     data:'idComentario='+idComentario+'&idUsuario='+idUsuario,
     dataType:'json',
     success:data=>{
          console.log(data);
           
     },

 }).done(data=>{
    curtirEDescutirComentario(tag,idComentario,data);
 });

   


}


function curtirEDescutirComentario(tag,idComentario,curtiu){
 console.log('nome da tag i é ='+tag+' id da postagem='+idComentario+'curtiu='+curtiu);

 if (!curtiu) { //se ele nao curtiu
     console.log('entrou em curtir');
     $('#' + tag).css({
         color: '#3E8AF4'
     })

     $.ajax({
       type:'post',
       url:'/miniframework/public/curtirComentario',
       data:'idComentario='+idComentario,
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
         $("#totCurtidasComentario"+idComentario).html(data);
     });



  } else {
      console.log('entrou em descurtir');
     $('#' + tag).css({
         color: 'black'
     })


     $.ajax({
      type:'post',
      url:'/miniframework/public/descurtirComentario',
      data:'idComentario='+idComentario,
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
         $("#totCurtidasComentario"+idComentario).html(data);
    });
 }
}
//    function comentar(idPost,idInput){
//        var valor =$("#"+idInput).val();

//        console.log(valor);

//      }


 
//função para ver se o elemento foi checado
 
function verChecado(e){
   console.log($(e)[0].checked);
 
}

