# Simple build script for Backstage artifacts
Write-Host "🏗️ Building Backstage artifacts with Node 18..." -ForegroundColor Green

docker run --rm `
    -v "${PWD}:/app" `
    -w /app `
    node:18-bookworm-slim `
    bash -c "
        echo '🔧 Installing build tools...'
        apt-get update && apt-get install -y python3 g++ build-essential libsqlite3-dev git
        npm config set python /usr/bin/python3
        
        echo '📦 Installing dependencies...'
        npm install --legacy-peer-deps
        
        echo '🏗️ Building Backstage...'
        npm run build
    "

Write-Host "✅ Build complete! You can now run docker-compose build" -ForegroundColor Green