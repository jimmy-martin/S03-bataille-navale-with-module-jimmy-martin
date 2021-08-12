const app = {

  init: function () {
    // On s'assure d'initialiser les autres modules qui en ont besoin
    grid.init(); // <- Chargement de la grille initiale

    // Atelier - Etape 1.2 - Ajout de l'écouteur d'événement
    // Récupérer l'élement du DOM correspondant au formulaire (grace a sa classe)
    let formElement = document.querySelector(".form");
    // Puis y ajouter un écouteur d'événement "submit"
    formElement.addEventListener("submit", app.handleFormSubmit);

    // Atelier - Etape 4 
    let statsButtonElement = document.querySelector("#stats");
    statsButtonElement.addEventListener("click", stats.handleClickStatsButton);

    // Atelier - Etape 5
    let historyButtonElement = document.querySelector("#toggle-actions");
    historyButtonElement.addEventListener("click", stats.handleHistoryButtonClick);

    // On va ajouter un écouteur d'évenement sur CHAQUE case de la grille
    // 1 - On récupère toutes les cases
    let cellElements = document.querySelectorAll("div.cell");
    // 2 - On boucle sur notre tableau d'élements
    for (let cellElementIndex = 0; cellElementIndex < cellElements.length; cellElementIndex++) {
      // 3 - Ajouter l'écouteur sur la case actuellement parcourue
      cellElements[cellElementIndex].addEventListener("click", app.handleCellClick)
    }

    let selectThemeElement = document.querySelector('#theme-select');
    selectThemeElement.addEventListener('change', app.handleSelectChange);

    // document.body.classList.remove('f0f', 'black-and-white', 'terminal', 'oclock');
    // document.body.classList.add(app.getCookieValue('theme'));
    console.log(document.cookie);
  },

  // Atelier - Etape 1.2 - Fonction de callback
  handleFormSubmit: function (evt) {
    // Bloquer le rechargement de la page à la soumission du form
    evt.preventDefault();

    // Récupérer la valeur de l'input => d'abord l'élement
    let inputElement = document.querySelector("#cellToHit");

    // Ensuite, sa value
    let inputElementValue = inputElement.value;

    // console.log( inputElementValue );
    console.log(evt.target);

    // Etape 1.3 - Vider l'input
    // Plusieurs solutions
    //  - Réinitialiser le formulaire
    //     evt.target.reset();
    //  - Vider la value du champ input => y mettre une chaine vide
    inputElement.value = "";

    // Etape 1.4 : Vérifier la validité des coordonnées
    let areCoordsValid = grid.checkCoordinatesInput(inputElementValue);

    // J'utilise maintenant la validité des coords
    // pour conditionner la réponse à apporter
    if (areCoordsValid) {
      // Une fois que j'ai mes coordonnées correctes
      // Je peux envoyer mon missile grace aux fonctions codées précédemment
      let hit = game.sendMissile(inputElementValue);

      // Atelier etape 5
      let actionString = stats.generateActionString(inputElementValue, hit);
      // On a la phrase, on l'ajoute dans la liste
      stats.addToActionsList(actionString);

      // Atelier Etape 2 
      game.updateTurnNumber();
    } else {
      // Si mes coordonnées ne sont pas correctes, j'affiche une erreur
      window.alert("Coordonnées incorrectes !");
    }
  },

  // Fonction appellée au clic sur une cellule
  handleCellClick: function (evt) {
    // On récupère notre cellule cliquée grace aux infos de evt
    let clickedCellElement = evt.target;

    // Extraire les coordonnées de la cellule de l'id
    let clickedCellElementId = clickedCellElement.id;
    console.log(clickedCellElementId);

    // On prends l'id comme un talbeau et on extrait la 5e et 6e lettre
    // Je les transforme ensuite en entier
    let rowIndex = Number(clickedCellElementId[4]);
    let columnIndex = Number(clickedCellElementId[5]);

    // On envoye le missile
    let hit = game.sendMissileAt(rowIndex, columnIndex);

    // Comme je ne passe pas par le formulaire, je n'ai pas l'input
    // je dois donc recalculer la coordonnées en toute lettres
    // a partir des index de ligne et de colonne
    // Heureusement, on a deux tableaux indexés dans le module grid
    // qui contiennent exactement ce qu'on cherche
    let num = grid.headers.rows[rowIndex];
    let letter = grid.headers.columns[columnIndex];

    // Il ne reste plus qu'à concaténer la lettre et le chiffre
    // pour retrouver une coordonnée en "A2" par exemple
    let actionString = stats.generateActionString(letter + num, hit);
    stats.addToActionsList(actionString);

    // On oublie pas d'incrémenter le tour également au clic
    game.updateTurnNumber();
  },

  handleSelectChange: function (evt) {

    let selectedTheme = evt.target.value;
    // document.body.className = selectedTheme; // On va utiliser classList

    // On va d'abord reinitialiser les themes presents sur le body
    document.body.classList.remove('f0f', 'black-and-white', 'terminal', 'oclock');
    document.body.classList.add(selectedTheme);
    
    
    let name = evt.target.name;
    app.setCookie(name, selectedTheme);

  },

  // Creation d'un cookie
  setCookie: function (name, value) {
    // Creation d'un cookie pour stocker le theme choisit par l'utilisateur et le 'sauvegarder' pendant 1 jour
    // Je determine d'abord sa date d'expiration en ms ( ici 1 jour ) au format UTC
    // Je cree mon cookie
    document.cookie = name + '=' + value + '; path=/; max-age= 86400';
    console.log(document.cookie);
  },

  // Recuperer le contenu du cookie à partir d'un index
  getCookieVal: function (offset) {
    let endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
      endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
  },
  
  // Recuperer la valeur associée au nom du cookie recherché
  getCookieValue: function (name) {
    let argument = name + "=";
    let argumentLength = argument.length;
    let cookielength = document.cookie.length;
    let numberToIncrement = 0;
    while (numberToIncrement < cookielength) {
      let secondNumberToIncrement = numberToIncrement + argumentLength;
      if (document.cookie.substring(numberToIncrement, secondNumberToIncrement) == argument)
        return app.getCookieVal(secondNumberToIncrement);
      numberToIncrement = document.cookie.indexOf(" ", numberToIncrement) + 1;
      if (numberToIncrement == 0) break;
    }
    return null;
  }
};

// On execute l'initialisation de notre app lorsque
// le DOM indique qu'il est complètement chargé
document.addEventListener("DOMContentLoaded", app.init);