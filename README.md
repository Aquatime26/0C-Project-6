# Mon vieux Girmoire - Application de gestion de livres

Projet réalisé lors de ma formation de Développer Web, avec OpenClassroom

## Structure du projet

-**Frontend** : React, React Router, Axios
-**Backend** : Node.js, Express, Bcrypt, Jsonwebtoken, Mongoose, Multer, Nodemon, Sharp
-**Base de données** : MongoDB Atlas
-**Authentification** : JSON Web Token (JWT)

## Fonctionnalités de l'app

- Création de compte et connexion sécurisée
- Ajout de nouveaux livres
- Modification ou suppression du livre par son propriétaire
- Possibilité de noter les livres des autres utilisateurs
- redirection automatique en casd e déconnexion


## Installation

**Clôner le dépot**
git clone 

**cd P7-Dev-Web-Livres**
npm install

**backend**
npm install

### Configuration
Copier le fichier .env.example et créer un fichier .env à la racine du projet
Remplir les variable du fichier .env avec tes informations personnelles

-> Le port Backend
-> l'url de ta base de données MongoDB
-> Ta clé secrète pour ton JsonWebToken
-> Le port FrontEnd (pas obligatoire)

(NOTE pour l'examinateur : je vous enverrais directement mon propre fichier .env en parallèle du repo github pour que vous puissiez mettre mes propres informations)

#### Lancer l'application

**cd P7-Dev-Web-Livres**
npm run start

**backend**
nodemon run start
