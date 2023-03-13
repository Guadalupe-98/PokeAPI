function search() {
  let busqueda = document.getElementById("searchtxt").value;

  fetch("https://pokeapi.co/api/v2/pokemon/" + busqueda) // peticiones asincronicas.accede y manipula partes del canal (consulta a la api)
    .then((response) => response.json())
    .then((json) => llenarDatosPokemon(json))
    .catch((error)=>{
      alert('No existe!')
    })
  
}

function llenarDatosPokemon(pokemon) {
  document.getElementById("pokeCard").style.display = "inline"; //(style para visualizar el elemento card)

  let types = "";
  pokemon.types.forEach((p) => {
    // foreach recorre la lista dentro del objeto pokémon
    types += p.type.name + " "; // un pokémon puede ser más de un tipo
  });

  document.getElementById("namePoke").innerText = pokemon.name;
  document.getElementById("typePoke").innerText = types;
  document.getElementById("heightPoke").innerText = pokemon.height;
  document.getElementById("weightPoke").innerText = pokemon.weight;

  document.getElementById("imgPoke").src = pokemon.sprites.front_default;
}

function iniciaLista() {
  fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    .then((response) => response.json())
    .then((json) => llenarLista(json));
}

let next = "";
let back = "";

function llenarLista(pokemones) {
  pokemones.results.forEach((pok) => {
    let elementoLista =
      "<li class='list-group-item'> <a href='#' onclick='buscarPokemon(this);' > " +
      pok.name +
      " </a> </li>";
    document.getElementById("list").innerHTML += elementoLista;
  });

  next = pokemones.next;
  back = pokemones.previous;

  if(back==null){
    document.getElementById("back1").style.display= "none";
    document.getElementById("back2").style.display= "none";
  } else{
    document.getElementById("back1").style.display= "inline";
    document.getElementById("back2").style.display= "inline";
  }

  if(next==null){
    document.getElementById("next1").style.display= "none";
    document.getElementById("next2").style.display= "none";
  } else{
    document.getElementById("next1").style.display= "inline";
    document.getElementById("next2").style.display= "inline";
  }
}

function buscarPokemon(nombrePokemon) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon.innerText)
    .then((response) => response.json())
    .then((json) => llenarDatosPokemon(json));
}

function paginacion(next_back) {
  //1ro vacio la lista.
  let list = document.getElementById("list");
  if (list.hasChildNodes()) {
    while (list.childNodes.length >= 1) {
      list.removeChild(list.firstChild);
    }
  }
  switch (next_back) {
    case "next":
      fetch(next)
        .then((response) => response.json())
        .then((json) => llenarLista(json));
      break;

    case "back":
      fetch(back)
        .then((response) => response.json())
        .then((json) => llenarLista(json));
      break;
  }
}

window.onload = iniciaLista();
