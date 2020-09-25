   $(document).ready(() => {
       $.f
                
   

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
					// ajax call get data from server and append to the div
					$.ajax({
						type: "post",
						url: "/miniframework/public/timeline2",
						data:'offset='+offset,
                        dataType:'json',
                        async:false,
						 
						success: data=> {
                        
                            console.log('chegamos em carregar postagem ajax');
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
   });

   function carregarPostagemAjax(postagens){
       console.log('chegamos em carregar os elementos');
    postagens.forEach(function(postagem, chave){
      
        var totComentarios='';
        var totCurtidaPostagem='';
        var usuarioCurtiu=false;

        $.ajax({

            url:'/miniframework/public/getTotComentarios',
            type:'post',
            data:"idPostagem="+postagem.postagemId,
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

    success:data=>{
        usuarioCurtiu=data;    
    },
    error:error=>{
    
    }
}).done(data=>{
    usuarioCurtiu=data;    
});

console.log('totComentarios: '+totComentarios+" totcurtidas: "+totCurtidaPostagem+" verifica curtida: "+usuarioCurtiu)

       var adicionais='';
       if(postagem.arquivo!=''){
           if(postagem.arquivo.indexOf('.mp4')!= -1){
                adicionais=`
                <video  id="video`+postagem.arquivo.replace('.mp4','')+`" class="img-fluid">
                            <source src="../public/img/uploads/postagens/`+postagem.postagemId+`"   type="video/mp4">
                </video>


                <i id="buttonVideoPlay`+postagem.arquivo.replace('.mp4','')+`" onclick="videoplay('video`+postagem.arquivo.replace('.mp4','')+`','buttonVideoPlay`+postagem.arquivo.replace('.mp4','')+`');" class="fas fa-play fa-2x buttonVideoPlay"></i>
                <i id="buttonVideoRestart`+postagem.arquivo.replace('.mp4','')+`" onclick="restart('video`+postagem.arquivo.replace('.mp4','')+`')" class="fas fa-undo-alt fa-lg buttonVideoRestart"></i>
                <i id="buttonVideoVolume`+postagem.arquivo.replace('.mp4','')+`" onclick="volume('video`+postagem.arquivo.replace('.mp4','')+`','buttonVideoVolume`+postagem.arquivo.replace('.mp4','')+`')" class="fas fa-volume-up fa-lg buttonVideoVolume"></i>

        `;
           }else{
              adicionais=`<img   src="../public/img/uploads/postagens/`+postagem.arquivo+`" style="margin:0px auto" class="img-fluid d-flex justify-content-center"`;

           }

       }

        var estiloCor= (usuarioCurtiu) ? 'color:red':'color:black';

        var postagemElement = `
        <div class="postagemContainer row">
            <div class="col">
                

                <img  class="imgPostagem" src="../public/img/user/`+postagem.picture+`"/>

                <p style="display:inline;" class="nomeUsuarioPostagem"><strong>`+postagem.name+`</strong><small> <span class="text text-muted">- `+postagem.data+`</span></small></p>
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

                                <span style="position:absolute;right:0px; cursor:none"><span id="totCurtidas`+postagem.postagemId+`"`+totCurtidaPostagem+`</span> <i  class="far fa-heart"></i></span>

                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <!-- comentarios da postagem -->
                <div id="containerComentarios" class="hideComentarios">                  
                         <div>
                             <a onclick="carregarComentariosAjax(this)" style="cursor:pointer;color: #1da1f2;text-decoration: underline;" class="verMaisComentarios">Ver mais Comentarios</a>
                         </div>
                         <div class="seuComentario">
                               <form action="/salvarcomentario" method="post">
                                    <div class="containerArquivoSeuComentario">

                                     </div>
                                    <input onclick=""  id="textSeuComentario`+postagem.postagemId+`" class="textSeuComentario" type="text" placeholder="Escreva um comentário" name="textSeuComentario"/>
                                    <div style="display: inline; color:#777;position:absolute;right:30px;">
                                            <input name="idPostagemComentario" type="text" value="`+postagem.postagemId+`" hidden>
                                            <input onchange="carregarArquivosComentario(this,'`+postagem.postagemId+`')"   name="arquivoComentarioUpload" type="file" accept="image/*,video/*" class="arquivoComentarioUpload" id="arquivoComentarioUpload`+postagem.postagemId+`" hidden />
                                            <label style="cursor: pointer;" for="arquivoComentarioUpload`+postagem.postagemId+`>"><i class="fas fa-images fa-1x"></i></label>
                                    </div>
                               </form>

                         </div>
                    </div>

            </div>




        </div>`;
        $("#postagem").append(postagemElement);
     });

   

  
   }

   function carregarComentarComentarioAjax(e){
       var arrayComentarios=[];
        var containerComentarios=$(e).parent().closest('#containerComentarComentarios');

        var totComentarios=containerComentarios.find('.comentarComentario').length;
        
        var idComentario=containerComentarios.find('.comentarComentarioIdComentario').val();

                    
        console.log('existe '+totComentarios+'com a classe comentarComentario,o id da postagem é : '+idComentario);

        $.ajax({
        url:'/miniframework/public/getComentarComentarios',
        type:'post',
        data:"idComentario="+idComentario+"&totComentarios="+totComentarios,
        dataType:'json',
        async:false,
        success:data=>{
             
            arrayComentarios=data;
            
        },
        error:error=>{
            console.log(error);

        }
    }).done(data=>{
        arrayComentarios=data;
 
    });
    

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


            containerComentarios.prepend(comentarComentario);

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
                carregarComentariosPostagemAjax(data,idPostagem,$(e).parent().closest('#containerComentarios'));

                
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

    $.ajax({
      url:'/miniframework/public/getComentarios',
      type:'post',
      data:"idPostagem="+idPostagem+"&totComentarios="+totComentarios,
      dataType:'json',
      success:data=>{
          console.log(data);
        carregarComentariosPostagemAjax(data,idPostagem,$(e).parent().closest('#containerComentarios'));

          
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
     
       console.log("dataStr="+dataStr);

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
     
       var comentarioElement=` 
       <input class="comentarioIdPostagem" hidden type="text" value="`+idPostagem+`">

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
               </div>
               
           </div>

      
            
        </div>`;



        $(containerComentarios).prepend(comentarioElement);

    });


      
   }
 
   //função para mostrar o container ou esconder
  function esconderMostrarContainer(elemento){

    var  div= $("#"+elemento).closest('div.row').next('hr').next('div#containerComentarios');
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
           
             curtirEDescutir(tagI,idPostagem,data);
            
        },

    });

      

 
   }

   function curtirEDescutir(tagI,idPostagem,curtiu){
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
             $("#totCurtidas"+idPostagem).html(data);

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
             $("#totCurtidas"+idPostagem).html(data);
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
       });
    }
   }
//    function comentar(idPost,idInput){
//        var valor =$("#"+idInput).val();

//        console.log(valor);

//      }