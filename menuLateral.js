const botonMenu = document.getElementById("abrirMenu");
const pestañaMenu = document.getElementById("menuLateral");


botonMenu.addEventListener("click", function() {
    if (pestañaMenu.classList.contains("menuLateralAbierto")) {
        pestañaMenu.classList.remove("menuLateralAbierto");
        botonMenu.style.right = "0px";
        botonMenu.value = "Menu";
    } else {
        pestañaMenu.classList.add("menuLateralAbierto");
        botonMenu.style.right = "410px";
        botonMenu.value = "Cerrar Menu";
    }
});