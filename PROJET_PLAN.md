# 🏛️ Plan de Projet Final : Application Companion SaaS (Approche Standard)

*Ce document est la source de vérité unique et définitive pour la création de l'application. Il remplace toutes les versions précédentes et adopte une architecture standard sans Nx.*

---

## 🎯 1. Vision & Stratégie

* **Vision Produit** : Un compagnon de recherche d'emploi SaaS de premier plan, qui transforme la recherche d'emploi en une expérience de développement personnel et professionnel grâce à des outils intelligents et une assistance par IA personnalisée.
* **Stratégie de Développement** : **Phasée et Modulaire**. Le développement suivra un ordre de livraison précis pour mettre le produit sur le marché de manière incrémentale.
* **Approche Technique Fondamentale** : **Mobile-First**. L'interface utilisateur sera conçue et développée en priorité pour les appareils mobiles.

---

## 📜 2. Principes Fondamentaux (Non négociables)

1.  🧱 **Modularité (Angular Workspace)** : Le projet frontend sera un "Angular Workspace", utilisant la capacité native de la CLI Angular à gérer une application principale et des bibliothèques locales pour une séparation claire des fonctionnalités.
2.  🛡️ **Sécurité by Design (OWASP)** : Les recommandations du **TOP 10 OWASP** sont des prérequis à chaque phase de développement.
3.  🇪🇺 **Conformité by Design (RGPD)** : Le traitement des données respecte les principes du **RGPD**. L'hébergement des données et des services se fera exclusivement dans des régions GCP européennes.
4.  🌍 **Internationalisation (i18n) Native** : L'application est conçue pour être multilingue via le framework **`@angular/localize`** dès la première ligne de code.

---

## 🛠️ 3. Architecture & Stack Technologique

* **Frontend** :
    * **Structure** : **Angular Workspace** (généré avec `ng new --create-application=false`).
    * **Framework** : **Angular 17+**.
    * **UI** : **Composants sur-mesure développés avec Tailwind CSS**.
    * **Hébergement** : **Firebase Hosting**.

* **Backend** :
    * **Structure** : **Repository Git séparé** pour une indépendance totale.
    * **Framework de l'API** : **NestJS (avec Node.js & TypeScript)**.
    * **Hébergement de l'API** : L'application NestJS sera conteneurisée et déployée sur **Google Cloud Run**.
    * **Tâches Asynchrones** : **Google Cloud Functions**.

* **Base de Données & Stockage** :
    * **Données** : **Firestore**.
    * **Fichiers** : **Google Cloud Storage**.

* **Intelligence Artificielle (LLM)** :
    * L'architecture sera **agnostique du modèle**. Une couche de service dans le backend NestJS fera office d'adaptateur.

* **Authentification & Sécurité** :
    * **Auth** : **Firebase Authentication**.
    * **API Gateway** : **Google Cloud API Gateway**.

* **DevOps & Infrastructure** :
    * **Infrastructure as Code** : **Terraform**.
    * **CI/CD** : **Google Cloud Build** (avec deux pipelines distincts, un pour le front, un pour le back).

---

## 🏗️ 4. Structure des Projets

Nous aurons deux repositories principaux sur GitHub :

1.  **`apply-saas-frontend`** (Angular Workspace)
    ```
    /apply-saas-frontend/
    ├── projects/
    │   ├── apply-web/          # L'application principale
    │   └── build-feature/      # Chaque feature sera une lib
    │   └── applications-feature/
    │   └── ...
    │
    └── PROJECT_PLAN.md
    ```

2.  **`apply-saas-backend`** (NestJS Project)
    ```
    /apply-saas-backend/
    ├── src/
    │   └── ...
    │
    └── README.md
    ```

---

## 🗺️ 5. Plan de Développement Photoréaliste et Détaillé

Voici les étapes de développement, dans l'ordre que vous avez défini.

### **Phase 1 : Architecture Globale du Projet (Fondations)**

* **🎯 Objectif Principal** : Créer les deux repositories (frontend et backend) et mettre en place les fondations techniques de base.
* **✅ Tâches Concrètes à Réaliser** :
    1.  **Créer le Workspace Angular (Frontend)** :
        * Exécuter `ng new apply-saas-frontend --create-application=false` pour créer un workspace vide.
        * À l'intérieur, exécuter `ng generate application apply-web` pour créer l'application principale.
        * Configurer Tailwind CSS pour l'application `apply-web`.
    2.  **Créer le projet NestJS (Backend)** :
        * Dans un dossier séparé, exécuter `nest new apply-saas-backend`.
    3.  **Configurer GCP & Firebase** :
        * Créer le projet GCP de `dev` avec Terraform.
        * Mettre en place Firebase Authentication.
    4.  **Développer le flux d'authentification** :
        * Implémenter la page de connexion/inscription dans Angular.
        * Créer un endpoint protégé de base sur l'API NestJS pour valider l'authentification.
    5.  **Mettre en place la CI/CD** :
        * Créer un pipeline Cloud Build simple pour déployer l'application Angular sur Firebase Hosting.
* **🏁 Résultat Attendu** : Un utilisateur peut s'inscrire et se connecter sur une application Angular de base. Les deux repositories sont créés et fonctionnels.

### **Phase 2 : Développement de l'Univers 1 (Construire)**

* **🎯 Objectif Principal** : Permettre à un utilisateur de créer et éditer un CV.
* **📚 Bibliothèques Concernées (Frontend)** : Créer une bibliothèque `build-feature` avec `ng generate library build-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `build-feature` et son `plan.md` détaillé.
    2.  Développer les composants Angular : `EntryScreen`, `ResumeEditor`, `ResumePreview`.
    3.  Développer les endpoints backend (`POST /cv`, `GET /cv`) sur l'API NestJS.
    4.  Connecter les composants au backend.
    5.  Marquer toutes les chaînes pour l'i18n.
* **🏁 Résultat Attendu** : L'utilisateur peut créer et sauvegarder un CV. **Le MVP est prêt à être lancé.**

### **Phase 3 : Système de Candidature Manuel**

* **🎯 Objectif Principal** : Permettre à l'utilisateur de suivre manuellement ses candidatures dans un tableau de bord.
* **📚 Bibliothèques Concernées** : `applications-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `applications-feature` et son `plan.md`.
    2.  Développer le composant `ApplicationsDashboard` (vue Kanban ou liste).
    3.  Développer le formulaire `NewApplicationFlow` pour ajouter une nouvelle candidature.
    4.  Développer les endpoints backend pour le CRUD (Create, Read, Update, Delete) des candidatures.
* **🏁 Résultat Attendu** : L'utilisateur dispose d'un tableau de bord fonctionnel pour gérer ses candidatures.

### **Phase 4 : Page Profil**

* **🎯 Objectif Principal** : Centraliser toutes les informations de l'utilisateur dans une page dédiée.
* **📚 Bibliothèques Concernées** : `profile-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `profile-feature` et son `plan.md`.
    2.  Développer les composants `ProfilePage`, `ProfileHeader`, `ProfileInformation`, `ProfilePreferences`, `ProfileDocuments`.
    3.  Connecter ces composants aux données déjà existantes (CV, préférences, etc.).
    4.  Permettre à l'utilisateur de modifier ses préférences de recherche.
* **🏁 Résultat Attendu** : L'utilisateur a une page profil complète et fonctionnelle pour gérer son compte.

### **Phase 5 : Univers 3 (Agir) & Système Premium**

* **🎯 Objectif Principal** : Introduire l'agent IA et le système de monétisation.
* **📚 Bibliothèques Concernées** : `act-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `act-feature` et son `plan.md`.
    2.  Intégrer **Stripe** pour les paiements et abonnements.
    3.  Utiliser les **Custom Claims de Firebase** pour gérer les rôles (`free`, `premium`, `agent`).
    4.  Développer l'interface de l'agent (`AgentConsole`, `ScanInterface`).
    5.  Développer les **Cloud Functions** qui exécuteront les tâches de l'agent (scan d'offres, etc.).
    6.  Protéger les fonctionnalités de cet univers avec des `AuthGuards` Angular et des décorateurs NestJS vérifiant le rôle de l'utilisateur.
* **🏁 Résultat Attendu** : Les utilisateurs peuvent s'abonner à un plan payant pour activer l'agent IA.

### **Phase 6 : Univers 2 (Se Préparer)**

* **🎯 Objectif Principal** : Fournir les outils de coaching pour les entretiens.
* **📚 Bibliothèques Concernées** : `prepare-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `prepare-feature` et son `plan.md`.
    2.  Développer les composants de coaching (`PitchTraining`, `InterviewSimulation`).
    3.  Intégrer l'API du LLM pour l'analyse des réponses et la génération de feedback.
    4.  Gérer l'accès à ce module en fonction du niveau d'abonnement de l'utilisateur.
* **🏁 Résultat Attendu** : L'application est fonctionnellement complète, offrant une suite d'outils de la création de CV à la préparation aux entretiens.
