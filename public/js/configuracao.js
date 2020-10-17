$(document).ready(()=>{
    

    $("#containerMudarSenha").hide();
    


    $('#formMudarSenha').on('submit',(e)=>{
        e.preventDefault();
         
        var dados = $(e.target).serialize();


        $.ajax({
            type:'post',  
            url:'/miniframework/public/mudarsenha',
            data:dados,
            success:data=>{
                 console.log(data);
                 alert(data);

             
                    $('#errorMudarSenha').removeClass('text-danger');
                    $('#errorMudarSenha').addClass('text-success');
                    $('#errorMudarSenha').html('Senha foi alterada!');
                    $('#errorMudarSenha').show();

             
 
                 // location.href='/miniframework/public/';
               
            },
            error:error=>{
                if($('#errorMudarSenha').hasClass('text-success')){
                    $('#errorMudarSenha').removeClass('text-success');
                }
                $('#errorMudarSenha').addClass('text-danger');
                $('#errorMudarSenha').show();
                $('#errorMudarSenha').html(error.statusText);
            },
              
           });



    });


    //parte do denunciarpostagem

    $("#denunciarConteudoPostagem").on('submit',(e)=>{
         e.preventDefault();
         console.log('entramos em denunciar postagem');

         var data= $("#denunciarConteudoPostagem").serialize();

         console.log(data);
         denunciarPostagem(data);
    });
});

var x=0;
function mostrarContainerMudarSenha(){
     if(x==0){
        $("#containerMudarSenha").show();
        x=1;
     }else{
        $("#containerMudarSenha").hide();

        x=0;
     }
}



function excluirConta(){
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
             url:'/miniframework/public/deletarconta',
           
             success:data=>{
                  console.log(data);
                  alert(data);

                  swalWithBootstrapButtons.fire(
                     'Deletado!',
                     'Sua Conta foi Deletada',
                     'success'
                   )
                  location.href='/miniframework/public/';
                
             },
             error:error=>{
                 swalWithBootstrapButtons.fire(
                     'Cancelado',
                     'Error ao deletar Conta ): Tente Novamente'+error,
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
         'Sua conta nao foi deletada :)',
         'error'
       )
     }
   })



}


function denunciarPostagem(dados){
  
  $.ajax({
      type:'post',
      url:'/miniframework/public/salvardenuncia',
      data:dados,
      success:data=>{
        Swal.fire(
          'Denuncia Enviada!',
          'Obrigado Por Enviar a Denuncia!',
          'success'
        )

      },
      error:error=>{
        console.log(error);
      }
    }).done(data=>{
     });
}