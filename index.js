$(document).ready(function(){
    consultaAPI("pikachu")
    
    $("button").click(function(){
        let pokemon = $("#input").val()
        consultaAPI(pokemon)
    })
   
    

    function consultaAPI(nombrePokemon) {
        $.ajax({
          type: "GET",
          url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
          dataType: "json",
          success: function (pokemon) {
            $("#imagen1").attr(
              `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="">`
              );
              $('#imagen-pokemon').html(pokemon.name);

            $("#imagen2").html(
              `<img src="${pokemon.sprites.front_default}" alt="">`
            );
            $("#imagen3").html(
              `<img src="${pokemon.sprites.back_default}" alt="">`
            );
            var chart = new CanvasJS.Chart("chartContainer", {
              theme: "light2", // "light1", "light2", "dark1", "dark2"
              exportEnabled: true,
              animationEnabled: true,
              title: {
                text: "Características del Pokémon " + pokemon.name,
              },
              data: [
                {
                  type: "bar",
                  startAngle: 25,
                  toolTipContent: "<b>{label}</b>: {y}",
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabelFontSize: 16,
                  indexLabel: "{label} - {y}",
                  dataPoints: [
                    {y: pokemon.stats[0].base_stat, label: pokemon.stats[0].stat.name},
                    {y: pokemon.stats[1].base_stat, label: "Ataque"},
                    {y: pokemon.stats[2].base_stat, label: "Defensa"},
                    {y: pokemon.stats[3].base_stat, label: "Ataque Especial"},
                    {y: pokemon.stats[4].base_stat, label: "Defensa Especial"},
                    {y: pokemon.stats[5].base_stat, label: "Velocidad"},
                  ],
                },
              ],
            });
            chart.render();
          },
          error: function (xhr) {
              if(xhr.status === 404){
                  alert('Has escrito información que no existe')
              }
          }
        });
    }
})