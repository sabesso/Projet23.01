<?php
    $title = "Accueil";
    require('header.php');
    unset($_SESSION['userConnected']);
?>
<!-- ---------------------------- Main Page "The silder" ------------------------------ -->
<!-- <pre>
    <?= var_dump($_GET); ?>
</pre>
<pre>
    <?= var_dump($_POST); ?>
</pre> -->
<pre>
    <?= print_r($_SESSION); ?>
</pre>

<body class="body1" style="background-image: url(images/img-glob.jpg); background-repeat:no-repeat; background-size:cover">

    <div class="container pt-5 w-70 container1">
        <div class='logo'>
             <img src="images/logo.PNG" alt="">
        </div>
        <div>
          <h1>Les meilleurs jeus en ligne gratuits</h1>
        </div>  
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner w-60">
                <div class="carousel-item active img-fluid">
                    <a href="https://www.jeuxjeuxjeux.fr/jeu/speed-racing-pro-2.html "target="_blank" >  <img class="d-block w-100 bg-light bd-img" src="images/car.jpg" alt="First slide"  class="img-fluid" alt="Responsive image" ></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Jeux de Voitures</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item ">
                    <a href="http://www.jeuxjeuxjeux.fr/jeu/bike-ride.html"target="_blank"> <img class="d-block w-100 bd-img" src="images/motobike.jpg" alt="First slide"  class="img-fluid" alt="Responsive image"></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Jeux de Moto</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <a href="https://www.jeuxjeuxjeux.fr/jeu/sleeping-princess-nails-spa.html"target="_blank"> <img class="d-block w-100 bd-img" src="images/girls.jpg" alt="First slide"  class="img-fluid" alt="Responsive image"></a>
                <div class="carousel-caption d-none d-md-block">
                        <h5>Jeux de fille</h5>
                        <p>...</p>
                </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="row mt-5">
        
        <div class="col-md-4"><a href="https://www.jeuxjeuxjeux.fr/jeu/dress-up-the-lovely-princess.html" target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/dressup.jpg "  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a href="https://www.jeuxjeuxjeux.fr/jeu/police/police+car+parking+3.html" target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/police.jpg"  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a  href="https://www.jeuxjeuxjeux.fr/jeu/anna-elsa-makeover.html" target="_blank"><img class="w-100  h-80 bd-simg mt-5" src="images/elsagame.jpg"  class="img-fluid " alt="Responsive image"></a></div>
            
            <div class="col-md-4"><a href="https://www.jeuxjeuxjeux.fr/jeu/super-drift-3.html" target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/supercar.jpg "  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a href="https://www.jeuxjeuxjeux.fr/jeu/motorun.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/motorun.jpg"  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a  href="https://www.jeuxjeuxjeux.fr/jeu/ellie-becomes-an-actress.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/ellie.jpg"  class="img-fluid " alt="Responsive image"></a></div>

            <div class="col-md-4"><a href="http://www.jeuxjeuxjeux.fr/jeu/bike-ride.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/car.jpg "  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a href="https://www.jeuxjeuxjeux.fr/jeu/trial/moto+trial+fest.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/motofest.jpg"  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a  href="https://www.jeuxjeuxjeux.fr/jeu/kim-s-shoe-designer.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/shoe.jpg"  class="img-fluid " alt="Responsive image"></a></div>

            <div class="col-md-4"><a href="hhttps://www.jeuxjeuxjeux.fr/jeu/course+3d/american+racing.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/uscar.jpg "  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a href="http://www.jeuxjeuxjeux.fr/jeu/bike-ride.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/motobike.jpg"  class="img-fluid " alt="Responsive image"></a></div>
            <div class="col-md-4"><a  href="https://www.jeuxjeuxjeux.fr/jeu/become-a-puppy-groomer.html"target="_blank"><img class="w-100 h-80 bd-simg mt-5" src="images/dog.jpg"  class="img-fluid " alt="Responsive image"></a></div>
        
        </div>

</div>
 
 <?php require('footer.php'); ?>
 
 
