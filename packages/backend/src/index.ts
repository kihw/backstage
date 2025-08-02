import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// App backend plugin (essential pour servir le frontend)
backend.add(import('@backstage/plugin-app-backend'));

// Catalog plugin  
backend.add(import('@backstage/plugin-catalog-backend'));

// Permissions plugin  
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(import('@backstage/plugin-permission-backend-module-allow-all-policy'));

// Auth plugin avec guest provider (simple et sans dépendances)
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));

backend.start();