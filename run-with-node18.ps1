# Script PowerShell pour démarrer Backstage avec Node.js 18 dans Docker
# Alternative simple quand Node.js 20 n'est pas disponible localement

param(
    [ValidateSet("dev", "start")]
    [string]$Mode = "dev"
)

Write-Host "🎭 Démarrage AI Studio Backstage avec Node.js 18 (Docker)" -ForegroundColor Cyan

# Vérifier que Docker est disponible
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker n'est pas installé ou accessible" -ForegroundColor Red
    Write-Host "💡 Installez Docker Desktop depuis https://docker.com" -ForegroundColor Yellow
    exit 1
}

# Vérifier le fichier .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Fichier .env manquant" -ForegroundColor Yellow
    Write-Host "📋 Création d'un .env basique..." -ForegroundColor Cyan
    
    $envContent = @"
# Token GitLab pour découverte automatique
GITLAB_TOKEN=glpat-LsRZMFkvJq3iLvfltZQVfW86MQp1Ojg5cDdjCw.01.121y2z2lm

# Clé secrète backend
BACKEND_SECRET=your-super-secret-backend-key-change-this

# Configuration de base
FRONTEND_PORT=3100
BACKEND_PORT=7007
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Fichier .env créé" -ForegroundColor Green
}

Write-Host "🐳 Démarrage avec conteneur Node.js 18..." -ForegroundColor Yellow

# Commandes selon le mode
switch ($Mode) {
    "dev" {
        Write-Host "🔧 Mode développement avec hot reload" -ForegroundColor Green
        Write-Host "🌐 Frontend: http://localhost:3100" -ForegroundColor Cyan
        Write-Host "🔙 Backend: http://localhost:7007" -ForegroundColor Cyan
        Write-Host ""
        
        # Exécuter dans un conteneur Node.js 18 avec volumes montés
        docker run --rm -it `
            --name backstage-dev `
            -v "${PWD}:/app" `
            -w /app `
            -p 3100:3000 `
            -p 7007:7007 `
            --env-file .env `
            node:18-bookworm-slim `
            bash -c "
                apt-get update && apt-get install -y python3 g++ build-essential libsqlite3-dev git &&
                npm config set python /usr/bin/python3 &&
                npm install --legacy-peer-deps &&
                npm run dev
            "
    }
    "start" {
        Write-Host "🚀 Mode production" -ForegroundColor Green
        
        docker run --rm -it `
            --name backstage-prod `
            -v "${PWD}:/app" `
            -w /app `
            -p 3100:3000 `
            -p 7007:7007 `
            --env-file .env `
            node:18-bookworm-slim `
            bash -c "
                apt-get update && apt-get install -y python3 g++ build-essential libsqlite3-dev git &&
                npm config set python /usr/bin/python3 &&
                npm install --legacy-peer-deps &&
                npm run build &&
                npm start
            "
    }
}

Write-Host ""
Write-Host "🎉 Backstage est maintenant accessible !" -ForegroundColor Green
Write-Host "📊 Vérifiez que les 29 services sont découverts dans le catalogue" -ForegroundColor Yellow