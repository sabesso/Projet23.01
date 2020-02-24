<?php 
    $title = "connexion";
    require('header.php');
    require ('controller/functions.php');
   // debug($_SESSION);
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>RegistrationForm_v10 by Colorlib</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- LINEARICONS -->
		<link rel="stylesheet" href="colorlib-regform-26/colorlib-regform-26/fonts/linearicons/style.css">
		
		<!-- STYLE CSS -->
		<link rel="stylesheet" href="colorlib-regform-26/colorlib-regform-26/css/style.css">
    </head>
	<body>

		<div class="wrapper">
			<div class="inner">
                <img src="colorlib-regform-26/colorlib-regform-26/images/image-1.png" alt="" class="image-1">
                
            <?php if(!isset($_SESSION['logup'])) : ?>   
                <?php if(!isset($_SESSION['userInfo'])) : ?>

                    <form action="?action=<?= $_GET['action'] ?>" method="POST" >
                      <!-- <?php if (isset($_SESSION['loginerror'])) : ?>
                                <p class="mr-1 my-auto" style="background-color: lightgray"> <?= $_SESSION['loginerror'] ?><a href="?action=forget.php">J'ai oublié mon mot de pass</a></p>
                                <?php endif ?> -->

                        <h3> Se connecter</h3>
                        <div class="form-holder">
                            <span class="lnr lnr-user"></span>
                            <input type="text" class="form-control"  name="loginusername" placeholder="Pseudo" value="<?php if(!empty($_POST['loginusername'])) echo htmlentities($_POST['loginusername']) ?>">
                        </div>
                        <!-- <div class="form-holder">
                            <span class="lnr lnr-phone-handset"></span>
                            <input type="text" class="form-control" placeholder="Phone Number">
                        </div> -->
                        <!-- <div class="form-holder">
                            <span class="lnr lnr-envelope"></span>
                            <input type="text" class="form-control" placeholder="Mail">
                        </div> -->
                        <div class="form-holder">
                            <span class="lnr lnr-lock"></span>
                            <input type="password" class="form-control" name="loginpassword" placeholder="Mot de passe" value="<?php if(!empty($_POST['loginpassword'])) echo htmlentities($_POST['loginpassword']) ?>">
                        </div>
                        <!-- <div class="form-holder">
                            <span class="lnr lnr-lock"></span>
                            <input type="password" class="form-control" placeholder="Confirm Password">
                        </div> -->
                         <!-- <a href="?action=<?= $_GET['action'] ?>&login" class="btn btn-primary btn-sm mr-2">Se connecter</a> -->
                        <button type="submit" name="login">
                            <span>Se connecter</span>
                        </button>
                    </form>
                    
                <?php endif ?>
            <?php endif ?>
                <img src="colorlib-regform-26/colorlib-regform-26/images/image-2.png" alt="" class="image-2">
                
                    <!-- *----------------* if there are errors of the login *--------------* -->
        <!-- <div class="float-right"> -->
        <?php if (isset($_SESSION['loginerror'])) : ?>
                <div class="position-absolute bg-dark text-warning p-2"> <?= $_SESSION['loginerror'] ?><a href="?action=forget.php"> J'ai oublié mon mot de passe </a></div>
            <?php endif ?>
        <!-- </div> -->
			</div>
			
        </div>
      
        
		
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/main.js"></script>
	</body><!-- This templates was made by Colorlib (https://colorlib.com) -->
</html>

