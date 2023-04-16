# scolengo-token
Pour utiliser le wrapper [scolengo-api](https://github.com/maelgangloff/scolengo-api), il est nécessaire de posséder des jetons d'authentification OpenID Connect. Cette application permet de les obtenir auprès du CAS.  

🚨 ATTENTION: Ne communiquez jamais vos jetons à un tiers. Ils vous sont strictement personnels. Si vous pensez que vos jetons ont été dérobés, révoquez-les immédiatement.


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
