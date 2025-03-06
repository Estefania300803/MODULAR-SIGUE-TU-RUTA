const aside = document.getElementById('aside'),
    menu = document.getElementById('menu');

menu.onclick = () => {
    aside.classList.toggle('active');
};

function toggleMenu() {
    var menu = document.getElementById("user-menu");
    var overlay = document.getElementById("menu-overlay");

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    } else {
        menu.classList.add("active");
        overlay.classList.add("active");
    }
}

