# Exemples de catalog-info.yaml

Ce dossier contient des exemples de fichiers `catalog-info.yaml` pour différents types de services que vous pouvez copier dans vos repositories existants.

## Structure recommandée

Pour chaque service dans votre organisation, ajoutez un fichier `catalog-info.yaml` à la racine du repository :

```
votre-service/
├── catalog-info.yaml     # Métadonnées Backstage
├── docs/                 # Documentation TechDocs
│   └── index.md
├── mkdocs.yml           # Configuration TechDocs
└── src/                 # Code source
```

## Types de composants

- **service-backend.yaml** : Service backend (API REST, gRPC, etc.)
- **service-frontend.yaml** : Application frontend (React, Vue, Angular)
- **library.yaml** : Bibliothèque partagée
- **api.yaml** : Définition d'API
- **database.yaml** : Base de données
- **tool.yaml** : Outil interne

## Intégration GitLab

Pour que vos services soient automatiquement découverts :

1. Ajoutez `catalog-info.yaml` à la racine de votre repo
2. Assurez-vous que le repo est dans le groupe `ai-studio3`
3. Le service apparaîtra automatiquement dans Backstage

## Documentation TechDocs

Pour activer la documentation :

1. Créez un dossier `docs/` avec vos fichiers Markdown
2. Ajoutez `mkdocs.yml` à la racine
3. Ajoutez l'annotation dans `catalog-info.yaml` :
   ```yaml
   annotations:
     backstage.io/techdocs-ref: dir:.
   ```