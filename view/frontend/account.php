<?php require('header.php'); ?>

<pre>
    <?php print_r($_SESSION); ?>
</pre>

<!-- --------------------------- shows the profil ---------------------------- -->
<div class="container">
    <div class="row">
        <div class="col-md-8 mx-auto">
            <div class="card">
                <!-- *------------------* show the errors *------------------* -->
                <?php if(isset($_SESSION['updateerrors'])): ?>
                    <div class="alert alert-danger">
                        <p><?= $_SESSION['updateerrors'] ?></p>
                    </div>
                <?php endif; ?> 
                <!-- *------------------* success updating *-----------------* -->
                <!-- <?php if(!empty($_SESSION['updateconfirm'])) : ?> -->
                    <h4 class="alert alert-success text-center w-100"><?= $_SESSION['updateconfirm'] ?></h4>
                <!-- <?php endif; ?> -->
                <!-- ----* if the information has been updating don't show the content *--- -->
                <?php if (isset($_SESSION['userInfo'])) : ?>
                    <div class="card-header">
                        <h3><strong><?= $_SESSION['userInfo']['Username'] ?></strong></h3>
                    </div>
                    <!-- show if update button is clicked or it has been successfuly updated -->
                    <?php if (isset($_GET['modify']) || isset($_SESSION['updateerrors'])) : ?>
                        <div class="col-md-8 mx-auto">
                            <form action="?action=account.php&update=<?= $_SESSION['userInfo']['id'] ?>" method="POST">
                                <div class="form-group">
                                    <label for="name">Mail</label>
                                    <input class="form-control mb-3" type="email" name="updateemail" value="<?= htmlentities($_SESSION['userInfo']['Email']) ?>" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Mot de passe</label>
                                    <input class="form-control mb-3" type="password" name="updatepassword" placeholder="Votre mot de passe" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Confirmation du mot de passe</label>
                                    <input class="form-control" type="password" name="repeatpassword" placeholder="Confirmez votre mot de passe" required>
                                </div>
                                <button type="submit" class="btn btn-outline-success btn-sm mb-3">Sauvgarder</button>
                                <a href="?action=account.php" class="btn btn-outline-danger btn-sm mb-3">Annuler</a>
                            </form>
                        </div>
                    <!-- *-------------* else show the button update *-------------* -->
                    <?php else : ?>
                        <div class="card-body card-text">
                            <h6>Email : <?= $_SESSION['userInfo']['Email'] ?></h6>
                            <h6>Comments : <?= $_SESSION['userInfo']['Comment'] ?></h6>
                            <a href="?action=account.php&modify=<?= $_SESSION['userInfo']['id'] ?>" class="btn btn-primary card-link">Modifier</a>
                        </div>
                    <?php endif ?>
                <?php endif ?>
            </div>
        </div>
    </div>
</div>


