<?php
    $title = "Reset";
    require('header.php');
    require_once('model/database.php');
    $success = false;
?>
<pre>
<?= var_dump($_GET); ?>
</pre>
<pre>
    <?= var_dump($_POST); ?>
</pre>

    <div class="container">

        <!-- *------------------* success register *-----------------* -->
        <?php if(isset($_SESSION['success'])) : ?>
                <h4 class="alert alert-success text-center w-100"><?= $_SESSION['success'] ?></h4>
        <!-- *------------------* show the errors *------------------* -->
        <?php else : ?>
            <?php if(isset($_SESSION['danger'] )) : ?>
                <div class="alert alert-danger"><?= $_SESSION['danger'] ?></p></div>
            <?php endif ?>
            <?php if(isset($_GET['id']) && isset($_GET['token'])) : ?>
                <?php 
                    $_SESSION['id'] = $_GET['id'];
                    $_SESSION['token'] = $_GET['token'];
                ?>
                <h1>Réinitialiser mon mot de passe</h1>
                <form action="?action=forget.php" method="POST">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Mot de passe </label>
                        <input type="password" class="form-control" name="password1" placeholder="Password"  required>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Confirmation du mot de passe</label>
                        <input type="password" class="form-control" name="password2" placeholder="Password"  required>
                    </div>
                    <button type="submit" class="btn btn-primary" name="resetpass">Réinitialiser votre mot de passe</button>
                </form>
            <?php else : ?> 
                <h1>Mot de passe oublié </h1>
                <form action="?action=forget.php" method="POST">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Votre email" >
                    </div>
                    <button type="submit" name='resetmail' class="btn btn-primary">Envoyer</button>
                </form>
            <?php endif ?>
        <?php endif ?>
    </div>