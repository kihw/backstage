# 🚀 Guide de démarrage AI Studio Backstage

## ⚠️ Prérequis de version

**Backstage nécessite Node.js 18 ou 20** (Node.js 22 n'est pas supporté)

## 🔧 Option 1 : Démarrage avec Node.js (Recommandé)

### 1. Installation de Node.js 20
```bash
# Via nvm (recommandé)
nvm install 20
nvm use 20

# Ou télécharger depuis https://nodejs.org (version 20.x)
```

### 2. Configuration
```bash
# Vérifier la version Node.js
node --version  # Doit être 20.x

# Configurer le token GitLab dans .env
echo "GITLAB_TOKEN=glpat-LsRZMFkvJq3iLvfltZQVfW86MQp1Ojg5cDdjCw.01.121y2z2lm" > .env
```

### 3. Installation et démarrage
```bash
# Installation des dépendances
npm install --legacy-peer-deps

# Démarrage en mode développement
npm run dev
```

### 4. Accès
- **Frontend Backstage** : http://localhost:3100
- **Backend API** : http://localhost:7007
- **Catalogue des services** : http://localhost:3100/catalog
- **TechDocs** : http://localhost:3100/docs

---

## 🐳 Option 2 : Démarrage avec Docker (Alternative)

### 1. Prérequis Docker
- Docker Desktop installé
- Docker Compose disponible

### 2. Configuration
```bash
# Vérifier que .env contient le token GitLab
cat .env
```

### 3. Construction et démarrage
```bash
# Construire et démarrer tous les services
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d --build
```

### 4. Vérification
```bash
# Status des services
docker-compose ps

# Logs Backstage
docker-compose logs backstage

# Logs PostgreSQL
docker-compose logs postgres
```

### 5. Arrêt
```bash
docker-compose down
```

---

## 📊 Vérification du déploiement

### 1. Services découverts automatiquement
Allez sur http://localhost:3100/catalog et vérifiez que vous voyez :

- **8 MFEs Frontend** (portal, auth, chat, ai-models, analytics, file-manager, monitoring, workflow-designer)
- **20 Services Backend** (model-runtime, security, messaging, etc.)
- **1 Design System** (shared/design-system)

### 2. Tests de fonctionnalités
- **Catalogue** : Parcourir les 29 services
- **TechDocs** : Accéder à la documentation des services
- **APIs** : Explorer les spécifications OpenAPI
- **Recherche** : Chercher des services spécifiques

---

## 🔧 Résolution de problèmes

### Node.js 22 non supporté
```bash
# Erreur : EBADENGINE Unsupported engine node: '18 || 20', current: 'v22.16.0'
# Solution : Installer Node.js 20
nvm install 20 && nvm use 20
```

### Erreurs de compilation C++
```bash
# Erreur : Visual Studio Build Tools manquants
# Solution 1 : Installer Visual Studio Build Tools
# Solution 2 : Utiliser Docker (plus simple)
docker-compose up --build
```

### Services non découverts
1. Vérifier le token GitLab dans .env
2. Vérifier la connectivité GitLab : https://gitlab.com/ai-studio3
3. Consulter les logs backend pour les erreurs de découverte

### Erreurs de dépendances
```bash
# Forcer l'installation avec résolution legacy
npm install --legacy-peer-deps --force

# Nettoyer le cache si nécessaire
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🎯 Étapes suivantes

### 1. Migration du code vers GitLab
```bash
# Exécuter le script de migration
cd scripts
./migrate-to-gitlab.sh  # Linux/macOS
# ou
.\migrate-to-gitlab.ps1  # Windows PowerShell
```

### 2. Configuration production
- Configurer PostgreSQL externe
- Configurer stockage cloud pour TechDocs (S3/GCS)
- Configurer authentification OAuth (GitHub/GitLab)
- Déployer sur Kubernetes

### 3. Personnalisation
- Ajouter vos propres plugins Backstage
- Personnaliser le thème et l'interface
- Configurer des templates de scaffolding
- Intégrer vos outils de monitoring

---

## 📚 Ressources

- **Documentation Backstage** : https://backstage.io/docs
- **Configuration AI Studio** : voir `app-config.yaml`
- **Catalogue des services** : voir `catalog/` 
- **Scripts utiles** : voir `scripts/`

---

🎭 **Votre AI Studio Developer Portal est prêt !**

Une fois démarré, vous aurez accès à un portail unifié pour vos 29 services avec documentation automatique, découverte de services, et bien plus encore.