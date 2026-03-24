/**
 * @file menuLateral.js
 * @description Pagina con funcionalidades de menu lateral
 * @author jjossuee008 <josuemattab@hotmail.com>
 * @version 1.5
 * @date 2026-24-03
 * @license MIT
 */

/** Hace referencia al boton que permitira abrir y cerrar el menu. */
const botonMenu = document.getElementById("abrirMenu");
/** Hace referencia a la pestaña del menu lateral. */
const pestañaMenu = document.getElementById("menuLateral");
/** Hace referencia al boton de favoritos */
const botonFavoritos = document.getElementById("botonFavoritos");
/** Hace referencia a la imgane que indica si se ha marcado como favorito o no */
const imgFavoritos = botonFavoritos.querySelector("img");


/**
 * Permitira abrir y cerrar el menu lateral.
 */
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

/** Permitira indicar si una localizacion esta en favoritos o no */
let favorito;
let listaFavoritos = [];


/**
 * Agregara o elminara de favoritos a la localizacion indicada.
 */
botonFavoritos.addEventListener("click", function(){
    if(favorito == false){
        imgFavoritos.src = "img/favoritoOn.png";

        listaFavoritos.push = document.getElementById("buscador").value;

        favorito = true;
    } else {
        imgFavoritos.src = "img/favoritoOFF.png";
        favorito = false;
    }
});