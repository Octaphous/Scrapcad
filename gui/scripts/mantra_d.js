let menuVisible = false;
let menuButton = document.querySelector("#mantra-menu-button");
let menu = document.querySelector("#mantra-menu");

menuButton.addEventListener("click", () => {
    if (menuVisible)
        hideMenu();
    else
        showMenu();
});

menuButton.addEventListener("blur", (event) => {
    let itemClicked = event.relatedTarget;
    if (itemClicked && itemClicked.parentNode.id == "mantra-menu") {
        event.target.focus();
        return;
    }

    if (menuVisible) {
        hideMenu();
    }
});

function showMenu() {
    menuVisible = true;
    menuButton.classList.add("menu-open");
    menu.style.display = "flex";
}

function hideMenu() {
    menuVisible = false;
    menuButton.classList.remove("menu-open");
    menu.style.display = "none";
}