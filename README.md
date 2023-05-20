# scolengo-token
<p align="center">
  <img src="https://github.com/The-Rabbit-Team/.github/blob/master/banners/scolengo-token.png?raw=true" />
</p>

Pour utiliser le wrapper [scolengo-api](https://github.com/maelgangloff/scolengo-api), il est nécessaire de posséder des jetons d'authentification OpenID Connect. Cette application permet de les obtenir auprès du CAS.

Des exécutables sont disponibles dans la dernière [Release](https://github.com/maelgangloff/scolengo-token/releases/latest).


🚨 ATTENTION: Ne communiquez jamais vos jetons à un tiers. Ils vous sont strictement personnels. Si vous pensez que vos jetons ont été dérobés, révoquez-les immédiatement.  

![Presentation](docs/presentation.gif)

## Remarques importantes
 - Il est clairement mentionné que cette librairie est n'est pas officielle.
 - Ce module n'est pas une contrefaçon car il n'existe pas de module similaire édité officiellement.
 - Les utilisateurs ne peuvent accéder qu'à leurs propres données. Ils sont soumis au même processus d'authentification que celui implémenté dans l'application.
 - Les données des utilisateurs ne sont pas davantage exposées puisqu'un utilisateur ne peut accéder qu'à ses propres données. Personne n'a le contrôle sur cette limitation qui est inhérente au fonctionnement de l'API des serveurs de Skolengo.
 - Cette librairie ne se suffit pas à elle-même pour fonctionner. Il est nécessaire de l'importer dans un projet et l'utilisateur final est le seul responsable de son code et des éventuelles conséquences.
 - Tout utilisateur de cette librairie a *a priori* lu l'entièreté du fichier de licence GPLv3 disponible publiquement [LICENSE](https://github.com/maelgangloff/scolengo-token/blob/master/LICENSE) ainsi que de ce présent fichier de présentation.
 - Tout utilisateur de cette librairie a *a priori* lu l'entièreté du code de ce projet avant toute utilisation.
 - Eu égard l'ensemble de ces remarques, les contributeurs et *a fortiori* l'auteur du projet ne peuvent être tenus responsables de tout dommage potentiel.


## Lancer le projet depuis les sources
Prérequis: Node.Js

1. Cloner le dépôt
```shell
git clone https://github.com/maelgangloff/scolengo-token
```
2. Installer les dépendances
```shell
npm install # yarn install
```
3. Lancer l'application
```shell
npx electron .
```

---
Crédit icon: Designed by brgfx / Freepik
