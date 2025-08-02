# 🏗️ Architecture AI Studio + Backstage - Version finale

## 📊 Structure GitLab corrigée

### Groupe principal : `ai-studio3`

```
Groupe GitLab: ai-studio3/
├── mfe/                          # Repo Frontend MFEs
│   ├── portal/
│   │   ├── catalog-info.yaml     # ✅ Métadonnées Backstage
│   │   ├── mkdocs.yml            # ✅ Configuration TechDocs
│   │   ├── docs/                 # ✅ Documentation
│   │   └── src/                  # Code source
│   ├── auth/
│   │   ├── catalog-info.yaml
│   │   └── ...
│   ├── chat/
│   ├── ai-models/
│   ├── analytics/
│   ├── file-manager/
│   ├── monitoring/
│   └── workflow-designer/
├── services/                     # Repo Backend Services
│   ├── model-runtime/
│   │   ├── catalog-info.yaml     # ✅ Métadonnées + API
│   │   ├── mkdocs.yml
│   │   ├── docs/
│   │   └── src/
│   ├── security/
│   │   ├── catalog-info.yaml
│   │   └── ...
│   ├── messaging/
│   ├── file-storage/
│   ├── vectors/
│   ├── workflow-engine/
│   ├── notifications/
│   ├── integrations/
│   └── system-monitoring/
├── shared/                       # Repo Composants Partagés
│   └── design-system/
│       ├── catalog-info.yaml     # ✅ Design System + API + Storybook
│       ├── mkdocs.yml            # ✅ Configuration TechDocs
│       ├── docs/                 # ✅ Documentation complète
│       ├── src/                  # Composants React
│       ├── storybook/            # Documentation Storybook
│       └── package.json          # NPM Package
└── backstage/                    # Repo Developer Portal
    ├── packages/
    │   ├── app/                  # Frontend React
    │   └── backend/              # Backend Node.js
    ├── catalog/
    │   ├── systems/              # Définitions systèmes
    │   └── examples/             # Entités d'exemple
    ├── scripts/
    │   ├── generate-catalog-info.sh    # ✅ Génération auto (+ design system)
    │   └── generate-catalog-info.ps1   # ✅ Version PowerShell
    ├── app-config.yaml           # ✅ Configuration corrigée
    ├── docker-compose.yml
    ├── start.sh / start.ps1      # ✅ Scripts démarrage
    ├── MIGRATION_GUIDE.md        # ✅ Guide de migration
    └── README.md
```

## 🔗 URLs corrigées

### Configuration Backstage

**app-config.yaml - Découverte automatique :**
```yaml
catalog:
  locations:
    # Système principal
    - type: url
      target: https://gitlab.com/ai-studio3/backstage/-/raw/main/catalog/systems/ai-studio-system.yaml

    # Frontend MFEs - Repo ai-studio3/mfe
    - type: url
      target: https://gitlab.com/ai-studio3/mfe/-/raw/main/portal/catalog-info.yaml
    - type: url
      target: https://gitlab.com/ai-studio3/mfe/-/raw/main/auth/catalog-info.yaml
    # ... tous les MFEs

    # Backend Services - Repo ai-studio3/services  
    - type: url
      target: https://gitlab.com/ai-studio3/services/-/raw/main/model-runtime/catalog-info.yaml
    - type: url
      target: https://gitlab.com/ai-studio3/services/-/raw/main/security/catalog-info.yaml
    # ... tous les services

    # Shared Components - Repo ai-studio3/shared
    - type: url
      target: https://gitlab.com/ai-studio3/shared/-/raw/main/design-system/catalog-info.yaml
```

### Annotations dans catalog-info.yaml

**Pour un MFE :**
```yaml
metadata:
  annotations:
    backstage.io/source-location: url:https://gitlab.com/ai-studio3/mfe/-/tree/main/portal
    backstage.io/gitlab-project-slug: ai-studio3/mfe
```

**Pour un Service :**
```yaml
metadata:
  annotations:
    backstage.io/source-location: url:https://gitlab.com/ai-studio3/services/-/tree/main/model-runtime
    backstage.io/gitlab-project-slug: ai-studio3/services
```

**Pour le Design System :**
```yaml
metadata:
  annotations:
    backstage.io/source-location: url:https://gitlab.com/ai-studio3/shared/-/tree/main/design-system
    backstage.io/gitlab-project-slug: ai-studio3/shared
    storybook.io/url: https://storybook.ai-studio.com
```

## 🎯 Services catalogués

### ✅ **État actuel (3/29 intégrés)**

| Service | Type | Repo | Status | TechDocs |
|---------|------|------|--------|----------|
| Portal Shell | MFE | ai-studio3/mfe | ✅ Intégré | ✅ Complet |
| Model Runtime | Service | ai-studio3/services | ✅ Intégré | ✅ API documentée |
| Design System | Library | ai-studio3/shared | ✅ Intégré | ✅ Complet + Storybook |

### ⏳ **À intégrer (26 services)**

#### Frontend MFEs (7 restants)
| Service | Port | Repo | Script généré |
|---------|------|------|---------------|
| Auth MFE | 3001 | ai-studio3/mfe | ✅ catalog-info.yaml |
| Chat MFE | 3002 | ai-studio3/mfe | ✅ catalog-info.yaml |
| AI Models MFE | 3003 | ai-studio3/mfe | ✅ catalog-info.yaml |
| Analytics MFE | 3004 | ai-studio3/mfe | ✅ catalog-info.yaml |
| File Manager MFE | 3005 | ai-studio3/mfe | ✅ catalog-info.yaml |
| Monitoring MFE | 3006 | ai-studio3/mfe | ✅ catalog-info.yaml |
| Workflow Designer MFE | 3007 | ai-studio3/mfe | ✅ catalog-info.yaml |

#### Backend Services (19 restants)
| Service | Port | Tech | Repo | Script généré |
|---------|------|------|------|---------------|
| Security Service | 3010 | Go | ai-studio3/services | ✅ catalog-info.yaml |
| Messaging Service | 3011 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| File Storage | 3012 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| Vector Service | 3013 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| Workflow Engine | 3014 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| Notifications | 3015 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| Integrations | 3016 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| System Monitoring | 3017 | Node.js | ai-studio3/services | ✅ catalog-info.yaml |
| + 11 autres... | ... | ... | ai-studio3/services | ✅ À générer |

## 🚀 Plan de déploiement

### Phase 1 : Repos GitLab ✅
- [x] Structure analysée et corrigée
- [x] URLs Backstage mises à jour
- [x] Scripts de génération créés

### Phase 2 : Migration des repos ⏳
```bash
# 1. Créer les repos dans GitLab ai-studio3
# 2. Exécuter les scripts de génération
cd backstage/scripts
./generate-catalog-info.sh

# 3. Migrer le contenu vers les nouveaux repos
# 4. Pousser tout vers GitLab
```

### Phase 3 : Déploiement Backstage ⏳
```bash
# 1. Migrer backstage/ vers ai-studio3/backstage
# 2. Configurer .env avec token GitLab
# 3. Démarrer Backstage
cd backstage
./start.sh dev
```

## 📋 Checklist de migration

### Préparation GitLab
- [ ] Créer repo `ai-studio3/mfe`
- [ ] Créer repo `ai-studio3/services`
- [ ] Créer repo `ai-studio3/shared`
- [ ] Créer repo `ai-studio3/backstage`
- [ ] Configurer permissions et tokens

### Génération des fichiers
- [x] Scripts de génération créés
- [ ] Exécuter `generate-catalog-info.sh`
- [ ] Créer mkdocs.yml pour tous les services
- [ ] Migrer documentation existante

### Migration du code
- [ ] Migrer tous les MFEs vers `ai-studio3/mfe`
- [ ] Migrer tous les services vers `ai-studio3/services`
- [ ] Migrer Design System vers `ai-studio3/shared`
- [ ] Migrer Backstage vers `ai-studio3/backstage`

### Tests et validation
- [ ] Backstage démarre sans erreur
- [ ] 29 services découverts automatiquement (8 MFEs + 20 Services + 1 Design System)
- [ ] TechDocs fonctionnel pour tous
- [ ] APIs documentées et testables

## 🛠️ Outils créés

### Scripts automatiques ✅
- `generate-catalog-info.sh` - Génération catalog-info.yaml pour tous les services
- `generate-catalog-info.ps1` - Version PowerShell
- `start.sh` / `start.ps1` - Démarrage Backstage
- Configuration Docker Compose

### Documentation ✅
- `MIGRATION_GUIDE.md` - Guide de migration détaillé
- `README.md` - Documentation complète Backstage
- `ARCHITECTURE_SUMMARY.md` - Vue d'ensemble architecture

## 🌐 Accès final

Une fois la migration terminée :

- **Developer Portal** : https://backstage.ai-studio3.com (ou localhost:3100)
- **Repos GitLab** : https://gitlab.com/ai-studio3
- **TechDocs** : https://backstage.ai-studio3.com/docs
- **API Explorer** : https://backstage.ai-studio3.com/api-docs

---

🎭 **AI Studio Backstage** - Architecture distribuée prête pour 28 services sur GitLab ai-studio3 !

**Prochaine étape** : Exécuter la migration vers les repos GitLab