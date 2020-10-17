
			///////////PAGINA DE LOGIN E REGISTRO/////////////
$(document).ready(()=>{
			$('#inscreverse').hide();
			$("#errorCadastro").hide();

			$("#formRegistro").on('submit', (e) => {
				e.preventDefault();

				var dados = $(e.target).serialize();
				$.ajax({
					type: 'post',
					url: '/miniframework/public/registrar',
					data: dados,
					async:false,
					success: data => {

						$("#errorCadastro").html('Cadastro Realizado com sucesso!');
						if($("#errorCadastro").hasClass('text-danger')){
							$("#errorCadastro").removeClass('text-danger');
						}
						$("#errorCadastro").addClass('text-success');
						$("#errorCadastro").show();
						$('html,body').css({
							overflow:'hidden',
						});

						setTimeout(function(){
							$(".register").hide();
							$(".login").fadeIn(2000);  
						},3000);
					  

						

					},
					error: error => {
						//$("#errorCadastro").html(error.statusText);
					
						if($("#errorCadastro").hasClass('text-success')){
							$("#errorCadastro").removeClass('text-success');
						}
						$("#errorCadastro").addClass('text-danger');
						$("#errorCadastro").html('Error no Cadastro verique os campos!');


						$("#errorCadastro").show();
						$('html,body').css({
							overflow:'hidden',
						});

					}


				});

			});
});