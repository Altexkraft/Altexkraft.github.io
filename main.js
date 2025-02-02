function buscarpokemon() {

    let pokemonInput = document.getElementById('pokemon-input').value.trim().toLowerCase();
    let urlapi = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
    fetch(urlapi)
    .then(Response => Response.json())
    .then(datospokemon => mostrarpokemon(datospokemon))
    .catch(() => mostrarerror())

}


function mostrarpokemon(datospokemon){
    let infoDiv = document.getElementById('pokemon-info');

    infoDiv.innerHTML = `
      <h2 class = "nombrepoke">${datospokemon.name.toUpperCase()}</h2>
      <img class = "poke-img"src="${datospokemon.sprites.other["official-artwork"].front_default}">
      <p class ="idPoke">Numero:${datospokemon.id}</p>
      <p class ="back-id">${datospokemon.id}</p>
      <p class = "peso">peso:${datospokemon.weight/10}KG</p>
      <p class = "altura">altura:${datospokemon.height/10}M</p>
      
    `
}

function mostrarerror() {
    let pokemonInfoDiv = document.getElementById('pokemon-info');
    pokemonInfoDiv.innerHTML = `<p style="color: red;">Error: Pokémon no encontrado. Por favor, intenta con otro nombre o número.</p>`
    }

    const URL_BASE = 'https://unefa6tosistemas2025api.onrender.com/api/articulos';
    const inputCedula = document.getElementById('cedula');
    const divNombre = document.getElementById('nombre');

    async function obtenerDatosAlumno(cedula) {
      divNombre.textContent = 'Cargando...';

      try {
        const respuesta = await fetch(`${URL_BASE}/${cedula}`);
        if (!respuesta.ok) {
          throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }
        const resultado = await respuesta.json();

        if (resultado.Resul) {
          divNombre.textContent = `${resultado.data[0].ALUNOMBRE}, ${resultado.data[0].ALUNAPELL}`;
        } else {
          divNombre.textContent = resultado.error;
        }
      } catch (error) {
        console.error('Error al consultar la API:', error);
        divNombre.textContent = 'Error al obtener los datos del alumno.';
      }
    }

    function buscarAlumno() {
      const cedula = inputCedula.value;

      if (cedula.trim() === '') {
        alert('Por favor, ingrese la cédula del alumno.');
        return;
      }

      obtenerDatosAlumno(cedula);
    }


    async function obtenerArticulos() {
        const alumno = document.getElementById('alumno').value;
        const categoria = document.getElementById('categoria').value;
        const resultadosDiv = document.getElementById('resultados');
    
        resultadosDiv.innerHTML = "<p>Cargando...</p>";
    
        try {
            const respuesta = await fetch('https://unefa6tosistemas2025api.onrender.com/api/articulos', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "ALUMNO": alumno,
                    "ARTCATEGO": categoria
                })
            });
    
            if (!respuesta.ok) {
                const errorText = await respuesta.text();
                throw new Error(`Error ${respuesta.status}: ${errorText}`);
            }
    
            const resultado = await respuesta.json();
    
            if (resultado.Resul) {
                const listaProductos = resultado.data;
    
                if (listaProductos.length === 0) {
                    resultadosDiv.innerHTML = "<p>No se encontraron artículos para esta categoría.</p>";
                } else {
                    resultadosDiv.innerHTML = "";
    
                    listaProductos.forEach(producto => {
                        const articuloDiv = document.createElement('div');
                        articuloDiv.classList.add('articulo');
                        articuloDiv.innerHTML = `
                            <p><strong>Categoría:</strong> ${producto.ARTCATEGO}</p>
                            <p><strong>Número:</strong> ${producto.ARTNUMERO}</p>
                            <p><strong>Descripción:</strong> ${producto.ARTDESCRI}</p>
                            <p><strong>Precio:</strong> ${producto.ARTPRECIO}</p>
                        `;
                        resultadosDiv.appendChild(articuloDiv);
                    });
                }
            } else {
                resultadosDiv.innerHTML = `<p>Error en la consulta: ${resultado.error}</p>`;
            }
    
        } catch (error) {
            resultadosDiv.innerHTML = `<p>Error general: ${error.message}</p>`;
            console.error("Error general:", error);
        }
    }
