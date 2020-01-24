<?php
    $title = "Voitures";
    require('header.php');
    require_once('model/database.php');
    $success = false;
?>
<!-- <pre>
    <?= print_r($_GET); ?>
</pre>
<pre>
    <?= print_r($_SESSION); ?>
</pre> -->
<!-- <pre>
    <?= print_r($datas); ?>
</pre> -->
<!-- ------------------------ The contents of the page ------------------------- -->
<div class="container">
    <div class="mt-5">
        <a href="https://www.jeuxjeuxjeux.fr/jeu/speed-racing-pro-2.html"><img class="img-fluid mx-auto d-block" src="images/car.jpg" alt="jeuxVoiture"></a>
    </div>
    <div class=" mt-5" >
        <h4 class="mb-3 border-bottom mt-1">Speed Racing Pro 2 </h4> 
        <div class="mt-1">
            <h5 class="text-primary">Description :</h5>
            <p>Vous pouvez choisir la façon dont tu défieras tes adversaires dans ce jeu de course cool. Affronte-les dans le mode Time Attack, dans une course <br>
            d'élimination, et bien plus encore.</p>
        </div>

        <h5 class="text-primary">Commandes de jeu : </h5>
    
        <img src="images/touvheDeJeu.PNG" alt="imageTouche" >
    </div>

<!-- -------------------------------- comments --------------------------------- -->
    <?php if(!empty($add)): ?>
        <div class="alert alert-success"><?= $add?></div>
    <?php endif ?>
    <?php if(isset($_SESSION['errors'])): ?>
        <div class="alert alert-danger"><?= $_SESSION['errors'] ?></div>
    <?php endif ?>
    <div class="row">
        <div class="col-md-6 offset-md-3">
<!-- --------------------------- Show the comments ----------------------------- -->
            <h4 class="mt-5" style="text-shadow: 3px 2px lightgray">Commentaires</h4>
            <?php foreach ($datas as $data):?>
                <!-- if the user clicked the button of change the text, show the area corresponding the changing -->
                <?php if((!empty($_GET['update'])) && ($data['id'] == $_GET['update'])): ?>
                    <form action="?action=cars.php&update=<?= $data["id"] ?>" method="POST">
                        <div class="form-group mt-4">
                            <h6><strong><?= $_SESSION['userInfo']['Username'] ?></strong></h6>
                            <textarea class="form-control" name="newcomment" rows="5"><?= ($data['Comment']) ?></textarea>
                            <button type="submit" class="btn btn-outline-success btn-sm">Sauvgarder</button>
                            <a href="?action=cars.php" class="btn btn-outline-danger btn-sm">Annuler</a>
                        </div>
                    </form>
                <!-- else show the comments -->
                <?php else: ?>
                    
                    <div class="card border-secondary mt-5">
                        <div class="card-header">
                            <strong><?= htmlspecialchars($data['Username'])?></strong> le <?= $data['InscriptionDate'] ?>
                        </div>
                        <img src="<?= ($data['ImageSrc']) ?>" width="100%" height="40%" alt="photo">
                        <div class="card-body card-text">
                            <?= nl2br(htmlspecialchars($data['Comment'])) ?>
                        </div>
                    </div>
                    <?php if(empty($_GET['update']) && isset($_SESSION['userInfo']) && ($_SESSION['userInfo']['Username'] == $data['Username'])) : ?>
                        <a href="?action=cars.php&update=<?= $data["id"] ?>" class="btn btn-outline-primary btn-sm">Modifier</a>
                        <a href="?action=cars.php&delete=<?= $data["id"] ?>" class="btn btn-outline-danger btn-sm">Supprimer</a>
                    <?php endif ?>
                <?php endif ?>
            <?php endforeach ?>
<!-- --------------------------- Add a new comment ----------------------------- -->
            <?php if(!isset($_GET['update'])): ?>
                <h4 class="mt-5 mb-4" style="text-shadow: 3px 2px lightgray">Laisser un Commentaires</h4>
                <form action="?action=cars.php&add=1" method="POST" enctype="multipart/form-data">
                    <?php if (!isset($_SESSION['userInfo'])) : ?>
                        <h5>Veuillez se connecter pour faire un commentaire</h5>
                    <?php else : ?>
                        <h6><strong><?= $_SESSION['userInfo']['Username'] ?></strong></h6>
                        <div class="form-group">
                            <label class="mt-3" for="comment">Votre Commentaire</label>
                            <textarea class="form-control" name="comment" rows="7" placeholder="Entrer votre commentaire"></textarea> 
                        </div> 
                        <input class="mb-3" type="file" name="img">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary mb-4">Envoyer</button>
                        </div>
                    <?php endif ?>
                </form>
            <?php endif ?>
        </div>
    </div>
 
<?php require('footer.php'); ?> 
