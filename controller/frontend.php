<?php
    session_start();
    require_once('model/database.php');
    

    function mainPage() {
        if ($_GET['action'] == 'account.php') {
            echo "<script>window.location.href='?action=index.php';</script>";
        }
        require('view/frontend/main.php');
    }
    function contactPage() {
        require('view/frontend/contact.php');
    }
    function carsPage() {
        // phpinfo();
        $datas = takeData(1);
        require('view/frontend/cars.php');
    }
    function girlsPage() {
        $datas = takeData(2);
        require('view/frontend/girls.php');
    }
    function motoPage() {
        $datas = takeData(3);
        require('view/frontend/motobike.php');
    }
    function inscriptionPage() {
        require('view/frontend/inscription.php');
    }
    function accountPage() {
        // header("Location: php_project/?action=account.php");
        require('view/frontend/account.php');
    }
    function jeuPage() {
        // header("Location: php_project/?action=account.php");
        require('view/frontend/jeu.php');
    }
    function forgetPage() {
        require('view/frontend/forget.php');
    }

    //  Function for adding a new comment
    function addComment(int $pageId, string $pagename) {
        $id = htmlentities($pageId);
        $comment = htmlentities( $_POST['comment']);

        //  Traitment of the image
        $_SESSION['img'] = $_FILES['img'];
        $img = $_FILES['img'];
        $ext = strtolower(substr($img['name'], -3));   
        $allowExt = array('jpg', 'gif', 'png'); 
        if (in_array($ext, $allowExt)) {
            move_uploaded_file($img['tmp_name'], "images/userImages/" . $img['name']);
        } else {
            # code...
        }

     //  ----------------------
        addData($id, $comment);
        echo "<script>window.location.href='?action=$pagename.php';</script>";
        // header("Location: php_project/?action=cars.php");
    }

    //  Function for updating an existing comment
    function updateComment(int $commentId, string $pagename) {
        if (!empty($_POST['newcomment'])) {
            $id = htmlentities($commentId);
            $comment = htmlentities( $_POST['newcomment']);
            updateData($id, $comment);

            echo "<script>window.location.href='?action=$pagename.php';</script>";
        }
    }

     //  Function for deleting an existing comment
     function deleteComment(int $commentId, string $pagename) {
        $id = htmlentities($commentId);
        deleteData($id);
        echo "<script>window.location.href='?action=$pagename.php';</script>";
    }

    function confirmRegister() {
        $username = htmlentities($_POST['logupusername']);
        $email = htmlentities($_POST['logupemail']);
        $password = htmlentities($_POST['loguppassword']);
        $password1= htmlentities($_POST['repeatpassword']);

        if (empty($username)) {
            $_SESSION['errors'] .= '- Le pseudo ne doit être vide';
        } else if (strlen($username) < 4) {
            $_SESSION['errors'] .= '- Le pseudo doit être min 4 charactère';
        } elseif(!preg_match('`^([a-zA-Z0-9-_]{2,36})$`', $username)){
            $_SESSION['errors'] .= "- Votre pseudo n'est pas valide (caractere non autorisé)"; 
        }
        
        if (empty($email)) {
            $_SESSION['errors'] .= "<br />- Une adresse e-mail est obligatoire";
        } elseif(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            $_SESSION['errors'] .= "<br />- Email n'est pas valide !";
        } 

        if (!isset($_SESSION['errors'])) {
            if(empty($password) || $password != $password1 ){
                $_SESSION['errors'] .= "<br />- Entrez un mot de passe valide";
            }
        }

        if (!isset($_SESSION['errors'])) {
            $checkname = checkUserName($username);
            $checkemail = checkUserEmail($email);
            
            if (!empty($checkname) || !empty($checkemail)) {
                if (!empty($checkname)) {
                    $name = $checkname['Username'];
                    $_SESSION['errors'] = "- Le pseudo <strong>$name</strong> déjà utilisée, veuillez sessiez un autre pseudo !";
                }
                if (!empty($checkemail)) {
                    $email = $checkemail[0]['Email'];
                    $_SESSION['errors'] .= "<br />- Le email <strong>$email</strong> déjà utilisée, veuillez sessiez un autre email !";
                }
            } elseif(!isset($_SESSION['errors'])) {
                addUser($username, $email, $password);
                $_SESSION['confirm'] = "Un email vous a été envoyé, afin de valider votre compte veuillez cliquer sur le lien dans le mail !";
                // echo "<script>window.location.href='?action=index.php';</script>";
            }
        }
        $_SESSION['logup'] = 'logup';
    }
    
    function confirmLogin() {
        $username = htmlentities($_POST['loginusername']);
        $password = htmlentities($_POST['loginpassword']);
        
        $checklogin = checkUserLogin($username);
        if (!empty($checklogin)) {
            if (password_verify($password, $checklogin['Password1'])) {
                if ($checklogin['ConfirmedStatus'] == 1) {
                    $_SESSION['userInfo'] = $checklogin;
                    $_SESSION['userConnected'] = $_SESSION['userInfo']['Username'];
                    unset($_SESSION['loginerror']);
                } else {
                    $_SESSION['loginerror'] = "Veuillez confirmer votre e-mail en cliquant sur le lien qui vous est envoyé!";
                }
            } else {
                $_SESSION['loginerror'] = " Votre pseudo ou votre mot de passe semblent erronés !";
            }
        } else {
            $_SESSION['loginerror'] = " Votre pseudo ou votre mot de passe semblent erronés !";
        }
        // $position = $_GET['login'];
        // echo "<script>window.location.href='?action=$position';</script>";
    }

    function confirmUser() {
        $id = htmlentities($_GET['id']);
        $token = htmlentities($_GET['token']);

        $confirmstatus = confirmUserStatus($id);
        if (!empty($confirmstatus) && $token == $confirmstatus['ConfirmationEmail']) {
            updateUserStatus($id);
            $_SESSION['userInfo'] = $confirmstatus;
            $_SESSION['userConnected'] = $_SESSION['userInfo']['Username'];
        } else {
            die ('pas ok');
        }
    }

    function updateUserInfo(string $id) {
        if (isset($_POST['updateemail']) && isset($_POST['updatepassword'])) {
            $email = htmlentities($_POST['updateemail']);
            $password = htmlentities($_POST['updatepassword']);
            $password1 = htmlentities($_POST['repeatpassword']);

            if (empty($email)) {
                $_SESSION['updateerrors'] = "<br />- Une adresse e-mail est obligatoire";
            } elseif(!filter_var($email,FILTER_VALIDATE_EMAIL)){
                $_SESSION['updateerrors'] = "<br />- Email n'est pas valide !";
            } elseif(empty($password) || $password != $password1){
                $_SESSION['updateerrors'] = "<br />- Entrez un mot de passe valide";
            } elseif ($email != $_SESSION['userInfo']['Email']) {
                $checkemail= checkUserEmail($email);
                if (!empty($checkemail)) {
                    $_SESSION['updateerrors'] = "<br />- Le email <strong>$email</strong> déjà utilisée, veuillez sessiez un autre email !";
                }
            } 
            if (!isset($_SESSION['updateerrors'])) {
                updateUser($id, $email, $password);
                $_SESSION['updateconfirm'] = "Vos informations a été modifiée. Veuillez se connecter";
                // echo "<script>window.location.href='?action=index.php&logout';</script>";
            } 

                
                // $_SESSION['upadeemail'] = count($checkemail);
                // if (!empty($checkemail)) {
                //     $email = $checkemail['Email'];
                //     $_SESSION['errors'] .= "<br />- Le email <strong>$email</strong> déjà utilisée, veuillez sessiez un autre email !";
                    
                // } elseif(!isset($_SESSION['errors'])) {
                //     addUser($username, $email, $password);
                //     $_SESSION['confirm'] = "Un email vous a été envoyé, afin de valider votre compte veuillez cliquer sur le lien dans le mail !";
                //     unset( $_SESSION['logup']);
                //     // mail("xxxcann@gmail.com", "test", "testttt");
                //     // echo "<script>window.location.href='?action=index.php';</script>";
        } else {
            die('not ok');
        }
    }

    function resetEmail() {
        $email = htmlentities($_POST['email']);
        $user = takeUserEmail($email);
        if(!empty($user)) {
            resetPassword($user['id'],$email);
        }
    }




        // var_dump($_POST);
        // require('view/frontend/inscription.php');

        // 'Les champs ne sont pas tous remplies'
        // "Le mot de passe n'est pas corrrecte"
        // $email = $db->prepare("SELECT email FROM users WHERE email = :email":
        // $email->execute(['email' => $email;
        // $result = $email->rowCount();
        // if ($result == 0) {
        //     There is not en mail correspoant à l database
        // } else
        //  'Un Email existe dèja !'
        //  'Le copmpte a été crée

        //  sesseion_unset();
        //  session_destroy();
        //  password_verify(  )
    // }