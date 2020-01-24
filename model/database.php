<?php
//  id   page_id   username   email   password   comment   date  

//  Function for delete the data from the table Comments
function deleteData($id) {
    $db = dbConnect();

    $sql = "DELETE FROM Comments WHERE id = ?";
    $req = $db->prepare($sql);
    $req->bindValue(1, $id);
    $req->execute();
}

//  Function for update the data in the table Comments
function updateData(string $id, string $comment) {
    $db = dbConnect();

    $req = $db->prepare("UPDATE Comments SET Comment = ? WHERE Id = ?");
    $req->bindValue(1, $comment);
    $req->bindValue(2, $id);
    $req->execute();
    
    // return 'Votre commentaire a été bien mise à jour !';
}

//  Function for adds data to the table Comments
function addData(int $pageId, string $comment, string $img) {
    $db = dbConnect();

    $req = $db->prepare("INSERT INTO Comments(page_id, Username, Comment, ImageSrc) VALUES(?, ?, ?, ?)");

    $req->bindValue(1, $pageId);
    $req->bindValue(2, $_SESSION['userInfo']['Username']);
    $req->bindValue(3, $comment);
    $req->bindValue(4, $img);
    $req->execute();
    // return 'Votre commentaire a été bien envoyé !';
}

//  Function for adds data to the table Comments
function addUser(string $username, string $email, string $password) {
    $db = dbConnect();

    $req = $db->prepare("INSERT INTO users(page_id, Username, Email, Password1, Comment, ConfirmationEmail, ConfirmedStatus) VALUES(?, ?, ?, ?, ?, ?, ?)");

    $options = ['cost' => 12,];
    $hashpass = password_hash($password, PASSWORD_BCRYPT, $options);

    $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN"; 
    $confirmtoken = substr(str_shuffle(str_repeat($alphabet, 60)), 0, 60);

    $req->bindValue(1, '0');
    $req->bindValue(2, $username);
    $req->bindValue(3, $email);
    $req->bindValue(4, $hashpass);
    $req->bindValue(5, '');
    $req->bindValue(6, $confirmtoken);
    $req->bindValue(7, 0);

    $req->execute();

    $id = $db->lastInsertId();
    mail($email, "Confirmation de votre compte", "Afin de valider votre compte, merci de cliquer sur le lien \n\nhttp://besso-com.stackstaging.com/themejeux/index.php?action=confirm.php&id=$id&token=$confirmtoken");

    // return 'Votre commentaire a été bien envoyé !';
}

function checkUserName(string $username) {
    $db = dbConnect();

    $req = $db->prepare("SELECT Username FROM users WHERE Username=?");
    $req->bindValue(1, $username);

    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
}

function checkUserEmail(string $email) {
    $db = dbConnect();

    $req = $db->prepare("SELECT Email FROM users WHERE Email=?");
    $req->bindValue(1, $email);

    $req->execute();
    // return $req->rowCount();
    return $req->fetch(PDO::FETCH_ASSOC);
}

function checkUserLogin(string $username) {
    $db = dbConnect();

    $req = $db->prepare("SELECT * FROM users WHERE Username=?");
    $req->bindValue(1, $username);
    // $req->bindValue(2, $password);

    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
}

function confirmUserStatus(string $id) {
    $db = dbConnect();

    $req = $db->prepare("SELECT * FROM users WHERE id=?");
    $req->bindValue(1, $id);

    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
}

function updateUserStatus(string $id) {
    $db = dbConnect();

    $req = $db->prepare("UPDATE users SET ConfirmationEmail = ?, ConfirmedStatus = ? WHERE id=?");
    $req->bindValue(1, NULL);
    $req->bindValue(2, 1);
    $req->bindValue(3, $id);
    $req->execute();
}

function updateUser(string $id, string $email, string $password) {
    $db = dbConnect();

    $req = $db->prepare("UPDATE users SET Email = ?, Password1 = ? WHERE Id = ?");

    $options = ['cost' => 12,];
    $hashpass = password_hash($password, PASSWORD_BCRYPT, $options);

    $req->bindValue(1, $email);
    $req->bindValue(2, $hashpass);
    $req->bindValue(3, $id);
    $req->execute();
    
}
// 1
function verifyUserEmail(string $email) {
    $db = dbConnect();

    $req=$db->prepare("SELECT * FROM users WHERE email = ?");
    $req->bindValue(1, $email);
    $req->execute();

    return $req->fetch(PDO::FETCH_ASSOC);
}
// 2
function sendVerificationEmail(string $id, string $email) {
    $db = dbConnect();

    $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN"; 
    $confirmtoken = substr(str_shuffle(str_repeat($alphabet, 60)), 0, 60);

    $req = $db->prepare("UPDATE users SET reset_token = ? WHERE id= ?");
    $req->bindValue(1, $confirmtoken);
    $req->bindValue(2, $id);

    $req->execute();
    // $id = $db->lastInsertId();
    // mail($email, "Confirmation de votre compte", "Afin de valider votre compte, merci de cliquer sur le lien \n\nhttp://besso-com.stackstaging.com/php_project/index.php?action=confirm.php&id=$id&token=$confirmtoken");
    
    // $_SESSION['flash'] = 'aucun compte ne correspond a cette adresse ';
    mail($email,"Réinitialisation de votre compte","afin de réinitialer votre mot de passe merci de cliquer sur ce lien\n\nhttp://besso-com.stackstaging.com/themejeux/index.php?action=forget.php&id=$id&token=$confirmtoken");
}
// 4
function updateUserPassword(string $id, string $pass) {
    $db = dbConnect();

    $options = ['cost' => 12,];
    $hashpass = password_hash($pass, PASSWORD_BCRYPT, $options);

    $req = $db->prepare("UPDATE users SET Password1 = ? WHERE id = ?");
    $req->bindValue(1, $hashpass);
    $req->bindValue(2, $id);
    $req->execute();
}

//  Function for takes data from the table Comments
function takeData(int $pageId): array {
    $db = dbConnect();

    $req = $db->prepare("SELECT id, Username, Comment, ImageSrc, DATE_FORMAT(InscriptionDate, '%d/%m/%Y à %H:%i:%s') AS InscriptionDate FROM Comments WHERE page_id=? ORDER BY InscriptionDate DESC");
    $req->bindValue(1, $pageId);
    $req->execute();

    return $req->fetchAll(PDO::FETCH_ASSOC);
}

//  Function for connect to the database 
function dbConnect() {
    // $servername = 'shareddb-r.hosting.stackcp.net';
    // $dbname = 'database-313233f07a';
    // $user = 'database-313233f07a';
    // $password = 'QybWt;3*zVf7';

    $servername = 'localhost';
    $dbname = 'theme_games';
    $user = 'root';
    $password = 'toto';
    
    try{
        $db = new PDO("mysql:host=$servername;dbname=$dbname", $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    }
    catch(PDOException $e){
        echo "Erreur : " . $e->getMessage();
    }
}




//  Function for adds data to the table $tableName
// function addData(string $tableName) {
//     $db = dbConnect();

//     $req = $db->prepare("INSERT INTO $tableName(Username,Comment) VALUES(?, ?)");

//     $req->bindValue(1, $_POST['username']);
//     $req->bindValue(2, $_POST['comment']);

//     $req->execute();
//     return 'Votre commentaire a été bien envoyé !';
// }
?>
 

