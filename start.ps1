# Script de démarrage PowerShell pour AI Studio Backstage
# Usage: .\start.ps1 [-Mode dev|prod]

param(
    [ValidateSet("dev", "prod", "development", "production")]
    [string]$Mode = "dev"
)

$ErrorActionPreference = "Stop"

Write-Host "🎭 Démarrage AI Studio Backstage en mode: $Mode" -ForegroundColor Cyan

# Vérifier les prérequis
function Test-Prerequisites {
    Write-Host "🔍 Vérification des prérequis..." -ForegroundColor Yellow
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js n'est pas installé" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "npm n'est pas installe" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Prérequis vérifiés" -ForegroundColor Green
}

# Installation des dépendances
function Install-Dependencies {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    
    if (-not (Test-Path "node_modules")) {
        npm install
    } else {
        Write-Host "Dependances deja installees" -ForegroundColor Green
    }
}

# Configuration environnement
function Setup-Environment {
    Write-Host "⚙️ Configuration de l'environnement..." -ForegroundColor Yellow
    
    if (-not (Test-Path ".env")) {
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env"
            Write-Host "📋 Fichier .env créé depuis .env.example" -ForegroundColor Green
            Write-Host "⚠️  Pensez à configurer vos tokens dans .env" -ForegroundColor Yellow
        } else {
            Write-Host "⚠️  Aucun fichier .env.example trouvé" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ Fichier .env existant" -ForegroundColor Green
    }
}

# Démarrage en mode développement
function Start-Development {
    Write-Host "🚀 Démarrage en mode développement..." -ForegroundColor Green
    Write-Host "🌐 Frontend: http://localhost:3100" -ForegroundColor Cyan
    Write-Host "🔙 Backend: http://localhost:7007" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Tips:" -ForegroundColor Yellow
    Write-Host "   - Configurez GITLAB_TOKEN dans .env"
    Write-Host "   - Les services seront découverts automatiquement"
    Write-Host "   - TechDocs disponible sur /docs"
    Write-Host ""
    
    npm run dev
}

# Démarrage en mode production
function Start-Production {
    Write-Host "🏭 Démarrage en mode production..." -ForegroundColor Green
    
    # Build si nécessaire
    if (-not (Test-Path "packages/app/dist") -or -not (Test-Path "packages/backend/dist")) {
        Write-Host "🔨 Build de l'application..." -ForegroundColor Yellow
        npm run build
    }
    
    # Démarrage avec Docker
    if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
        Write-Host "🐳 Démarrage avec Docker Compose..." -ForegroundColor Cyan
        docker-compose up -d
        
        Write-Host "✅ Services démarrés:" -ForegroundColor Green
        Write-Host "   🎭 Backstage: http://localhost:3100"
        Write-Host "   🐘 PostgreSQL: localhost:5432"
        Write-Host ""
        Write-Host "📊 Status:" -ForegroundColor Yellow
        docker-compose ps
    } else {
        Write-Host "❌ Docker Compose non disponible" -ForegroundColor Red
        Write-Host "📦 Démarrage en mode standalone..." -ForegroundColor Yellow
        npm start
    }
}

# Nettoyage
function Invoke-Cleanup {
    Write-Host ""
    Write-Host "🧹 Nettoyage..." -ForegroundColor Yellow
    if (($Mode -eq "prod" -or $Mode -eq "production") -and (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        docker-compose down
    }
}

# Fonction principale
function Main {
    Set-Location $PSScriptRoot
    
    try {
        Test-Prerequisites
        Install-Dependencies
        Setup-Environment
        
        switch ($Mode) {
            { $_ -in "dev", "development" } {
                Start-Development
            }
            { $_ -in "prod", "production" } {
                Start-Production
            }
            default {
                Write-Host "❌ Mode non reconnu: $Mode" -ForegroundColor Red
                Write-Host "Usage: .\start.ps1 [-Mode dev|prod]"
                exit 1
            }
        }
    }
    catch {
        Write-Host "❌ Erreur: $_" -ForegroundColor Red
        exit 1
    }
    finally {
        Invoke-Cleanup
    }
}

# Gestion Ctrl+C
$null = Register-EngineEvent PowerShell.Exiting -Action { Invoke-Cleanup }

# Exécution
Main