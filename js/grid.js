const grid = {

  // La grille
  cells : [],

  // Les entêtes (lignes et colonnes)
  headers : {
    rows    : [],
    columns : []
  },

  // Par convention, on va toujours créer une fonction init dans nos modules
  init: function() 
  {
    // On initialise la grille
    grid.cells = [
      ['', '⛵', '⛵', '⛵', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '⛵', '', ''],
      ['', '', '', '', '', '⛵', '', ''],
      ['', '', '', '', '', '⛵', '', ''],
      ['', '', '', '', '', '⛵', '', ''],
      ['⛵', '⛵', '⛵', '', '⛵', '', '', ''],
      ['', '', '', '', '', '', '', '']
    ];

    // On initialise les entêtes
    grid.headers.rows    = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
    grid.headers.columns = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

    grid.displayGrid();
  },

  // Etape 1.4 : Vérifier la validité des coordonnées
  checkCoordinatesInput : function( inputCoordinates )
  {
    // On réutiliser notre fonction getGridIndexes
    // Si cette dernière nous renvoi un tableau qui contient
    // au moins un -1, c'est que la coordonnée n'existe pas
    let gridIndexCoordinates = grid.getGridIndexes( inputCoordinates );

    // Maintenant, je vérifie le contenu de gridIndexCoordinates
    if( gridIndexCoordinates[0] > -1 && gridIndexCoordinates[1] > -1 )
    {
      // Mes cordonnées sont valides, je renvoi true
      return true;
    }

    // Dans tous les autres cas, je pars du principe que c'est faux
    return false;

    // Version raccourcie :
    //  return ( gridIndexCoordinates[0] > -1 && gridIndexCoordinates[1] > -1 );
  },

  // Etape 6 : "Afficher" toute la grille
  displayGrid : function () 
  {
    // On affiche les en-têtes des colonnes
    // console.log( "  A B C D E F G H" )

    // Petite astuce maintenant qu'on a un tableau de nos entetes :
    // On peut transformer un tableau en string avec .join() !
    // On oublie pas d'ajouter les deux premiers espaces pour que tout s'aligne bien ;)
    console.log("  " + grid.headers.columns.join(" "));

    // On regarde ce que contient une "case" de la grille
    // console.log( grid[0] );

    // Plutot que d'afficher chaque ligne a la main, on boucle !
    for( let rowIndex = 0; rowIndex < 8; rowIndex++ ) {
      // rowIndex contient le numéro de la ligne
      // grid[rowIndex] contient donc la ligne entière
      // On peut donc réutiliser notre fonction d'affichage de ligne !
      // displayLine( grid[rowIndex] );

      // On va faire un peu mieux : on va mettre le numéro de ligne au début !
      let stringLine = grid.headers.rows[rowIndex];

      // On concatène un espace après ce numéro
      stringLine += " ";

      // Puis on concatène le retour de la fonction displayLine après tout ça
      // la fonction nous renvoi une string du type "~ ~ ~ ~ b b ~ ~"
      stringLine += grid.displayLine( grid.cells[rowIndex], rowIndex );

      // On affiche le tout !
      console.log( stringLine );
    }
  },

  // Etape 3 : Renvoyer une ligne "stringisée"
  displayLine : function (gridLine, rowIndex) 
  {
    // On initialise la chaine de caractères pour la ligne
    let line = "";

    // On boucle sur le tableau !
    for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
      // On récupère le caractère de la case "actuelle"
      let currentChar = gridLine[columnIndex];

      // DOM : On "calcule" l'id de l'élément a partir de ses coordonnées
      let currentCellID = "cell" + rowIndex + columnIndex;

      // DOM : On récupère l'élement du DOM qui correspond
      // à la case actuelle, ici une <div>, grace a son ID
      let currentCellElement = document.getElementById(currentCellID);

      // La même chose avec querySelector
      // Attention, querySelector s'attends a recevoir un selecteur CSS
      // on doit donc utiliser #cellXX en paramètre au lieu de juste cellXX
      // let currentCellElement = document.querySelector( "#" + currentCellID );

      // Selon ce caractère, on va faire des trucs
      if (currentChar === "") {
        // Je concatène mon tilde a la fin de ma ligne
        line += "🌊";
        // Version raccourcie de :
        //  line = line + "~";

        // On utilise le DOM pour mettre à jour le contenu
        // textuel de la case concernée, par une vague
        currentCellElement.textContent = "🌊";
      }
      else {
        // Sinon, j'ajoute le caractère rencontré dans la case
        line += currentChar;

        // Même chose pour y mettre les différentes lettres (b,t,p)
        currentCellElement.textContent = currentChar;

        if (currentChar === "💥") {
          currentCellElement.classList.add("hit");
        }
        else if (currentChar === "❌") {
          currentCellElement.classList.add("splash");
        }
      }

      // Pour aérer la représentation de ma ligne
      // je vais ajouter un espace après chaque caractère
      line += " ";
    }

    // console.log( line )

    // Maintenant, on renvoi "juste" la string qui représente la ligne
    return line;
  },

  getGridIndexes : function(cellName) {
    // On isole les deux coordonnées
    const letter = cellName[0]; // On peut utiliser une string comme un tableau de lettres
    // Ici on récupère donc la première lettre de la coordonnée (ex: "A" si cellName = "A5")
  
    // Ici on récupère donc la deuxcième coordonnée (ex: "5" si cellName = "A5")
    // Comme notre liste de numéro de lignes est un tableau de nombre
    // On doit convertir notre deuxième partie de coordonée en nombre également
    // Sinon, on arrivera pas a trouver une string "5" dans un tableau de Number [ ... 4, 5, 6, ...]
    const rowCoord = Number(cellName[1]);
  
    // On transforme notre lettre en index de ligne grace a gridHeaders
    // .indexOf va nous trouver a quel index se trouve notre lettre
    // dans le tableau d'entete de colonnes (ex: 0 si letter = "A")
    const columnIndex = grid.headers.columns.indexOf( letter );
    const rowIndex = grid.headers.rows.indexOf( rowCoord );
  
    // On oublie pas de renvoyer les deux index trouvés à l'appellant
    // Pour ça, on renvoi un tableau indexé qui contient nos deux index
    return [rowIndex, columnIndex];
  }
};