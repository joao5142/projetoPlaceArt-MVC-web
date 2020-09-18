<?php foreach ($this->view->postagens as $indice => $postagem) { ?>
				<div id="tweet" class="row tweet">
					<div class="col">
						<p><strong><?= $tweet['nome'] ?></strong><small> <span class="text text-muted">- <?= $tweet['data'] ?></span></small></p>
						<p><?= $tweet['tweet'] ?></p>
						<br />
						<?php if ($tweet['id_usuario'] == $_SESSION['id']) { ?>
							<form>
								<div class="col d-flex justify-content-end">
									<a href="/remover?id_remover=<?= $tweet['id'] ?>" class="btn btn-danger"><small>Remover</small></a>
								</div>
							</form>
						<?php } ?>
					</div>
				</div>


<?php } ?> 
 