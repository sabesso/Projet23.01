<?php
    $title = "Moto";
    require('header.php');
    require_once('model/database.php');
?>
<!-- ------------------------- The contents of the page -------------------------- -->
<div class="container">
    <div class=" mt-5">
        <a href="http://www.jeuxjeuxjeux.fr/jeu/bike-ride.html"><img class="img-fluid mx-auto d-block" src="images/motobike.jpg" alt="jeuxVoiture" ></a>
    </div>
    <div class="text mt-5" >
        <h4 class="mb-3 border-bottom mt-1">Bike Ride</h4> 
        <div class="mt-1">
            <h5 class="text-primary">Description :</h5>
            <p>Vous pouvez choisir la façon dont tu défieras tes adversaires dans ce jeu de course cool. Affronte-les dans le mode Time Attack, dans une course <br>
            d'élimination, et bien plus encore.</p>
        </div>

        <h5 class="text-primary">Commandes de jeu : </h5>
        <img src="images/touvheDeJeu.PNG" alt="imageTouche" >
    </div>
<!-- --------------------------- Add a new comment ----------------------------- -->
<?php if(!empty($add)): ?>
        <div class="alert alert-success"><?= $add?></div>
    <?php endif ?>
    
    <?php if(!isset($_GET['update'])): ?>
        <h4 class="mt-5 mb-4" style="text-shadow: 3px 2px lightgray">Laisser un Commentaires</h4>
        <form action="?action=motobike.php&add=1" method="POST">
            <div class="form-group">
                <label for="username">Votre Pseudo</label>
                <input class="form-control" type="text" name="username" placeholder="Entrer votre pseudo">
                <label class="mt-3" for="comment">Votre Commentaire</label>
                <textarea class="form-control" name="comment" rows="4" placeholder="Entrer votre commentaire"></textarea>        
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
            <form action="?action=motobike.php&update=<?= $data["id"] ?>" method="POST">
                <div class="form-group mt-4">
                    <input class="form-control" name="newusername" type="text" value="<?= $data['Username'] ?>">
                    <textarea class="form-control" name="newcomment" rows="4"><?= ($data['Comment']) ?></textarea>
                    <button type="submit" class="btn btn-outline-success btn-sm">Sauvgarder</button>
                    <a href="?action=cars.php" class="btn btn-outline-danger btn-sm">Annuler</a>
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
                <a href="?action=cars.php&update=<?= $data["id"] ?>" class="btn btn-outline-primary btn-sm">Modifier</a>
                <a href="?action=cars.php&delete=<?= $data["id"] ?>" class="btn btn-outline-danger btn-sm">Supprimer</a>
            <?php endif ?>
        <?php endif ?>
    <?php endforeach ?>
 
<?php require('footer.php'); ?> 
 
