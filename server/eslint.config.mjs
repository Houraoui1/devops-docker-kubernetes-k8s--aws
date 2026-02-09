// ============================================
// IMPORTS DES PACKAGES ESLINT
// ============================================

// Import de la configuration JavaScript de base d'ESLint
// Contient les règles recommandées pour JavaScript standard
import js from '@eslint/js';

// Import des définitions de variables globales (window, document, process, etc.)
// Permet à ESLint de reconnaître les variables globales selon l'environnement
import globals from 'globals';

// Import du plugin TypeScript pour ESLint
// Permet de linter du code TypeScript et ajoute des règles spécifiques à TS
import tseslint from 'typescript-eslint';

// ============================================
// EXPORT DE LA CONFIGURATION
// ============================================

// tseslint.config() est une fonction helper qui crée une config ESLint
// compatible avec TypeScript
export default tseslint.config(
  
  // ============================================
  // PREMIER OBJET : FICHIERS À IGNORER
  // ============================================
  {
    // Liste des dossiers/fichiers que ESLint ne doit PAS analyser
    ignores: [
      'dist',        // Dossier de build/compilation (code compilé JS)
      'node_modules', // Dépendances npm (ne pas linter le code des autres)
      'build',       // Autre dossier de build possible
      'coverage'     // Dossier de rapport de tests (généré automatiquement)
    ]
  },
  
  // ============================================
  // DEUXIÈME OBJET : CONFIGURATION PRINCIPALE
  // ============================================
  {
    // --------------------------------------------
    // FICHIERS À ANALYSER
    // --------------------------------------------
    
    // Pattern glob : tous les fichiers .ts dans tous les sous-dossiers
    // ** = tous les dossiers et sous-dossiers
    // *.ts = tous les fichiers se terminant par .ts
    files: ['**/*.ts'],
    
    // --------------------------------------------
    // EXTENDS : HÉRITER DE CONFIGURATIONS
    // --------------------------------------------
    
    // On étend (hérite) plusieurs configurations pré-définies :
    extends: [
      js.configs.recommended,              // Règles JS recommandées de base
      ...tseslint.configs.recommended      // Règles TypeScript recommandées
      // Le "..." (spread) décompresse le tableau de configs TS
    ],
    
    // --------------------------------------------
    // LANGUAGE OPTIONS : CONFIG DU LANGAGE
    // --------------------------------------------
    
    languageOptions: {
      
      // Version d'ECMAScript à utiliser
      // 2022 = supporte async/await, optional chaining (?.), etc.
      ecmaVersion: 2022,
      
      // Type de module JavaScript
      // 'module' = permet import/export (ES6 modules)
      // Alternative : 'commonjs' pour require/module.exports
      sourceType: 'module',
      
      // Variables globales disponibles dans votre environnement
      globals: {
        // ...globals.node ajoute toutes les variables globales Node.js :
        // - process (informations sur le processus Node)
        // - __dirname (chemin du dossier actuel)
        // - __filename (chemin du fichier actuel)
        // - Buffer (manipulation de données binaires)
        // - console (console.log, etc.)
        // - require (si vous utilisez CommonJS)
        // - module, exports
        ...globals.node,
        
        // ...globals.es2021 ajoute les variables globales ES2021 :
        // - Promise, Set, Map, Symbol, etc.
        // - globalThis (référence globale universelle)
        ...globals.es2021,
      }
    },
    
    // --------------------------------------------
    // RULES : RÈGLES DE LINTING PERSONNALISÉES
    // --------------------------------------------
    
    rules: {
      
      // ====== RÈGLE 1 : SEMICOLONS ======
      // Force l'utilisation de point-virgule à la fin des instructions
      // 'error' = erreur (bloque le build si configuré)
      // 'always' = toujours mettre des semicolons
      // Exemple : const x = 5; ✅  vs  const x = 5 ❌
      'semi': ['error', 'always'],
      
      // ====== RÈGLE 2 : VARIABLES NON UTILISÉES ======
      // Avertit si vous déclarez des variables que vous n'utilisez pas
      // Version TypeScript de la règle (préfixe @typescript-eslint/)
      '@typescript-eslint/no-unused-vars': [
        'warn',  // 'warn' = avertissement (n'empêche pas le build)
        { 
          // Ignore les paramètres de fonction commençant par _
          // Utile pour les callbacks : (req, _res) => { ... }
          argsIgnorePattern: '^_',
          
          // Ignore les variables commençant par _
          // Utile pour les destructurations : const { data, _meta } = response
          varsIgnorePattern: '^_' 
        }
      ],
      
      // ====== RÈGLE 3 : CONSOLE ======
      // Autorise console.log, console.error, etc.
      // 'off' = désactivé (pas d'erreur/warning)
      // Pour le backend, console est normal
      // Pour le frontend, on mettrait 'warn' ou 'error'
      'no-console': 'off',
      
      // ====== RÈGLE 4 : PREFER CONST ======
      // Force l'utilisation de 'const' au lieu de 'let' 
      // quand la variable n'est jamais réassignée
      // const x = 5 ✅  vs  let x = 5 (si jamais modifié) ❌
      'prefer-const': 'error',
      
      // ====== RÈGLE 5 : NO VAR ======
      // Interdit l'utilisation de 'var' (old school)
      // Force l'utilisation de 'let' ou 'const'
      // let x = 5 ✅  vs  var x = 5 ❌
      'no-var': 'error',
      
      // ====== RÈGLE 6 : TYPE ANY ======
      // Avertit si vous utilisez 'any' en TypeScript
      // 'warn' = avertissement (pas bloquant)
      // any désactive le typage TypeScript, c'est à éviter
      // const x: string ✅  vs  const x: any ❌
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
);

// ============================================
// RÉSUMÉ DE CE QUE FAIT CETTE CONFIG
// ============================================
/*
1. Ignore les dossiers de build (dist, node_modules, etc.)
2. Analyse tous les fichiers .ts de votre projet
3. Utilise les règles recommandées JS et TypeScript
4. Configure l'environnement Node.js (globals disponibles)
5. Active des règles personnalisées :
   - Force les semicolons
   - Avertit des variables non utilisées (sauf si préfixées par _)
   - Autorise console.log (backend)
   - Force const au lieu de let quand possible
   - Interdit var (old JS)
   - Avertit si vous utilisez 'any' en TypeScript
*/

// ============================================
// COMMENT UTILISER CETTE CONFIG
// ============================================
/*
1. Installer les dépendances :
   npm install -D eslint @eslint/js typescript-eslint globals

2. Créer ce fichier : eslint.config.js

3. Ajouter dans package.json :
   "scripts": {
     "lint": "eslint . --ext .ts",
     "lint:fix": "eslint . --ext .ts --fix"
   }

4. Lancer :
   npm run lint       → Voir les erreurs
   npm run lint:fix   → Corriger automatiquement
*/