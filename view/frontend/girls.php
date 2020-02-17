<?php
    $title = "Filles";
    require('header.php');
    require_once('model/database.php');
    $success = false;
?>
<!-- ------------------------- The contents of the page -------------------------- -->
<div >

 

    <div class="container rounded"  style="background-color: #f5f6fa;">
        <div class="mt-5">
            <a href="https://www.jeuxjeuxjeux.fr/jeu/sleeping-princess-nails-spa.html"><img class="img-fluid mx-auto d-block rounded " src="images/girls.jpg" alt="jeuxFille" ></a>
        </div>
        <div class="text mt-5" >
            <h4 class="mb-3 border-bottom mt-1">Sleeping Princess Nails Spa</h4> 
            <div class="mt-1">
                <h5 class="text-primary">Description :</h5>
                <p>Accueille la Belle au Bois Dormant dans ton salon ! Dans ce jeu de fille, pose de beaux ongles acryliques.Commence par frotter puis rincer les ongles de la belle.  <br>
                Coupe-les ensuite. Utilise les plus beaux motifs de fleurs et papillons dans Sleeping Princess Nails Spa !</p>
            </div>
        </div>


        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>

    <!-- --------------------------- Add a new comment ----------------------------- -->
    <?php if(!empty($add)): ?>
            <div class="alert alert-success"><?= $add?></div>
        <?php endif ?>
        
        <?php if(!isset($_GET['update'])): ?>
            <h4 class="mt-5 mb-4 rounded" style="text-shadow: 3px 2px lightgray">Laisser un Commentaires</h4>
            <form action="?action=girls.php&add=1" method="POST">
                <div class="form-group rounded">
                    <label for="username">Votre Pseudo</label>
                    <input class="form-control rounded" type="text" name="username" placeholder="Entrer votre pseudo">
                    <label class="mt-3 rounded" for="comment">Votre Commentaire</label>
                    <textarea class="form-control rounded" name="comment" rows="4" placeholder="Entrer votre commentaire"></textarea>        
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary mb-4">Envoyer</button>
                </div>
            </form>
        <?php endif ?>
    <!-- --------------------------- Show the comments ----------------------------- -->
        <h4 class="mt-5" style="text-shadow: 3px 2px lightgray">Commentaires</h4>
        <?php foreach ($datas as $data):?>
            <!-- if the user clicked the button of change the text, show the area corresponding the changing -->
            <?php if((!empty($_GET['update'])) && ($data['id'] == $_GET['update'])): ?>
                <form action="?action=girls.php&update=<?= $data["id"] ?>" method="POST">
                    <div class="form-group mt-4">
                        <input class="form-control" name="newusername" type="text" value="<?= $data['Username'] ?>">
                        <textarea class="form-control" name="newcomment" rows="4"><?= ($data['Comment']) ?></textarea>
                        <button type="submit" class="btn btn-outline-success btn-sm">Sauvgarder</button>
                        <a href="?action=girls.php" class="btn btn-outline-danger btn-sm">Annuler</a>
                    </div>
                </form>
            <!-- else show the comments -->
            <?php else: ?>
                <?php if(!empty($update)): ?>
                    <div class="alert alert-success"><?= $update?></div>
                <?php endif ?>
                <div class="card border-secondary mt-3">
                    <div class="card-header">
                        <strong><?= htmlspecialchars($data['Username'])?></strong> le <?= $data['InscriptionDate'] ?>
                    </div>
                    <div class="card-body card-text">
                        <?= nl2br(htmlspecialchars($data['Comment'])) ?>
                    </div>
                </div>
                <?php if(empty($_GET['update'])): ?>
                    <a href="?action=girls.php&update=<?= $data["id"] ?>" class="btn btn-outline-primary btn-sm">Modifier</a>
                    <a href="?action=girls.php&delete=<?= $data["id"] ?>" class="btn btn-outline-danger btn-sm">Supprimer</a>
                <?php endif ?>
            <?php endif ?>
        <?php endforeach ?>
</div>
<?php require('footer.php'); ?> 
