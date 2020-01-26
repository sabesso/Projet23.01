<?php 
/* 
   $_SESSION['errors'], ->
   $_SESSION['loginerror'] ->
   $_SESSION['userConnected'], ->
   $_SESSION['userInfo'] ->
   $_SESSION['logup'] ->
   $_SESSION['confirm'] ->
   $_SESSION['updateerrors'] -
   $_SESSION['updateconfirm'] -
   $_SESSION['success'], $_SESSION['danger'], 
*/
   require('controller/frontend.php');
   // require('controller/functions.php');

   if (isset($_GET['action'])) {
      if ($_GET['action'] != 'forget.php') {
         unset($_SESSION['success'], $_SESSION['danger'], $_SESSION['id'], $_SESSION['token']);
      }
      unset($_SESSION['errors'], $_SESSION['logup'], $_SESSION['confirm'], $_SESSION['loginerror'], $_SESSION['updateconfirm'], $_SESSION['updateerrors']);
// *------------------------* index.php *------------------------*
      if ($_GET['action'] == 'index.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         mainPage();
      }
// *-----------------------* contact.php *-----------------------*
      elseif ($_GET['action'] == 'contact.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         contactPage();
      }
// *------------------------* cars.php *-------------------------*
      elseif ($_GET['action'] == 'cars.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         if (isset($_GET['add'])) {
            addComment($_GET['add'], 'cars');
         } elseif (!empty($_GET['update'])) {
            updateComment($_GET['update'], 'cars');
            // $success = 'Le commentaire a été ajouté';
         } elseif (!empty($_GET['delete'])) {
            deleteComment($_GET['delete'], 'cars');
         }
         carsPage();
      }
// *-----------------------* girls.php *-------------------------*
      elseif ($_GET['action'] == 'girls.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         if (!empty($_GET['add'])) {
            addComment($_GET['add'], 'girls');
         } elseif (!empty($_GET['update'])) {
            updateComment($_GET['update'], 'girls');
         } elseif (!empty($_GET['delete'])) {
            deleteComment($_GET['delete'], 'girls');
         }
         girlsPage();
      }
// *----------------------* motobike.php *-----------------------*
      elseif ($_GET['action'] == 'motobike.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         if (!empty($_GET['add'])) {
            addComment($_GET['add'], 'motobike');
         } elseif (!empty($_GET['update'])) {
            updateComment($_GET['update'], 'motobike');
         } elseif (!empty($_GET['delete'])) {
            deleteComment($_GET['delete'], 'motobike');
         }
         motoPage();
      }
// *---------------------* inscription.php *----------------------*
      elseif ($_GET['action'] == 'inscription.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         if (isset($_GET['logup'])) {
            $_SESSION['logup'] = 'logup';
         } elseif (isset($_POST['register'])) {
            confirmRegister();
         }
         inscriptionPage();
      } 
// *-----------------------* confirm.php *------------------------*
      elseif ($_GET['action'] == 'confirm.php') {
         confirmUser();
         accountPage();
      } 
// *-----------------------* account.php *------------------------*     
      elseif ($_GET['action'] == 'account.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
            mainPage();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
            mainPage();
         } else {
            // unset($_SESSION['updateerrors']);
            if (isset($_GET['update'])) {
               updateUserInfo($_GET['update']);
            }
            if (isset($_SESSION['updateconfirm'])) {
               unset($_SESSION['userConnected'], $_SESSION['userInfo']);
            }
         }
         accountPage();
      } 
// *------------------------* jeu.php *-------------------------*
      elseif ($_GET['action'] == 'jeu.php') {
         if (isset($_POST['login'])) {
            confirmLogin();
         } elseif (isset($_POST['logout'])) {
            unset($_SESSION['userConnected'], $_SESSION['userInfo']);
         }
         jeuPage();
      }
// *------------------------* forget.php *----------------------*
      elseif ($_GET['action'] == 'forget.php') { 
         if (isset($_POST['resetmail'])) {
            verifyResetEmail();
         } elseif (isset($_GET['id']) && isset($_GET['token'])) {
            unset($_SESSION['success'], $_SESSION['danger']);
         } elseif (!empty($_POST['password1']) && !empty($_POST['password2'])) {
            resetUserPassword();
         } elseif (isset($_POST['login'])) {
            confirmLogin();
            mainPage();
         }
         forgetPage();
      }
   } 
   else {
      unset($_SESSION['errors'], $_SESSION['logup']);
      mainPage();
   }

?>
    