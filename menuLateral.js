/**
 * @file menuLateral.js
 * @description Pagina con funcionalidades de menu lateral
 * @author jjossuee008 <josuemattab@hotmail.com>
 * @version 1.5
 * @date 2026-24-03
 * @license MIT
 */

// 1. Variables globales (fuera de todo)
let listaFavoritos = [];
const buscador = document.getElementById("buscador");
const botonFavoritos = document.getElementById("botonFavoritos");
const imgFavoritos = botonFavoritos.querySelector("img");
const botonMenu = document.getElementById("abrirMenu");
const pestañaMenu = document.getElementById("menuLateral");

// 2. Evento para añadir/quitar favoritos
botonFavoritos.addEventListener("click", function() {
    let ciudadActual = buscador.value.trim().toLowerCase(); 

    if (ciudadActual === "") {
        alert("Escribe una ciudad primero");
        return;
    }

    if (!listaFavoritos.includes(ciudadActual)) {
        // AÑADIR
        listaFavoritos.push(ciudadActual);
        imgFavoritos.src = "img/favoritoOn.png";
        console.log("Añadido: " + ciudadActual);
        
    } else {
        // ELIMINAR
        listaFavoritos = listaFavoritos.filter(c => c !== ciudadActual);
        imgFavoritos.src = "img/favoritoOFF.png";
        console.log("Eliminado: " + ciudadActual);
    }
});

// 3. Evento para abrir el menú y MOSTRAR la lista
botonMenu.addEventListener("click", function() {
    if (pestañaMenu.classList.contains("menuLateralAbierto")) {
        pestañaMenu.classList.remove("menuLateralAbierto");
        botonMenu.style.right = "0px";
        botonMenu.value = "Menu";
    } else {
        pestañaMenu.classList.add("menuLateralAbierto");
        botonMenu.style.right = "410px";
        botonMenu.value = "Cerrar";

        // Limpiar el menú antes de pintar
        pestañaMenu.innerHTML = "<h3>Mis Favoritos</h3>";
        
        // Crear la lista UL
        let listaUL = document.createElement("ul");
        listaUL.style.color = "white";
        listaUL.style.listStyle = "none";
        listaUL.style.padding = "20px";

        if (listaFavoritos.length === 0) {
            pestañaMenu.innerHTML += "<p style='color:white; padding:20px;'>No tienes favoritos aún</p>";
        } else {
            listaFavoritos.forEach(ciudad => {
                let li = document.createElement("li");
                li.textContent = ciudad.toUpperCase();
                li.style.background = "rgba(255,255,255,0.1)";
                li.style.margin = "10px 0";
                li.style.padding = "10px";
                li.style.borderRadius = "5px";
                
                listaUL.appendChild(li);

            });
            pestañaMenu.appendChild(listaUL);
        }
    }
});





