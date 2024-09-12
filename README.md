# Test Technique

Mower Simulation

## Introduction

Voici le résultat du test technique que vous m'avez transmis en date du 4 septembre.
Il fait suite à l'entretien effectué la veille avec Gwenaëlle Vicente.

N'ayant pas pu travailler dessus en fin de semaine dernière, je tarde un petit peu à vous le rendre, j'espère que cela n'impactera pas l'évaluation de son contenu.


## Description des fonctionnalités

J'ai donc réalisé le test en suivant l'Objectif, et en me permettant de jouer un peu avec le sujet. En effet, cela faisait très longtemps que je n'avais pas fait de ReactJs et cela m'a donné envie d'aller un petit peu plus loin que ce qui était demandé. (Pas d'un point de vu purement esthétique comme vous allez pouvoir le remarquer).

Je n'ai pas trouvé nécessaire de poser des questions étant donné que l'énoncé est particulièrement bien expliqué.

Cependant, pour des raisons de lisibilité et d'expérience utilisateur, j'ai interprété de nombreux critères : 

### Déplacement des tondeuses

Il était demandé que chaque tondeuse se déplace de façon séquentielle. 

- **Boutons de contrôle**

Dans un soucis de scalabilité, j'ai rajouté un bouton de sélection de tondeuse de façon choisir celle que l'on souhaite déplacer.
J'ai également rajouté des boutons de contrôle de la tondeuse, pouvant la faire avancer/reculer ou lire la suite des instructions suivantes automatiquement.

- **Tableau récapitulatif**

J'ai décidé de faire un récapitulatif des tondeuses chargées dans le fichier, et d'afficher la position et orientation finale attendue de chaque tondeuse avant même de les avoirs lancées. Cela augmente la lisibilité du rendu, surtout si le nombre de tondeuses augmente.

- **Pelouse**

Afin de rendre le résultat visuel, j'ai également choisi d'afficher la pelouse. Cela permet de voir la position de la tondeuse en cours de déplacement, et les flèches pour l'orientation.

- **Pour aller plus loin**

De façon à ne pas passer 10h sur le sujet, certaines fonctionnalités que j'ai eu en tête n'ont pas été implémentées, même si certaines font particulièrement sens avec l'énoncé :
- Je pense notamment à afficher sur la pelouse les parcelles déjà tondues;
- Eventuellement laisser toutes ou partie des tondeuses sur la pelouse en les distinguants avec un jeu de couleur par exemple. Cela dépend du nombre de tondeuse par parcelle potentielle sur la pelouse, car la lisibilité peut en être impactée;
- Garder en mémoire la position et orientation des tondeuses qui ont déjà avancé.
- Implémenter la succession automatique des tondeuses;
- Charger plusieurs fichiers / afficher plusieurs pelouses...
- Evidemment, mon rendu est loin d'être parfait, et de très nombreuses améliorations esthétiques peuvent être apportées.


## Spécificités techniques

D'un point de vu technique, la seule consigne était d'utiliser ReactJs. Tout a donc été développé en ReactJs étant donné la simplicité du programme.

Cela aurait pu être pertinent, surtout pour la scalabillité, de créer une API pour la lecture du fichier, et le calcul des mouvements des tondeuses, voire une base de données si les tondeuses sont très nombreuses.

### Architecture

J'ai créé une architecture assez simpliste, basées sur les Composants et la volonté de les rendre autonomes.

Etant donné la faible complexité du projet, tout est orchestré par App.tsx. Cela aurait été pertinent de créer des contextes, et des Composants intermédiaires.

En conséquence, je n'ai pas non plus créer de sous-dossiers pour regrouper les Composants, ainsi que les styles.

### Tests

Pour les tests, je suis loin d'avoir fait une couverture complète du code.
Malgré leur utilité, les tests de composants sont souvent très répétitifs et long à mettre en place, c'est pourquoi je me suis concentré uniquement sur App.tsx.

Concernant les tests unitaires, j'ai essayé de couvrir un maximum de cas d'usage des fichiers de "services" et "utils".

## Lancement

```bash
npm install
```

### API

```bash
npm start
```

[http://localhost:3000](http://localhost:3000) 

### Tests

```bash
npm test
```
Il se peut que les tests ne se lancent pas car il n'y a pas eu de changement depuis le dernier commit : appuyer sur a.
