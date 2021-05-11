$(document).ready(()=>{
    var offset = 0;
	$("#pesquisarPor").keyup((e) => {
		$("#containerPesquisa").html("");
				console.log('esntrou no ajax');

				var dados = $(e.target).closest('form').serialize();

				var attr = e.target.getAttribute('id');
				console.log("Nome id : " + attr);

			
			
				$.ajax({
					type: 'post',
					url: '/miniframework/public/pesquisarpor',
					data: dados,
					dataType: 'json',
					success: data => {
						console.log(data);


						//coloco os usuarios achados na div
						for (var i = 0; i <= 3; i++) {
							var conteudo = `
									<div class="row serchContainerMenu mb-4">
													<div class="` + (attr == "pesquisarPorTimeline" ? 'col' : 'col-md-8') + ` searchContainer">
														<img style="cursor:pointer;" onclick="location.href ='/miniframework/public/perfil?idUsuario=`+data[i].id+`'" src="../public/img/user/` + data[i].picture + `">
														<p style="cursor:pointer;" onclick="location.href='/miniframework/public/perfil?idUsuario=`+data[i].id+`'">` + data[i].name + `</p>
														
													</div>
												
													<!-- <div class="col-md-4 d-flex justify-content-end">
														<div>
															
														</div>
													</div> -->
												
									</div>
									`;

							$("#containerPesquisa").prepend(conteudo);
						}

					},
					error: error => {
						console.log(error.responseText);
					}

				});
	});
	

	$("#pesquisarPorTimeline").keyup((e) => {
		$("#containerPesquisaLateral").html("");
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
					$("#pesquisarPorTimeline .serchContainerMenu").remove();;

					if (attr == "pesquisarPorTimeline") {
						$("#pesquisaLateral").hide();
					}
				}
				$.ajax({
					type: 'post',
					url: '/miniframework/public/pesquisarpor',
					data: dados,
					dataType: 'json',
					success: data => {
						console.log(data);


						//coloco os usuarios achados na div
						for (var i = 0; i <= 4; i++) {
							var conteudo = `
									<div class="row serchContainerMenu mb-4">
													<div class="` + (attr == "pesquisarPorTimeline" ? 'col' : 'col-md-8') + ` searchContainer">
														<img style="cursor:pointer;" onclick="location.href ='/miniframework/public/perfil?idUsuario=`+data[i].id+`'" src="../public/img/user/` + data[i].picture + `">
														<p style="cursor:pointer;" onclick="location.href='/miniframework/public/perfil?idUsuario=`+data[i].id+`'">` + data[i].name + `</p>
														
													</div>
												
													<!-- <div class="col-md-4 d-flex justify-content-end">
														<div>
															
														</div>
													</div> -->
												
									</div>
									`;

							$("#containerPesquisaLateral").prepend(conteudo);
						}

					},
					error: error => {
						console.log(error.responseText);
					}

				});
    });
            
    
});



$("#pesquisarPorAmigos").on('keyup',(e) => {
	 console.log('estamos em pesquisaramigos');

	var dados = $(e.target).closest('form').serialize();

	$("#containerSeusAmigos").html('');
	 
	$.ajax({
		type: 'post',
		url: '/miniframework/public/pesquisarporamigos',
		data: dados,
		dataType: 'json',
		success: data => {
			console.log(data);


			//coloco os usuarios achados na div
			 data.forEach(usuario => {
				 console.log();

				var ele= "";

				  if(usuario.onlineSN=='s'){ 
						 ele = `<p class="textUserSeguir" ><i style="color: greenyellow;" class="fas fa-circle"></i> Online  a <?=$comentarios->timing(strtotime($user['online'])) ?> </p>`
					}else{  

						ele=`<p class="textUserSeguir" ><i style="color: #777;" class="fas fa-circle"></i> Offline </p>`;

					} 
				 
		
				var conteudo = `
				 
					<div class="row serchContainerMenu mb-4">
						<div class="searchContainer col">
							<img style="cursor:pointer;" onclick="location.href='/miniframework/public/perfil?idUsuario=`+usuario.id+`'"  src="../public/img/user/`+usuario.picture+`">
							`+ ele+`
						</div>


					</div>
			 
						`;

				$("#containerSeusAmigos").prepend(conteudo);
			});

		},
		error: error => {
			console.log(error.responseText);
		}

	});
});

