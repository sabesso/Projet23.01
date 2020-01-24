
<?php

    require ('function.php');
    require ('header.php');
    if(session_status() == PHP_SESSION_NONE){
        session_start();
    }
?>
<?php 
extract($_POST);
var_dump($_POST);


    if(!empty($_POST) && !empty($email)){
        
        require_once('model/database.php');
        $req=$dbco->prepare("SELECT * FROM users WHERE email= ? ");
       
        $req->execute([$email]);
        $user= $req->fetch();
      
        

        if(!empty($user)){
           // print_r($user);
            $reset_token = str_random(60);
            $req = $dbco->prepare('UPDATE users SET reset_token = ? WHERE id= ?')->execute([$reset_token, $user['id']]);
            $_SESSION['flash']['success'] = 'Les instructions de rappel de mot de passe vous ont été envoyées par email';
            mail($email,"Réinitialisation de votre compte","afin de réinitialer votre mot de passe merci de cliquer sur ce lien\n\nhttp://127.0.0.1/projet-php/hi/index.php?action=reset.php&id={$user['id']}&token=$reset_token");
        
             header('Location: index.php?action=login.php');
            exit();
        }else{

        $_SESSION['flash']['danger'] = 'aucun compte ne correspond a cette adresse ';
        echo' md,dfv,fknbigfnkij';

        }

    }


?>













<h1>Mot de passe oublié </h1>

<div class='container'>
  <form action="" method="POST">

  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control" id="idEmail1" name="email" aria-describedby="emailHelp" placeholder="Votre email" >
  </div>

    <button type="submit" name='formsend' class="btn btn-primary">Se connecter</button>

  </form>
</div>
