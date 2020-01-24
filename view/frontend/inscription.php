<?php
    $title = "Se Connecter";
    require('header.php');
?>
<pre>
  <?= print_r($_SESSION); ?>
</pre>
<!-- <?php if(!isset($_SESSION['connection'])) : ?> -->
<!-- <?php endif ?> -->

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
<!-- *------------------* show the errors *------------------* -->
      <?php if(!empty($_SESSION['errors'])): ?>
        <div class="alert alert-danger">
          <p><?= $_SESSION['errors'] ?></p>
        </div>
      <?php endif; ?> 
<!-- *------------------* success register *-----------------* -->
      <?php if(isset($_SESSION['confirm'])) : ?>
        <h4 class="alert alert-success"><?= $_SESSION['confirm'] ?></h4>
      <?php else : ?>
<!-- *---------------* field of the register *---------------* -->
        <h2>Créer un compte</h2>
        <form class="" action="?action=inscription.php" method="POST">
          <div class="form-group">
              <div class="form-group">
                <label for="name">Pseudo</label>
                <input class="form-control mb-3" type="text" name="logupusername" placeholder="Votre pseudo" value="<?php if(!empty($_POST['logupusername'])) echo htmlentities($_POST['logupusername']) ?>" required>
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              
              <div class="form-group">
                <label for="name">Mail</label>
                <input class="form-control mb-3" type="email" name="logupemail" placeholder="Ex. email@example.com" value="<?php if(!empty($_POST['logupemail'])) echo htmlentities($_POST['logupemail']) ?>" required>
              </div>

              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input class="form-control mb-3" type="password" name="loguppassword" placeholder="Votre mot de passe" required>
              </div>

              <div class="form-group">
                <label for="password">Confirmation du mot de passe</label>
                <input class="form-control mb-3" type="password" name="repeatpassword" placeholder="Confirmez votre mot de passe" required>
              </div>
              <button class="btn btn-primary my-2 my-sm-0 mr-2" type="submit" name="register"><strong>JE M'INSCRIS</strong></button>
          </div>
        </form>
       <?php endif ?> 
    </div>
  </div>
</div>

<?php require('footer.php'); ?>