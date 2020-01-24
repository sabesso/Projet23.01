<?php
function nav_item(string $link, string $title, string $linkClass):string {
    $classItem = ' ';
    if (isset($_GET['action'])) {
        if ($_GET['action'] == $link) {
            $classItem = 'active';
        }
    } elseif ($link == 'index.php') {
        $classItem = 'active';
    }
    return <<<HTML
        <li class="nav-item $classItem">
            <a class="$linkClass" href="?action=$link">$title</a>
        </li>
HTML;
}

function nav_menu(string $linkClass = ''): string {
    return nav_item('index.php','Accueil', $linkClass) . nav_item('cars.php','Voitures', $linkClass) . 
    nav_item('girls.php','Filles', $linkClass) . nav_item('motobike.php','Moto', $linkClass) . 
    nav_item('jeu.php','Jouer', $linkClass) . nav_item('contact.php','Contact', $linkClass);
}
?>
