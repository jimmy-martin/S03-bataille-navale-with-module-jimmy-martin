const score = {

    // On stocke un tableau des meilleurs scores
    highscores: {},

    init: function () {
        // Exemple : highscores en JSON :
        // console.log(score.highscores);
        // console.log(JSON.stringify(score.highscores));
        // console.log(JSON.parse(JSON.stringify(score.highscores)));

        // On va chercher nos highscores dans le localStorage quand on initialise la partie
        let scoresJson = localStorage.getItem('scores');

        // On verifie si on a déja des highscores enregistres
        if (scoresJson !== null) {

            // On va partir du principe que scores contient une string au format JSON, qui représente notre tableau des highscores enregistres dans le localStorage lors des precedentes parties
            score.highscores = JSON.parse(scoresJson);
        }
    },

    // Cette fonction est appelée lors du gameover
    updateHighScores: function (evt) {

        // On peut aussi le recuperer dynamiquement avec un form (BONUS Atelier)
        let username = 'jimmy';

        // On ajoute notre nouveau score au tableau
        score.highscores[username] = game.score;

        // TODO: BONUS: On pourrait vérifier si notre nouveau score est meilleur que l'ancien avant de le remplacer

        let highscoresJSON = JSON.stringify(score.highscores);

        // Maintenant que j'ai une string, je peux la placer dans le localStorage
        localStorage.setItem('scores', highscoresJSON);
    },
};