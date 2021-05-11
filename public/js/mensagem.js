$(document).ready(()=>{
    //quuando carregar a pagina vou esconder o chat
     
    
    getConversas();

  //função para preencher a lista de usuarios que esta conversando com o usuario principal
    setInterval(()=>{
         getConversas();


    },10000);
  //função para pesquisarUsuarioNOChat
  $("#searchUsuarioChat").on('keyup',(e)=>{
      var valor= $(e.target).val();

      
    $.ajax({
        type: 'post',
        url: '/miniframework/public/pesquisarpormensagem',
        data: "pesquisarpor="+valor,
        dataType: 'json',
        success: data => {
            console.log(data);

            $('#containerChat #inbox #searchContainer').show();

            if(data.length>0){
                $('#containerChat #inbox #searchContainer').html('');
                addToContainerPesquisa(data);

            }else{
                $('#containerChat #inbox #searchContainer').html('');

    
                 $('#containerChat #inbox #searchContainer').hide();
            } 
        },
        error: error => {
            console.log(error.responseText);
        }

    });

    if(valor==''){
        console.log('entrou em vazio');
      $('#containerChat #inbox #searchContainer').html('');

    
      $('#containerChat #inbox #searchContainer').hide();
    }

});

//   requisição para enviar a mensagem quando for escolhida uma imagem
   $(document).on('change','input#sendImage',(e)=>{
        sendMessage(e);
   });
   
   //requisição para enviar a mensagem quando pressionar enter
    $(document).on('keyup','input#messageInput',(e)=>{
            console.log('entramos em chat');

            if(e.keyCode==13){
                 sendMessage(e);
                 $("#messageInput").val('');

             }
    });

   

});

function getConversas(){
    var valor=0;
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
       valor=data;
    });
    

    $.ajax({
        type: 'post',
        url: '/miniframework/public/getconversas',
        data: "mainUser="+valor,
        dataType: 'json',
        success: data => {
            
            
            if(data.length>0){
                $('#containerChat #inbox .container').html('');
                addUsuariosToContainer(data);

            } else{
                $('#containerChat #inbox #searchContainer').html(`
                  <div class="empty"><p> Pesquise um usuario e inicie uma conversa </p> </div>`);

            }
        },
        error: error => {
            console.log(error.responseText);
        }

    });

}

function addUsuariosToContainer(arrayusuario){
    arrayusuario.forEach(function(usuario, chave){
            var user = `
            <div class="chat" onclick="chat(`+usuario.id+`,'`+usuario.username+`','`+usuario+`')">
                <img src="../public/img/user/`+usuario.picture+`">
                <p style="color">`+usuario.username+`</p>
            </div>
        `;

        
        $('#containerChat #inbox .container').append(user);
        $('#containerChat #inbox .container').show();

    });
   
}
var interval;
function sendMessage(e){

        
        var formData=new FormData($(e.target).closest('form')[0]);
        var dados=$(e.target).closest('form').serialize();
        var otherUser=$(e.target).closest('form').find("input#inputOtherUser").val();
    //cria uma conversa com o usuario e e envia a mensagem Pro banco
        console.log('O valo r do otheruser é '+otherUser);
    $.ajax({
        type: 'post',
        url: '/miniframework/public/sendMenssage',
        data:formData,
        async:false,
        cache: false,
        contentType: false,
        processData: false,
        
        success: data => {

           
         
        },
        error: error => {
            console.log(error.responseText);
        }

    }).done(data=>{

        interval=setInterval(()=>{
            addUltimaMensagemToChat(otherUser);

         },3000);
    });
}
//função para adicionar Menssagens ao chat
function addUltimaMensagemToChat(otherUser){
    var arrayMensagens=[];
    var uid=0;
    $.ajax({
        type: 'post',
        url: '/miniframework/public/getUltimaMessageChat',
       dataType:'json',
        data:'otherUser='+otherUser,
        async:false,
        success: data => {
             console.log(data);
             
        },
        error: error => {
            console.log(error);
        }

    }).done(data=>{
        arrayMensagens=data;
    });

    $.ajax({
        type: 'post',
        url: '/miniframework/public/getUsuarioId',
       dataType:'json',
        async:false,
        success: data => {
             //console.log(data);
             
        },
        error: error => {
           // console.log(error);
        }

    }).done(data=>{
       uid=data;
    });
    
  // console.log($("#containerChat #chat .innerContainer .row").last().attr('value'));
   var idUltimaMensagem=$("#containerChat #chat .innerContainer .row").last().attr('value');
    arrayMensagens.forEach(function(mensagem,key){
      if(mensagem.idMensagem !=idUltimaMensagem){

            var addComentario='';

            if(mensagem.sender== uid && mensagem.imageOrVideo != ""){
            
                addComentario=`
                <div value="`+mensagem.idMensagem+`" class="row send">
                    <img src="../public/img/uploads/conversas/`+mensagem.imageOrVideo+`">
                </div>
                `;

            

            }else if(mensagem.sender== uid){
                addComentario=`

                    <div value="`+mensagem.idMensagem+`" class="row send">
                        <p>`+mensagem.message+`</p>
                    </div>
                `;
                
            }else if(mensagem.imageOrVideo != ""){
                
                addComentario=`
                <div value="`+mensagem.idMensagem+`" class="row recieved">
                    <img src="../public/img/uploads/conversas/`+mensagem.imageOrVideo+`">
                </div>
                `

                
            }else{
                addComentario=`
                    <div value="`+mensagem.idMensagem+`" class="row recieved">
                        <p>`+mensagem.message+`</p>
                    </div>
                `;    

            
            }
            $("#chat .innerContainer").scrollTop($("#chat .innerContainer").prop('scrollHeight'));

            $("#containerChat #chat .innerContainer").append(addComentario);
        }
      


    });
}
function  addMessageToChat(otherUser){
    var arrayMensagens=[];
    var uid=0;
    $.ajax({
        type: 'post',
        url: '/miniframework/public/getMessagesChat',
       dataType:'json',
        data:'otherUser='+otherUser,
        async:false,
        success: data => {
             console.log(data);
             
        },
        error: error => {
            console.log(error);
        }

    }).done(data=>{
        arrayMensagens=data;
    });

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
    
 
    $("#containerChat #chat .innerContainer").html('');
    arrayMensagens.forEach(function(mensagem,key){
        var addComentario='';
        if(mensagem.sender== uid && mensagem.imageOrVideo != ""){
           
            addComentario=`
              <div value="`+mensagem.idMensagem+`" class="row send">
                   <img src="../public/img/uploads/conversas/`+mensagem.imageOrVideo+`">
              </div>
            `;

           

        }else if(mensagem.sender== uid){
            addComentario=`

                <div value="`+mensagem.idMensagem+`" class="row send">
                    <p>`+mensagem.message+`</p>
                </div>
            `;
            
        }else if(mensagem.imageOrVideo != ""){
            
            addComentario=`
             <div value="`+mensagem.idMensagem+`" class="row recieved">
                   <img src="../public/img/uploads/conversas/`+mensagem.imageOrVideo+`">
              </div>
            `

             
        }else{
            addComentario=`
                <div value="`+mensagem.idMensagem+`" class="row recieved">
                    <p>`+mensagem.message+`</p>
                </div>
             `;    

           
        }

        $("#chat .innerContainer").scrollTop($("#chat .innerContainer").prop('scrollHeight'));

        $("#containerChat #chat .innerContainer").append(addComentario);


    });

 
 
}

//funcao para mostrar o chat
function mostrarChat(){
    $('#containerChat').css({
        display:"block"
    })
    $('body,html').css({'overflow':'hidden'});
 }

//funcaoi para esconder o chat e retornar o scroll
function esconderChat(element){
    window.close(this);
   clearInterval(interval);
}


function addToContainerPesquisa(arrayusuario){
    arrayusuario.forEach(function(usuario, chave){
            var user = `
            <div class="row" onclick="$('#searchContainer').hide(); chat(`+usuario.id+`,'`+usuario.username+`')">
                <img src="../public/img/user/`+usuario.picture+`">
                <p style="color">`+usuario.username+`</p>
            </div>
        `;

        
        $('#containerChat #inbox #searchContainer').append(user);

    });
   
}


function chat(id,username,usuario){

    let user=null;
    $.ajax({
        type: 'post',
        url: '/miniframework/public/getusuario',
        data:'id='+id,
        dataType:'json',
        async:false,
        success: data => {
              console.log(data);
             
        },
        error: error => {
           // console.log(error);
        }

    }).done(data=>{
        user=data;
    });

    var dataStr= '';
   
   //transforma a date em anos dias mes
   $.ajax({

            url:'/miniframework/public/getDataString',
            type:'post',
            data:"data="+user.online,
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

    $("#userImg").attr('src','../public/img/user/'+user.picture);
    $("#nomeUsuario").html(user.name);
    $("#usuarioOnline").html(`Online ${dataStr}`);
    $("#usuarioCriacao").html(`Membro desde ${user.creation}`);

     $("#containerChat #chat").html(`
    <div class="topMenu">
        <img style="cursor:pointer;" src="../public/img/outros/close.png" onclick="fecharChat()">
        <p class="title">`+user.username+`</p>
    </div> 

    <div class="innerContainer"></div>
   <div>
        <form  method="post" enctype="multipart/form-data" id="sendMessage">
            <input id="inputOtherUser" type="number" name="otherUser"  value="`+id+`" hidden>
            <input type="text" name="message" placeholder="escreva sua menssagem"  id="messageInput" >
            <input type="file" name="image" accept="image/x-png,image/jpge,image/jpg" id="sendImage" hidden >
            <label for="sendImage"><img src="../public/img/outros/image.png"/></label>
        </form>
   </div>

    `);

    addMessageToChat(id);



 }


 function fecharChat(){
    var valor=0;
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
       valor=data;
    });

    let user=null;
    $.ajax({
        type: 'post',
        url: '/miniframework/public/getusuario',
        data:'id='+valor,
        dataType:'json',
        async:false,
        success: data => {
              console.log(data);
             
        },
        error: error => {
           // console.log(error);
        }

    }).done(data=>{
        user=data;
    });

    var dataStr= '';
   
   //transforma a date em anos dias mes
   $.ajax({

            url:'/miniframework/public/getDataString',
            type:'post',
            data:"data="+user.online,
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

    $("#userImg").attr('src','../public/img/user/'+user.picture);
    $("#nomeUsuario").html(user.name);
    $("#usuarioOnline").html(`Online ${dataStr}`);
    $("#usuarioCriacao").html(`Membro desde ${user.creation}`);

     console.log('entramos em fechar chat');

     $("#containerChat #chat").html(`
        <div class="empty">
            <img src="../public/img/outros/empty.png"/>
            <p>Selecione uma Conversa para falar com esse usuario</p>
        </div> 
    `);
 }

