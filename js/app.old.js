
console.log("Fichier app.js chargé !");

// Une seule ligne : un tableau de 8 string
// let row = [ "", "", "", "b", "b", "", "", "" ];
// console.log( row );

// Etape 5 : Une vrai grille !
let grid = [
  // A   B    C    D     E    F   G   H
  ['', '⛵', '⛵', '⛵', '', '', '', ''], // 1
  ['', '', '', '', '', '', '', ''], // 2
  ['', '', '', '', '', '⛵', '', ''], // 3
  ['', '', '', '', '', '⛵', '', ''], // 4
  ['', '', '', '', '', '⛵', '', ''], // 5
  ['', '', '', '', '', '⛵', '', ''], // 6
  ['⛵', '⛵', '', '', '', '', '', ''], // 7
  ['', '', '', '', '', '', '', '']  // 8
];

// Atelier - Etape 2 
let turn = 1;

// Etape 9 : Des en-têtes propres
// On va stocker nos entêtes dans un tableau associatif a deux "cases"
// Une pour les colonnes et une autre pour les lignes
const gridHeaders = {
  // index    0  1  2  3  4  5  6  7
  rows: [1, 2, 3, 4, 5, 6, 7, 8],
  // index     0    1    2    3    4    5    6    7
  columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
};

// Etape 6 : "Afficher" toute la grille
function displayGrid() {
  // On affiche les en-têtes des colonnes
  // console.log( "  A B C D E F G H" )

  // Petite astuce maintenant qu'on a un tableau de nos entetes :
  // On peut transformer un tableau en string avec .join() !
  // On oublie pas d'ajouter les deux premiers espaces pour que tout s'aligne bien ;)
  console.log("  " + gridHeaders.columns.join(" "));

  // On regarde ce que contient une "case" de la grille
  // console.log( grid[0] );

  // Plutot que d'afficher chaque ligne a la main, on boucle !
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    // rowIndex contient le numéro de la ligne
    // grid[rowIndex] contient donc la ligne entière
    // On peut donc réutiliser notre fonction d'affichage de ligne !
    // displayLine( grid[rowIndex] );

    // On va faire un peu mieux : on va mettre le numéro de ligne au début !
    let stringLine = gridHeaders.rows[rowIndex];

    // On concatène un espace après ce numéro
    stringLine += " ";

    // Puis on concatène le retour de la fonction displayLine après tout ça
    // la fonction nous renvoi une string du type "~ ~ ~ ~ b b ~ ~"
    stringLine += displayLine(grid[rowIndex], rowIndex);

    // On affiche le tout !
    console.log(stringLine);
  }
}

// Etape 3 : Renvoyer une ligne "stringisée"
function displayLine(gridLine, rowIndex) {
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
}

// Etape 4 : Envoyer un missile
// Etape 7 : Réparation du canon
function sendMissileAt(rowIndex, columnIndex) {
  // On va récupérer le contenu de la case ciblée
  let targetCell = grid[rowIndex][columnIndex];

  // grid est un tableau de LIGNES
  // grid[rowIndex] est une LIGNE (row) => un tableau de COLONNE (column)
  // grid[rowIndex][columnIndex] est une case

  // console.log(targetCell);

  // On vérifie ce que contient cette case
  if (targetCell === "⛵") // <- J'ai touché une case "bateau"
  {
    console.log("Touché !");

    // On remplace le "b" (bateau) par un "t" (touché)
    grid[rowIndex][columnIndex] = "💥";
    // Attention, targetCell n'est qu'une COPIE de grid[rowIndex][columnIndex]
    // Si on veut modifier notre grille on doit utiliser la variable qui la contient

    displayGrid();

    // DOM Etape 4 : Lister les cases touchées
    // On met bien ce code APRES displayGrid, car c'est ce dernier qui
    // met les classes hit sur les cases touchées
    let allCellsHitElements = document.querySelectorAll(".hit");
    console.log(allCellsHitElements);

    return true;
  }
  else if (targetCell === "💥" || targetCell === "❌") // Si on tire de nouveau sur une case déjà touchée ou ratée
  {
    console.log("Allooo! Allooooo! Y'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !");
    displayGrid();
    return false;
  }
  else {
    console.log("Raté !");

    // On remplace le "" (rien) par un "p" (plouf)
    grid[rowIndex][columnIndex] = "❌";

    displayGrid();
    return false;
  }
}

// Challenge - Etape 3 : fonction fournie
function sendMissile(cellName) {
  // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
  const result = getGridIndexes(cellName);
  const rowIndex = result[0];
  const columnIndex = result[1];

  // Puis on appelle la fonction sendMissileAt
  // on prend soin de retourner la valeur de retour de sendMissileAt
  // (VRAI si touché, FALSE sinon)
  return sendMissileAt(rowIndex, columnIndex);
}

// Challenge - Etape 3 : fonction à coder
// Transformer la coordonnée "texte" en index colonne / ligne
function getGridIndexes(cellName) {
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
  const columnIndex = gridHeaders.columns.indexOf( letter );
  const rowIndex = gridHeaders.rows.indexOf( rowCoord );

  // On oublie pas de renvoyer les deux index trouvés à l'appellant
  // Pour ça, on renvoi un tableau indexé qui contient nos deux index
  return [rowIndex, columnIndex];
}

// Bonus 1 :
function checkGameOver() 
{
  // On compte les bateaux restants
  let remainingBoatCell = 0;

  // Pour chaque ligne...
  for( let row of grid ) // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of
  {
    // Et chaque case de chaque ligne
    for( let cell of row ) 
    {
      // Si la case contient un bateau
      if( cell === '⛵' ) 
      {
        // On ajoute 1 au compteur de bateaux restants
        remainingBoatCell++;
      }
    }
  }

  // Si il reste 0 bateaux, game over !
  if( remainingBoatCell === 0 ) 
  {
    console.log('Game Over !');
    return true;
  } 
  else 
  {
    // Sinon, rien 
    return false;
  }
}

// Bonus 2 : 
function promptMissileCell() 
{
  // https://developer.mozilla.org/fr/docs/Web/API/Window/prompt
  let cell = prompt('Où envoyer notre prochain missile Commandant ? (A3, B1, etc.)');
  return sendMissile(cell);
}

// ATTENTION, LE PROMPT CASSE LES MODIFICATIONS DU DOM :o
// Pour l'instant, ce morceau de code restera commenté ;)
/*
while( checkGameOver() === false ) // tant que le jeu n'est pas terminé
{
  // on affiche la grille
  displayGrid();
  // puis on demande au joueur de donner une case
  promptMissileCell();
}
*/

function updateTurnNumber()
{
  // Incrémenter le nombre de tour
  turn++;

  // Je récupère mon élément <h3>
  let turnTitleElement = document.querySelector( "h3" );

  // Je modifie son contenu textuel
  turnTitleElement.textContent = "Tour " + turn;
}

// Atelier - Etape 1.2 - Fonction de callback
function handleFormSubmit( evt )
{
  // Bloquer le rechargement de la page à la soumission du form
  evt.preventDefault();

  // Récupérer la valeur de l'input => d'abord l'élement
  let inputElement = document.querySelector( "#cellToHit" );

  // Ensuite, sa value
  let inputElementValue = inputElement.value;

  // console.log( inputElementValue );
  console.log( evt.target );

  // Etape 1.3 - Vider l'input
  // Plusieurs solutions
  //  - Réinitialiser le formulaire
  //     evt.target.reset();
  //  - Vider la value du champ input => y mettre une chaine vide
  inputElement.value = "";

  // Etape 1.4 : Vérifier la validité des coordonnées
  let areCoordsValid = checkCoordinatesInput( inputElementValue );

  // J'utilise maintenant la validité des coords
  // pour conditionner la réponse à apporter
  if( areCoordsValid )
  {
    // Une fois que j'ai mes coordonnées correctes
    // Je peux envoyer mon missile grace aux fonctions codées précédemment
    let hit = sendMissile( inputElementValue );

    // Atelier etape 5
    let actionString = generateActionString( inputElementValue, hit );
    // On a la phrase, on l'ajoute dans la liste
    addToActionsList( actionString );

    // Atelier Etape 2 
    updateTurnNumber();
  }
  else
  {
    // Si mes coordonnées ne sont pas correctes, j'affiche une erreur
    alert( "Coordonnées incorrectes !" );
  }
} 

// Etape 1.4 : Vérifier la validité des coordonnées
function checkCoordinatesInput( inputCoordinates )
{
  // On réutiliser notre fonction getGridIndexes
  // Si cette dernière nous renvoi un tableau qui contient
  // au moins un -1, c'est que la coordonnée n'existe pas
  let gridIndexCoordinates = getGridIndexes( inputCoordinates );

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
}

function handleClickStatsButton( evt )
{
  // TODO : Récupérer les infos me permettant de construire le texte
  // que je vais afficher dans ma popup alert
  let alertMessage = "";

  // Je commence par le nombre total de missiles tirés
  // ce nombre est égal au numéro du tour actuel, -1
  let totalMissiles = turn - 1;

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
  alertMessage += "Réussis : " + successRate + "%\n";
  alertMessage += "Ratés : " + failRate + "%";

  // On affiche finalement notre alert
  alert( alertMessage );
}

function generateActionString( cellName, hit )
{
  return "Tour#" + turn + " tir en " + cellName + " : " + ( hit === true ? "réussi" : "raté" );

  // Strictement identique à 
  // if( hit === true )
  // {
  //   return "Tour#" + turn + " tir en " + cellName + " : " + "réussi";
  // }
  // else
  // {
  //   return "Tour#" + turn + " tir en " + cellName + " : " + "raté";
  // }
}

function addToActionsList( actionString )
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
}

function handleHistoryButtonClick( evt )
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

// Atelier - Etape 1.2 - Ajout de l'écouteur d'événement
// Récupérer l'élement du DOM correspondant au formulaire (grace a sa classe)
let formElement = document.querySelector( ".form" );
// Puis y ajouter un écouteur d'événement "submit"
formElement.addEventListener( "submit", handleFormSubmit );

// Atelier - Etape 4 
let statsButtonElement = document.querySelector( "#stats" );
statsButtonElement.addEventListener( "click", handleClickStatsButton );

let historyButtonElement = document.querySelector( "#toggle-actions" );
historyButtonElement.addEventListener( "click", handleHistoryButtonClick );

// Test étape 3 : On appelle la fonction, et on lui donne la ligne en argument
// displayLine( row );

// Test étape 4 :
// sendMissileAt( 3 );

// Test étape 6 :
// displayGrid();