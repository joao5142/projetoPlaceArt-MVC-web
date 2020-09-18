
			///////////PAGINA DE LOGIN E REGISTRO/////////////
$(document).ready(()=>{
            $('#inscreverse').hide();

			$("#formRegistro").on('submit', (e) => {
				e.preventDefault();

				var dados = $(e.target).serialize();
				$.ajax({
					type: 'post',
					url: '/miniframework/public/registrar',
					data: dados,
					success: data => {


						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Cadastro feito com sucesso',
							showConfirmButton: false,
							timer: 1500
						})

						$(".register").hide();
						$(".login").fadeIn(2000);


					},
					error: error => {
						Swal.fire({
							title: 'Opps!',
							text: error.statusText,
							icon: 'error',
							html: error.statusText,
						});
					}


				});
			});
        });