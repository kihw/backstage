# 🎭 AI Studio Tech Catalog - Backstage

Portail développeur pour cataloguer et documenter les services existants du groupe AI Studio.

## 🎯 Objectif

Ce Backstage sert de :
- **Catalogue de services** : Inventaire centralisé de tous vos services, APIs et ressources
- **Hub de documentation** : Documentation technique centralisée avec TechDocs
- **Portail développeur** : Point d'entrée unique pour découvrir et comprendre votre écosystème

## 🚀 Démarrage rapide

### Prérequis

```bash
# Node.js 18 ou 20
node --version

# Yarn (gestionnaire de paquets)
npm install -g yarn
```

### Installation

```bash
# 1. Cloner le repository
git clone https://gitlab.com/ai-studio3/backstage.git
cd backstage

# 2. Installer les dépendances
yarn install

# 3. Démarrer en mode développement
yarn dev
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend : http://localhost:7007

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` :

```bash
# Token GitLab pour accéder aux repos du groupe ai-studio3
GITLAB_TOKEN=glpat-xxxxxxxxxxxxx

# Optionnel : autres intégrations
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
AUTH_BACKEND_SECRET=your-secret-key
```

### Ajouter vos services existants

1. **Dans votre repo de service**, ajoutez `catalog-info.yaml` à la racine :

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: mon-service
  title: Mon Service
  description: Description de mon service
  annotations:
    gitlab.com/project-slug: ai-studio3/mon-service
spec:
  type: service
  lifecycle: production
  owner: mon-equipe
```

2. **Le service apparaîtra automatiquement** dans Backstage grâce à la découverte automatique configurée pour le groupe `ai-studio3`.

### Exemples de catalog-info.yaml

Consultez le dossier `catalog/examples/` pour des exemples :
- `service-backend.yaml` : Service backend avec API
- `service-frontend.yaml` : Application web
- `library.yaml` : Bibliothèque partagée

## 📚 Documentation TechDocs

Pour ajouter de la documentation à votre service :

1. Créez un dossier `docs/` dans votre repo
2. Ajoutez `mkdocs.yml` :

```yaml
site_name: Mon Service
nav:
  - Introduction: index.md
  - API Reference: api.md
  - Getting Started: getting-started.md
```

3. Dans `catalog-info.yaml`, ajoutez :

```yaml
annotations:
  backstage.io/techdocs-ref: dir:.
```

## 🏗️ Structure du projet

```
backstage/
├── packages/
│   ├── app/          # Frontend Backstage
│   └── backend/      # Backend Backstage
├── catalog/
│   ├── systems/      # Définition du système AI Studio
│   ├── examples/     # Exemples de catalog-info.yaml
│   ├── external-apis.yaml  # APIs externes utilisées
│   └── resources.yaml      # Ressources (DB, cache, etc.)
└── app-config.yaml   # Configuration principale
```

## 🔍 Fonctionnalités principales

### Software Catalog
- Vue d'ensemble de tous les services
- Recherche et filtrage
- Dépendances entre services
- Ownership et équipes

### TechDocs
- Documentation générée depuis Markdown
- Versionnée avec le code
- Recherche intégrée

### API Explorer
- Catalogue des APIs internes et externes
- Spécifications OpenAPI/Swagger
- Try-out intégré

## 🤝 Contribution

Pour ajouter un nouveau service au catalogue :

1. Ajoutez `catalog-info.yaml` dans votre repo
2. Suivez les exemples dans `catalog/examples/`
3. La découverte automatique le détectera

## 📖 Ressources

- [Documentation Backstage](https://backstage.io/docs)
- [Exemples de catalog-info.yaml](./catalog/examples/)
- [Guide TechDocs](https://backstage.io/docs/features/techdocs/)

## 🆘 Support

- Issues : https://gitlab.com/ai-studio3/backstage/-/issues
- Documentation : https://backstage.io/docs