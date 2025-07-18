# 🏛️ Plan de Projet Final : Application Companion SaaS (Approche Standard)

*Ce document est la source de vérité unique et définitive pour la création de l'application. Il sert de référence pour toutes les décisions techniques et fonctionnelles.*

---

## 🎯 1. Vision & Stratégie

* **Vision Produit** : Un compagnon de recherche d'emploi SaaS de premier plan, qui transforme la recherche d'emploi en une expérience de développement personnel et professionnel grâce à des outils intelligents et une assistance par IA personnalisée.

* **Stratégie de Développement** : **Phasée et Modulaire**. Le développement suivra un ordre de livraison précis pour mettre le produit sur le marché de manière incrémentale. L'ordre de développement des fonctionnalités majeures est le suivant : **1. Univers 1 (Construire), 2. Univers 2 (Se Préparer), 3. Univers 3 (Agir).**

* **Approche Technique Fondamentale** : **Mobile-First**. L'interface utilisateur sera conçue et développée en priorité pour les appareils mobiles.

---

## 📜 2. Principes Fondamentaux (Non négociables)

1. 🧱 **Modularité (Angular Workspace)** : Le projet frontend sera un "Angular Workspace", utilisant la capacité native de la CLI Angular à gérer une application principale et des bibliothèques locales pour une séparation claire des fonctionnalités.

2. 🛡️ **Sécurité by Design (OWASP)** : Les recommandations du **TOP 10 OWASP** sont des prérequis à chaque phase de développement.

3. 🇪🇺 **Conformité by Design (RGPD)** : Le traitement des données respecte les principes du **RGPD**. L'hébergement des données et des services se fera exclusivement dans des régions GCP européennes.

4. 🌍 **Internationalisation (i18n) Native** : L'application est conçue pour être multilingue via le framework **`@angular/localize`** dès la première ligne de code.

---

## 🛠️ 3. Architecture & Stack Technologique

* **Frontend** :

  * **Structure** : **Angular Workspace** (généré avec `ng new --create-application=false`).

  * **Framework** : **Angular 18+**.

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

1. **`apply-saas-frontend`** (Angular Workspace)

   ```
   /apply-saas-frontend/
   ├── projects/
   │   ├── apply-web/          # L'application principale
   │   └── build-feature/      # Chaque feature sera une lib
   │   └── prepare-feature/
   │   └── ...
   │
   └── PROJECT_PLAN.md
   ```

2. **`apply-saas-backend`** (NestJS Project)

   ```
   /apply-saas-backend/
   ├── src/
   │   └── ...
   │
   └── README.md
   ```

---

## 🧠 5. Context Engineering : Instructions pour les Agents (IA et Humains)

**Principe Fondamental :** Pour garantir un développement cohérent et maintenable, le projet adopte une stratégie de **Context Engineering**.

### **Instruction Impérative pour tout intervenant :**

1.  **Lecture Obligatoire :** Avant toute intervention, vous devez **systématiquement lire ce document (`PROJECT_PLAN.md`) dans son intégralité** pour comprendre la vision globale, les choix d'architecture et les principes fondamentaux.

2.  **Utilisation des Plans de Bibliothèque :** Pour travailler sur une fonctionnalité spécifique (ex: `build-feature`), vous devez vous référer à son fichier `plan.md` local (`/projects/build-feature/plan.md`).

3.  **Génération de Plan Manquant :** Si le fichier `plan.md` de la bibliothèque sur laquelle vous devez travailler **n'existe pas**, votre première tâche est de le **générer**. Pour ce faire, vous devez **scanner le contenu du dossier `apply_prototype`** (situé à la racine du projet) pour en extraire le périmètre, les fonctionnalités clés et les dépendances, puis rédiger le `plan.md` en respectant la structure définie dans ce document.

---

## 🗺️ 6. Plan de Développement Photoréaliste et Détaillé

Voici les étapes de développement, dans l'ordre que vous avez défini.

### **Phase 1 : Architecture Globale du Projet (Fondations)**

* **🎯 Objectif Principal** : Créer les deux repositories (frontend et backend) et mettre en place les fondations techniques de base.
* **✅ Tâches Concrètes à Réaliser** :
  1. **Créer le Workspace Angular (Frontend)** :
     * Exécuter `ng new apply-saas-frontend --create-application=false`.
     * Exécuter `ng generate application apply-web`.
     * Configurer Tailwind CSS.
  2. **Créer le projet NestJS (Backend)** :
     * Exécuter `nest new apply-saas-backend`.
  3. **Configurer GCP & Firebase** :
     * Créer le projet GCP de `dev` avec Terraform.
     * Mettre en place Firebase Authentication.
  4. **Développer le flux d'authentification**.
  5. **Mettre en place la CI/CD** de base.
* **🏁 Résultat Attendu** : Un utilisateur peut s'inscrire et se connecter. Les deux repositories sont créés et fonctionnels.

### **Phase 2 : Développement de l'Univers 1 (Construire)**

* **🎯 Objectif Principal** : Permettre à un utilisateur de créer et éditer un CV.
* **📚 Bibliothèques Concernées (Frontend)** : Créer une bibliothèque `build-feature` avec `ng generate library build-feature`.
* **✅ Tâches Concrètes à Réaliser** :
  1. Créer la `lib` `build-feature` et son `plan.md` détaillé (en suivant l'instruction de la section 5).
  2. Développer les composants Angular : `EntryScreen`, `ResumeEditor`, `ResumePreview`.
  3. Développer les endpoints backend (`POST /cv`, `GET /cv`) sur l'API NestJS.
  4. Connecter les composants au backend.
  5. Marquer toutes les chaînes pour l'i18n.
* **🏁 Résultat Attendu** : L'utilisateur peut créer et sauvegarder un CV. **Le MVP est prêt à être lancé.**

### **Phase 3 : Développement de l'Univers 2 (Se Préparer)**

* **🎯 Objectif Principal** : Fournir les outils de coaching pour les entretiens.
* **📚 Bibliothèques Concernées** : `prepare-feature`.
* **✅ Tâches Concrètes à Réaliser** :
  1. Créer la `lib` `prepare-feature` et son `plan.md`.
  2. Développer les composants de coaching (`PitchTraining`, `InterviewSimulation`).
  3. Intégrer l'API du LLM pour l'analyse des réponses.
  4. Intégrer le système de paiement (Stripe) pour l'accès aux fonctionnalités premium.
* **🏁 Résultat Attendu** : Les utilisateurs peuvent s'entraîner pour leurs entretiens et acheter des fonctionnalités premium.

### **Phase 4 : Développement de l'Univers 3 (Agir)**

* **🎯 Objectif Principal** : Introduire l'agent IA pour la recherche et la candidature.
* **📚 Bibliothèques Concernées** : `act-feature`.
* **✅ Tâches Concrètes à Réaliser** :
  1. Créer la `lib` `act-feature` et son `plan.md`.
  2. Développer l'interface de l'agent (`AgentConsole`).
  3. Développer les Cloud Functions qui exécuteront les tâches de l'agent.
  4. Protéger l'accès à cet univers via le système d'abonnement.
* **🏁 Résultat Attendu** : Les utilisateurs abonnés peuvent déléguer leur recherche d'emploi à l'agent IA.
