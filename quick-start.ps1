# Script simple pour démarrer Backstage rapidement avec Docker
Write-Host "🎭 Démarrage rapide AI Studio Backstage" -ForegroundColor Cyan

# Arrêter le build précédent si nécessaire
docker-compose -f docker-compose.dev.yml down 2>$null

Write-Host "🚀 Démarrage Backstage avec Node.js 18..." -ForegroundColor Yellow

# Démarrer juste PostgreSQL pour la base de données
docker run -d --name backstage-postgres `
    -e POSTGRES_USER=postgres `
    -e POSTGRES_PASSWORD=backstage `
    -e POSTGRES_DB=backstage_plugin_catalog `
    -p 5432:5432 `
    postgres:15

Write-Host "⏳ Attente de PostgreSQL..." -ForegroundColor Yellow
Start-Sleep 5

# Lancer Backstage en mode développement avec Node 18
Write-Host "🏗️ Démarrage de Backstage..." -ForegroundColor Green

docker run --rm -it `
    --name backstage-app `
    -v "${PWD}:/app" `
    -w /app `
    -p 3100:3000 `
    -p 7007:7007 `
    --link backstage-postgres:postgres `
    -e POSTGRES_HOST=postgres `
    -e POSTGRES_PORT=5432 `
    -e POSTGRES_USER=postgres `
    -e POSTGRES_PASSWORD=backstage `
    -e POSTGRES_DB=backstage_plugin_catalog `
    -e BACKEND_SECRET=your-secret-key `
    -e GITLAB_TOKEN=glpat-LsRZMFkvJq3iLvfltZQVfW86MQp1Ojg5cDdjCw.01.121y2z2lm `
    node:18-bookworm `
    bash -c "
        echo '🔧 Installation des outils de build...'
        apt-get update && apt-get install -y python3 g++ build-essential libsqlite3-dev git
        npm config set python /usr/bin/python3
        
        echo '📦 Installation des dépendances Backstage...'
        npm install --legacy-peer-deps
        
        echo '🎭 Démarrage de Backstage...'
        npm run dev
    "

Write-Host "🧹 Nettoyage..." -ForegroundColor Yellow
docker stop backstage-postgres 2>$null
docker rm backstage-postgres 2>$null