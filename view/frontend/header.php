<?php require_once('menu.php');

if(session_status() == PHP_SESSION_NONE){
    session_start();
}

?>
        
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
        <link rel="stylesheet" href="public/css/style.css">
        <meta name="generator" content="Jekyll v3.8.5">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
        <title>
            <?php
                if (isset($title)):
                    echo $title;
                else:
                    echo 'Mon Site';
                endif
            ?>
        </title>

        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body class="position-relative">
        <!-- Navigation -->
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="#"><img src="images/logo1.png" alt="" style="width: 40%"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarItems">
                <ul class="navbar-nav mr-auto">
                    <?= nav_menu('nav-link'); ?>
                    <!-- <li class="nav-item d-flex justify-content-end<?php if($_GET['action'] == 'inscription.php'): ?> active <?php endif ?>">
                        <a class="nav-link" href="?action=inscription.php">Se Connecter</a>
                    </li> -->
                </ul>
            </div>
<!-- *----------------------* navbar connection *----------------------* -->
<!-- *----* if don't clicked inscription or don't connected *----------* -->
            <?php if(!isset($_SESSION['logup'])) : ?>   
                <?php if(!isset($_SESSION['userInfo'])) : ?>
                    <div collapse navbar-collapse> 
                        <form class="form-inline mt-2 mt-md-0 p-0 m-0" action="?action=<?= $_GET['action'] ?>" method="POST">
<!-- *----------------* if there are errors of the login *--------------* -->
                            <!-- <?php if (isset($_SESSION['loginerror'])) : ?>
                                <p class="mr-1 my-auto" style="background-color: lightgray"> <?= $_SESSION['loginerror'] ?><a href="?action=forget.php">J'ai oublié mon mot de pass</a></p>
                            <?php endif ?> -->
                            <!-- <input class="form-control-sm mr-sm-2" type="text" name="loginusername" placeholder="Pseudo" value="<?php if(!empty($_POST['loginusername'])) echo htmlentities($_POST['loginusername']) ?>"> -->
                            <!-- <input class="form-control-sm mr-sm-2" type="password" name="loginpassword" placeholder="Mot de passe" value="<?php if(!empty($_POST['loginpassword'])) echo htmlentities($_POST['loginpassword']) ?>"> -->
                            <!-- <a href="?action=<?= $_GET['action'] ?>&login" class="btn btn-primary btn-sm mr-2">Se connecter</a> -->
                            <!-- <button class="btn btn-primary btn-sm my-2 my-sm-0 mr-2" type="submit" name="login">Se connecter</button> -->
                            <a href="?action=seconnecter.php" class="btn btn-primary btn-sm mr-2">Se connecter</a>

                            <a href="?action=inscription.php&logup" class="btn btn-primary btn-sm mr-2">Inscrivez-vous</a>
                            <!-- <button class="btn btn-primary btn-sm my-2 my-sm-0 mr-2" name="logup" type="submit">Inscrivez-vous</button> -->
                        </form>
<!-- *----------------------* else if connected *----------------------* -->
                <?php elseif(isset($_SESSION['userInfo'])) : ?>
                        <form class="form-inline mt-2 mt-md-0 p-0" action="?action=<?= $_GET['action'] ?>" method="POST">
                            <p class="my-auto mr-3" style="color: white">Bienvenue <strong><?= $_SESSION['userInfo']['Username'] ?></strong></p>
                            <a href="?action=account.php" class="btn btn-outline-warning btn-sm mr-1">Mon Profil</a>
                            
                            <button class="btn btn-outline-warning btn-sm" name="logout" type="submit">Se déconnecter</button>
                            <!-- <button class="btn btn-outline-warning btn-sm" name="logout" type="submit">Mon Profil</button> -->
                        </form>
                    </div>
                <?php endif ?>
            <?php endif ?>
         
        </nav>

     
        




<!-- <div class="dropdown">
    <button class="btn btn-outline-warning btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Menu
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href='index.php?action=account.php'>Mon Profil</a>
        <a class="dropdown-item" href='index.php?action=index.php&logout'>Se déconnecter</a>
    </div>
</div> -->
<?php
if(isset($_SESSION['flash'])):
    foreach($_SESSION['flash'] as $type => $message ) : ?>
        <div class="alert alert-<?= $type; ?>">
    <?= $message; ?>
    </div>
    <?php endforeach ; ?>
    <?php unset($_SESSION['flash']);?>

    <?php endif; ?>