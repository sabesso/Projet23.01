
<?php
    $title = "Se Connecter";
    require ('header.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sign Up Form by Colorlib</title>

    <!-- Font Icon -->
    <link rel="stylesheet" href="colorlib-regform-7 (1)/colorlib-regform-7/fonts/material-icon/css/material-design-iconic-font.min.css">

    <!-- Main css -->
    <link rel="stylesheet" href="colorlib-regform-7 (1)/colorlib-regform-7/css/style.css">
</head>
<body>

<!-- <?php if(!isset($_SESSION['connection'])) : ?> -->
<!-- <?php endif ?> -->

<?php if(!empty($_SESSION['errors'])): ?>
    <div class="alert alert-danger">
        <p><?= $_SESSION['errors'] ?></p>
    </div>
<?php endif; ?>

    <?php if(isset($_SESSION['confirm'])) : ?>
        <h4 class="alert alert-success"><?= $_SESSION['confirm'] ?></h4>
    <?php else : ?>
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="colorlib-regform-7 (1)/colorlib-regform-7/images/signin-image.jpg" alt="sing up image"></figure>
                        <a href="#" class="signup-image-link">Créer un compte</a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Inscription</h2>
                        <form class="" action="?action=inscription.php" method="POST">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="logupusername" id="name" value="<?php if(!empty($_POST['logupusername'])) echo htmlentities($_POST['logupusername']) ?>" required  placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="logupemail" id="email"  value="<?php if(!empty($_POST['logupemail'])) echo htmlentities($_POST['logupemail']) ?>" required placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="loguppassword" id="pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="repeatpassword" id="re_pass" placeholder="Repeat your password"/>
                            </div>
                            <!-- <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div> -->
                            <div class="form-group form-button">
                                <input type="submit" name="register" id="signup" class="form-submit" value="Register"/>
                            </div>
                        </form>
                        <div class="social-login">
                            <!-- <span class="social-label">Or login with</span> -->
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif ?>
    </div>

    <!-- JS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body><!-- This templates was made by Colorlib (https://colorlib.com) -->
</html>