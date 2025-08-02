# 🚀 Guide de migration Backstage vers GitLab ai-studio3

## 📋 Vue d'ensemble

Ce guide décrit la migration de l'instance Backstage vers l'architecture GitLab distribuée ai-studio3.

### Architecture cible

```
Groupe GitLab: ai-studio3/
├── mfe/                    # Frontend MFEs
│   ├── portal/
│   ├── auth/
│   ├── chat/
│   ├── ai-models/
│   ├── analytics/
│   ├── file-manager/
│   ├── monitoring/
│   └── workflow-designer/
├── services/               # Backend Services  
│   ├── model-runtime/
│   ├── security/
│   ├── messaging/
│   ├── file-storage/
│   ├── vectors/
│   ├── workflow-engine/
│   ├── notifications/
│   ├── integrations/
│   └── system-monitoring/
└── backstage/             # Developer Portal (ce repo)
    ├── packages/
    ├── catalog/
    ├── scripts/
    └── ...
```

## 🎯 Étapes de migration

### Phase 1 : Préparation des repos GitLab

#### 1.1 Créer les repos dans le groupe ai-studio3

```bash
# Créer les repos dans GitLab ai-studio3
# Via GitLab UI ou CLI gitlab :

# Frontend MFEs
curl -X POST "https://gitlab.com/api/v4/projects" \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  -d "name=mfe&namespace_id=$AI_STUDIO3_GROUP_ID&description=Frontend Micro-Frontends AI Studio"

# Backend Services
curl -X POST "https://gitlab.com/api/v4/projects" \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  -d "name=services&namespace_id=$AI_STUDIO3_GROUP_ID&description=Backend Microservices AI Studio"

# Backstage Portal
curl -X POST "https://gitlab.com/api/v4/projects" \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  -d "name=backstage&namespace_id=$AI_STUDIO3_GROUP_ID&description=AI Studio Developer Portal - Backstage"
```

#### 1.2 Structure des repos

**Repo ai-studio3/mfe :**
```
mfe/
├── portal/
│   ├── catalog-info.yaml
│   ├── mkdocs.yml
│   ├── docs/
│   ├── src/
│   ├── package.json
│   └── ...
├── auth/
│   ├── catalog-info.yaml
│   ├── mkdocs.yml
│   └── ...
└── [autres MFEs...]
```

**Repo ai-studio3/services :**
```
services/
├── model-runtime/
│   ├── catalog-info.yaml
│   ├── mkdocs.yml
│   ├── docs/
│   ├── src/
│   └── ...
├── security/
│   ├── catalog-info.yaml
│   └── ...
└── [autres services...]
```

**Repo ai-studio3/backstage :**
```
backstage/
├── packages/
├── catalog/
├── app-config.yaml
├── docker-compose.yml
├── scripts/
└── README.md
```

### Phase 2 : Migration du contenu existant

#### 2.1 Utiliser les scripts de génération

```bash
# Depuis le répertoire backstage actuel
cd backstage/scripts

# Générer tous les catalog-info.yaml
./generate-catalog-info.sh
# ou
.\generate-catalog-info.ps1

# Cela va créer :
# - ../mfe/auth/catalog-info.yaml
# - ../mfe/chat/catalog-info.yaml
# - ../services/security/catalog-info.yaml
# - etc.
```

#### 2.2 Copier le contenu vers les nouveaux repos

```bash
# Script de migration automatique
#!/bin/bash

# Configuration
AI_STUDIO3_GROUP="ai-studio3"
LOCAL_BASE_DIR="/path/to/current/ai-studio"

# Cloner les nouveaux repos
git clone https://gitlab.com/${AI_STUDIO3_GROUP}/mfe.git
git clone https://gitlab.com/${AI_STUDIO3_GROUP}/services.git
git clone https://gitlab.com/${AI_STUDIO3_GROUP}/backstage.git

# Migrer les MFEs
cp -r ${LOCAL_BASE_DIR}/mfe/* mfe/
cd mfe
git add .
git commit -m "Initial migration: All MFEs with Backstage integration"
git push origin main

# Migrer les Services
cp -r ${LOCAL_BASE_DIR}/services/* services/
cd ../services
git add .
git commit -m "Initial migration: All services with Backstage integration"
git push origin main

# Migrer Backstage
cp -r ${LOCAL_BASE_DIR}/backstage/* backstage/
cd ../backstage
git add .
git commit -m "Initial migration: Backstage Developer Portal"
git push origin main
```

### Phase 3 : Configuration Backstage

#### 3.1 Variables d'environnement

Le fichier `.env` dans `ai-studio3/backstage` :

```bash
# GitLab Integration
GITLAB_TOKEN=glpat-your-token-here

# Repos configuration
GITLAB_GROUP=ai-studio3
MFE_REPO=ai-studio3/mfe
SERVICES_REPO=ai-studio3/services
BACKSTAGE_REPO=ai-studio3/backstage

# Database (production)
POSTGRES_HOST=your-postgres-host
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=backstage_catalog

# Backend
BACKEND_SECRET=your-backend-secret
```

#### 3.2 Configuration finale app-config.yaml

La configuration est déjà mise à jour avec les bons liens :

```yaml
integrations:
  gitlab:
    - host: gitlab.com
      token: ${GITLAB_TOKEN}
      apiBaseUrl: https://gitlab.com/api/v4

catalog:
  locations:
    # Système principal
    - type: url
      target: https://gitlab.com/ai-studio3/backstage/-/raw/main/catalog/systems/ai-studio-system.yaml

    # MFEs depuis ai-studio3/mfe
    - type: url
      target: https://gitlab.com/ai-studio3/mfe/-/raw/main/portal/catalog-info.yaml
    # ... autres MFEs

    # Services depuis ai-studio3/services  
    - type: url
      target: https://gitlab.com/ai-studio3/services/-/raw/main/model-runtime/catalog-info.yaml
    # ... autres services
```

### Phase 4 : Déploiement et tests

#### 4.1 Test local

```bash
# Dans le nouveau repo ai-studio3/backstage
cd backstage
cp .env.example .env
# Configurer GITLAB_TOKEN

# Démarrer Backstage
./start.sh dev
```

#### 4.2 Vérifications

- [ ] Backstage démarre sur http://localhost:3100
- [ ] Catalogue affiche tous les services (28 au total)
- [ ] TechDocs fonctionne pour tous les services
- [ ] Liens GitLab corrects dans les annotations
- [ ] APIs documentées et accessibles

#### 4.3 Déploiement production

```bash
# Production avec Docker
docker-compose -f docker-compose.prod.yml up -d

# Ou avec Kubernetes
helm install ai-studio-backstage ./helm/backstage
```

## 📊 Checklist de migration

### Préparation
- [ ] Repos GitLab créés (mfe, services, backstage)
- [ ] Permissions configurées sur les repos
- [ ] Tokens GitLab générés avec les bons scopes

### Migration contenu
- [ ] Scripts de génération exécutés
- [ ] catalog-info.yaml créés pour tous les services
- [ ] mkdocs.yml configurés
- [ ] Documentation TechDocs migrée
- [ ] Code source migré vers les nouveaux repos

### Configuration Backstage
- [ ] app-config.yaml mis à jour
- [ ] Variables d'environnement configurées  
- [ ] Intégration GitLab testée
- [ ] Découverte automatique fonctionnelle

### Tests et validation
- [ ] Backstage démarre sans erreur
- [ ] 28 services découverts automatiquement
- [ ] TechDocs généré pour tous les services
- [ ] APIs documentées et testables
- [ ] Navigation entre services fonctionnelle

### Déploiement
- [ ] Environnement de développement opérationnel
- [ ] Environnement de staging testé
- [ ] Production déployée
- [ ] Monitoring et alertes configurés

## 🔧 Scripts utiles

### generate-all-configs.sh

```bash
#!/bin/bash
# Script pour générer toute la configuration d'un coup

./scripts/generate-catalog-info.sh
./scripts/generate-mkdocs-configs.sh
./scripts/generate-techdocs-structure.sh
./scripts/validate-catalog.sh
```

### validate-migration.sh

```bash
#!/bin/bash
# Script de validation post-migration

echo "🔍 Validation de la migration..."

# Vérifier les repos GitLab
curl -s "https://gitlab.com/api/v4/projects/ai-studio3%2Fmfe" | jq .name
curl -s "https://gitlab.com/api/v4/projects/ai-studio3%2Fservices" | jq .name
curl -s "https://gitlab.com/api/v4/projects/ai-studio3%2Fbackstage" | jq .name

# Vérifier Backstage
curl -s http://localhost:7007/api/catalog/entities | jq '.length'

echo "✅ Validation terminée"
```

## 🆘 Troubleshooting

### Problèmes fréquents

1. **Repos non trouvés**
   - Vérifier les permissions GitLab
   - Vérifier les tokens avec scopes corrects

2. **Services non découverts**
   - Vérifier les URLs dans app-config.yaml
   - Vérifier que les catalog-info.yaml sont poussés

3. **TechDocs vides**
   - Vérifier les mkdocs.yml
   - Vérifier la structure docs/

4. **Erreurs d'authentification**
   - Renouveler les tokens GitLab
   - Vérifier les variables d'environnement

---

🎭 **Migration vers ai-studio3 Backstage** - Centralisation de tous les services dans un Developer Portal unifié !

*Dernière mise à jour : $(date)*