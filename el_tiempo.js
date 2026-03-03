/**
 * @file El_tiempo.js
 * @description Pagina web para consultar el clima de una localizacion
 * @author jjossuee008 <josuemattab@hotmail.com>
 * @version 1.0
 * @date 2026-19-02
 * @license MIT
 */

/** 
 * Escucha la tecla "Enter" en el input para disparar la búsqueda.
 */
document.getElementById("buscador").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarCiudad();
    }
});

/** 
 * Obtiene los datos climáticos desde la API de OpenWeather.
 */
function buscarCiudad() {
    let ciudad = document.getElementById("buscador").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=fbcd55bb85cb1b4f098520ba3044ef5d&units=metric&lang=es`;
    let urlPrediccion = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=fbcd55bb85cb1b4f098520ba3044ef5d&units=metric&lang=es`;

    fetch(url)
        .then(res => res.json())
        .then(datos => {
            pintarRespuesta(datos);
        })
        .catch(error => console.log("Error:", error));

    fetch(urlPrediccion)
        .then(res => res.json())
        .then(datos => {
            console.log("Datos de predicción:", datos);
            prediccionClima(datos);
        })
}

/**
 * Actualiza la interfaz de usuario con los datos recibidos.
 * @param {Object} infoClima - Objeto JSON con la respuesta de la API.
 */
function pintarRespuesta(infoClima) {
    // Indicara que el fondo nose repita
    cuerpo.style.backgroundRepeat = "no-repeat";
    cuerpo.style.backgroundSize = "cover";
    cuerpo.style.backgroundAttachment = "fixed";
    
    let estaNublado = false;
    let contenedor = document.getElementById("respuesta");
    // Obtendra el ID del clima indicado en la API.
    let climaPrincipal = infoClima.weather[0].main;

    if (infoClima.cod === 200) {
        //Añadira informacion sobre el clima.
        contenedor.innerHTML = `
                <h2>Ciudad: ${infoClima.name}</h2>
                <p>Temperatura: ${infoClima.main.temp} °C</p>
                <p>Clima: ${infoClima.weather[0].description}</p>
        `;
    } else {
        contenedor.innerHTML = `<p>Ciudad no encontrada, intenta de nuevo.</p>`;
    }

    
    //Modificara la apariencia de la pagina dependiendo de "infoClima".
    if(climaPrincipal === "Clear"){
        contenedor.innerHTML += `<img src="img/soleado.png" alt="Cielo despejado">`;
        cuerpo.style.backgroundImage = "url('img/fondoDespejado.png')";

        estaNublado = false;

    } else if (climaPrincipal === "Clouds") {
        contenedor.innerHTML += `<img src="img/Nubes.png" alt="Dia Nuboso">`;
        cuerpo.style.backgroundImage = "url('img/fondoNublado.png')";

        estaNublado = false;

    } else if (climaPrincipal === "Rain" || climaPrincipal === "Drizzle" || climaPrincipal === "Shower rain") {
        contenedor.innerHTML += `<img src="img/Lluvia.png" alt="Dia Lluvioso">`;
        cuerpo.style.backgroundImage = "url('img/fondoLluvia.png')";

        estaNublado = false;

    } else if (climaPrincipal === "Thunderstorm") {
        contenedor.innerHTML += `<img src="img/Tormenta.png" alt="Tormenta">`;
        cuerpo.style.backgroundImage = "url('img/fondoTormenta.png')";

        estaNublado = false;

    } else if (climaPrincipal === "Snow") {
        contenedor.innerHTML += `<img src="img/Nieve.png" alt="Dia Nevado">`;
        cuerpo.style.backgroundImage = "url('img/fondoNieve.png')";

        estaNublado = false;

    } else if (climaPrincipal === "Mist" || climaPrincipal === "Fog" || climaPrincipal === "Haze") {
        contenedor.innerHTML += `<img src="img/Niebla.png" alt="Dia Neblado">`;
        cuerpo.style.backgroundImage = "url('img/fondoNiebla.png')";

        estaNublado = true;
    }

    if(estaNublado === true){
        buscar.style.background= "rgba(20, 14, 19, 0.2)"; 
        respuesta.style.background = "rgba(20, 14, 19, 0.2)";
        buscador.style.background = "rgba(20, 14, 19, 0.2)";
        prediccion.style.background = "rgba(20, 14, 19, 0.2)";
        otrosDatos.style.background = "rgba(20, 14, 19, 0.2)";
    } else{
        buscador.style.background = "rgba(255, 255, 255, 0.2)";
        contenedor.style.background = "rgba(255, 255, 255, 0.2)";
        buscar.style.background = "rgba(255, 255, 255, 0.2)";
        prediccion.style.background = "rgba(255, 255, 255, 0.2)";
        otrosDatos.style.background = "rgba(255, 255, 255, 0.2)";
    }

    let ampliarInformacion = document.getElementById("otrosDatos");

    ampliarInformacion.textContent = "";

    ampliarInformacion.innerHTML = `
        <p>Humedad: ${infoClima.main.humidity} </p> 
        <p>Sensacion Termica: ${infoClima.main.feels_like} </p> 
        <p>Temperatura maxima: ${infoClima.main.temp_max} </p> 
        <p>Temperatura minima: ${infoClima.main.temp_min} </p> 
    `;

}

/**
 * Imprime los datos climaticos de los proximos 4 dias de la localizacion indicada.
 * 
 * @param {*} datos buscados con {@link buscarCiudad()}
 */
function prediccionClima(datos) {

    let tabla = document.getElementById("prediccion");
    
    
    const pronosticos = datos.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1);

    let htmlTabla = "<table><tr>";

    pronosticos.forEach(item => {
        let fecha = new Date(item.dt * 1000);
        let nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'short' });
        htmlTabla += `<th>${nombreDia.toUpperCase()}</th>`;
    });

    htmlTabla += "</tr><tr>";

    pronosticos.forEach(item => {
        let temp = Math.round(item.main.temp);
        let climaDia = item.weather[0].main;
        let urlIcono; 

        if(climaDia === "Clear"){
            urlIcono = "img/soleado.png";
    
        } else if (climaDia === "Clouds") {
            urlIcono = "img/Nubes.png";
    
        } else if (climaDia === "Rain" || climaDia === "Drizzle" || climaDia === "Shower rain") {
            urlIcono = "img/Lluvia.png";
    
        } else if (climaDia === "Thunderstorm") {
            urlIcono = "img/Tormenta.png";
    
        } else if (climaDia === "Snow") {
            urlIcono = "img/Nieve.png";
    
        } else if (climaDia === "Mist" || climaDia === "Fog" || climaDia === "Haze") {
            urlIcono = "img/Niebla.png";
        }
        
        htmlTabla += `<td><img src="${urlIcono}"><br>${temp}°C</td>`;
    });

    htmlTabla += "</tr></table>";
    tabla.innerHTML = htmlTabla;
}


