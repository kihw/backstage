# AGENTS.md

# AGENTS.md

Ce document décrit les agents utilisés pour l'intégration avec le Codex d'OpenAI.

## Introduction

Les agents sont des assistants logiciels qui interagissent avec le Codex d'OpenAI pour automatiser des tâches, enrichir les réponses, ou orchestrer des workflows complexes. Ils peuvent agir comme interface entre l'utilisateur, les outils, et les sources de données.

## Types d'agents

- **Assistant** : Agent principal qui dialogue avec l'utilisateur et coordonne les autres agents.
- **Retrieval Agent** : Agent spécialisé dans la recherche et la récupération d'informations à partir de bases de données ou d'API.
- **Tool Agent** : Agent qui exécute des outils externes ou des scripts pour accomplir des tâches spécifiques (ex : calcul, conversion, analyse).
- **Action Agent** : Agent qui déclenche des actions dans des systèmes tiers (ex : création de ticket, envoi d'email).

## Architecture

Chaque agent fonctionne de manière indépendante et communique avec le Codex via des API ou des protocoles standard (REST, WebSocket, etc.). Les agents peuvent être configurés pour collaborer ou s'exécuter en parallèle selon les besoins du workflow.

## Bonnes pratiques

- Définir clairement le rôle et les permissions de chaque agent.

# Project Agents.md Guide for OpenAI Codex

Ce fichier AGENTS.md fournit des directives complètes pour OpenAI Codex et autres agents IA travaillant avec ce codebase.

## Structure du projet pour la navigation OpenAI Codex

- `/packages/app/src` : Code source principal à analyser par OpenAI Codex
  - `/components` : Composants React à documenter et à générer
  - `/search` : Fonctions de recherche et d'intégration
  - `/Root` : Point d'entrée et navigation principale
- `/packages/backend/src` : Backend Node.js à étendre ou interfacer
- `/public` : Assets statiques (OpenAI Codex ne doit pas modifier directement)
- `/templates` : Modèles YAML pour la génération de services et MFEs
- `/catalog` : Fichiers de configuration d'entités et de systèmes

## Conventions de codage pour OpenAI Codex

### Conventions générales

- Utiliser TypeScript pour tout nouveau code généré
- Respecter le style de code existant dans chaque fichier
- Utiliser des noms de variables et fonctions explicites
- Ajouter des commentaires pour toute logique complexe

### Directives pour les composants React

- Utiliser des composants fonctionnels avec hooks
- Garder les composants petits et spécialisés
- Typage strict des props dans tous les composants
- Respecter la convention de nommage : PascalCase.tsx

### Standards CSS/Styling

- Utiliser Tailwind CSS pour le style
- Privilégier l'approche utility-first
- Utiliser du CSS personnalisé uniquement si nécessaire

## Exigences de tests pour OpenAI Codex

OpenAI Codex doit exécuter les tests avec les commandes suivantes :

```powershell
# Exécuter tous les tests
npm test

# Exécuter un fichier de test spécifique
npm test -- path/to/test-file.test.ts

# Exécuter les tests avec couverture
npm test -- --coverage
```

## Directives Pull Request pour OpenAI Codex

Lors de la création d'une PR avec OpenAI Codex :

1. Fournir une description claire des changements
2. Référencer les issues associées
3. S'assurer que tous les tests passent
4. Ajouter des captures d'écran pour les changements UI
5. Garder la PR focalisée sur une seule problématique

## Vérifications programmatiques pour OpenAI Codex

Avant de soumettre du code généré :

```powershell
# Vérification lint
npm run lint

# Vérification des types TypeScript
npm run type-check

# Vérification du build
npm run build
```

Toutes les vérifications doivent être validées avant de merger du code généré par OpenAI Codex. Ce fichier AGENTS.md garantit le respect de ces exigences.
