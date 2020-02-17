<?php
    $title = "Voitures";
    require('header.php');
    require_once('model/database.php');
    $success = false;
?>
<!-- <<pre>
    <?= print_r($_GET); ?>
</pre>
<pre>
    <?= print_r($_SESSION); ?>
</pre> -->
<!-- <pre>
    <?= print_r($datas); ?>
</pre> 
<pre>
    <?= print_r($subcomments); ?>
</pre>  -->
<!-- ------------------------ The contents of the page ------------------------- -->
<body style="background-image: url(images/img-glob.jpg); background-repeat:no-repeat; background-attachment: fixed;">
    <div class="container bg-light">
        <div class="mt-5 w-100 h-100 pt-3">
            <a href="https://www.jeuxjeuxjeux.fr/jeu/speed-racing-pro-2.html"><img class="img-fluid mx-auto d-block w-100" src="images/car.jpg" alt="jeuxVoiture"></a>
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
    </div>
<!-- comments --------------------------------------------------------------------- -->
    <div class="container bg-light">
        <?php if(!empty($add)): ?>
            <div class="alert alert-success"><?= $add ?></div>
        <?php endif ?>
        <?php if(isset($_SESSION['errors'])): ?>
            <div class="alert alert-danger"><?= $_SESSION['errors'] ?></div>
        <?php endif ?>
<!-- Show the comments ------------------------------------------------------------ -->
        <h2 class="mt-5 p-4 text-start border-bottom" style="text-shadow: 3px 2px lightgray">Commentaires</h2>
        <?php foreach ($datas as $data):?>
            <div class="row">
                <div class="col-md-6 offset-md-3"> 
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
<!-- else show the comments ------------------------------------------------------- -->
                    <?php else : ?>
                        <div class="mt-2">
                            <h6><strong class="text-primary"><?= htmlspecialchars($data['Username'])?></strong></h6>
                            <small class="form-text text-muted"><?= $data['InscriptionDate'] ?></small>
                            <div class="my-3">
                                <?= nl2br(htmlspecialchars($data['Comment'])) ?>
                            </div>
                            <img src="<?= ($data['ImageSrc']) ?>" width="100%" alt="Images of the game score" class="mb-1">
                        </div>
<!-- Shows the total like numbers ------------------------------------------------ -->
                        <?php if($data["LikeNumber"] != 0) : ?>
                            <img src="https://img.icons8.com/ultraviolet/20/000000/good-quality.png"> <?= $data["LikeNumber"]; ?>
                        <?php endif ?>
<!-- Shows the total heart numbers ----------------------------------------------- -->
                        <?php if($data["HeartNumber"] != 0) : ?>
                            <img class="ml-2" src="https://img.icons8.com/flat_round/20/000000/hearts.png"> <?= $data["HeartNumber"]; ?>
                        <?php endif ?>
                        <div class="border bg-secondary mt-2"></div>
<!-- If the user have sign in, shows the buttons of like, comment and modifying -- -->
                        <?php if(empty($_GET["update"]) && isset($_SESSION["userInfo"])) : ?>
                            <div class="">
                                <!-- Like icon -->
                                <?php if($data["likeSelected"] == 1) : ?>
                                    <a href="?action=cars.php&update=<?= $data["id"] ?>&like=<?= $data["LikeNumber"] ?>&likeSelected=<?= $data["likeSelected"] ?>" class="btn btn-primary btn-sm px-4">
                                        <img src="https://img.icons8.com/ultraviolet/20/000000/good-quality.png"> J'aime
                                    </a>
                                <?php else : ?>
                                    <a href="?action=cars.php&update=<?= $data["id"] ?>&like=<?= $data["LikeNumber"] ?>&likeSelected=<?= $data["likeSelected"] ?>" class="btn btn-outline-light btn-sm px-4">
                                        <img src="https://img.icons8.com/ultraviolet/20/000000/good-quality.png"> J'aime
                                    </a>
                                <?php endif ?>
                                <!-- Heart icon -->
                                <?php if($data["heartSelected"] == 1) : ?>
                                    <a href="?action=cars.php&update=<?= $data["id"] ?>&heart=<?= $data["HeartNumber"] ?>&heartSelected=<?= $data["heartSelected"] ?>" class="btn btn-danger btn-sm px-4">
                                        <img src="https://img.icons8.com/flat_round/20/000000/hearts.png"> J'adore
                                    </a>
                                <?php else : ?>
                                    <a href="?action=cars.php&update=<?= $data["id"] ?>&heart=<?= $data["HeartNumber"] ?>&heartSelected=<?= $data["heartSelected"] ?>" class="btn btn-outline-light btn-sm px-4">
                                        <img src="https://img.icons8.com/flat_round/20/000000/hearts.png"> J'adore
                                    </a>
                                <?php endif ?>
                                <?php if ($_SESSION["userInfo"]["Username"] == $data["Username"]) : ?>
                                    <!-- Modify the comment -->
                                    <a href="?action=cars.php&update=<?= $data["id"] ?>" class="btn btn-outline-light btn-sm px-4">
                                        <img src="https://img.icons8.com/ios/20/000000/edit-chat-history.png"> Modifier
                                    </a>
                                    <!-- Delete the comment -->
                                    <a href="?action=cars.php&delete=<?= $data["id"] ?>" class="btn btn-outline-light btn-sm px-4">
                                        <img src="https://img.icons8.com/ios/20/000000/delete-chat.png"> Supprimer
                                    </a>
                                <?php endif ?>
                            </div>
                            <div class="border bg-secondary mb-3"></div>
                        <?php endif ?>
<!-- Shows the sub comments ------------------------------------------------------- -->
                        <?php foreach ($subcomments as $subcomment):?>
                            <?php if($data["id"] == $subcomment["comment_id"]) : ?>
                                <div class="p-2 mb-3" style="background-color: lightgray; ">
                                    <strong class="text-info"><?= htmlspecialchars($subcomment["username"])?> : </strong>
                                    <small>  <?= nl2br(htmlspecialchars($subcomment["sub_comment"])) ?></small> 
                                </div>
                            <?php endif ?>
                        <?php endforeach ?>
                        <?php if(empty($_GET["update"]) && isset($_SESSION["userInfo"])) : ?>
                            <form class="mb-3 form-inline" action="?action=cars.php&subcomment=<?= $data["id"] ?>" method="POST">
                                <input class="bg-light pb-1 form-control" style="width: 85%" type="text" name="subcomment" placeholder=" Votre commentaire...">
                                <button type="submit" class="form-control btn btn-outline-primary btn-sm pt-1">Publier</button>
                            </form>
                        <?php endif ?>
                    <?php endif ?>
                </div>
            </div>
            <div class="border bg-secondary p-1"></div>
        <?php endforeach ?>
    <!-- </div> -->
<!-- Add a new comment ------------------------------------------------------------ -->
    <!-- <div class="container bg-light"> -->
        <div class="row mt-3">
            <div class="col-md-6 offset-md-3"> 
                <?php if(!isset($_GET["update"])): ?>
                    <h4 class="mt-5 mb-4" style="text-shadow: 3px 2px lightgray">Laisser un Commentaires</h4>
                    <form action="?action=cars.php&add=1" method="POST" enctype="multipart/form-data">
                        <?php if (!isset($_SESSION["userInfo"])) : ?>
                            <h5>Veuillez se connecter pour faire un commentaire</h5>
                        <?php else : ?>
                            <h6><strong><?= $_SESSION["userInfo"]["Username"] ?></strong></h6>
                            <div class="form-group">
                                <!-- <label class="mt-3" for="comment">Votre Commentaire</label> -->
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
    </div>
    
<?php require('footer.php'); ?> 
