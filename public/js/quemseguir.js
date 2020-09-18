$(document).ready(()=>{
    var offset = 0;
	$("#pesquisarPor,#pesquisarPorTimeline").keyup((e) => {
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
					$(".serchContainerMenu").remove();;

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
						for (var i = 0; i <= 3; i++) {
							var conteudo = `
									<div class="row serchContainerMenu mb-4">
													<div class="` + (attr == "pesquisarPorTimeline" ? 'col' : 'col-md-8') + ` searchContainer">
														<img src="../public/img/user/` + data[i].picture + `">
														<p>` + data[i].name + `</p>
														
													</div>
												
													<!-- <div class="col-md-4 d-flex justify-content-end">
														<div>
															
														</div>
													</div> -->
												
									</div>
									`;

							$("#containerPesquisa,#containerPesquisaLateral").prepend(conteudo);
						}

					},
					error: error => {
						console.log(error.responseText);
					}

				});
    });
            
    
});