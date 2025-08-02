# 🎭 AI Studio Developer Portal - Backstage

Portal de développement unifié pour la plateforme AI Studio, basé sur Backstage avec intégration TechDocs et catalogage automatique des 28 services.

## 🎯 Vue d'ensemble

Ce portal Backstage centralise :
- **Software Catalog** : Découverte automatique des 28 services AI Studio (8 MFE + 20 Backend)
- **TechDocs** : Documentation générée automatiquement depuis chaque repository
- **API Explorer** : Exploration des APIs avec spécifications OpenAPI/Swagger
- **System Overview** : Vue d'ensemble de l'architecture microservices

## 🚀 Démarrage rapide

### Prérequis

```bash
# Node.js 18+ et Yarn
node --version  # 18.x ou supérieur
yarn --version

# Docker pour base de données
docker --version
```

### Installation

```bash
# 1. Installer les dépendances
yarn install

# 2. Configuration variables d'environnement
cp .env.example .env
# Éditer .env avec vos tokens GitLab/GitHub

# 3. Démarrer avec Docker (recommandé)
docker-compose up -d

# OU démarrer en mode développement
yarn dev
```

### Variables d'environnement requises

```bash
# .env
GITLAB_TOKEN=your-gitlab-personal-access-token
GITHUB_TOKEN=your-github-token  # optionnel
BACKEND_SECRET=your-backend-secret-key

# Pour production
POSTGRES_HOST=your-postgres-host
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=backstage_plugin_catalog
```

## 📊 Services catalogués

### 🎨 Frontend MFEs (8 services)
- **Portal Shell** (`mfe/portal`) - Host application Module Federation
- **Auth MFE** (`mfe/auth`) - Authentification avec Keycloak SSO
- **Chat MFE** (`mfe/chat`) - Interface conversationnelle IA
- **AI Models MFE** (`mfe/ai-models`) - Gestion modèles ML/AI
- **Analytics MFE** (`mfe/analytics`) - Dashboards et métriques
- **File Manager MFE** (`mfe/file-manager`) - Gestion fichiers avec recherche vectorielle
- **Monitoring MFE** (`mfe/monitoring`) - Supervision système
- **Workflow Designer MFE** (`mfe/workflow-designer`) - Designer workflows visuels

### ⚙️ Backend Services (20 services)
- **Model Runtime** (`services/model-runtime`) - Python/FastAPI - Déploiement modèles ML
- **Security Service** (`services/security`) - Go - Sécurité centralisée
- **Messaging Service** (`services/messaging`) - Node.js - Communication temps réel
- **File Storage** (`services/file-storage`) - Node.js - Stockage fichiers S3/MinIO
- **Vector Service** (`services/vectors`) - Node.js - Recherche vectorielle Qdrant
- **Workflow Engine** (`services/workflow-engine`) - Node.js - Orchestration workflows
- **Et 14 autres services...**

### 🎨 Design System
- **UI Components** (`shared/design-system`) - Composants React partagés

## 📚 TechDocs - Documentation

### Structure TechDocs standardisée

Chaque service suit cette structure :

```
service/
├── docs/
│   ├── index.md          # Page d'accueil TechDocs
│   ├── api.md            # Documentation API
│   ├── deployment.md     # Guide déploiement
│   └── development.md    # Guide développement
├── mkdocs.yml           # Configuration TechDocs
└── catalog-info.yaml    # Métadonnées Backstage
```

### Accès documentation

- **Portal** : http://localhost:3100/docs
- **Service spécifique** : http://localhost:3100/docs/default/component/[service-name]
- **API Explorer** : http://localhost:3100/api-docs

## 🏗️ Architecture Backstage

```
backstage/
├── packages/
│   ├── app/              # Frontend React
│   └── backend/          # Backend Node.js
├── catalog/
│   ├── systems/          # Définitions systèmes
│   └── examples/         # Entités d'exemple
├── app-config.yaml       # Configuration principale
├── app-config.local.yaml # Configuration développement
└── docker-compose.yml    # Services Docker
```

## 🔧 Configuration avancée

### Plugins installés

- **@backstage/plugin-catalog** - Catalogue de services
- **@backstage/plugin-techdocs** - Documentation intégrée
- **@backstage/plugin-api-docs** - Exploration APIs
- **@backstage/plugin-catalog-graph** - Graphe dépendances
- **@backstage/plugin-github-actions** - CI/CD GitHub (optionnel)
- **@backstage/plugin-scaffolder** - Templates de services

### Découverte automatique

Configurée dans `app-config.yaml` pour découvrir automatiquement :

```yaml
catalog:
  locations:
    # Système principal
    - type: url
      target: https://gitlab.com/ai-studio3/ai-studio/-/raw/main/backstage/catalog/systems/ai-studio-system.yaml
    
    # Services individuels via catalog-info.yaml
    - type: url
      target: https://gitlab.com/ai-studio3/ai-studio/-/raw/main/mfe/*/catalog-info.yaml
```

## 🚀 Déploiement

### Développement
```bash
yarn dev
# Frontend: http://localhost:3100
# Backend: http://localhost:7007
```

### Production avec Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes (avec Helm)
```bash
helm install ai-studio-backstage ./helm/backstage
```

## 📊 Monitoring et métriques

### Health checks
- **Backend** : http://localhost:7007/health
- **Frontend** : http://localhost:3100/health

### Métriques intégrées
- Performance des services
- Couverture documentation
- Adoption développeurs
- Qualité APIs

## 🔐 Sécurité

### Authentification
- **Développement** : Guest provider (sans auth)
- **Production** : GitLab OAuth + GitHub OAuth

### Tokens requis
- **GitLab Token** : Personal Access Token avec scope `read_api`, `read_repository`
- **GitHub Token** : Personal Access Token avec scope `repo` (optionnel)

## 🤝 Contribution

### Ajouter un nouveau service

1. **Créer `catalog-info.yaml`** dans le service :
```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: mon-nouveau-service
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
  owner: mon-equipe
  system: ai-studio
```

2. **Ajouter documentation TechDocs** :
```bash
mkdir docs
echo "# Mon Service" > docs/index.md
```

3. **Configurer mkdocs.yml** :
```yaml
site_name: Mon Service
nav:
  - Home: index.md
  - API: api.md
```

### Templates disponibles

Utilisez le Scaffolder pour créer :
- **Nouveau MFE React** - Template Module Federation
- **Nouveau Service Node.js** - Template microservice
- **Nouveau Service Python** - Template FastAPI
- **Nouveau Service Go** - Template avec Gin

## 📞 Support

### Documentation
- **Backstage Official** : https://backstage.io/docs
- **AI Studio Docs** : Consultez TechDocs dans le portal

### Contacts
- **Équipe Platform** : platform-team@ai-studio.com
- **Issues GitLab** : https://gitlab.com/ai-studio3
- **Slack** : #backstage-support

## 🔄 Migration docs.wiki

Le système docs.wiki existant est préservé pendant la transition :

### Synchronisation
- **docs.wiki** → **TechDocs** : Migration automatique des contenus
- **Scripts existants** : Adaptés pour alimenter TechDocs
- **Liens** : Redirections préservées

### Timeline migration
1. **Phase 1** : Backstage fonctionnel avec services pilotes
2. **Phase 2** : Migration complète documentation
3. **Phase 3** : Formation équipes
4. **Phase 4** : Décommissioning docs.wiki

---

🎭 **AI Studio Developer Portal** - Votre hub central pour découvrir, documenter et développer dans l'écosystème AI Studio.

*Généré avec ❤️ par l'équipe Platform*