const game = {

  turn : 1,

  sendMissileAt : function(rowIndex, columnIndex) 
  {
    // On va récupérer le contenu de la case ciblée
    let targetCell = grid.cells[rowIndex][columnIndex];
  
    // grid est un tableau de LIGNES
    // grid[rowIndex] est une LIGNE (row) => un tableau de COLONNE (column)
    // grid[rowIndex][columnIndex] est une case
  
    // console.log(targetCell);
  
    // On vérifie ce que contient cette case
    if (targetCell === "⛵") // <- J'ai touché une case "bateau"
    {
      console.log("Touché !");
  
      // On remplace le "b" (bateau) par un "t" (touché)
      grid.cells[rowIndex][columnIndex] = "💥";
      // Attention, targetCell n'est qu'une COPIE de grid[rowIndex][columnIndex]
      // Si on veut modifier notre grille on doit utiliser la variable qui la contient
  
      grid.displayGrid();
  
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
      grid.displayGrid();
      return false;
    }
    else {
      console.log("Raté !");
  
      // On remplace le "" (rien) par un "p" (plouf)
      grid.cells[rowIndex][columnIndex] = "❌";
  
      grid.displayGrid();
      return false;
    }
  },
  
  // Challenge - Etape 3 : fonction fournie
  sendMissile : function(cellName) {
    // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
    const result = grid.getGridIndexes(cellName);
    const rowIndex = result[0];
    const columnIndex = result[1];
  
    // Puis on appelle la fonction sendMissileAt
    // on prend soin de retourner la valeur de retour de sendMissileAt
    // (VRAI si touché, FALSE sinon)
    return game.sendMissileAt( rowIndex, columnIndex );
  },

  updateTurnNumber: function ()
  {
    // Incrémenter le nombre de tour
    game.turn++;

    // Je récupère mon élément <h3>
    let turnTitleElement = document.querySelector( "h3" );

    // Je modifie son contenu textuel
    turnTitleElement.textContent = "Tour " + game.turn;
  }

};