@echo off
echo Starting AI Studio Backstage with Docker...

REM Stop any existing containers
docker stop backstage-postgres 2>nul
docker rm backstage-postgres 2>nul

REM Start PostgreSQL on different port
echo Starting PostgreSQL...
docker run -d --name backstage-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=backstage -e POSTGRES_DB=backstage_plugin_catalog -p 5433:5432 postgres:15

REM Wait for PostgreSQL
timeout /t 10 /nobreak

REM Start Backstage
echo Starting Backstage...
docker run --rm --name backstage-app -v "%cd%:/app" -w /app -p 3100:3000 -p 7007:7007 --link backstage-postgres:postgres -e POSTGRES_HOST=postgres -e POSTGRES_PORT=5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=backstage -e POSTGRES_DB=backstage_plugin_catalog -e BACKEND_SECRET=your-secret-key -e GITLAB_TOKEN=glpat-LsRZMFkvJq3iLvfltZQVfW86MQp1Ojg5cDdjCw.01.121y2z2lm node:18-bookworm bash -c "apt-get update && apt-get install -y python3 g++ build-essential libsqlite3-dev git && npm config set python /usr/bin/python3 && npm install --legacy-peer-deps && npm run dev"

REM Cleanup
echo Cleaning up...
docker stop backstage-postgres
docker rm backstage-postgres