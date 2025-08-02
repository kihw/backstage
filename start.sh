#!/bin/bash

# Script de démarrage pour AI Studio Backstage
# Usage: ./start.sh [dev|prod]

set -e

MODE=${1:-dev}
echo "🎭 Démarrage AI Studio Backstage en mode: $MODE"

# Vérifier les prérequis
check_prerequisites() {
    echo "🔍 Vérification des prérequis..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js n'est pas installé"
        exit 1
    fi
    
    if ! command -v yarn &> /dev/null; then
        echo "❌ Yarn n'est pas installé"
        exit 1
    fi
    
    echo "✅ Prérequis vérifiés"
}

# Installation des dépendances
install_dependencies() {
    echo "📦 Installation des dépendances..."
    
    if [ ! -d "node_modules" ]; then
        yarn install
    else
        echo "📦 Dépendances déjà installées"
    fi
}

# Configuration environnement
setup_environment() {
    echo "⚙️ Configuration de l'environnement..."
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            echo "📋 Fichier .env créé depuis .env.example"
            echo "⚠️  Pensez à configurer vos tokens dans .env"
        else
            echo "⚠️  Aucun fichier .env.example trouvé"
        fi
    else
        echo "✅ Fichier .env existant"
    fi
}

# Démarrage en mode développement
start_dev() {
    echo "🚀 Démarrage en mode développement..."
    echo "🌐 Frontend: http://localhost:3100"
    echo "🔙 Backend: http://localhost:7007"
    echo ""
    echo "💡 Tips:"
    echo "   - Configurez GITLAB_TOKEN dans .env"
    echo "   - Les services seront découverts automatiquement"
    echo "   - TechDocs disponible sur /docs"
    echo ""
    
    yarn dev
}

# Démarrage en mode production
start_prod() {
    echo "🏭 Démarrage en mode production..."
    
    # Build si nécessaire
    if [ ! -d "packages/app/dist" ] || [ ! -d "packages/backend/dist" ]; then
        echo "🔨 Build de l'application..."
        yarn build
    fi
    
    # Démarrage avec Docker
    if command -v docker-compose &> /dev/null; then
        echo "🐳 Démarrage avec Docker Compose..."
        docker-compose up -d
        
        echo "✅ Services démarrés:"
        echo "   🎭 Backstage: http://localhost:3100"
        echo "   🐘 PostgreSQL: localhost:5432"
        echo ""
        echo "📊 Status:"
        docker-compose ps
    else
        echo "❌ Docker Compose non disponible"
        echo "📦 Démarrage en mode standalone..."
        yarn start
    fi
}

# Nettoyage
cleanup() {
    echo ""
    echo "🧹 Nettoyage..."
    if [ "$MODE" = "prod" ] && command -v docker-compose &> /dev/null; then
        docker-compose down
    fi
}

# Gestion des signaux
trap cleanup EXIT

# Fonction principale
main() {
    cd "$(dirname "$0")"
    
    check_prerequisites
    install_dependencies
    setup_environment
    
    case $MODE in
        "dev"|"development")
            start_dev
            ;;
        "prod"|"production")
            start_prod
            ;;
        *)
            echo "❌ Mode non reconnu: $MODE"
            echo "Usage: $0 [dev|prod]"
            exit 1
            ;;
    esac
}

# Exécution
main "$@"