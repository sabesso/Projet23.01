<?php 
    $title = "Contact";
    require('header.php');
?>
<div class="container">
    <form action="" method="POST">
        <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input class="form-control " type="text" name="username" placeholder="Entrer votre pseudo" >
           <label class="mt-5" for="message"> Votre Message</label><textarea class="form-control " name="message" rows="4" placeholder="Entrer votre message"></textarea>
        </div>
        <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
          
        </div>
    </form>
</div>


<?php require('footer.php'); ?>