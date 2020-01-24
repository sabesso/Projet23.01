<?php
    $title = "Reset";
    require('header.php');
    require_once('model/database.php');
    $success = false;
?>

    <div class="container">
    <h1>Mot de passe oublié </h1>
    
    <form action="?action=forget.php" method="POST">

        <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" class="form-control" id="idEmail1" name="email" aria-describedby="emailHelp" placeholder="Votre email" >
        </div>

        <button type="submit" name='formsend' class="btn btn-primary">Se connecter</button>

    </form>
    </div>