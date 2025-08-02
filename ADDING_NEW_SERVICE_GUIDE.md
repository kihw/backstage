# Guide : Ajouter un nouveau service à Backstage

Ce guide explique comment ajouter correctement un nouveau service (MFE, service backend ou composant partagé) à l'infrastructure Backstage d'AI Studio.

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure des repos](#structure-des-repos)
3. [Étapes pour ajouter un service](#étapes-pour-ajouter-un-service)
4. [Exemples](#exemples)
5. [Validation](#validation)
6. [Dépannage](#dépannage)

## 🎯 Vue d'ensemble

Backstage utilise une architecture distribuée avec 3 repos GitLab principaux :
- **ai-studio3/mfe** : Micro-frontends
- **ai-studio3/services** : Services backend
- **ai-studio3/shared** : Composants partagés

Chaque service doit avoir :
- ✅ Un fichier `catalog-info.yaml` pour les métadonnées Backstage
- ✅ Un fichier `mkdocs.yml` pour la configuration TechDocs
- ✅ Un dossier `docs/` avec la documentation

## 🏗️ Structure des repos

```
ai-studio3/
├── mfe/                    # Repo des micro-frontends
│   ├── portal/
│   │   ├── catalog-info.yaml
│   │   ├── mkdocs.yml
│   │   └── docs/
│   ├── auth/
│   └── ...
├── services/               # Repo des services backend
│   ├── model-runtime/
│   │   ├── catalog-info.yaml
│   │   ├── mkdocs.yml
│   │   └── docs/
│   └── ...
└── shared/                 # Repo des composants partagés
    └── design-system/
        ├── catalog-info.yaml
        ├── mkdocs.yml
        └── docs/
```

## 📝 Étapes pour ajouter un service

### 1. Créer le fichier catalog-info.yaml

Créez un fichier `catalog-info.yaml` à la racine de votre service :

#### Pour un Micro-Frontend (MFE)

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: your-mfe-name-mfe
  title: Your MFE Title
  description: Description détaillée de votre micro-frontend
  annotations:
    backstage.io/techdocs-ref: dir:.
    backstage.io/source-location: url:https://gitlab.com/ai-studio3/mfe/-/tree/main/your-mfe-name
    backstage.io/gitlab-project-slug: ai-studio3/mfe
  labels:
    system: ai-studio
    tier: frontend
    framework: react
  tags:
    - frontend
    - react
    - nextjs
    - micro-frontend
    - typescript
spec:
  type: website
  lifecycle: production
  owner: frontend-team
  system: ai-studio
  dependsOn:
    - component:portal-shell
  providesApis:
    - your-mfe-api
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: your-mfe-api
  title: Your MFE API
  description: API pour le micro-frontend
spec:
  type: openapi
  lifecycle: production
  owner: frontend-team
  system: ai-studio
  definition: |
    openapi: 3.0.0
    info:
      title: Your MFE API
      version: 1.0.0
    paths:
      /health:
        get:
          summary: Health check
          responses:
            '200':
              description: Service opérationnel
```

#### Pour un Service Backend

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: your-service-name-service
  title: Your Service Title
  description: Description détaillée de votre service backend
  annotations:
    backstage.io/techdocs-ref: dir:.
    backstage.io/source-location: url:https://gitlab.com/ai-studio3/services/-/tree/main/your-service-name
    backstage.io/gitlab-project-slug: ai-studio3/services
  labels:
    system: ai-studio
    tier: backend
    framework: nodejs  # ou go, python, etc.
  tags:
    - backend
    - nodejs
    - microservice
    - api
spec:
  type: service
  lifecycle: production
  owner: backend-team
  system: ai-studio
  providesApis:
    - your-service-api
  dependsOn:
    - resource:postgres-db
    - resource:redis-cache
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: your-service-api
  title: Your Service API
  description: API REST pour votre service
spec:
  type: openapi
  lifecycle: production
  owner: backend-team
  system: ai-studio
  definition: |
    openapi: 3.0.0
    info:
      title: Your Service API
      version: 1.0.0
    servers:
      - url: http://localhost:YOUR_PORT
    paths:
      /health:
        get:
          summary: Health check
```

### 2. Créer le fichier mkdocs.yml

Créez un fichier `mkdocs.yml` à la racine de votre service :

```yaml
site_name: Your Service Name - AI Studio
site_description: Documentation de votre service

nav:
  - Home: index.md
  - Architecture: architecture.md
  - API Documentation: api.md
  - Development Guide: development.md
  - Deployment Guide: deployment.md
  - Testing: testing.md

theme:
  name: material
  palette:
    primary: deep purple
    accent: purple
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - search.highlight

plugins:
  - search
  - techdocs-core

markdown_extensions:
  - admonition
  - codehilite
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - toc:
      permalink: true
```

### 3. Créer la structure de documentation

Créez un dossier `docs/` avec les fichiers suivants :

#### docs/index.md
```markdown
# Your Service Name

## Overview
Description de votre service et de son rôle dans l'écosystème AI Studio.

## Quick Start
Instructions pour démarrer rapidement avec votre service.

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Documentation
- [Architecture](architecture.md)
- [API Documentation](api.md)
- [Development Guide](development.md)
- [Deployment Guide](deployment.md)
```

#### docs/architecture.md
```markdown
# Architecture

## Overview
Description de l'architecture de votre service.

## Components
Liste et description des composants principaux.

## Data Flow
Diagramme et explication du flux de données.

## Dependencies
- Dépendance 1
- Dépendance 2
```

#### docs/api.md
```markdown
# API Documentation

## Endpoints

### GET /health
Health check endpoint.

### GET /api/v1/resource
Description de l'endpoint.

## Authentication
Méthodes d'authentification supportées.

## Examples
```bash
curl http://localhost:PORT/health
```
```

#### docs/development.md
```markdown
# Development Guide

## Prerequisites
- Node.js 18+
- npm ou yarn
- Docker (optionnel)

## Installation
```bash
npm install
```

## Running locally
```bash
npm run dev
```

## Testing
```bash
npm test
```

## Code Standards
Standards de code à respecter.
```

#### docs/deployment.md
```markdown
# Deployment Guide

## Docker
```bash
docker build -t your-service .
docker run -p PORT:PORT your-service
```

## Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-service
```

## Environment Variables
- `NODE_ENV`: Environment (development, production)
- `PORT`: Port du service
- `DATABASE_URL`: URL de la base de données
```

### 4. Ajouter le service à app-config.yaml

Ajoutez votre service dans `backstage/app-config.yaml` :

```yaml
catalog:
  locations:
    # ... autres locations existantes ...
    
    # Pour un MFE
    - type: url
      target: https://gitlab.com/ai-studio3/mfe/-/raw/main/your-mfe-name/catalog-info.yaml
      rules:
        - allow: [Component]
    
    # Pour un service backend
    - type: url
      target: https://gitlab.com/ai-studio3/services/-/raw/main/your-service-name/catalog-info.yaml
      rules:
        - allow: [Component, API]
```

### 5. Mettre à jour le système principal (optionnel)

Si votre service fait partie du système principal, mettez à jour `backstage/catalog/systems/ai-studio-system.yaml`.

## 🔍 Exemples

### Exemple MFE : Dashboard
```bash
mfe/dashboard/
├── catalog-info.yaml
├── mkdocs.yml
├── docs/
│   ├── index.md
│   ├── architecture.md
│   ├── api.md
│   ├── development.md
│   └── deployment.md
├── src/
├── package.json
└── README.md
```

### Exemple Service : Payment Service
```bash
services/payment-service/
├── catalog-info.yaml
├── mkdocs.yml
├── docs/
│   ├── index.md
│   ├── architecture.md
│   ├── api.md
│   ├── development.md
│   └── deployment.md
├── src/
├── package.json
└── README.md
```

## ✅ Validation

Après avoir ajouté votre service, validez la configuration :

```bash
cd backstage/scripts
powershell -ExecutionPolicy Bypass -File validate-backstage-config.ps1
```

Le script vérifiera :
- ✓ Présence de catalog-info.yaml
- ✓ Présence de mkdocs.yml
- ✓ Plugin techdocs-core configuré
- ✓ Annotations Backstage correctes
- ✓ Structure de documentation

## 🔧 Dépannage

### Service non visible dans Backstage
1. Vérifiez que le service est ajouté dans `app-config.yaml`
2. Vérifiez que l'URL GitLab est correcte
3. Vérifiez les permissions du repo GitLab

### TechDocs ne se génère pas
1. Vérifiez que `mkdocs.yml` est présent
2. Vérifiez que le plugin `techdocs-core` est configuré
3. Vérifiez que l'annotation `backstage.io/techdocs-ref: dir:.` est présente

### Erreurs de validation
1. Exécutez le script de validation pour identifier les problèmes
2. Corrigez les erreurs signalées
3. Relancez la validation

## 📚 Ressources

- [Documentation Backstage](https://backstage.io/docs)
- [TechDocs](https://backstage.io/docs/features/techdocs)
- [Software Catalog](https://backstage.io/docs/features/software-catalog)

## 🤝 Support

Pour toute question ou problème :
1. Consultez la documentation Backstage
2. Vérifiez les exemples existants dans le projet
3. Contactez l'équipe DevOps

---

**Note** : Ce guide est spécifique à l'architecture AI Studio avec GitLab. Adaptez selon vos besoins spécifiques.