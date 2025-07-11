# 🏛️ Plan de Projet Final : Application Companion SaaS

*Ce document est la source de vérité unique et définitive pour la création de l'application. Il sert de référence pour toutes les décisions techniques et fonctionnelles.*

---

## 🎯 1. Vision & Stratégie

### Vision Produit

Un compagnon de recherche d'emploi SaaS de premier plan, qui transforme la recherche d'emploi en une expérience de développement personnel et professionnel grâce à des outils intelligents et une assistance par IA personnalisée.

### Stratégie de Développement

Le projet est développé en **phases modulaires et indépendantes**. Le développement suivra un ordre de livraison précis pour mettre le produit sur le marché de manière incrémentale, en commençant par les fonctionnalités de base les plus valorisantes.

### Approche Technique Fondamentale

L'application sera développée selon une approche **Mobile-First**, garantissant une expérience utilisateur impeccable sur mobile avant d'être adaptée aux écrans plus larges.

---

## 📜 2. Principes Fondamentaux (Non négociables)

1.  🧱 **Modularité Extrême (Nx)** : Le projet est géré via un **monorepo Nx**. Chaque fonctionnalité est une bibliothèque (`lib`) isolée, développable et testable indépendamment.
2.  🛡️ **Sécurité by Design (OWASP)** : Les recommandations du **TOP 10 OWASP** sont des prérequis à chaque phase de développement.
3.  🇪🇺 **Conformité by Design (RGPD)** : Le traitement des données respecte les principes du **RGPD** dès la conception. L'hébergement des données et des services se fera exclusivement dans des régions GCP européennes.
4.  🌍 **Internationalisation (i18n) Native** : L'application est conçue pour être multilingue via le framework **`@angular/localize`** dès la première ligne de code.

---

## 🛠️ 3. Architecture & Stack Technologique

* **Frontend** :
    * **Framework** : **Angular 17+**.
    * **UI** : **Composants sur-mesure développés avec Tailwind CSS**. Aucune bibliothèque de composants externe ne sera utilisée.
    * **Hébergement** : **Firebase Hosting**.

* **Backend** :
    * **Framework de l'API** : **NestJS (avec Node.js & TypeScript)**. Il s'agit de la structure logique de notre API, choisie pour sa cohérence avec l'écosystème Angular.
    * **Hébergement de l'API** : L'application NestJS sera conteneurisée et déployée sur **Google Cloud Run** (environnement d'exécution serverless).
    * **Tâches Asynchrones** : **Google Cloud Functions** sera utilisé pour la logique événementielle.

* **Base de Données & Stockage** :
    * **Données** : **Firestore** (utilisé par notre API NestJS).
    * **Fichiers** : **Google Cloud Storage** (utilisé par notre API NestJS).

* **Intelligence Artificielle (LLM)** :
    * L'architecture sera **agnostique du modèle**. Une couche de service (`ai.service.ts`) dans notre backend NestJS fera office d'adaptateur, permettant de se connecter à n'importe quelle API de LLM (Google Vertex AI, OpenAI, etc.).

* **Authentification & Sécurité** :
    * **Auth** : **Firebase Authentication**.
    * **API Gateway** : **Google Cloud API Gateway**.

* **DevOps & Infrastructure** :
    * **Infrastructure as Code** : **Terraform**.
    * **CI/CD** : **Google Cloud Build**.

---

## 🏗️ 4. Structure du Projet (Monorepo Nx)

```
/apply-saas/
├── apps/
│   ├── apply-web/      # Application Angular (le "shell")
│   └── api/            # API Backend (NestJS)
│
├── libs/
│   ├── build-feature/
│   ├── applications-feature/
│   ├── profile-feature/
│   ├── prepare-feature/
│   ├── act-feature/
│   │
│   └── shared/
│       ├── ui/          # Composants UI réutilisables
│       └── data-access/ # Interfaces et services de données
│
└── PROJECT_PLAN.md      <-- VOUS ÊTES ICI
```

---

## 🧠 5. Context Engineering & Index des Bibliothèques

Chaque bibliothèque (`lib`) dans le dossier `/libs` contiendra son propre fichier `plan.md`. Ce fichier servira de contexte principal pour tout développement au sein de cette bibliothèque.

### Index des Bibliothèques

* `build-feature` : **(Phase 2)** Gère la création, l'édition et la prévisualisation des CVs.
* `applications-feature`: **(Phase 3)** Gère le suivi manuel des candidatures.
* `profile-feature`: **(Phase 4)** Gère l'affichage et la gestion de la page profil.
* `act-feature` : **(Phase 5)** Gère l'agent IA de recherche et de candidature.
* `prepare-feature` : **(Phase 6)** Gère la préparation aux entretiens (coaching, simulation).
* `shared/ui` : Contient les composants Angular réutilisables (`Card`, `Button`, etc.).
* `shared/data-access` : Contient les interfaces de données et les services de communication backend.

---

## 🗺️ 6. Plan de Développement Photoréaliste et Détaillé

Voici les étapes de développement, dans l'ordre exact que vous avez défini.

### **Phase 1 : Architecture Globale du Projet (Fondations)**

* **🎯 Objectif Principal** : Créer un squelette de projet robuste, sécurisé et prêt pour le déploiement, sans aucune fonctionnalité métier visible.
* **📚 Bibliothèques Concernées** : Initialisation de la structure `apps` et `shared`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Initialiser le repository Git sur GitHub avec le code du prototype.
    2.  Initialiser le monorepo **Nx**.
    3.  Créer les applications vides `apply-web` (Angular) et `api` (NestJS).
    4.  Configurer le projet GCP (`dev`) avec **Terraform**.
    5.  Mettre en place **Firebase Authentication** pour la connexion par Email/Google.
    6.  Créer la `lib` `@shared/ui` et y développer les composants `Button` et `Card` avec Tailwind CSS (Mobile-First).
    7.  Créer la `lib` `@shared/data-access` et y définir l'interface `User`.
    8.  Implémenter le flux de connexion/inscription dans l'application Angular.
    9.  Configurer **`@angular/localize`** pour l'i18n (français par défaut).
    10. Mettre en place un pipeline **CI/CD** de base avec Cloud Build qui déploie automatiquement sur l'environnement `dev`.
* **🏁 Résultat Attendu** : Un utilisateur peut se rendre sur l'URL de `dev`, s'inscrire, se connecter, et voir une page d'accueil vide. Le projet est prêt à accueillir le développement de la première fonctionnalité.

### **Phase 2 : Développement de l'Univers 1 (Construire)**

* **🎯 Objectif Principal** : Permettre à un utilisateur de créer, éditer et visualiser un CV complet.
* **📚 Bibliothèques Concernées** : `@build-feature`, `@shared/ui`, `@shared/data-access`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `@build-feature` et son `plan.md` détaillé.
    2.  Développer les composants Angular : `EntryScreen`, `ResumeEditor`, `ResumePreview`, `ConfidenceScore`.
    3.  Implémenter la logique de prévisualisation en temps réel et de calcul du score.
    4.  Développer les endpoints backend (`POST /cv`, `GET /cv`) sur l'API NestJS.
    5.  Connecter les composants au backend via les services dans `@shared/data-access`.
    6.  Assurer la conformité RGPD en ne stockant que les données nécessaires.
    7.  Marquer toutes les chaînes de caractères pour l'i18n.
* **🏁 Résultat Attendu** : L'utilisateur peut créer et sauvegarder un CV complet. C'est la fin du **MVP**. Le produit peut être lancé avec cette fonctionnalité.

### **Phase 3 : Système de Candidature Manuel**

* **🎯 Objectif Principal** : Permettre à l'utilisateur de suivre manuellement ses candidatures.
* **📚 Bibliothèques Concernées** : `@applications-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `@applications-feature` et son `plan.md`.
    2.  Développer les composants `ApplicationsDashboard`, `NewApplicationFlow`.
    3.  Développer les endpoints backend pour la gestion des candidatures (CRUD).
* **🏁 Résultat Attendu** : L'utilisateur dispose d'un tableau de bord pour ajouter, voir et gérer le statut de ses candidatures.

### **Phase 4 : Page Profil**

* **🎯 Objectif Principal** : Donner à l'utilisateur une vue d'ensemble de son profil, de ses préférences et de ses documents.
* **📚 Bibliothèques Concernées** : `@profile-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `@profile-feature` et son `plan.md`.
    2.  Développer les composants `ProfilePage`, `ProfileHeader`, `ProfileInformation`, etc.
    3.  Connecter ces composants aux données déjà existantes (CV, préférences).
* **🏁 Résultat Attendu** : L'utilisateur a une page profil complète et fonctionnelle.

### **Phase 5 : Développement de l'Univers 3 (Agir) & Système Premium**

* **🎯 Objectif Principal** : Introduire l'agent IA et le système de monétisation.
* **📚 Bibliothèques Concernées** : `@act-feature`, `@shared/data-access`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `@act-feature` et son `plan.md`.
    2.  Intégrer **Stripe** pour les paiements.
    3.  Utiliser les Custom Claims de Firebase pour gérer les abonnements.
    4.  Développer l'interface de l'agent (`AgentConsole`).
    5.  Développer les Cloud Functions qui exécuteront les tâches de l'agent (scan d'offres, etc.) et qui interagiront avec une API de LLM.
    6.  Protéger les fonctionnalités de cet univers avec des `AuthGuards` vérifiant le rôle de l'utilisateur.
* **🏁 Résultat Attendu** : Les utilisateurs peuvent s'abonner à un plan payant pour activer l'agent IA qui postule à leur place.

### **Phase 6 : Développement de l'Univers 2 (Se Préparer)**

* **🎯 Objectif Principal** : Fournir les outils de coaching pour les entretiens.
* **📚 Bibliothèques Concernées** : `@prepare-feature`.
* **✅ Tâches Concrètes à Réaliser** :
    1.  Créer la `lib` `@prepare-feature` et son `plan.md`.
    2.  Développer les composants de coaching (`PitchTraining`, `InterviewSimulation`).
    3.  Intégrer l'API du LLM pour l'analyse des réponses.
* **🏁 Résultat Attendu** : L'application est fonctionnellement complète.
