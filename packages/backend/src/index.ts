import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// Auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));

// Catalog plugin  
backend.add(import('@backstage/plugin-catalog-backend'));

// Permissions plugin (adding after catalog)
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(import('@backstage/plugin-permission-backend-module-allow-all-policy'));

// App backend plugin
backend.add(import('@backstage/plugin-app-backend'));

backend.start();