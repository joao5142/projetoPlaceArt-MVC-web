   $(document).ready(() => {

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




   });


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

   function carregarArquivos(input) {

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
   var i = 0;

   function curtir(tagI,idPostagem,curtiu) {
       console.log('tagI:'+tagI+" id da postagem: "+idPostagem);

       console.log('curtiu='+curtiu);

       if (i == 0 && !curtiu) {
           $('#' + tagI).css({
               color: 'red'
           })
           i++;

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
           $('#' + tagI).css({
               color: 'black'
           })
           i = 0;


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