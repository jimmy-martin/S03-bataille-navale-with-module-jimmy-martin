const stats = {

  handleClickStatsButton : function( evt )
  {
    // TODO : Récupérer les infos me permettant de construire le texte
    // que je vais afficher dans ma popup alert
    let alertMessage = "";

    // Je commence par le nombre total de missiles tirés
    // ce nombre est égal au numéro du tour actuel, -1
    let totalMissiles = game.turn - 1;

    // Je l'ajoute a mon message
    alertMessage += "Missiles tirés : " + totalMissiles + "\n";

    // Ensuite je dois calculer les pourcentage de réussite
    // Pour ça, je vais compter le nombre de cases avec la classe .hit
    let hitCellElements = document.querySelectorAll( ".hit" );

    // Le nombre de missiles qui ont touché est donc le nombre de cases .hit
    let hitMissileCount = hitCellElements.length;

    // Je calcule mon pourcentage de tirs réussis
    let successRate = hitMissileCount / totalMissiles * 100;

    // A partir du pourcentage de réussite, j'en déduis mon taux d'échec
    let failRate = 100 - successRate;

    // Enfin, j'ajoute mes pourcentages a mon message 
    alertMessage += "Réussis : " + successRate.toFixed(0) + "%\n";
    alertMessage += "Ratés : " + failRate.toFixed(0) + "%";

    // On affiche finalement notre alert
    alert( alertMessage );
  },  

  generateActionString : function( cellName, hit )
  {
    return "Tour#" + game.turn + " tir en " + cellName + " : " + ( hit === true ? "réussi" : "raté" );

    // Strictement identique à 
    // if( hit === true )
    // {
    //   return "Tour#" + turn + " tir en " + cellName + " : " + "réussi";
    // }
    // else
    // {
    //   return "Tour#" + turn + " tir en " + cellName + " : " + "raté";
    // }
  },

  addToActionsList : function( actionString )
  {
    // Atelier - Etape 5
    let actionsListElement = document.querySelector( "#actions" );

    // La encore plusieurs solutions, vu l'heure, on fait la plus rapide
    actionsListElement.innerHTML = "<div>" + actionString + "</div>" + actionsListElement.innerHTML;

    // On aurait pu créer l'element de toute pièce avec createElement
    // Dans ce cas, il aurait fallu l'ajouter au début de la liste
    // des précédents élement avec .prepend()
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend

    // On aurait aussi pu les afficher dans l'ordre "normal" et inverser
    // l'affichage grace au CSS et à flexbox
    // https://developer.mozilla.org/fr/docs/Web/CSS/flex-direction
  },
  
  handleHistoryButtonClick : function ( evt )
  {
    let actionsListElement = document.querySelector( "#actions" );
    console.log( actionsListElement.style.display );
  
    if( actionsListElement.style.display === "block" )
    {
      actionsListElement.style.display = "none";
    }
    else
    {
      actionsListElement.style.display = "block";
    }
  }

};
