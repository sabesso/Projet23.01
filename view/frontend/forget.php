<?php
    $title = "Reset";
    require('header.php');
    require_once('model/database.php');
    $success = false;
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
                <img src="colorlib-regform-26/colorlib-regform-26/images/mdpoublier.png" alt="" class="image-1">
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
				<form action="?action=forget.php" method="POST">
					<h3>Mot de passe oublié</h3>
					<!-- <div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="text" class="form-control" placeholder="Username">
					</div> -->
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
						<input type="password" class="form-control" placeholder="Password " name="password1" placeholder="Password"  required>
					</div>
					<div class="form-holder">
						<span class="lnr lnr-lock"></span>
						<input type="password" class="form-control" placeholder="Confirm Password" name="password2" placeholder="Password"  required>
					</div>
					<button type="submit" class="btn btn-primary" name="resetpass">
						<span >Modifier</span>
					</button>
                </form>
                <?php else : ?> 
                <img src="colorlib-regform-26/colorlib-regform-26/images/image-2.png" alt="" class="image-2">
                
                <form action="?action=forget.php" method="POST">
					<h3>Mot de passe oublié</h3>
					<!-- <div class="form-holder">
						<span class="lnr lnr-user"></span>
						<input type="text" class="form-control" placeholder="Username">
					</div> -->
					<!-- <div class="form-holder">
						<span class="lnr lnr-phone-handset"></span>
						<input type="text" class="form-control" placeholder="Phone Number">
					</div> -->
					<div class="form-holder">
						<span class="lnr lnr-envelope"></span>
						<input type="text" class="form-control" placeholder="Mail " name="email" aria-describedby="emailHelp" placeholder="Votre email">
					</div>
					
					<button type="submit" name='resetmail' class="btn btn-primary">
						<span >Envoyer</span>
					</button>
                </form>
                <?php endif ?>
        <?php endif ?>

			</div>
			
		</div>
		
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/main.js"></script>
	</body><!-- This templates was made by Colorlib (https://colorlib.com) -->
</html>









